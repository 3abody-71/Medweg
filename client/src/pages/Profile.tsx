import { useMemo, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import countrySuggestions from "../data/countrySuggestions.json";
import {
  GRADUATION_STATUSES,
  INTERESTS,
  PRIORITIES,
  WORK_STYLES,
  useApp,
  type Profile,
} from "../contexts/AppContext";

export default function Profile() {
  const { profile, setProfile, saveProfile } = useApp();
  const [saved, setSaved] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const suggestedCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return countrySuggestions.slice(0, 8);
    return countrySuggestions.filter((c) =>
      `${c.name} ${c.region}`.toLowerCase().includes(q)
    );
  }, [countryQuery]);

  const update = (patch: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...patch }));
    setSaved(false);
  };

  const toggleArrayItem = (
    key: "targetCountries" | "interests" | "priorities",
    value: string
  ) => {
    update({
      [key]: profile[key].includes(value)
        ? profile[key].filter((x) => x !== value)
        : [...profile[key], value],
    });
  };

  const handleSave = () => {
    saveProfile();
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow">Your starting point</div>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Discover your pathway
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Tell us a little about where you are today and what you are looking
          for. We will use this foundation for future country and specialty
          recommendations.
        </p>
      </div>

      {/* About you */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-base font-extrabold">About you</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Keep it lightweight. This is your compass, not a CV.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="text-xs font-bold">Name</span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Your preferred name"
              className="mt-2 h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              data-testid="input-profile-name"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold">Email</span>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="you@example.com"
              className="mt-2 h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              data-testid="input-profile-email"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold">Medical school</span>
            <input
              type="text"
              value={profile.medicalSchool}
              onChange={(e) => update({ medicalSchool: e.target.value })}
              placeholder="University or medical school"
              className="mt-2 h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              data-testid="input-profile-medical-school"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold">Current country</span>
            <input
              type="text"
              value={profile.currentCountry}
              onChange={(e) => update({ currentCountry: e.target.value })}
              placeholder="Current country"
              className="mt-2 h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              data-testid="input-current-country"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold">Current year of study</span>
            <div className="relative mt-2">
              <select
                value={profile.currentStudyYear}
                onChange={(e) => update({ currentStudyYear: e.target.value })}
                className="h-10 w-full appearance-none rounded-lg border border-border bg-background/60 px-3 pr-9 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                data-testid="select-current-study-year"
              >
                <option value="">Select your year</option>
                <option value="Pre-medical / foundation">Pre-medical / foundation</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
                <option value="Year 5">Year 5</option>
                <option value="Year 6">Year 6</option>
                <option value="Internship / foundation year">Internship / foundation year</option>
                <option value="Graduated">Graduated</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-bold">Monthly residence cost</span>
            <p className="mt-1 text-[11px] text-muted-foreground">
              What you currently pay for housing
            </p>
            <input
              type="text"
              inputMode="decimal"
              value={profile.residenceCost}
              onChange={(e) => update({ residenceCost: e.target.value })}
              placeholder="e.g. 500 USD"
              className="mt-2 h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              data-testid="input-residence-cost"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold">Graduation year</span>
            <input
              type="text"
              inputMode="numeric"
              value={profile.graduationYear}
              onChange={(e) => update({ graduationYear: e.target.value })}
              placeholder="e.g. 2026"
              className="mt-2 h-10 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              data-testid="input-profile-graduation-year"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold">Graduation status</span>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Select your current stage
            </p>
            <div className="relative mt-2">
              <select
                value={profile.graduationStatus}
                onChange={(e) => update({ graduationStatus: e.target.value })}
                className="h-10 w-full appearance-none rounded-lg border border-border bg-background/60 px-3 pr-9 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                data-testid="select-graduation-status"
              >
                <option value="">Graduation status</option>
                {GRADUATION_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-bold">Preferred work style</span>
            <div className="relative mt-2">
              <select
                value={profile.workStyle}
                onChange={(e) => update({ workStyle: e.target.value })}
                className="h-10 w-full appearance-none rounded-lg border border-border bg-background/60 px-3 pr-9 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              >
                <option value="">Preferred work style</option>
                {WORK_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </label>
        </div>
      </section>

      {/* Where you are looking */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-base font-extrabold">Where you are looking</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose as many as you are genuinely considering.
        </p>

        <div className="relative mt-4">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={countryQuery}
            onChange={(e) => setCountryQuery(e.target.value)}
            onFocus={() => setCountryOpen(true)}
            onBlur={() => setTimeout(() => setCountryOpen(false), 150)}
            placeholder="Type to filter, or pick from the suggestions — Sudan, Egypt, Yemen, and 50+ more included."
            className="h-10 w-full rounded-lg border border-border bg-background/60 pl-9 pr-9 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          />
          {countryQuery && (
            <button
              onClick={() => setCountryQuery("")}
              className="icon-button absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}

          {countryOpen && (
            <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-lg">
              {suggestedCountries.map((c) => {
                const selected = profile.targetCountries.includes(c.name);
                return (
                  <button
                    key={c.value}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      toggleArrayItem("targetCountries", c.name);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-accent ${selected ? "bg-secondary/60" : ""}`}
                  >
                    <span>
                      {c.name}{" "}
                      <span className="text-[10px] text-muted-foreground">
                        {c.region}
                      </span>
                    </span>
                    {selected && <Check size={13} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.targetCountries.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-bold"
            >
              {name}
              <button
                onClick={() => toggleArrayItem("targetCountries", name)}
                aria-label={`Remove ${name}`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      </section>

      {/* What pulls you in */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-base font-extrabold">What pulls you in</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Interests are signals, not commitments.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {INTERESTS.map((interest) => {
            const selected = profile.interests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleArrayItem("interests", interest)}
                className={`choice text-xs font-bold ${selected ? "selected" : ""}`}
                data-testid={`button-interest-${interest.toLowerCase().replace(" ", "-")}`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </section>

      {/* What should shape the decision */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-base font-extrabold">
          What should shape the decision?
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Pick the priorities you want to keep visible.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PRIORITIES.map((priority) => {
            const selected = profile.priorities.includes(priority);
            return (
              <button
                key={priority}
                onClick={() => toggleArrayItem("priorities", priority)}
                className={`choice text-xs font-bold ${selected ? "selected" : ""}`}
                data-testid={`button-priority-${priority.toLowerCase().replace(" ", "-")}`}
              >
                {priority}
              </button>
            );
          })}
        </div>
      </section>

      {/* Sticky save bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-lg backdrop-blur">
        <p className="text-xs text-muted-foreground">
          {saved
            ? "Your profile is up to date."
            : "You can revisit this whenever your thinking changes."}
        </p>
        <button
          onClick={handleSave}
          className="btn-primary rounded-lg px-5 py-2.5 text-xs"
          data-testid="button-save-profile"
        >
          Save profile
        </button>
      </div>
    </div>
  );
}
