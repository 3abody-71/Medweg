import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Banknote,
  Compass,
  GraduationCap,
  Globe,
  HelpCircle,
  MapPin,
  Route,
  Users,
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
  index,
}: {
  country: (typeof countries)[number];
  index: number;
}) {
  return (
    <article
      className="fade-up group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
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
          className={`country-card-image-img ${country.id === "usa" ? "country-card-image-usa" : ""}`}
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
            <span className="block text-sm font-extrabold">{country.name}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {country.region}
            </span>
          </span>
        </Link>
      </div>
      <Link to={`/countries/${country.id}`} className="block flex-1 p-4 pt-3">
        <p className="country-card-summary mt-4 text-xs leading-5 text-muted-foreground">
          {country.summary}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
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
        <div className="country-card-citizenship mt-3 flex gap-2 rounded-lg bg-secondary/60 p-2.5 text-[11px] leading-4">
          <Globe size={15} className="mt-0.5 shrink-0 text-primary" />
          <span>
            <span className="font-bold">Citizenship timeline (general):</span>{" "}
            {country.citizenshipTimeline}
          </span>
        </div>
      </Link>
      <div className="mt-auto border-t border-border px-4 pb-4 pt-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/countries/${country.id}`}
            className="col-start-1 row-start-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 py-2 text-[11px] font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            data-testid={`link-main-route-${country.id}`}
          >
            <Route size={13} /> Main route
          </Link>
          <Link
            to={`/countries/${country.id}#pathway-info`}
            className="col-start-1 row-start-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-2 text-[11px] font-bold text-foreground transition-colors hover:bg-secondary"
            data-testid={`link-articles-${country.id}`}
          >
            <BookOpen size={13} /> Pathway info
          </Link>
          <Link
            to={`/mentors?country=${country.id}`}
            className="col-start-2 row-span-2 row-start-1 inline-flex min-h-full items-center justify-center gap-1.5 rounded-lg border border-[#d6a23d]/45 bg-[#fff8e8] px-2.5 py-2 text-[11px] font-bold text-[#9a6816] transition-colors hover:bg-[#fff1c9]"
            data-testid={`link-mentor-option-${country.id}`}
          >
            <GraduationCap size={13} /> {country.name} mentor
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const { profile } = useApp();
  const orderedCountries = [...countries].sort(
    (a, b) => Number(b.id === "usa") - Number(a.id === "usa")
  );

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="home-hero fade-up overflow-hidden rounded-2xl shadow-md">
        <div className="home-hero-background" aria-hidden="true">
          <span className="home-hero-grid" />
        </div>
        <div className="home-hero-content">
          <div className="home-hero-copy">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">
              <Globe size={15} />
              {profile.name ? `For ${profile.name.split(" ")[0]}` : "International medical pathways"}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Welcome to MedWeg
            </h1>
            <p className="mt-3 max-w-[220px] text-base leading-7 text-white/90">
              Your medical mentor for achieving residency abroad.
            </p>
            <Link
              to="/explore"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#2784b0] shadow-sm transition-transform hover:-translate-y-0.5"
              data-testid="link-hero-explore"
            >
              Explore pathways <ArrowRight size={14} />
            </Link>
          </div>
          <div className="home-hero-map" aria-label="Pathways available in the USA, Canada, Germany, Australia, Ireland, and the UK">
            <div className="hero-globe" aria-hidden="true">
              <span className="hero-globe-line hero-globe-line-one" />
              <span className="hero-globe-line hero-globe-line-two" />
              <span className="hero-globe-line hero-globe-line-three" />
            </div>
            {[
              ["USA", "hero-country-usa"],
              ["Canada", "hero-country-canada"],
              ["Germany", "hero-country-germany"],
              ["Australia", "hero-country-australia"],
              ["Ireland", "hero-country-ireland"],
              ["UK", "hero-country-uk"],
            ].map(([country, position]) => (
              <div className={`hero-country ${position}`} key={country}>
                <MapPin size={14} strokeWidth={2.5} />
                <span>{country}</span>
              </div>
            ))}
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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orderedCountries.map((country, index) => {
            return (
              <CountryCard
                key={country.id}
                country={country}
                index={index}
              />
            );
          })}
        </div>
      </section>

      {/* A note on the numbers */}
      <p className="text-sm leading-6 text-muted-foreground">
        <span className="font-bold">A note on the numbers:</span> Salary and
        requirements vary by institution, year, visa, and licensing situation.
        Verify current details with the official licensing body and individual
        training program before making decisions.
      </p>
    </div>
  );
}
