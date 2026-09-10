import { useMemo, useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2, ExternalLink, GraduationCap, MapPin, Scale, Stethoscope, Target, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import specialties from "../data/specialties.json";
import countries from "../data/countries.json";
import { useApp } from "../contexts/AppContext";
import { assetPath } from "../lib/assetPath";

const PRIMARY_COUNTRY_IDS = ["usa", "uk", "australia", "canada", "germany", "ireland"];
type SpecialtyRecord = (typeof specialties)[number] & {
  image?: string;
  salaryLabel?: string;
  subspecialties?: string[];
  coreWork?: string[];
  pathwaySteps?: string[];
  goodFit?: string[];
  watchOuts?: string[];
  referenceLinks?: { label: string; url: string }[];
  trainingYearsByCountry: Record<string, string>;
  salaryByCountry: Record<string, string>;
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${visible ? "scroll-reveal-visible" : "scroll-reveal"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function SpecialtyDetail() {
  const { id } = useParams<{ id: string }>();
  const { profile, savedSpecialtyIds, toggleSpecialty } = useApp();
  const specialty = specialties.find((item) => item.id === id) as SpecialtyRecord | undefined;
  const primaryCountries = useMemo(() => countries.filter((country) => PRIMARY_COUNTRY_IDS.includes(country.id)), []);

  if (!specialty) {
    return <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-10 text-center"><p className="text-lg font-extrabold">Specialty not found</p><p className="mt-2 text-sm text-muted-foreground">This pathway may have moved. Return to the specialty library to continue exploring.</p><Link to="/explore" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-secondary"><ArrowLeft size={13} /> Back to specialties</Link></div>;
  }

  const saved = savedSpecialtyIds.includes(specialty.id);
  const profileCountries = countries.filter((country) => profile.targetCountries.includes(country.id));
  const tableCountries = profileCountries.length > 0 ? profileCountries : primaryCountries;
  const trainingValue = (countryId: string) => specialty.trainingYearsByCountry[countryId] ?? "—";
  const salaryValue = (countryId: string) => specialty.salaryByCountry[countryId] ?? "—";

  return (
    <div className="space-y-12 pb-16">
      <Reveal>
        <Link to="/explore" className="topbar-link inline-flex items-center gap-2 text-sm"><ArrowLeft size={14} /> Specialty pathways</Link>
        <section className="specialty-detail-hero relative mt-5 min-h-[390px] overflow-hidden rounded-[28px] text-white shadow-[0_18px_50px_rgba(30,110,146,0.18)]">
          <img src={specialty.image ? assetPath(specialty.image) : undefined} alt={`${specialty.name} visual`} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08293a] via-[#08293a]/90 to-[#08293a]/25" />
          <div className="relative z-10 flex min-h-[390px] flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="eyebrow text-white/70">{specialty.category} · SPECIALTY GUIDE</div><h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">{specialty.name}</h1></div><button onClick={() => toggleSpecialty(specialty.id)} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"><Bookmark size={14} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save guide"}</button></div>
            <div className="max-w-2xl"><p className="text-base leading-7 text-white/85 sm:text-lg">{specialty.description}</p><div className="mt-6 flex flex-wrap gap-2">{specialty.tags.map((tag) => <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90">{tag}</span>)}</div></div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5"><GraduationCap size={18} className="text-primary" /><p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Shortest listed route</p><p className="mt-1 text-sm font-extrabold">{trainingValue("usa").split(" ").slice(0, 4).join(" ")}</p><p className="mt-1 text-xs text-muted-foreground">United States reference</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><Scale size={18} className="text-primary" /><p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Competitiveness</p><p className="mt-1 text-sm font-extrabold">{specialty.competitiveness}</p><p className="mt-1 text-xs text-muted-foreground">Varies by program and profile</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><Stethoscope size={18} className="text-primary" /><p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Work shape</p><p className="mt-1 text-sm font-extrabold">{specialty.workStyle}</p><p className="mt-1 text-xs text-muted-foreground">Typical day-to-day rhythm</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><MapPin size={18} className="text-primary" /><p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Comparison lens</p><p className="mt-1 text-sm font-extrabold">6 primary countries</p><p className="mt-1 text-xs text-muted-foreground">Routes shown below</p></div>
        </section>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1fr_0.86fr]">
        <Reveal>
          <section>
            <div className="flex items-end justify-between gap-3"><div><p className="eyebrow">The pathway</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight">How the training builds</h2></div><Target className="text-primary" size={20} /></div>
            <div className="mt-6 space-y-4">{(specialty.pathwaySteps ?? []).map((step, index) => <div key={step} className="route-step"><span className="step-dot">{index + 1}</span><div className="rounded-2xl border border-border bg-card p-4"><p className="text-sm font-bold">{step}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Expect local exams, supervised practice, and evidence of competency at each stage.</p></div></div>)}</div>
          </section>
        </Reveal>
        <Reveal delay={80}>
          <section className="rounded-2xl border border-border bg-secondary/50 p-6"><p className="eyebrow">At a glance</p><h2 className="mt-2 text-xl font-extrabold tracking-tight">What the work includes</h2><div className="mt-5 space-y-3">{(specialty.coreWork ?? []).map((item) => <div key={item} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={16} /><span>{item}</span></div>)}</div></section>
        </Reveal>
      </div>

      <Reveal>
        <section><p className="eyebrow">Future directions</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight">Subspecialties to explore</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Most focused practices require additional fellowship or advanced training after the core pathway. Availability and titles vary by country.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{(specialty.subspecialties ?? []).map((item, index) => <div key={item} className="rounded-2xl border border-border bg-card p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"><span className="font-mono text-xs font-bold text-primary">0{index + 1}</span><p className="mt-6 text-sm font-extrabold">{item}</p></div>)}</div></section>
      </Reveal>

      <Reveal>
        <section className="rounded-[26px] bg-[#0c3347] p-6 text-white sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-white/60">Your six-country comparison</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight">Duration and salary by destination</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">Training length is the specialty-specific estimate. Salary is a broad indicative gross annual range: qualified specialist first, trainee range second.</p></div><Wrench size={22} className="text-[#f2bb6e]" /></div><div className="responsive-table mt-6 overflow-x-auto rounded-2xl border border-white/10" tabIndex={0} role="region" aria-label="Duration and salary comparison by country"><table className="w-full min-w-[850px] text-sm"><thead><tr className="border-b border-white/10 bg-white/5 text-left text-[11px] font-bold uppercase tracking-wider text-white/60"><th className="px-4 py-4">Country</th><th className="px-4 py-4">Typical specialty training</th><th className="px-4 py-4">Indicative salary</th><th className="px-4 py-4">Local route</th></tr></thead><tbody>{tableCountries.map((country) => <tr key={country.id} className="border-b border-white/10 last:border-0"><td className="px-4 py-4 font-bold text-white">{country.name}<span className="ml-2 text-[10px] font-normal text-white/50">{country.flag}</span></td><td className="px-4 py-4 text-white/70">{trainingValue(country.id)}</td><td className="px-4 py-4 text-[#f2d2a2]">{salaryValue(country.id)}</td><td className="px-4 py-4"><Link to={`/countries/${country.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#8dd8ed] hover:underline">View pathway <ArrowRight size={12} /></Link></td></tr>)}</tbody></table></div><p className="mt-4 text-xs leading-5 text-white/55">{specialty.salaryLabel ?? "Ranges are indicative only and should be checked against the employer, grade, tax system, and current national pay scale."}</p></section>
      </Reveal>

      {profileCountries.length > 0 && <Reveal><section><p className="eyebrow">Profile view</p><h2 className="mt-2 text-xl font-extrabold tracking-tight">How your selected countries compare</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{profileCountries.map((country) => <div key={country.id} className="rounded-2xl border border-border bg-card p-5"><p className="font-bold">{country.name}</p><p className="mt-3 text-sm font-semibold">{trainingValue(country.id)}</p><p className="mt-1 text-xs text-muted-foreground">{salaryValue(country.id)}</p><Link to={`/countries/${country.id}`} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">View country pathway <ArrowRight size={12} /></Link></div>)}</div></section></Reveal>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal><section><p className="eyebrow">Personal fit</p><h2 className="mt-2 text-xl font-extrabold tracking-tight">Who tends to thrive here</h2><div className="mt-4 space-y-3">{(specialty.goodFit ?? []).map((item) => <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6"><CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={16} />{item}</div>)}</div></section></Reveal>
        <Reveal delay={80}><section><p className="eyebrow">Plan realistically</p><h2 className="mt-2 text-xl font-extrabold tracking-tight">Things to keep in view</h2><div className="mt-4 space-y-3">{(specialty.watchOuts ?? []).map((item) => <div key={item} className="rounded-xl border border-[#ebc786]/50 bg-[#fff8eb] p-4 text-sm leading-6 text-[#6a4a1d]">{item}</div>)}</div></section></Reveal>
      </div>

      <Reveal>
        <section className="border-t border-border pt-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">Official references</p><h2 className="mt-2 text-lg font-extrabold">Verify before you apply</h2><p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground">This guide is educational planning information. Requirements, salaries, exam rules, immigration conditions, and program availability change frequently.</p></div><div className="flex flex-wrap gap-2">{(specialty.referenceLinks ?? []).map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold text-primary hover:bg-secondary">{reference.label} <ExternalLink size={12} /></a>)}</div></div></section>
      </Reveal>
    </div>
  );
}
