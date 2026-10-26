import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, Clock3, DollarSign, MapPin, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { assetPath } from "../lib/assetPath";

const officialLinks = [
  ["Step 1 official page", "https://www.usmle.org/step-exams/step-1"],
  ["Step 2 CK official page", "https://www.usmle.org/step-exams/step-2-ck"],
  ["2027 Pathways", "https://www.ecfmg.org/certification-pathways/"],
];

const subjects = [
  ["Pathology", "45–55%"],
  ["Physiology", "30–40%"],
  ["Gross anatomy & embryology", "10–20%"],
  ["Microbiology", "10–20%"],
  ["Pharmacology", "10–20%"],
  ["Behavioral sciences", "10–15%"],
  ["Biochemistry & nutrition", "5–15%"],
  ["Histology & cell biology", "5–15%"],
  ["Immunology", "5–15%"],
];

const resources = [
  { group: "Videos", title: "Boards & Beyond", image: "/assets/usa/usmle/boards-and-beyond-platform.webp", text: "Basic-science explanations and mechanisms." },
  { group: "Videos", title: "Pathoma", image: "/assets/usa/usmle/pathoma.jpg", text: "Focused pathology explanations." },
  { group: "Book", title: "First Aid", image: "/assets/usa/usmle/first-aid-step1-2026.png", text: "High-yield review and organisation." },
  { group: "Tools", title: "Sketchy", image: "/assets/usa/usmle/sketchy.png", text: "Visual memory for microbiology and pharmacology." },
  { group: "Tools", title: "Anki", image: "/assets/usa/usmle/anki.png", text: "Spaced repetition after understanding." },
  { group: "Question bank", title: "UWorld", image: "/assets/usa/usmle/uworld.jpg", text: "Questions, explanations, and error review." },
];

