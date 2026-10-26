import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, Clock3, DollarSign, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { assetPath } from "../lib/assetPath";

const officialLinks = [
  ["Step 1", "https://www.usmle.org/step-exams/step-1"],
  ["Step 2 CK", "https://www.usmle.org/step-exams/step-2-ck"],
  ["2027 Pathways", "https://www.ecfmg.org/certification-pathways/"],
];

const resources = [
  { title: "First Aid", image: "/assets/usa/usmle/first-aid-step1-2026.png", text: "High-yield review and organisation." },
  { title: "Boards & Beyond", image: "/assets/usa/usmle/boards-and-beyond-platform.webp", text: "Build basic-science understanding." },
  { title: "Pathoma", image: "/assets/usa/usmle/pathoma.jpg", text: "Focused pathology review." },
  { title: "Sketchy & Anki", image: "/assets/usa/usmle/pathoma-anki-sketchy-collage.jpg", text: "Visual memory and spaced review." },
];

function StatCard({ icon: Icon, label, value, detail }: { icon: typeof Clock3; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Icon size={19} /></div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p></div>
      <p className="mt-4 text-2xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-sm leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2></div>;
}

export default function UsmleArticle() {
  return (
    <div className="space-y-8">
      <Link to="/countries/usa/pathway-info" className="topbar-link inline-flex items-center gap-2 text-sm"><ArrowLeft size={14} /> USA pathway info</Link>

      <header className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="home-hero px-6 py-8 sm:px-9 sm:py-10">
          <div className="home-hero-content"><p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">USA / Pathway info</p><h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Step 1 and Step 2 Preparation</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">The essential exam facts for international medical graduates.</p></div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border bg-secondary/30 p-4 text-xs font-bold"><span className="rounded-full bg-card px-3 py-1.5">IMG guide</span><span className="rounded-full bg-card px-3 py-1.5">USMLE</span><span className="rounded-full bg-card px-3 py-1.5">ECFMG</span></div>
      </header>

      <section>
        <SectionTitle eyebrow="01 / At a glance" title="The numbers that matter" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Step 1" value="280 max" detail="14 blocks × 30 minutes; 8-hour session; pass/fail." />
          <StatCard icon={BookOpen} label="Step 2 CK" value="318 max" detail="16 blocks × 30 minutes; 9-hour session; 3-digit score." />
          <StatCard icon={Clock3} label="Breaks" value="55 min" detail="Minimum break time under the post-May 2026 format." />
          <StatCard icon={CheckCircle2} label="Step 2 pass" value="218" detail="Current published minimum passing score; verify before testing." />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="Step 1" title="Foundational science" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Integrated questions covering pathology, physiology, pharmacology, biochemistry, genetics, immunology, microbiology, anatomy, embryology, behavioural science, biostatistics, and organ systems.</p><div className="mt-4 grid gap-2 text-sm">{["Pass/fail only", "14 blocks × 30 minutes", "Up to 20 questions per block"].map(item => <div key={item} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />{item}</div>)}</div></article>
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="Step 2 CK" title="Clinical knowledge" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Patient-care decisions across medicine, surgery, paediatrics, obstetrics and gynaecology, psychiatry, neurology, prevention, patient safety, ethics, and biostatistics.</p><div className="mt-4 grid gap-2 text-sm">{["Three-digit score plus pass/fail", "16 blocks × 30 minutes", "Up to 20 questions per block"].map(item => <div key={item} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />{item}</div>)}</div></article>
      </section>

      <section>
        <SectionTitle eyebrow="02 / Preparation" title="Keep the resource list simple" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{resources.map(resource => <article key={resource.title} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="h-36 bg-secondary"><img src={assetPath(resource.image)} alt={resource.title} className="h-full w-full object-contain" /></div><div className="p-4"><h3 className="text-sm font-extrabold">{resource.title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{resource.text}</p></div></article>)}</div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-border bg-card p-5"><p className="font-extrabold">Step 1</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Use one teaching source, First Aid for organisation, UWorld for questions, and Anki only when spaced repetition helps. A typical focused plan is about 3–7 months, depending on the foundation.</p></div><div className="rounded-2xl border border-border bg-card p-5"><p className="font-extrabold">Step 2 CK</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Prioritise UWorld, NBME self-assessments, clinical review, and timed blocks. A typical plan is about 2–6 months, depending on clinical experience and baseline performance.</p></div></div>
      </section>

      <section>
        <SectionTitle eyebrow="03 / Scheduling and cost" title="Plan the logistics before booking" />
        <div className="mt-4 grid gap-4 md:grid-cols-3"><StatCard icon={CalendarDays} label="Availability" value="Year-round" detail="Prometric centers, subject to eligibility and seat availability." /><StatCard icon={DollarSign} label="Exam fee" value="$1,020" detail="Published registration fee for each exam; fees can change." /><StatCard icon={DollarSign} label="Outside US/Canada" value="$210 / $235" detail="Current Step 1 / Step 2 CK region fees, respectively." /></div>
        <div className="mt-4 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-5"><p className="text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Allow extra time:</strong> include travel, rescheduling, score release, and application processing. Confirm the amount shown in the official payment portal before paying.</p></div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="04 / Results" title="What happens after testing?" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Step 1 is reported pass/fail. Step 2 CK includes a three-digit score. Results often arrive within several weeks, but allow up to eight weeks when planning around a deadline.</p></article>
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="05 / Retakes" title="If you fail" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Review the cause before rebooking. The same Step may not be taken more than three times in 12 months. A fourth attempt must be at least 12 months after the first and six months after the most recent attempt.</p><div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary"><RotateCcw size={16} /> A later pass does not erase the attempt history.</div></article>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/35 p-6"><SectionTitle eyebrow="2027 Pathway note" title="What this means for ECFMG planning" /><p className="mt-3 text-sm leading-6 text-muted-foreground">For the 2027 Pathways, IMGs currently need Step 1 and Step 2 CK plus the applicable Pathway and OET Medicine requirements. Applicants targeting the 2027 Match should check the January 31, 2027 Pathways deadline and take OET by the last available December 2026 test date. This article is only the exam guide; use the main USA pathway page for the full route.</p></section>

      <footer className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-border bg-card p-5 text-xs">{officialLinks.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">{label} <ArrowUpRight size={13} /></a>)}</footer>
    </div>
  );
}
