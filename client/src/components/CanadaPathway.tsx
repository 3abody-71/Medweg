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
  Flag,
  Globe2,
  GraduationCap,
  HeartPulse,
  Home,
  Languages,
  Map,
  Plane,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users,
  WalletCards,
} from "lucide-react";
import { canadaPathway, type CanadaIconName } from "../data/canadaPathway";
import { assetPath } from "../lib/assetPath";

const ICONS: Record<CanadaIconName, typeof BadgeCheck> = {
  alert: AlertTriangle,
  award: BadgeCheck,
  book: BookOpen,
  briefcase: Briefcase,
  building: Building2,
  check: CheckCircle2,
  clock: Clock3,
  flag: Flag,
  globe: Globe2,
  graduation: GraduationCap,
  heart: HeartPulse,
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

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
      ) : null}
    </div>
  );
}

function IconBox({
  name,
  className = "",
}: {
  name: CanadaIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary ${className}`}
    >
      <Icon size={19} />
    </div>
  );
}

function SafeImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <img
      src={assetPath(currentSrc)}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => setCurrentSrc("/assets/canada/canada-flag-snow.jpg")}
    />
  );
}

function SourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
    >
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

export default function CanadaPathway() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[350px] overflow-hidden bg-[#c51f32]">
            <SafeImage
              src="/assets/canada/canada-flag-snow.jpg"
              alt="Canadian flag flying over a snowy mountain landscape"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4a1019]/95 via-[#7d1b2a]/30 to-[#d92e3d]/45" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">
                Canada guide for IMGs
              </div>
              <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                A practical route to medical specialty training in Canada.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">
                A province-aware overview of IMG requirements, CaRMS and PRA
                pathways, exams, salaries, work-life, visas, citizenship, and
                important hospitals.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="eyebrow">Guide / contents</div>
            <h2 className="mt-2 text-xl font-extrabold">
              What is on this page?
            </h2>
            <nav
              className="mt-4 grid gap-2 text-sm"
              aria-label="Canada guide contents"
            >
              {[
                ["why-canada", "Why choose Canada?"],
                ["requirements-canada", "IMG requirements"],
                ["pathway-canada", "Pathway, exams, and costs"],
                ["life-canada", "Salaries and work-life"],
                ["visas-canada", "Visas and immigration"],
                ["tradeoffs-canada", "Advantages and disadvantages"],
                ["hospitals-canada", "Nine important hospitals"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 font-bold hover:border-primary/40 hover:bg-secondary/50"
                >
                  <span>{label}</span>
                  <ArrowRight size={14} className="text-primary" />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="grid gap-4 border-t border-border bg-secondary/30 p-4 sm:grid-cols-[1fr_1.25fr] sm:p-5">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <SafeImage
              src="/assets/canada/canada-autumn-mountain.jpg"
              alt="Autumn mountain town in Canada"
              className="h-40 w-full object-cover"
            />
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="eyebrow">Canada at a glance</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Canada’s IMG journey is provincial: the regulator, residency
              stream, language evidence, assessment, return-of-service, and
              immigration status can all change with the location and route.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-secondary px-3 py-1.5">
                IMG route
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                MCCQE + NAC
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                CaRMS / PRA
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                Province-specific
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="why-canada" aria-labelledby="why-canada-heading">
        <SectionHeading
          eyebrow="01 / Why choose Canada?"
          title="Five reasons IMGs look toward Canada"
          body="Canada is not a low-barrier route. The practical appeal is a combination of training quality, multiple pathways, long-term stability, and the possibility of building a career in communities that need physicians."
        />
        <div
          id="why-canada-heading"
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {canadaPathway.reasons.map((reason, index) => (
            <article
              key={reason.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <IconBox name={reason.icon} />
              <div className="mt-4 text-xs font-bold text-primary">
                0{index + 1}
              </div>
              <h3 className="mt-1 text-base font-extrabold leading-5">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {reason.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="requirements-canada"
        aria-labelledby="requirements-canada-heading"
      >
        <SectionHeading
          eyebrow="02 / IMG requirements"
          title="The requirements to prepare"
          body="Use this as a planning framework, not a universal checklist. CaRMS, PRA programs, medical regulators, specialty colleges, and immigration authorities each publish their own eligibility rules."
        />
        <div
          id="requirements-canada-heading"
          className="mt-5 grid gap-5 lg:grid-cols-3"
        >
          {canadaPathway.requirementGroups.map(requirement => (
            <article
              key={requirement.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <IconBox
                  name={requirement.icon}
                  className="bg-[#fce9eb] text-[#b52237]"
                />
                <div>
                  <h3 className="text-lg font-extrabold">
                    {requirement.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {requirement.intro}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3 border-t border-border pt-5">
                {requirement.items.map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-6"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-1 shrink-0 text-primary"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <IconBox name="alert" className="bg-[#ffedbd] text-[#9a5b12]" />
            <p className="text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">
                Important distinction:
              </strong>{" "}
              immigration status and medical licensure are separate. A work
              permit does not replace registration with a provincial medical
              regulator, and a medical credential does not automatically give
              permission to work in Canada.
            </p>
          </div>
        </div>
      </section>

      <section id="pathway-canada" aria-labelledby="pathway-canada-heading">
        <SectionHeading
          eyebrow="03 / Pathway, exams, and costs"
          title="From planning to supervised practice"
          body="The stages below can overlap, but the order is a useful way to prevent expensive mistakes. Your province or program may add assessments, change deadlines, or require a return-of-service agreement."
        />
        <div
          id="pathway-canada-heading"
          className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.82fr]"
        >
          <div className="space-y-4">
            {canadaPathway.stages.map(stage => (
              <article
                key={stage.number}
                className="route-step rounded-2xl border border-border bg-card p-5 pl-14 shadow-sm sm:p-6 sm:pl-16"
              >
                <span className="step-dot !top-6 !left-5">{stage.number}</span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold">{stage.title}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-primary">
                    {stage.timeframe}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {stage.body}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {stage.actions.map(action => (
                    <div
                      key={action}
                      className="rounded-lg bg-secondary/60 p-3 text-xs leading-5"
                    >
                      <CheckCircle2 size={14} className="mb-1 text-primary" />
                      {action}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3 text-xs leading-5">
                  <ArrowRight
                    size={14}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    <span className="font-bold">Checkpoint:</span>{" "}
                    {stage.checkpoint}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-[#123f52] p-6 text-white shadow-lg lg:sticky lg:top-24">
            <div className="eyebrow !text-[#8bd3dc]">Keep this in view</div>
            <h3 className="mt-2 text-xl font-extrabold">
              The province decides the route
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Canada does not have one identical IMG checklist for every
              province. CaRMS eligibility, PRA selection, licensing, language,
              return-of-service, and immigration requirements must be checked
              separately.
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Read the current provincial criteria",
                "Confirm the regulator’s written checklist",
                "Ask exactly what work permission and supervision apply",
              ].map(item => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs leading-5 text-white/90"
                >
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-[#8bd3dc]"
                  />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#e4c0c3] bg-[#fff8f8] shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_250px]">
            <div className="min-w-0 p-6 sm:p-7">
              <div className="eyebrow text-[#a52b3b]">Planning costs / CAD</div>
              <h3 className="mt-1 text-2xl font-extrabold">
                Budget for the pathway, not only the exam
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                The amounts below are categories rather than promises. Fees,
                translations, travel, provincial registration, and application
                costs change. Check the current official fee before paying.
              </p>
              <div className="pathway-costs-table responsive-table mt-5 min-w-0 max-w-full overflow-x-auto rounded-xl border border-[#efd7d8] bg-white" tabIndex={0} role="region" aria-label="Canada pathway costs table">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-[#fff0f1] text-xs uppercase tracking-wider text-[#8e3541]">
                    <tr>
                      <th className="px-4 py-3 font-extrabold">Item</th>
                      <th className="px-4 py-3 font-extrabold">
                        Planning amount
                      </th>
                      <th className="px-4 py-3 font-extrabold">
                        Planning note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {canadaPathway.costItems.map(cost => (
                      <tr
                        key={cost.item}
                        className="border-t border-[#f1e3e4] align-top"
                      >
                        <td className="px-4 py-3 font-bold">{cost.item}</td>
                        <td className="px-4 py-3 font-extrabold text-[#a52b3b]">
                          {cost.amount}
                        </td>
                        <td className="px-4 py-3 leading-5 text-muted-foreground">
                          {cost.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pathway-costs-cards mt-5 space-y-3" aria-label="Canada pathway costs">
                {canadaPathway.costItems.map(cost => (
                  <article key={cost.item} className="rounded-xl border border-[#efd7d8] bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-extrabold text-[#6d2430]">{cost.item}</h4>
                      <span className="shrink-0 text-sm font-extrabold text-[#a52b3b]">{cost.amount}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{cost.note}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                <SourceLink
                  label="MCC IMG pathways"
                  url="https://mcc.ca/credentials-and-services/pathways-to-licensure/pathways-for-international-medical-graduates/"
                />
                <SourceLink
                  label="CaRMS eligibility"
                  url="https://www.carms.ca/match/r-1-main-residency-match/eligibility-criteria/"
                />
                <SourceLink
                  label="MCC examinations"
                  url="https://mcc.ca/examinations/"
                />
              </div>
            </div>
            <div className="flex min-h-[250px] items-center justify-center bg-[#a52b3b] p-5">
              <div className="text-center">
                <SafeImage
                  src="/assets/canada/weekend-reaction.gif"
                  alt="Funny reaction GIF about surviving the Canada pathway"
                  className="mx-auto h-44 w-44 rounded-xl object-cover shadow-lg"
                />
                <p className="mt-4 text-sm font-black text-white">
                  Me after one more provincial checklist
                </p>
                <p className="mt-1 text-[11px] leading-4 text-white/75">
                  A little weekend sarcasm for a very serious process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="life-canada" aria-labelledby="life-canada-heading">
        <SectionHeading
          eyebrow="04 / Salaries and work-life"
          title="Salary, specialty choices, and daily life"
          body="Resident pay is published by province and PGY level. Physician earnings after training vary widely by specialty, province, billing model, overhead, hours, and practice setting."
        />
        <div
          id="life-canada-heading"
          className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="responsive-table min-w-0 max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="Canada salary table by role">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-extrabold">Role</th>
                  <th className="px-5 py-4 font-extrabold">Monthly</th>
                  <th className="px-5 py-4 font-extrabold">Annual</th>
                  <th className="px-5 py-4 font-extrabold">Context</th>
                </tr>
              </thead>
              <tbody>
                {canadaPathway.salaryBands.map(band => (
                  <tr
                    key={band.role}
                    className="border-t border-border align-top"
                  >
                    <td className="px-5 py-4 font-extrabold">{band.role}</td>
                    <td className="px-5 py-4 font-bold text-primary">
                      {band.monthly}
                    </td>
                    <td className="px-5 py-4">{band.annual}</td>
                    <td className="px-5 py-4 leading-6 text-muted-foreground">
                      {band.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <IconBox
              name="stethoscope"
              className="bg-[#dff5e9] text-[#267a5b]"
            />
            <div>
              <div className="eyebrow text-[#267a5b]">
                Specialty outlook for IMGs
              </div>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                Family medicine is usually the most realistic IMG route in
                Canada
              </h3>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
                Compared with many other specialties, family medicine has more
                training and community-practice opportunities across Canadian
                provinces, which makes it the most accessible and widely
                available option for many eligible IMGs. It is still
                competitive—not “easy”: you must meet the CaRMS or provincial
                requirements, pass the required exams, prove language ability,
                and accept that some programs may include geographic or
                return-of-service obligations.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/75 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#267a5b]">
                More opportunities
              </p>
              <p className="mt-1 text-sm leading-5">
                Family-medicine positions are distributed across urban,
                regional, rural, and remote communities.
              </p>
            </div>
            <div className="rounded-xl bg-white/75 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#267a5b]">
                Broader province options
              </p>
              <p className="mt-1 text-sm leading-5">
                Applicants who are geographically flexible can compare more
                communities and program streams.
              </p>
            </div>
            <div className="rounded-xl bg-white/75 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#267a5b]">
                Not guaranteed
              </p>
              <p className="mt-1 text-sm leading-5">
                Eligibility, exams, competition, language, and provincial rules
                still determine your result.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {canadaPathway.lifeCards.map(card => (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <IconBox name={card.icon} />
              <h3 className="mt-4 text-base font-extrabold">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="visas-canada" aria-labelledby="visas-canada-heading">
        <SectionHeading
          eyebrow="05 / Visas and immigration"
          title="Visa types and status requirements"
          body="Immigration permission and medical permission are separate tracks. Select the immigration route that matches your actual job, provincial support, and stage of licensing."
        />
        <div
          id="visas-canada-heading"
          className="mt-5 grid gap-4 sm:grid-cols-2"
        >
          {canadaPathway.visaTypes.map(visa => (
            <article
              key={visa.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <IconBox name={visa.icon} />
              <h3 className="mt-4 text-base font-extrabold">{visa.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {visa.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <IconBox name="alert" className="bg-[#ffedbd] text-[#9a5b12]" />
            <div>
              <h3 className="text-lg font-extrabold">Before you apply</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Confirm the provincial regulator and exact permitted role",
                  "Match the work permit to the named employer or route",
                  "Check whether a job offer or provincial support is required",
                  "Keep immigration documents, medical documents, and translations current",
                  "Do not begin patient-facing practice before the permitted licence date",
                  "Recheck Express Entry and provincial criteria before filing",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-1 shrink-0 text-[#9a5b12]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tradeoffs-canada" aria-labelledby="tradeoffs-canada-heading">
        <SectionHeading
          eyebrow="06 / Advantages and disadvantages"
          title="The opportunity is real, but so are the trade-offs"
          body="Canada can suit an IMG who values long-term stability and is ready for provincial complexity, exams, competition, and geographical flexibility."
        />
        <div
          id="tradeoffs-canada-heading"
          className="mt-5 grid gap-5 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-6">
            <div className="flex items-center gap-2 text-[#267a5b]">
              <CheckCircle2 size={18} />
              <h3 className="text-base font-extrabold">Advantages</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {canadaPathway.advantages.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-6"
                >
                  <CheckCircle2
                    size={15}
                    className="mt-1 shrink-0 text-[#267a5b]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e6c39b] bg-[#fff9f0] p-6">
            <div className="flex items-center gap-2 text-[#ad6a16]">
              <Scale size={18} />
              <h3 className="text-base font-extrabold">Disadvantages</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {canadaPathway.disadvantages.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-6"
                >
                  <Scale size={15} className="mt-1 shrink-0 text-[#ad6a16]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="hospitals-canada" aria-labelledby="hospitals-canada-heading">
        <SectionHeading
          eyebrow="07 / Important hospitals"
          title="Nine important Canadian teaching hospitals"
          body="This is a curated orientation list, not an official ranking and not a promise of residency placement. Use each official hospital link to check departments, vacancies, accreditation, language expectations, and current IMG opportunities."
        />
        <div
          id="hospitals-canada-heading"
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {canadaPathway.hospitals.map(hospital => (
            <article
              key={hospital.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="relative h-40 overflow-hidden bg-secondary">
                <SafeImage
                  src={hospital.image}
                  alt={`${hospital.name} exterior in ${hospital.city}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#245066]">
                    {hospital.province}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-extrabold">{hospital.name}</h3>
                <p className="mt-1 text-xs font-bold text-muted-foreground">
                  {hospital.city}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {hospital.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    href={hospital.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    Official site <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={hospital.photoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:underline"
                  >
                    Photo: {hospital.photoCredit} <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        aria-labelledby="canada-sources-heading"
      >
        <div className="flex items-start gap-3">
          <IconBox name="shield" />
          <div>
            <div className="eyebrow">Verify before you act</div>
            <h2
              id="canada-sources-heading"
              className="mt-1 text-xl font-extrabold"
            >
              Official starting points
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Fees, eligibility, salary tables, immigration programs, and
              provincial licensing requirements change. Start with official
              sources, then confirm the checklist for your personal
              qualification and intended province.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {canadaPathway.sources.map(source => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 text-sm font-bold transition-colors hover:border-primary/40 hover:bg-secondary/50"
            >
              <span>{source.label}</span>
              <ArrowUpRight
                size={15}
                className="shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-secondary/60 p-3 text-xs leading-5 text-muted-foreground">
          For education only. This guide is not legal, immigration, financial,
          or medical advice. Requirements, timelines, fees, work permissions,
          salaries, and return-of-service obligations vary by case, province,
          program, and year. The hospital list is a curated orientation list,
          not a ranking.
        </p>
      </section>
    </div>
  );
}