function StatCard({ icon: Icon, label, value, detail }: { icon: typeof Clock3; label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Icon size={19} /></div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p></div><p className="mt-4 text-2xl font-black tracking-tight">{value}</p><p className="mt-1 text-sm leading-5 text-muted-foreground">{detail}</p></div>;
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2></div>;
}

export default function UsmleArticle() {
  return <div className="space-y-8">
    <Link to="/countries/usa/pathway-info" className="topbar-link inline-flex items-center gap-2 text-sm"><ArrowLeft size={14} /> USA pathway info</Link>

    <header className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="home-hero px-6 py-8 sm:px-9 sm:py-10"><div className="home-hero-content"><p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">USA / Pathway info</p><h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Step 1 and Step 2 Preparation</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">The essential exam facts for international medical graduates.</p></div></div><div className="flex flex-wrap gap-2 border-t border-border bg-secondary/30 p-4 text-xs font-bold"><span className="rounded-full bg-card px-3 py-1.5">IMG guide</span><span className="rounded-full bg-card px-3 py-1.5">USMLE</span><span className="rounded-full bg-card px-3 py-1.5">ECFMG</span></div></header>

    <section><SectionTitle eyebrow="01 / At a glance" title="The numbers that matter" /><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard icon={BookOpen} label="Step 1" value="280 MCQs" detail="Pass/fail exam; 14 blocks × 30 minutes; 8-hour session." /><StatCard icon={BookOpen} label="Step 2 CK" value="318 MCQs" detail="Three-digit score; 16 blocks × 30 minutes; 9-hour session." /><StatCard icon={Clock3} label="Breaks" value="55 min" detail="Minimum break time in the current format." /><StatCard icon={CheckCircle2} label="Step 2 pass" value="218" detail="Current published minimum passing score." /></div></section>

    <section className="grid gap-4 lg:grid-cols-2"><article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="Step 1" title="Pass/fail basic-science exam" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Step 1 is a multiple-choice exam testing the basic sciences behind disease and treatment.</p><div className="mt-4 grid gap-2 text-sm">{["280 MCQs maximum", "14 blocks × 30 minutes", "Up to 20 MCQs per block", "Reported as pass or fail"].map(item => <div key={item} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />{item}</div>)}</div></article><article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="Step 2 CK" title="Scored clinical-knowledge exam" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Step 2 CK tests clinical decisions and patient care under supervision.</p><div className="mt-4 grid gap-2 text-sm">{["318 MCQs maximum", "16 blocks × 30 minutes", "Up to 20 MCQs per block", "Three-digit score plus pass/fail"].map(item => <div key={item} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />{item}</div>)}</div></article></section>

    <section><SectionTitle eyebrow="02 / Step 1 subjects" title="Subjects and official weight ranges" /><p className="mt-2 text-sm leading-6 text-muted-foreground">The ranges overlap because the exam is integrated. They are official planning ranges, not a promise of the exact percentage on your form.</p><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{subjects.map(([subject, range]) => <div key={subject} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm"><span className="font-bold">{subject}</span><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-extrabold text-primary">{range}</span></div>)}</div></section>

    <section><SectionTitle eyebrow="03 / Resources" title="Use the resources in this order" /><p className="mt-2 text-sm leading-6 text-muted-foreground">Start with videos for understanding, use books for consolidation, then use questions and review tools for application.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{resources.map(resource => <article key={resource.title} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="h-32 bg-secondary"><img src={assetPath(resource.image)} alt={resource.title} className="h-full w-full object-contain p-2" /></div><div className="p-4"><p className="text-[10px] font-extrabold uppercase tracking-wider text-primary">{resource.group}</p><h3 className="mt-1 text-sm font-extrabold">{resource.title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{resource.text}</p></div></article>)}</div><div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-border bg-card p-5"><p className="font-extrabold">Step 1 preparation time</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Usually about <strong>3–7 months</strong>. Use the longer end if your basic-science foundation is weak or you study part-time.</p></div><div className="rounded-2xl border border-border bg-card p-5"><p className="font-extrabold">Step 2 CK preparation time</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Usually about <strong>2–6 months</strong>. Your baseline assessment and clinical experience should decide the final date.</p></div></div></section>

    <section><SectionTitle eyebrow="04 / Availability and logistics" title="Where and when can you take the exam?" /><div className="mt-4 grid gap-4 md:grid-cols-3"><StatCard icon={CalendarDays} label="When" value="Year-round" detail="Appointments are offered throughout the year, subject to availability." /><StatCard icon={MapPin} label="Where" value="Prometric" detail="Prometric test centers in the United States and internationally." /><StatCard icon={Clock3} label="Eligibility" value="3 months" detail="You must test within the eligibility period assigned to you." /></div><div className="mt-4 rounded-2xl border border-border bg-card p-5"><p className="font-extrabold">Logistics checklist</p><div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">{["Confirm eligibility", "Apply and receive scheduling information", "Choose a Prometric location", "Book a date inside your eligibility period", "Plan travel and identification", "Leave time for score release"].map(item => <div key={item} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />{item}</div>)}</div></div></section>

    <section><SectionTitle eyebrow="05 / Prices" title="Main costs" /><div className="mt-4 grid gap-4 md:grid-cols-3"><StatCard icon={DollarSign} label="Step 1" value="$1,020" detail="Published exam registration fee." /><StatCard icon={DollarSign} label="Step 2 CK" value="$1,020" detail="Published exam registration fee." /><StatCard icon={DollarSign} label="International region" value="$210 / $235" detail="Step 1 / Step 2 CK outside the US and Canada." /></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Fees can change. Confirm the final amount in the official payment portal before paying.</p></section>

    <section className="grid gap-4 lg:grid-cols-2"><article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="06 / Results" title="After the exam" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Step 1 is reported pass/fail. Step 2 CK includes a three-digit score. Results often arrive within several weeks; allow up to eight weeks when planning around a deadline.</p></article><article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><SectionTitle eyebrow="07 / Retakes" title="If you fail" /><p className="mt-3 text-sm leading-6 text-muted-foreground">Review the cause before rebooking. The same Step may not be taken more than three times in 12 months. A fourth attempt must be at least 12 months after the first and six months after the most recent attempt.</p><div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary"><RotateCcw size={16} /> The attempt remains in your history.</div></article></section>

    <section className="rounded-2xl border border-border bg-secondary/35 p-6"><SectionTitle eyebrow="2027 Pathway note" title="For ECFMG planning" /><p className="mt-3 text-sm leading-6 text-muted-foreground">For the 2027 Pathways, IMGs currently need Step 1 and Step 2 CK plus the applicable Pathway and OET Medicine requirements. Check the January 31, 2027 Pathways deadline and the December 2026 OET timing. Use the main USA pathway page for the full route.</p></section>

    <footer className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-border bg-card p-5 text-xs">{officialLinks.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">{label} <ArrowUpRight size={13} /></a>)}</footer>
  </div>;
}
