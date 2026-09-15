import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Info, Lock, Milestone } from "lucide-react";
import countries from "../data/countries.json";
import { useApp } from "../contexts/AppContext";
import GermanyPathway from "../components/GermanyPathway";
import UsaPathway from "../components/UsaPathway";
import CanadaPathway from "../components/CanadaPathway";
import UkPathway from "../components/UkPathway";
import IrelandPathway from "../components/IrelandPathway";
import { assetPath } from "../lib/assetPath";

export default function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedCountryIds, toggleCountry } = useApp();

  const country = countries.find(c => c.id === id);

  if (!country) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-10 text-center">
        <p className="text-lg font-extrabold">Pathway not found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This country may have moved. Return to the pathway library to
          continue.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-secondary"
          data-testid="link-back-countries"
        >
          <ArrowLeft size={13} /> Back to country pathways
        </Link>
      </div>
    );
  }

  const saved = savedCountryIds.includes(country.id);

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="topbar-link inline-flex items-center gap-2 text-sm"
        data-testid="link-back-countries"
      >
        <ArrowLeft size={14} /> Country pathways
      </Link>

      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="country-card-image h-56">
          <img
            src={assetPath(country.image)}
            alt={country.name}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-lg bg-white/92 px-3 py-1.5 text-sm font-extrabold shadow-sm">
            {country.flag}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {country.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Pathway context for international medical graduates
              </p>
            </div>
            <button
              onClick={() => toggleCountry(country.id)}
              className={`btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold ${saved ? "text-primary" : ""}`}
              data-testid={`button-save-country-${country.id}`}
            >
              {saved ? "Saved" : "Save country"}
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            {country.summary}
          </p>
        </div>
      </div>

      {country.id === "usa" ? (
        <UsaPathway />
      ) : country.id === "germany" ? (
        <GermanyPathway />
      ) : country.id === "canada" ? (
        <CanadaPathway />
      ) : country.id === "uk" ? (
        <UkPathway />
      ) : country.id === "ireland" ? (
        <IrelandPathway />
      ) : null}
      {country.id !== "usa" &&
        country.id !== "germany" &&
        country.id !== "canada" &&
        country.id !== "uk" &&
        country.id !== "ireland" && (
          <>
            {/* At a glance */}
            <section>
              <h2 className="text-lg font-extrabold">At a glance</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Licensing body
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.licensingBody}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Language evidence
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.languageRequirement}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Residency range
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.residencyRange}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Salary during training
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.salaryRange}
                  </p>
                </div>
              </div>
            </section>

            {/* Citizenship */}
            <section className="citizenship-card rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#c77f1e]" />
                <h2 className="text-base font-extrabold">
                  Citizenship timeline (general)
                </h2>
              </div>
              <p className="mt-3 text-sm leading-6">
                {country.citizenshipTimeline}
              </p>
              <p className="mt-4 rounded-lg bg-white/60 p-3 text-xs leading-5 text-muted-foreground">
                General orientation only. Eligibility, residence type, language,
                permanent residence, absences, and processing time matter. This
                is not legal advice.
              </p>
              {country.officialAuthorityUrl && (
                <a
                  href={country.officialAuthorityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  Official guidance <ExternalLink size={12} />
                </a>
              )}
            </section>

            {/* Requirements + steps */}
            <div className="grid gap-6 lg:grid-cols-2">
              <section>
                <h2 className="text-lg font-extrabold">Typical requirements</h2>
                <ul className="mt-4 space-y-2.5">
                  {country.requirements.map(req => (
                    <li key={req} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-extrabold">A practical sequence</h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  The sequence is an orientation, not an application checklist.
                  Requirements can differ by authority and program.
                </p>
                <ol className="mt-4 space-y-4">
                  {country.steps.map((step, i) => (
                    <li key={step} className="route-step">
                      <span className="step-dot">{i + 1}</span>
                      <p className="text-sm leading-5">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* What the road looks like */}
            <section>
              <h2 className="text-lg font-extrabold">
                What the road usually looks like
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Most international graduates move from language evidence and
                primary source verification, through registration and supervised
                clinical experience, into a structured training program, and
                finally toward long-term residency options. The pace differs by
                country, but the shape of the road is recognisable.
              </p>
            </section>

            {/* Country updates */}
            <section className="rounded-2xl border border-dashed border-border bg-card/60 p-6">
              <div className="flex items-center gap-2">
                <Milestone size={16} className="text-muted-foreground" />
                <h2 className="text-base font-extrabold">Country updates</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                These empty spaces are ready for a short country briefing, a
                direct MP4 video link, or your own notes.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background/70 p-4 text-sm">
                  <p className="font-bold">Country status letter</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No briefing yet — you can add one later.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background/70 p-4 text-sm">
                  <p className="font-bold">Country video</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No video yet — you can add a direct video URL later.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => navigate("/questions")}
                  className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold"
                  data-testid={`button-add-letter-${country.id}`}
                >
                  <Info size={13} /> Add a video or status letter
                </button>
              </div>
            </section>
          </>
        )}
    </div>
  );
}
