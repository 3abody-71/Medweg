import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock3,
  Euro,
  FileCheck2,
  Flag,
  Globe2,
  GraduationCap,
  Home,
  Languages,
  Map,
  MapPin,
  Plane,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users,
  WalletCards,
} from "lucide-react";
import { germanyPathway, type IconName } from "../data/germanyPathway";
import { assetPath } from "../lib/assetPath";

const ICONS: Record<IconName, typeof BadgeCheck> = {
  alert: AlertTriangle,
  award: BadgeCheck,
  book: BookOpen,
  briefcase: Briefcase,
  building: Building2,
  check: CheckCircle2,
  clock: Clock3,
  euro: Euro,
  file: FileCheck2,
  flag: Flag,
  globe: Globe2,
  graduation: GraduationCap,
  heart: CheckCircle2,
  home: Home,
  language: Languages,
  map: Map,
  plane: Plane,
  scale: Scale,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  users: Users,
  wallet: WalletCards,
};

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {body ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p> : null}
    </div>
  );
}

function IconBox({ name, className = "" }: { name: IconName; className?: string }) {
  const Icon = ICONS[name];
  return (
    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary ${className}`}>
      <Icon size={19} />
    </div>
  );
}

function SafeImage({ src, alt, className, loading = "lazy" }: { src: string; alt: string; className?: string; loading?: "eager" | "lazy" }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <img
      src={assetPath(currentSrc)}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => {
        if (currentSrc !== "/assets/germany/german-flag.png") setCurrentSrc("/assets/germany/german-flag.png");
      }}
    />
  );
}

function SourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

export default function GermanyPathway() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[350px] overflow-hidden bg-[#30201b]">
            <SafeImage src="/assets/germany/reichstag-germany.jpg" alt="German flag flying in front of the Reichstag building in Berlin" className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#211713]/95 via-[#30201b]/35 to-[#d9a441]/65" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">Germany guide for IMGs</div>
              <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">A practical route to medical specialty training in Germany.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">A structured overview of requirements, language, recognition, exams, costs, specialty opportunities, salaries, work life, visas, and hospitals for international medical graduates.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="eyebrow">Guide / contents</div>
            <h2 className="mt-2 text-xl font-extrabold">What is on this page?</h2>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Germany guide contents">
              {[
                ["why-germany", "Why choose Germany?"],
                ["requirements-germany", "Requirements"],
                ["pathway-germany", "Pathway, exams, and costs"],
                ["life-germany", "Salaries, specialties, and work life"],
                ["visas-germany", "Visas and travel routes"],
                ["tradeoffs-germany", "Advantages and disadvantages"],
                ["hospitals-germany", "One important hospital in each state"],
              ].map(([href, label]) => (
                <a key={href} href={`#${href}`} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 font-bold hover:border-primary/40 hover:bg-secondary/50">
                  <span>{label}</span><ArrowRight size={14} className="text-primary" />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="grid gap-4 border-t border-border bg-secondary/30 p-4 sm:grid-cols-[1fr_1.25fr] sm:p-5">
          <div className="overflow-hidden rounded-xl border border-border bg-card"><SafeImage src="/assets/media/country-germany_c6217245.jpg" alt="Brandenburg Gate in Berlin, Germany" className="h-40 w-full object-cover" /></div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="eyebrow">Germany at a glance</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">A 16-state system where licensing is state-administered, specialty training is usually paid employment, and German communication is part of safe clinical practice.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-secondary px-3 py-1.5">IMG route</span><span className="rounded-full bg-secondary px-3 py-1.5">B2 + C1 Medizin</span><span className="rounded-full bg-secondary px-3 py-1.5">Approbation</span><span className="rounded-full bg-secondary px-3 py-1.5">Facharzt</span></div>
          </div>
        </div>
      </section>

      <section id="why-germany" aria-labelledby="why-germany-heading">
        <SectionHeading eyebrow="01 / Why choose Germany?" title="Four reasons IMGs look toward Germany" body="Germany is not a shortcut: professional German, state-by-state licensing, and paperwork are real commitments. These are the practical reasons many international medical graduates still consider it." />
        <div id="why-germany-heading" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {germanyPathway.reasons.map((reason, index) => <article key={reason.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><IconBox name={reason.icon} /><div className="mt-4 text-xs font-bold text-primary">0{index + 1}</div><h3 className="mt-1 text-base font-extrabold leading-5">{reason.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{reason.body}</p></article>)}
        </div>
      </section>

      <section id="requirements-germany" aria-labelledby="requirements-germany-heading">
        <SectionHeading eyebrow="02 / Requirements" title="The requirements to prepare" body="The exact checklist depends on your qualification, nationality, and chosen federal state. Use the groups below as a preparation framework, then follow the current checklist from your competent authority." />
        <div id="requirements-germany-heading" className="mt-5 grid gap-5 lg:grid-cols-3">
          {germanyPathway.requirementGroups.map((requirement) => <article key={requirement.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-start gap-4"><IconBox name={requirement.icon} className="bg-[#f4eee3] text-[#8e5f27]" /><div><h3 className="text-lg font-extrabold">{requirement.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{requirement.intro}</p></div></div><div className="mt-5 space-y-3 border-t border-border pt-5">{requirement.items.map((item) => <div key={item} className="flex items-start gap-2.5 text-sm leading-6"><CheckCircle2 size={15} className="mt-1 shrink-0 text-primary" /><span>{item}</span></div>)}</div></article>)}
        </div>
        <div className="mt-6 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-6 shadow-sm"><div className="flex items-start gap-3"><IconBox name="alert" className="bg-[#ffedbd] text-[#9a5b12]" /><p className="text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Licensing reality:</strong> Approbation is the unrestricted licence to practise. A Berufserlaubnis is a temporary permission with conditions. A job offer, recruiter message, or exam booking does not by itself give permission to practise medicine.</p></div></div>
      </section>

      <section id="pathway-germany" aria-labelledby="pathway-germany-heading">
        <SectionHeading eyebrow="03 / Pathway, exams, and costs" title="The route from preparation to employment" body="The sequence below shows the usual order while allowing for overlap. Your authority may request extra documents, change the order, or require an examination." />
        <div id="pathway-germany-heading" className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.82fr]">
          <div className="space-y-4">{germanyPathway.stages.map((stage) => <article key={stage.number} className="route-step rounded-2xl border border-border bg-card p-5 pl-14 shadow-sm sm:p-6 sm:pl-16"><span className="step-dot !top-6 !left-5">{stage.number}</span><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-extrabold">{stage.title}</h3><span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-primary">{stage.timeframe}</span></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.body}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{stage.actions.map((action) => <div key={action} className="rounded-lg bg-secondary/60 p-3 text-xs leading-5"><CheckCircle2 size={14} className="mb-1 text-primary" />{action}</div>)}</div><div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3 text-xs leading-5"><ArrowRight size={14} className="mt-0.5 shrink-0 text-primary" /><span><span className="font-bold">Checkpoint:</span> {stage.checkpoint}</span></div></article>)}</div>
          <aside className="h-fit rounded-2xl border border-border bg-[#123f52] p-6 text-white shadow-lg lg:sticky lg:top-24"><div className="eyebrow !text-[#8bd3dc]">Keep this in view</div><h3 className="mt-2 text-xl font-extrabold">The authority decides the route</h3><p className="mt-3 text-sm leading-6 text-white/75">For third-country graduates, the authority compares your qualification with German training. The decision can lead to recognition, additional evidence, or the Kenntnisprüfung. Local rules and fees are not identical across all 16 states.</p><div className="mt-5 space-y-3">{["Identify the correct Approbationsbehörde", "Ask which documents and exams apply", "Get the licence condition in writing"].map((item) => <div key={item} className="flex items-start gap-2 text-xs leading-5 text-white/90"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#8bd3dc]" />{item}</div>)}</div></aside>
        </div>
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#e4c0c3] bg-[#fff8f8] shadow-sm"><div className="grid gap-0 lg:grid-cols-[1fr_250px]"><div className="p-6 sm:p-7"><div className="eyebrow text-[#a52b3b]">Pathway costs / EUR</div><h3 className="mt-1 text-2xl font-extrabold">The paperwork has a budget too</h3><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">There is no single nationwide IMG price list. This planning table separates the cost categories, with a Berlin Approbation example where an official fee is available. Exam fees, translations, travel, and preparation costs vary by authority and provider.</p><div className="country-costs-table mt-5 overflow-hidden rounded-xl border border-[#efd7d8] bg-white"><table className="w-full text-left text-sm"><thead className="bg-[#fff0f1] text-xs uppercase tracking-wider text-[#8e3541]"><tr><th className="px-4 py-3 font-extrabold">Item</th><th className="px-4 py-3 font-extrabold">Planning amount</th><th className="px-4 py-3 font-extrabold">Planning note</th></tr></thead><tbody>{germanyPathway.costItems.map((cost) => <tr key={cost.item} className="border-t border-[#f1e3e4] align-top"><td className="px-4 py-3 font-bold">{cost.item}</td><td className="px-4 py-3 font-extrabold text-[#a52b3b]">{cost.amount}</td><td className="px-4 py-3 leading-5 text-muted-foreground">{cost.note}</td></tr>)}</tbody></table></div><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2"><SourceLink label="Berlin Approbation example" url="https://service.berlin.de/dienstleistung/331391/en/" /><SourceLink label="Recognition in Germany" url="https://www.anerkennung-in-deutschland.de/html/en/2688.php" /><SourceLink label="Marburger Bund FAQs" url="https://www.marburger-bund.de/bundesverband/service/aerztinnen-und-aerzte-mit-auslaendischer-qualifikation/foreign-trained/faqs-0" /></div></div><div className="flex min-h-[250px] items-center justify-center bg-[#a52b3b] p-5"><div className="text-center"><SafeImage src="/assets/germany/bureaucracy-reaction-satire.png" alt="Satirical reaction graphic about one more certified copy" className="mx-auto h-44 w-44 rounded-xl object-cover shadow-lg" /><p className="mt-4 text-sm font-black text-white">One more certified copy?</p><p className="mt-1 text-[11px] leading-4 text-white/75">Satire about paperwork, not a political endorsement.</p></div></div></div></div>
      </section>

      <section id="life-germany" aria-labelledby="life-germany-heading">
        <SectionHeading eyebrow="04 / Salaries and work–life balance" title="Salaries, specialty competitiveness, and daily life" body="Hospital salary bands below use the Marburger Bund's 2026 communal-hospital figures. Net pay is illustrative; specialty access depends on vacancies, employer, language, training record, and location." />
        <div id="life-germany-heading" className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-4 font-extrabold">Role</th><th className="px-5 py-4 font-extrabold">Monthly</th><th className="px-5 py-4 font-extrabold">Annual</th><th className="px-5 py-4 font-extrabold">Context</th></tr></thead><tbody>{germanyPathway.salaryBands.map((band) => <tr key={band.role} className="border-t border-border align-top"><td className="px-5 py-4 font-extrabold">{band.role}</td><td className="px-5 py-4 font-bold text-primary">{band.monthly}</td><td className="px-5 py-4">{band.annual}</td><td className="px-5 py-4 leading-6 text-muted-foreground">{band.note}</td></tr>)}</tbody></table></div></div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">{germanyPathway.specialtyGroups.map((group) => <article key={group.title} className={`rounded-2xl border p-6 shadow-sm ${group.tone === "competitive" ? "border-[#e8c3c5] bg-[#fff7f7]" : "border-[#b8dccf] bg-[#f3fbf7]"}`}><div className="flex items-start gap-3"><IconBox name={group.tone === "competitive" ? "alert" : "check"} className={group.tone === "competitive" ? "bg-[#ffe4e5] text-[#a52b3b]" : "bg-[#dff5e9] text-[#267a5b]"} /><div><h3 className="text-base font-extrabold">{group.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{group.body}</p></div></div><div className="mt-5 flex flex-wrap gap-2">{group.specialties.map((specialty) => <span key={specialty} className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-extrabold">{specialty}</span>)}</div></article>)}</div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{germanyPathway.lifeCards.map((card) => <article key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><IconBox name={card.icon} /><h3 className="mt-4 text-base font-extrabold">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p></article>)}</div>
      </section>

      <section id="visas-germany" aria-labelledby="visas-germany-heading">
        <SectionHeading eyebrow="05 / Visas and travel" title="Visa types and travel routes" body="Visa eligibility depends on nationality, job offer, recognition stage, livelihood evidence, and the current rules of the responsible German mission. A residence title does not replace a medical licence." />
        <div id="visas-germany-heading" className="mt-5 grid gap-4 sm:grid-cols-2">{germanyPathway.visaTypes.map((visa) => <article key={visa.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><IconBox name={visa.icon} /><h3 className="mt-4 text-base font-extrabold">{visa.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{visa.body}</p></article>)}</div>
        <div className="mt-5 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-6 shadow-sm"><div className="flex items-start gap-3"><IconBox name="alert" className="bg-[#ffedbd] text-[#9a5b12]" /><div><h3 className="text-lg font-extrabold">Travel checklist before booking</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{["Check whether your nationality requires an entry visa", "Confirm the responsible embassy or consulate", "Match the residence title to your recognition or employment stage", "Carry originals, certified translations, and the authority's written decision", "Do not start patient-facing work before the permitted licence date", "Recheck salary thresholds and livelihood rules before filing"].map((item) => <div key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 size={15} className="mt-1 shrink-0 text-[#9a5b12]" />{item}</div>)}</div></div></div></div>
      </section>

      <section id="tradeoffs-germany" aria-labelledby="tradeoffs-germany-heading"><SectionHeading eyebrow="06 / Advantages and disadvantages" title="The opportunity is strong, but the pathway is demanding" body="Germany can be a strong fit for a disciplined, language-focused applicant. It can be frustrating if you need an immediate move, dislike administrative processes, or are choosing a country only for salary." /><div id="tradeoffs-germany-heading" className="mt-5 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-6"><div className="flex items-center gap-2 text-[#267a5b]"><CheckCircle2 size={18} /><h3 className="text-base font-extrabold">Advantages</h3></div><ul className="mt-5 space-y-3">{germanyPathway.advantages.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><CheckCircle2 size={15} className="mt-1 shrink-0 text-[#267a5b]" />{item}</li>)}</ul></div><div className="rounded-2xl border border-[#e6c39b] bg-[#fff9f0] p-6"><div className="flex items-center gap-2 text-[#ad6a16]"><Scale size={18} /><h3 className="text-base font-extrabold">Disadvantages</h3></div><ul className="mt-5 space-y-3">{germanyPathway.disadvantages.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><Scale size={15} className="mt-1 shrink-0 text-[#ad6a16]" />{item}</li>)}</ul></div></div></section>

      <section id="hospitals-germany" aria-labelledby="hospitals-germany-heading"><SectionHeading eyebrow="07 / Important hospitals" title="Nine major German hospitals and university medical centers" body="This is a curated orientation list of nine institutions with building photos, not an official ranking and not a promise of residency placement. Always check the department's current vacancies, specialty-training authorisation, German-language expectations, and licence requirements." /><div id="hospitals-germany-heading" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{germanyPathway.hospitals.map((hospital) => <article key={hospital.state} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="relative h-40 overflow-hidden bg-secondary"><SafeImage src={hospital.image} alt={`${hospital.name} hospital or medical-center campus`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10"><span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#245066]">{hospital.state}</span></div></div><div className="p-5"><h3 className="text-base font-extrabold">{hospital.name}</h3><p className="mt-1 text-xs font-bold text-muted-foreground">{hospital.city}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{hospital.body}</p><a href={hospital.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">Official site <ArrowUpRight size={13} /></a></div></article>)}</div></section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" aria-labelledby="germany-sources-heading"><div className="flex items-start gap-3"><IconBox name="shield" /><div><div className="eyebrow">Verify before you act</div><h2 id="germany-sources-heading" className="mt-1 text-xl font-extrabold">Official starting points</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Rules, thresholds, fees, and salary tables change. Start with official sources, then confirm the checklist for your federal state and your personal qualification.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{germanyPathway.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 text-sm font-bold transition-colors hover:border-primary/40 hover:bg-secondary/50"><span>{source.label}</span><ArrowUpRight size={15} className="shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}</div><p className="mt-5 rounded-lg bg-secondary/60 p-3 text-xs leading-5 text-muted-foreground">For education only. This guide is not legal, immigration, financial, or medical advice. Requirements, timelines, salary agreements, exam fees, and work permissions vary by case and by federal state. The hospital list is a curated orientation list, not a ranking.</p></section>
    </div>
  );
}
