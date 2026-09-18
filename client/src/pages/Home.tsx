import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  Banknote,
  Compass,
  Globe,
  HelpCircle,
  Users,
  Search,
} from "lucide-react";
import countries from "../data/countries.json";
import { useApp } from "../contexts/AppContext";
import { assetPath } from "../lib/assetPath";

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon size={13} />
        {label}
      </div>
      <div className="mt-0.5 text-sm font-bold">{value}</div>
    </div>
  );
}

function CountryCard({
  country,
  saved,
  onSave,
  index,
}: {
  country: (typeof countries)[number];
  saved: boolean;
  onSave: () => void;
  index: number;
}) {
  return (
    <article
      className="fade-up group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
      style={{ animationDelay: `${index * 45}ms` }}
      data-testid={`card-pathway-${country.id}`}
    >
      <Link
        to={`/countries/${country.id}`}
        data-testid={`link-country-image-${country.id}`}
      >
        <img
          src={assetPath(country.image)}
          alt={`${country.name} medical pathway`}
          className="country-card-image-img"
          loading="lazy"
        />
      </Link>
      <div className="flex items-start justify-between gap-3 p-4 pb-0">
        <Link
          to={`/countries/${country.id}`}
          className="flex items-center gap-2.5"
          data-testid={`link-country-${country.id}`}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary font-mono text-xs font-bold text-primary">
            {country.flag}
          </span>
          <span>
            <span className="block text-sm font-extrabold">
              {country.name}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {country.region}
            </span>
          </span>
        </Link>
        <button
          onClick={onSave}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold ${
            saved ? "bg-secondary text-primary" : "btn-quiet"
          }`}
          aria-label={saved ? `Remove ${country.name} from saved` : `Save ${country.name}`}
          data-testid={`button-save-${country.name
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {saved ? <Bookmark size={14} /> : <Bookmark size={14} />}
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <Link to={`/countries/${country.id}`} className="block p-4 pt-3">
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          {country.summary}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatRow
            icon={Calendar}
            label="Residency range"
            value={country.residencyRange}
          />
          <StatRow
            icon={Banknote}
            label="Resident salary"
            value={country.salaryRange}
          />
        </div>
        <div className="mt-4 flex gap-2 rounded-lg bg-secondary/60 p-3 text-xs leading-5">
          <Globe
            size={15}
            className="mt-0.5 shrink-0 text-primary"
          />
          <span>
            <span className="font-bold">
              Citizenship timeline (general):
            </span>{" "}
            {country.citizenshipTimeline}
          </span>
        </div>
      </Link>
      <div className="mt-5 flex items-center gap-2 border-t border-border px-4 pb-4 pt-4 text-xs font-bold text-primary">
        View pathway details <ArrowRight size={14} />
      </div>
    </article>
  );
}

export default function Home() {
  const { profile, savedCountryIds, toggleCountry } = useApp();
  const [region, setRegion] = useState("All");

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((c) => c.region)))],
    []
  );

  const filtered = useMemo(() => {
    return countries.filter((c) => region === "All" || c.region === region);
  }, [region]);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="home-hero fade-up overflow-hidden rounded-2xl p-6 shadow-lg sm:p-8 lg:p-10">
        <div className="home-hero-background" aria-hidden="true">
          <span className="home-hero-orb home-hero-orb-one" />
          <span className="home-hero-orb home-hero-orb-two" />
          <span className="home-hero-grid" />
        </div>
        <img
          src={assetPath("/assets/media/hero-medical-students_cfadeffa.jpg")}
          alt="Medical students working together in a hospital"
          className="home-hero-photo"
          aria-hidden="true"
        />
        <div className="home-hero-content relative mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
              <Globe size={15} />
              {profile.name ? (
                <>Hello, {profile.name.split(" ")[0]} — </>
              ) : null}
              Nine pathways, one clear map
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[42px]">
              {profile.name
                ? `${profile.name
                    .split(" ")[0]}, find the country that fits your next medical chapter.`
                : "Find the country that fits your next medical chapter."}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/90 md:text-[15px]">
              Every pathway below has a different sequence of exams, language
              evidence, registration, and applications. Start with context,
              then verify the detail.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="stat-number text-2xl font-extrabold text-white">
                {countries.length}
              </span>
              <span className="text-xs text-white/80">Markets covered</span>
            </div>
          </div>
          <div className="hidden w-[240px] shrink-0 rounded-2xl bg-white/10 p-4 backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between text-white">
              <span className="text-xs font-bold">Markets covered</span>
              <span className="text-sm font-extrabold">{countries.length}</span>
            </div>
            <Link
              to="/explore"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#2784b0] shadow-lg transition-transform hover:-translate-y-0.5"
              data-testid="link-hero-explore"
            >
              Compare specialties too <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/explore"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-explore"
          >
            <Compass size={14} /> Explore specialties
          </Link>
          <Link
            to="/questions"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-questions"
          >
            <HelpCircle size={14} /> Ask a question
          </Link>
          <Link
            to="/profile"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-profile"
          >
            <Compass size={14} /> Discover your pathway
          </Link>
          <Link
            to="/community"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-community"
          >
            <Users size={14} /> Community
          </Link>
        </div>
        <span className="text-xs font-bold text-muted-foreground">
          A calm place to map your options
        </span>
      </div>

      <section>
        <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">
              Filter by region
            </span>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`filter-pill rounded-full px-3 py-1.5 text-xs font-bold ${region === r ? "active" : ""}`}
                data-testid={`button-region-${r.toLowerCase().replace(" ", "-")}`}
              >
                {r}
              </button>
            ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card/60 p-10 text-center">
            <div>
              <Search size={20} className="mx-auto text-muted-foreground" />
            </div>
            <h3 className="mt-3 font-bold">
              No pathways match that search
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a country name or choose another region.
            </p>
            <button
              onClick={() => {
                setRegion("All");
              }}
              className="mt-4 text-xs font-bold text-primary hover:underline"
              data-testid="button-clear-region"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((country, index) => {
              const saved = savedCountryIds.includes(country.id);
              return (
                <CountryCard
                  key={country.id}
                  country={country}
                  saved={saved}
                  onSave={() => toggleCountry(country.id)}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* A note on the numbers */}
      <p className="text-sm leading-6 text-muted-foreground">
        <span className="font-bold">A note on the numbers:</span>{" "}
        Salary and requirements vary by institution, year, visa, and licensing
        situation. Verify current details with the official licensing body and
        individual training program before making decisions.
      </p>
    </div>
  );
}
