import { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const siteUrl = window.location.origin;

type Mode = "sign-in" | "sign-up" | "reset";

export default function Auth() {
  const { user, configured } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "reset" ? "reset" : "sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    return (
      <section className="mx-auto max-w-xl py-12">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto text-primary" size={42} />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">Signed in</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Welcome back to Medweg</h1>
          <p className="mt-3 text-sm text-muted-foreground">{user.email}</p>
          <button className="btn-primary mt-7 rounded-xl px-5 py-3 text-sm" onClick={() => navigate("/profile")}>Open my profile</button>
        </div>
      </section>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!supabase) {
      setError("Authentication is not configured yet. Add the Supabase variables to the GitHub Pages workflow.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "reset") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${siteUrl}/Medweg/auth?mode=reset` });
        if (resetError) throw resetError;
        setMessage("Check your email for a password reset link.");
      } else if (mode === "sign-up") {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
        if (signUpError) throw signUpError;
        setMessage(data.session ? "Your account is ready." : "Check your email to confirm your account, then sign in.");
        if (data.session) navigate("/profile");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate("/profile");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const title = mode === "sign-up" ? "Create your Medweg account" : mode === "reset" ? "Reset your password" : "Sign in to Medweg";
  const subtitle = mode === "sign-up" ? "Save your pathway planning across devices." : mode === "reset" ? "We will send a secure reset link to your email." : "Continue planning your medical pathway.";

  return (
    <section className="mx-auto grid max-w-5xl gap-8 py-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-12">
      <div>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"><ArrowLeft size={15} /> Back to Medweg</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-primary">Your private pathway space</p>
        <h1 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{subtitle}</p>
        <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-3"><ShieldCheck className="text-primary" size={19} /> Secure authentication powered by Supabase</div>
          <div className="flex items-center gap-3"><KeyRound className="text-primary" size={19} /> Your account works on every device</div>
          <div className="flex items-center gap-3"><Mail className="text-primary" size={19} /> Password recovery by email</div>
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {!configured && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Authentication is waiting for the GitHub Pages environment variables.</div>}
        {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {message && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div>}
        <form onSubmit={submit} className="space-y-4">
          {mode === "sign-up" && <label className="block text-sm font-bold">Name<input className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" /></label>}
          <label className="block text-sm font-bold">Email<input required type="email" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></label>
          {mode !== "reset" && <label className="block text-sm font-bold">Password<input required minLength={6} type="password" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none ring-primary focus:ring-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={mode === "sign-up" ? "new-password" : "current-password"} /></label>}
          <button disabled={busy || !configured} className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60" type="submit">{busy && <Loader2 size={16} className="animate-spin" />}{mode === "sign-up" ? "Create account" : mode === "reset" ? "Send reset link" : "Sign in"}</button>
        </form>
        {mode === "sign-in" && (
          <>
            <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
            <button
              type="button"
              disabled={busy || !configured}
              className="btn-quiet inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              onClick={async () => {
                if (!supabase) return;
                setBusy(true);
                const { error: oauthError } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: `${siteUrl}/Medweg/auth` },
                });
                if (oauthError) {
                  setBusy(false);
                  setError(oauthError.message);
                }
              }}
            >
              Continue with Google
            </button>
          </>
        )}
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-sm font-bold">
          {mode === "sign-in" && <><button className="text-primary hover:underline" onClick={() => setMode("reset")}>Forgot password?</button><button className="text-primary hover:underline" onClick={() => setMode("sign-up")}>Create account</button></>}
          {mode === "sign-up" && <button className="text-primary hover:underline" onClick={() => setMode("sign-in")}>Already have an account? Sign in</button>}
          {mode === "reset" && <button className="text-primary hover:underline" onClick={() => setMode("sign-in")}>Back to sign in</button>}
        </div>
        {mode === "sign-in" && (
          <button
            type="button"
            disabled={busy || !configured || !email}
            className="btn-quiet mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            onClick={async () => {
              if (!supabase || !email) return;
              setError("");
              setMessage("");
              setBusy(true);
              const { error: linkError } = await supabase.auth.signInWithOtp({
                email,
                options: { emailRedirectTo: `${siteUrl}/Medweg/auth` },
              });
              setBusy(false);
              if (linkError) setError(linkError.message);
              else setMessage("Login link sent. Check your email and open the link on this device.");
            }}
          >
            Send me a login link
          </button>
        )}
      </div>
    </section>
  );
}
