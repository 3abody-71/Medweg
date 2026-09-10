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
  DollarSign,
  FileCheck2,
  Flag,
  Globe2,
  GraduationCap,
  Home,
  MapPin,
  Plane,
  Scale,
  Users,
  WalletCards,
} from "lucide-react";
import { usaPathway, type UsaIconMap } from "../data/usaPathway";
import { assetPath } from "../lib/assetPath";

const ICONS: UsaIconMap = {
  alert: AlertTriangle,
  award: BadgeCheck,
  book: BookOpen,
  briefcase: Briefcase,
  check: CheckCircle2,
  clock: Clock3,
  dollar: DollarSign,
  file: FileCheck2,
  flag: Flag,
  globe: Globe2,
  graduation: GraduationCap,
  heart: CheckCircle2,
  home: Home,
  hospital: Building2,
  map: MapPin,
  plane: Plane,
  scale: Scale,
  shield: BadgeCheck,
  stethoscope: Building2,
  star: BadgeCheck,
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

function IconBox({ name, className = "" }: { name: keyof typeof ICONS; className?: string }) {
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
        if (currentSrc !== "/assets/usa/usa-flag.jpg") setCurrentSrc("/assets/usa/usa-flag.jpg");
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

export default function UsaPathway() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[350px] overflow-hidden bg-[#0b2d55]">
            <SafeImage src="/assets/usa/usa-flag.jpg" alt="United States flag" className="absolute inset-0 h-full w-full object-cover opacity-75" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#071b34]/95 via-[#0b2d55]/35 to-[#b22234]/55" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">USA guide for IMGs</div>
              <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">A clear route to residency in the United States.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">A structured overview of the requirements, pathways, exams, costs, competitiveness, work life, and visas that matter to international medical graduates.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="eyebrow">Guide / contents</div>
            <h2 className="mt-2 text-xl font-extrabold">What is on this page?</h2>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="USA guide contents">
              {[
                ["why-usa", "Why choose the USA?"],
                ["requirements", "Requirements"],
                ["pathway", "Pathways"],
                ["life", "Salaries and work–life balance"],
                ["visas", "Visas and travel restrictions"],
                ["tradeoffs", "Advantages and disadvantages"],
                ["hospitals", "Nine important hospitals"],
              ].map(([href, label]) => (
                <a key={href} href={`#${href}`} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 font-bold hover:border-primary/40 hover:bg-secondary/50">
                  <span>{label}</span><ArrowRight size={14} className="text-primary" />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="grid gap-4 border-t border-border bg-secondary/30 p-4 sm:grid-cols-[1fr_1.25fr] sm:p-5">
          <div className="overflow-hidden rounded-xl border border-border bg-card"><SafeImage src="/assets/usa/usa-country.jpg" alt="USA map and country visual" className="h-40 w-full object-cover" /></div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="eyebrow">USA at a glance</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">A large, competitive country with many hospitals, residency programs, specialties, research opportunities, and different ways of living.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-secondary px-3 py-1.5">IMG route</span><span className="rounded-full bg-secondary px-3 py-1.5">USMLE</span><span className="rounded-full bg-secondary px-3 py-1.5">Residency</span><span className="rounded-full bg-secondary px-3 py-1.5">Research</span></div>
          </div>
        </div>
      </section>

      <section id="why-usa" aria-labelledby="why-usa-heading">
        <SectionHeading eyebrow="01 / Why choose the USA?" title="Six reasons IMGs look toward the United States" />
        <div id="why-usa-heading" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usaPathway.reasons.map((reason) => <article key={reason.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><IconBox name={reason.icon} /><h3 className="mt-4 text-base font-extrabold">{reason.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{reason.body}</p></article>)}
        </div>
      </section>

      <section id="requirements" aria-labelledby="requirements-heading">
        <SectionHeading eyebrow="02 / Requirements" title="Requirements" body="The checklist below is a concise starting point. Certification, testing, program, and visa rules can change, so confirm the current requirements before paying or applying." />
        <div id="requirements-heading" className="mt-5 grid gap-5 lg:grid-cols-3">
          {usaPathway.requirements.map((requirement) => <article key={requirement.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-start gap-4"><IconBox name={requirement.icon} className="bg-[#e8f0ff] text-[#1d4ed8]" /><div><h3 className="text-lg font-extrabold">{requirement.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{requirement.body}</p></div></div><div className="mt-5 space-y-3 border-t border-border pt-5">{requirement.details.map((detail) => <div key={detail} className="flex items-start gap-2.5 text-sm leading-6"><CheckCircle2 size={15} className="mt-1 shrink-0 text-primary" /><span>{detail}</span></div>)}</div></article>)}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="eyebrow">Requirements / application strength</div><h3 className="mt-1 text-xl font-extrabold">The four things beside the exams</h3></div><p className="max-w-md text-sm leading-6 text-muted-foreground">These are not substitutes for USMLE or ECFMG certification, but they can make the application more complete and credible.</p></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{usaPathway.applicationRequirements.map((item) => <article key={item.number} className="relative rounded-xl border border-border bg-secondary/35 p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{item.number}</span><IconBox name={item.icon} className="absolute right-4 top-4 h-9 w-9" /><h4 className="mt-5 text-sm font-extrabold">{item.title}</h4><p className="mt-2 text-xs leading-5 text-muted-foreground">{item.body}</p></article>)}</div>
        </div>
        <div className="mt-6">
          <div className="eyebrow">Exam details</div><h3 className="mt-1 text-xl font-extrabold">What you study and how results are reported</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">{usaPathway.examDetails.map((exam) => <article key={exam.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">{exam.image ? <div className="h-48 bg-secondary"><SafeImage src={exam.image} alt={exam.imageAlt || exam.title} className="h-full w-full object-contain" /></div> : <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#eaf2ff] to-[#f8fbff] p-7 text-center"><div><GraduationCap className="mx-auto text-primary" size={42} /><p className="mt-3 text-xs font-bold text-primary">Clinical science and patient-care focus</p></div></div>}<div className="p-5"><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-primary">{exam.badge}</span><span className="text-xs font-extrabold text-[#267a5b]">{exam.result}</span></div><h4 className="mt-3 text-lg font-extrabold">{exam.title}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{exam.body}</p><div className="mt-4 space-y-2">{exam.subjects.map((subject) => <div key={subject} className="flex items-start gap-2 text-xs leading-5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />{subject}</div>)}</div><div className="mt-5 border-t border-border pt-4"><SourceLink label={exam.source.label} url={exam.source.url} /></div></div></article>)}</div>
          <p className="mt-3 rounded-lg bg-secondary/60 p-3 text-xs leading-5 text-muted-foreground">The report images now include Step 1, Step 2 CK, and Step 3 examples supplied for this guide.</p>
        </div>
      </section>

      <section id="pathway" aria-labelledby="pathway-heading">
        <SectionHeading eyebrow="03 / Pathways" title="Pathways" body="The order can vary, but these are the major stages from medical school to U.S. residency." />
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-5 shadow-sm"><IconBox name="alert" className="bg-[#ffedbd] text-[#9a5b12]" /><p className="text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Important eligibility note:</strong> Step 1 and Step 2 CK may be taken before graduation by an eligible international medical student. You must be officially enrolled in an eligible school and meet the current ECFMG/USMLE rules at application and on exam day. Step 3 is different and requires separate eligibility, including Step 1, Step 2 CK, and ECFMG Certification.</p></div>
        <div id="pathway-heading" className="mt-6 space-y-4">{usaPathway.stages.map((stage) => <article key={stage.number} className="route-step rounded-2xl border border-border bg-card p-5 pl-14 shadow-sm sm:p-6 sm:pl-16"><span className="step-dot !top-6 !left-5">{stage.number}</span><h3 className="text-lg font-extrabold">{stage.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.body}</p></article>)}</div>
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#e4c0c3] bg-[#fff8f8] shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_220px]"><div className="p-6 sm:p-7"><div className="eyebrow text-[#a52b3b]">Pathway costs / USD</div><h3 className="mt-1 text-2xl font-extrabold">The expensive part nobody puts in the brochure</h3><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">This is a planning estimate using documented 2026–2027 fees. It includes one Step 1 attempt, one Step 2 CK attempt, OET, one specialty with 30 ERAS programs, and standard NRMP registration. Clinical electives, observerships, research, travel, accommodation, preparation resources, translations, repeat exams, and state licensing costs are variable and excluded.</p><div className="country-costs-table mt-5 overflow-hidden rounded-xl border border-[#efd7d8] bg-white"><table className="w-full text-left text-sm"><thead className="bg-[#fff0f1] text-xs uppercase tracking-wider text-[#8e3541]"><tr><th className="px-4 py-3 font-extrabold">Item</th><th className="px-4 py-3 font-extrabold">Amount</th><th className="px-4 py-3 font-extrabold">Planning note</th></tr></thead><tbody>{usaPathway.costItems.map((cost) => <tr key={cost.item} className="border-t border-[#f1e3e4] align-top"><td className="px-4 py-3 font-bold">{cost.item}</td><td className="px-4 py-3 font-extrabold text-[#a52b3b]">{cost.amount}</td><td className="px-4 py-3 leading-5 text-muted-foreground">{cost.note}</td></tr>)}{usaPathway.optionalCostItems.map((cost) => <tr key={cost.item} className="border-t border-[#f1e3e4] align-top bg-[#fffaf5]"><td className="px-4 py-3 font-bold">{cost.item} <span className="ml-1 rounded-full bg-[#ffedd5] px-2 py-0.5 text-[10px] text-[#9a5b12]">optional</span></td><td className="px-4 py-3 font-extrabold text-[#a52b3b]">{cost.amount}</td><td className="px-4 py-3 leading-5 text-muted-foreground">{cost.note}</td></tr>)}</tbody><tfoot><tr className="border-t-2 border-[#e4c0c3] bg-[#fff0f1]"><td className="px-4 py-4 font-extrabold">Core documented fees</td><td className="px-4 py-4 text-lg font-black text-[#a52b3b]">{usaPathway.costTotals.core}</td><td className="px-4 py-4 text-xs font-bold text-muted-foreground">Before optional Step 3 and J-1 sponsorship.</td></tr><tr className="border-t border-[#e4c0c3] bg-[#ffe3e5]"><td className="px-4 py-4 font-black">Expanded planning total</td><td className="px-4 py-4 text-xl font-black text-[#8d1f2f]">{usaPathway.costTotals.expanded}</td><td className="px-4 py-4 text-xs font-bold text-muted-foreground">Core fees + Step 3 + J-1 sponsorship/SEVIS; visa and travel remain separate.</td></tr></tfoot></table></div><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs"><SourceLink label="ECFMG fees" url="https://www.ecfmg.org/fees/" /><SourceLink label="USMLE fees" url="https://www.usmle.org/apply-exams" /><SourceLink label="OET price" url="https://support.oet.com/s/article/How-much-does-OET-cost" /><SourceLink label="2027 ERAS fees" url="https://students-residents.aamc.org/applying-residencies-eras/publication-chapters/fees-2027-eras-season" /><SourceLink label="NRMP fees" url="https://www.nrmp.org/intro-to-the-match/match-fees/" /></div></div><div className="flex min-h-[220px] items-center justify-center bg-[#a52b3b] p-6"><div className="text-center"><SafeImage src="/assets/usa/usa-reaction.gif" alt="Shocked reaction to the total USA pathway cost" className="mx-auto h-36 w-44 rounded-xl object-cover shadow-lg" /><p className="mt-4 text-sm font-black text-white">That total was not a typo.</p></div></div></div>
        </div>
      </section>

      <section id="life" aria-labelledby="life-heading">
        <SectionHeading eyebrow="04 / Salaries and work–life balance" title="Salaries, work–life balance, and specialty competitiveness" />
        <div id="life-heading" className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-4 font-extrabold">Role</th><th className="px-5 py-4 font-extrabold">Typical salary</th><th className="px-5 py-4 font-extrabold">Context</th></tr></thead><tbody>{usaPathway.salaryBands.map((band) => <tr key={band.role} className="border-t border-border align-top"><td className="px-5 py-4 font-extrabold">{band.role}</td><td className="px-5 py-4 font-bold text-primary">{band.typical}</td><td className="px-5 py-4 leading-6 text-muted-foreground">{band.note}</td></tr>)}</tbody></table></div></div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">{usaPathway.specialtyGroups.map((group) => <article key={group.title} className={`rounded-2xl border p-6 shadow-sm ${group.tone === "hard" ? "border-[#e8c3c5] bg-[#fff7f7]" : "border-[#b8dccf] bg-[#f3fbf7]"}`}><div className="flex items-start gap-3"><IconBox name={group.tone === "hard" ? "alert" : "check"} className={group.tone === "hard" ? "bg-[#ffe4e5] text-[#a52b3b]" : "bg-[#dff5e9] text-[#267a5b]"} /><div><h3 className="text-base font-extrabold">{group.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{group.body}</p></div></div><div className="mt-5 flex flex-wrap gap-2">{group.specialties.map((specialty) => <span key={specialty} className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-extrabold">{specialty}</span>)}</div></article>)}</div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{usaPathway.lifestyleCards.map((card) => <article key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><IconBox name={card.icon} /><h3 className="mt-4 text-base font-extrabold">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p></article>)}</div>
      </section>

      <section id="visas" aria-labelledby="visas-heading">
        <SectionHeading eyebrow="05 / Visas and travel" title="Visa types and travel restrictions" body="Visa eligibility is case-specific. A visa allows travel to a U.S. port of entry but does not guarantee admission; the consular officer and CBP apply the current rules." />
        <div id="visas-heading" className="mt-5 grid gap-4 sm:grid-cols-2">{usaPathway.visaTypes.map((visa) => <article key={visa.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><IconBox name={visa.icon} /><h3 className="mt-4 text-base font-extrabold">{visa.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{visa.body}</p></article>)}</div>
        <div className="mt-5 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-6 shadow-sm"><div className="flex items-start gap-3"><IconBox name="alert" className="bg-[#ffedbd] text-[#9a5b12]" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><h3 className="text-lg font-extrabold">Current full or partial restrictions</h3><span className="rounded-full bg-[#ffedbd] px-3 py-1 text-[11px] font-extrabold text-[#8a5313]">{usaPathway.travelRestriction.updated}</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{usaPathway.travelRestriction.note}</p><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="rounded-xl border border-[#efd9a9] bg-white/70 p-4"><h4 className="text-sm font-extrabold text-[#8d2a36]">Full suspension list</h4><p className="mt-3 text-xs leading-6 text-muted-foreground">{usaPathway.travelRestriction.full.join(" · ")}</p></div><div className="rounded-xl border border-[#efd9a9] bg-white/70 p-4"><h4 className="text-sm font-extrabold text-[#9a5b12]">Partial suspension list</h4><p className="mt-3 text-xs leading-6 text-muted-foreground">{usaPathway.travelRestriction.partial.join(" · ")}</p></div></div><div className="mt-4"><SourceLink label={usaPathway.travelRestriction.source.label} url={usaPathway.travelRestriction.source.url} /></div></div></div></div>
      </section>

      <section id="tradeoffs" aria-labelledby="tradeoffs-heading"><SectionHeading eyebrow="06 / Advantages and disadvantages" title="The opportunity is strong, but the pathway is demanding" /><div id="tradeoffs-heading" className="mt-5 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-6"><div className="flex items-center gap-2 text-[#267a5b]"><CheckCircle2 size={18} /><h3 className="text-base font-extrabold">Advantages</h3></div><ul className="mt-5 space-y-3">{usaPathway.advantages.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><CheckCircle2 size={15} className="mt-1 shrink-0 text-[#267a5b]" />{item}</li>)}</ul></div><div className="rounded-2xl border border-[#e6c39b] bg-[#fff9f0] p-6"><div className="flex items-center gap-2 text-[#ad6a16]"><Scale size={18} /><h3 className="text-base font-extrabold">Disadvantages</h3></div><ul className="mt-5 space-y-3">{usaPathway.disadvantages.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><Scale size={15} className="mt-1 shrink-0 text-[#ad6a16]" />{item}</li>)}</ul></div></div></section>

      <section id="hospitals" aria-labelledby="hospitals-heading"><SectionHeading eyebrow="07 / Important hospitals" title="Nine U.S. hospitals and health systems to know" body="These institutions are examples of major U.S. academic medicine centers. Their inclusion does not guarantee admission, employment, or residency placement." /><div id="hospitals-heading" className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{usaPathway.hospitals.map((hospital) => <article key={hospital.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="relative h-44 overflow-hidden bg-secondary"><SafeImage src={hospital.image} alt={`${hospital.name} hospital campus`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 pt-12 text-white"><p className="text-xs font-bold uppercase tracking-wider text-white/80">{hospital.city}</p></div></div><div className="p-5"><h3 className="text-base font-extrabold">{hospital.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{hospital.body}</p><a href={hospital.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">Official site <ArrowUpRight size={13} /></a></div></article>)}</div></section>

      <div className="rounded-lg bg-secondary/60 p-3 text-xs leading-5 text-muted-foreground">For education only. Requirements, salaries, visa rules, travel restrictions, and citizenship timelines can change. Confirm current details with ECFMG, USMLE, ERAS, NRMP, the U.S. Department of State, the relevant embassy, USCIS, and your program.</div>
    </div>
  );
}
