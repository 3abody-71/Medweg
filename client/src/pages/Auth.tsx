import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  GraduationCap,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext";

const siteUrl = window.location.origin;
type Mode = "sign-in" | "sign-up" | "reset";

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-normal outline-none ring-primary transition focus:ring-2";
const selectClass = `${inputClass} appearance-none`;

export default function Auth() {
  const { user, configured } = useAuth();
  const { setProfile } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const requestedMode = params.get("mode");
  const [mode, setMode] = useState<Mode>(
    requestedMode === "reset"
      ? "reset"
      : requestedMode === "sign-up"
        ? "sign-up"
        : "sign-in",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [medicalSchool, setMedicalSchool] = useState("");
  const [currentStudyYear, setCurrentStudyYear] = useState("");
  const [countryOfStudy, setCountryOfStudy] = useState("");
  const [nationality, setNationality] = useState("");
  const [expectedGraduationYear, setExpectedGraduationYear] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    const raw = localStorage.getItem("medvade-onboarding-draft");
    if (!raw) return;
    try {
      const draft = JSON.parse(raw) as Partial<{
        firstName: string;
        lastName: string;
        email: string;
        medicalSchool: string;
        currentStudyYear: string;
        countryOfStudy: string;
        nationality: string;
        expectedGraduationYear: string;
        targetCountry: string;
        mainGoal: string;
      }>;
      setProfile((previous) => ({
        ...previous,
        name: [draft.firstName, draft.lastName].filter(Boolean).join(" "),
        email: user.email || draft.email || previous.email,
        medicalSchool: draft.medicalSchool || previous.medicalSchool,
        currentStudyYear: draft.currentStudyYear || previous.currentStudyYear,
        currentCountry: draft.countryOfStudy || previous.currentCountry,
        nationality: draft.nationality || previous.nationality,
        graduationYear:
          draft.expectedGraduationYear || previous.graduationYear,
        targetCountries: draft.targetCountry
          ? [draft.targetCountry]
          : previous.targetCountries,
        mainGoal: draft.mainGoal || previous.mainGoal,
      }));
      localStorage.removeItem("medvade-onboarding-draft");
    } catch {
      localStorage.removeItem("medvade-onboarding-draft");
    }
  }, [user, setProfile]);

  if (user) {
    return (
      <section className="mx-auto max-w-xl py-12">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto text-primary" size={42} />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Signed in
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Welcome back to medvade
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{user.email}</p>
          <button
            className="btn-primary mt-7 rounded-xl px-5 py-3 text-sm"
            onClick={() => navigate("/profile")}
          >
            Open my profile
          </button>
        </div>
      </section>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!supabase) {
      setError(
        "Authentication is not configured yet. Add the Supabase variables to the GitHub Pages workflow.",
      );
      return;
    }
    if (mode === "sign-up" && !consent) {
      setError("Please accept the Terms of Use and Privacy Policy to continue.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "reset") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email,
          { redirectTo: `${siteUrl}/Medweg/auth?mode=reset` },
        );
        if (resetError) throw resetError;
        setMessage("Check your email for a secure password reset link.");
      } else if (mode === "sign-up") {
        const fullName = [firstName.trim(), lastName.trim()]
          .filter(Boolean)
          .join(" ");
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: fullName,
              first_name: firstName,
              last_name: lastName,
              medical_school: medicalSchool,
              current_study_year: currentStudyYear,
              country_of_study: countryOfStudy,
              nationality,
              expected_graduation_year: expectedGraduationYear,
              target_country: targetCountry,
              main_goal: mainGoal,
              consent_accepted_at: new Date().toISOString(),
            },
          },
        });
        if (signUpError) throw signUpError;
        setProfile((previous) => ({
          ...previous,
          name: fullName,
          email,
          medicalSchool,
          currentStudyYear,
          currentCountry: countryOfStudy,
          nationality,
          graduationYear: expectedGraduationYear,
          targetCountries: targetCountry ? [targetCountry] : [],
          mainGoal,
        }));
        setMessage(
          data.session
            ? "Your account is ready. Your pathway profile has been saved."
            : "Check your email to confirm your account, then sign in to continue.",
        );
        if (data.session) navigate("/profile");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate("/profile");
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const startGoogle = async () => {
    if (!supabase) return;
    setError("");
    setMessage("");
    if (mode === "sign-up" && !consent) {
      setError("Please accept the Terms of Use and Privacy Policy first.");
      return;
    }
    if (mode === "sign-up") {
      localStorage.setItem(
        "medvade-onboarding-draft",
        JSON.stringify({
          firstName,
          lastName,
          email,
          medicalSchool,
          currentStudyYear,
          countryOfStudy,
          nationality,
          expectedGraduationYear,
          targetCountry,
          mainGoal,
        }),
      );
    }
    setBusy(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/Medweg/auth` },
    });
    if (oauthError) {
      setBusy(false);
      setError(oauthError.message);
    }
  };

  const title =
    mode === "sign-up"
      ? "Create your medvade account"
      : mode === "reset"
        ? "Reset your password"
        : "Sign in to medvade";
  const subtitle =
    mode === "sign-up"
      ? "Build a private pathway profile so your next steps are easier to plan."
      : mode === "reset"
        ? "We will send a secure reset link to your email."
        : "Continue planning your medical pathway.";

  return (
    <section className="mx-auto grid max-w-6xl gap-8 py-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:py-12">
      <div className="lg:sticky lg:top-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          <ArrowLeft size={15} /> Back to medvade
        </Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Your private pathway space
        </p>
        <h1 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={19} />
            Secure account and private profile data
          </div>
          <div className="flex items-center gap-3">
            <KeyRound className="text-primary" size={19} />
            Your plan works across your devices
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="text-primary" size={19} />
            Guidance built around your medical journey
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {mode === "sign-up" && (
          <div className="mb-7 flex items-center gap-3 rounded-2xl bg-secondary/60 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check size={17} />
            </span>
            <div>
              <p className="text-sm font-extrabold">A few details, a clearer route</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Your answers personalize your pathway workspace.
              </p>
            </div>
          </div>
        )}
        {!configured && (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Authentication is waiting for the GitHub Pages environment variables.
          </div>
        )}
        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <form onSubmit={submit} className="space-y-7">
          {mode === "sign-up" && (
            <>
              <fieldset className="space-y-4">
                <legend className="flex items-center gap-2 text-base font-extrabold">
                  <UserRound size={18} className="text-primary" /> Basic information
                </legend>
                <p className="text-xs leading-5 text-muted-foreground">
                  Use the name you want to see in your medvade workspace.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-bold">
                    First name
                    <input required className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Sara" autoComplete="given-name" />
                  </label>
                  <label className="block text-sm font-bold">
                    Last name
                    <input required className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Ahmed" autoComplete="family-name" />
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-4 border-t border-border pt-7">
                <legend className="flex items-center gap-2 text-base font-extrabold">
                  <Mail size={18} className="text-primary" /> Account details
                </legend>
                <label className="block text-sm font-bold">
                  Email address
                  <input required type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                </label>
                <label className="block text-sm font-bold">
                  Create a password
                  <span className="ml-2 text-xs font-normal text-muted-foreground">At least 6 characters</span>
                  <input required minLength={6} type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a secure password" autoComplete="new-password" />
                </label>
                <div className="relative flex items-center gap-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
                </div>
                <button type="button" disabled={busy || !configured} onClick={startGoogle} className="btn-quiet inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-extrabold text-[#4285F4] shadow-sm">G</span>
                  Continue with Google
                </button>
                <p className="text-center text-xs text-muted-foreground">You can complete or update your pathway profile after Google sign-in.</p>
              </fieldset>

              <fieldset className="space-y-4 border-t border-border pt-7">
                <legend className="flex items-center gap-2 text-base font-extrabold">
                  <GraduationCap size={18} className="text-primary" /> Medical student profile
                </legend>
                <p className="text-xs leading-5 text-muted-foreground">
                  This helps us organize the right pathway context for you.
                </p>
                <label className="block text-sm font-bold">
                  Medical school
                  <input required className={inputClass} value={medicalSchool} onChange={(e) => setMedicalSchool(e.target.value)} placeholder="University or medical school" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-bold">
                    Current year
                    <select required className={selectClass} value={currentStudyYear} onChange={(e) => setCurrentStudyYear(e.target.value)}>
                      <option value="">Select your year</option>
                      <option>Pre-medical / foundation</option>
                      <option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option><option>Year 5</option><option>Year 6</option>
                      <option>Internship / foundation year</option><option>Graduated</option>
                    </select>
                  </label>
                  <label className="block text-sm font-bold">
                    Country of study
                    <input required className={inputClass} value={countryOfStudy} onChange={(e) => setCountryOfStudy(e.target.value)} placeholder="Where you study medicine" />
                  </label>
                  <label className="block text-sm font-bold">
                    Nationality
                    <input required className={inputClass} value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="Your nationality" autoComplete="country-name" />
                  </label>
                  <label className="block text-sm font-bold">
                    Expected graduation year
                    <input required inputMode="numeric" pattern="[0-9]{4}" className={inputClass} value={expectedGraduationYear} onChange={(e) => setExpectedGraduationYear(e.target.value)} placeholder="e.g. 2028" />
                  </label>
                  <label className="block text-sm font-bold sm:col-span-2">
                    Target country
                    <input required className={inputClass} value={targetCountry} onChange={(e) => setTargetCountry(e.target.value)} placeholder="Where you hope to train or work" />
                  </label>
                  <label className="block text-sm font-bold sm:col-span-2">
                    Main goal
                    <select required className={selectClass} value={mainGoal} onChange={(e) => setMainGoal(e.target.value)}>
                      <option value="">Choose your main goal</option>
                      <option>Compare countries and choose a pathway</option>
                      <option>Understand licensing and exams</option>
                      <option>Find a residency or training route</option>
                      <option>Plan immigration and relocation steps</option>
                      <option>Build a stronger application profile</option>
                    </select>
                  </label>
                </div>
              </fieldset>

              <label className="flex items-start gap-3 border-t border-border pt-7 text-sm leading-6">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" />
                <span>
                  I agree to the <Link className="font-bold text-primary hover:underline" to="/privacy#terms">Terms of Use</Link> and acknowledge the <Link className="font-bold text-primary hover:underline" to="/privacy">Privacy Policy</Link>. I understand that medvade provides educational pathway information, not legal, immigration, employment, financial, or medical advice.
                </span>
              </label>
            </>
          )}

          {mode !== "sign-up" && (
            <>
              <label className="block text-sm font-bold">
                Email address
                <input required type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
              </label>
              {mode !== "reset" && (
                <label className="block text-sm font-bold">
                  Password
                  <input required minLength={6} type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" />
                </label>
              )}
            </>
          )}

          <button disabled={busy || !configured} className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60" type="submit">
            {busy && <Loader2 size={16} className="animate-spin" />}
            {mode === "sign-up" ? <>Create my account <ArrowRight size={16} /></> : mode === "reset" ? "Send reset link" : "Sign in"}
          </button>
        </form>

        {mode === "sign-in" && (
          <>
            <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
            <button type="button" disabled={busy || !configured} className="btn-quiet inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60" onClick={startGoogle}>Continue with Google</button>
          </>
        )}
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-sm font-bold">
          {mode === "sign-in" && <><button type="button" className="text-primary hover:underline" onClick={() => setMode("reset")}>Forgot password?</button><button type="button" className="text-primary hover:underline" onClick={() => setMode("sign-up")}>Create account</button></>}
          {mode === "sign-up" && <button type="button" className="text-primary hover:underline" onClick={() => setMode("sign-in")}>Already have an account? Sign in</button>}
          {mode === "reset" && <button type="button" className="text-primary hover:underline" onClick={() => setMode("sign-in")}>Back to sign in</button>}
        </div>
        {mode === "sign-in" && (
          <button type="button" disabled={busy || !configured || !email} className="btn-quiet mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60" onClick={async () => {
            if (!supabase || !email) return;
            setError(""); setMessage(""); setBusy(true);
            const { error: linkError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${siteUrl}/Medweg/auth` } });
            setBusy(false);
            if (linkError) setError(linkError.message); else setMessage("Login link sent. Check your email and open the link on this device.");
          }}>Send me a login link</button>
        )}
      </div>
    </section>
  );
}
