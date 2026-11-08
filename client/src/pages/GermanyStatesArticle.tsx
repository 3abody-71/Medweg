import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Euro,
  FileText,
  Hospital,
  MapPin,
  Moon,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assetPath } from "../lib/assetPath";

const topStates = [
  {
    rank: 1,
    state: "North Rhine-Westphalia",
    short: "NRW",
    capital: "Düsseldorf",
    hospitals: "328",
    hospitalDoctors: "52,515",
    doctors: "96,425",
    image: "/assets/germany/states/dusseldorf.jpg",
    note: "The largest doctor market by both hospital doctors and total working doctors.",
  },
  {
    rank: 2,
    state: "Bavaria",
    short: "Bayern",
    capital: "Munich",
    hospitals: "352",
    hospitalDoctors: "37,339",
    doctors: "74,510",
    image: "/assets/germany/states/munich.jpg",
    note: "The state with the most hospitals, with Munich balanced by smaller-city options.",
  },
  {
    rank: 3,
    state: "Baden-Württemberg",
    short: "BW",
    capital: "Stuttgart",
    hospitals: "244",
    hospitalDoctors: "30,254",
    doctors: "57,416",
    image: "/assets/germany/states/stuttgart.jpg",
    note: "A large market with major university and research centres.",
  },
  {
    rank: 4,
    state: "Lower Saxony",
    short: "Niedersachsen",
    capital: "Hannover",
    hospitals: "169",
    hospitalDoctors: "19,177",
    doctors: "36,692",
    image: "/assets/germany/states/hannover.jpg",
    note: "A substantial market with opportunities outside Germany’s highest-cost cities.",
  },
  {
    rank: 5,
    state: "Hesse",
    short: "Hessen",
    capital: "Wiesbaden",
    hospitals: "148",
    hospitalDoctors: "16,328",
    doctors: "32,760",
    image: "/assets/germany/states/wiesbaden.jpg",
    note: "A strong medical region around Frankfurt, Marburg, and Giessen.",
  },
];

const salaryRows = [
  ["Assistenzarzt · year 1", "€5,722", "€3,500", "Municipal VKA base salary"],
  ["Assistenzarzt · year 6", "€7,355", "€4,300", "Municipal VKA base salary"],
  ["Facharzt · starting", "€7,552", "€4,400", "Municipal VKA base salary"],
  ["Oberarzt · starting", "€9,460", "€5,300", "Municipal VKA base salary"],
];

const shiftTypes = [
  ["Nachtdienst", "Usually 20:00–08:00 or 21:00–07:00", "The doctor actively manages urgent patients and admissions during the night."],
  ["Bereitschaftsdienst", "The doctor remains in the hospital", "The doctor is available for emergencies; VKA Stufe I, II, and III count 70%, 85%, and 100% of the duty time respectively."],
  ["Rufbereitschaft", "The doctor stays at home", "The doctor must return if called. The standby period and any actual work are compensated under the applicable agreement."],
];

function SourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

export default function GermanyStatesArticle() {
  return (
    <div className="space-y-7">
      <Link to="/countries/germany/pathway-info" className="topbar-link inline-flex items-center gap-2 text-sm">
        <ArrowLeft size={14} /> Germany pathway articles
      </Link>

      <header className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[340px] overflow-hidden bg-[#123f52]">
            <img src={assetPath("/assets/germany/states/germany-states-map.jpg")} alt="Map of the 16 federal states of Germany" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#082c3b]/95 via-[#123f52]/35 to-[#d9a441]/35" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">Germany / state-by-state guide</p>
              <h1 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">Germany for doctors: salaries, states, shifts, and holidays</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">The main numbers an international medical graduate should compare before choosing a German state or hospital.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-secondary px-3 py-1.5">16 federal states</span>
              <span className="rounded-full bg-secondary px-3 py-1.5">2024–2026 figures</span>
              <span className="rounded-full bg-secondary px-3 py-1.5">IMG planning guide</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Germany is not one uniform medical labour market. Salary is mainly set by the hospital’s collective agreement, while the state affects the number of hospitals, doctors, vacancies, living costs, and licensing authority.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-xl bg-secondary/60 p-3"><Hospital size={17} className="text-primary" /><p className="mt-2 text-xl font-black">1,874</p><p className="text-xs text-muted-foreground">hospitals in 2024</p></div>
              <div className="rounded-xl bg-secondary/60 p-3"><Stethoscope size={17} className="text-primary" /><p className="mt-2 text-xl font-black">446k</p><p className="text-xs text-muted-foreground">working doctors in 2025</p></div>
              <div className="rounded-xl bg-secondary/60 p-3"><MapPin size={17} className="text-primary" /><p className="mt-2 text-xl font-black">16</p><p className="text-xs text-muted-foreground">federal states</p></div>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-5 sm:p-6">
        <div className="flex items-start gap-3"><FileText className="mt-0.5 shrink-0 text-[#9a5b12]" size={19} /><div><h2 className="font-extrabold">The short version</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">North Rhine-Westphalia has the largest doctor market. Bavaria has the most hospitals. Baden-Württemberg, Lower Saxony, and Hesse complete the top five by combined hospital scale. A first-year municipal Assistenzarzt earns about €5,722 gross per month, or roughly €3,500 net under one illustrative tax profile. Night duties can add meaningful income, but the exact amount depends on the agreement, duty type, time, and overtime rules.</p></div></div>
      </section>

      <section aria-labelledby="salary-heading">
        <div className="eyebrow">01 / Brutto and netto</div>
        <h2 id="salary-heading" className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Salary before and after tax</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">These are monthly base-salary examples from the municipal TV-Ärzte/VKA scale. Netto figures are planning estimates for a single doctor without children in tax class I, with statutory health insurance and no church tax. Your actual take-home pay will differ.</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-4 font-extrabold">Role</th><th className="px-5 py-4 font-extrabold">Brutto / month</th><th className="px-5 py-4 font-extrabold">Estimated netto / month</th><th className="px-5 py-4 font-extrabold">Context</th></tr></thead><tbody>{salaryRows.map(([role, gross, net, context]) => <tr key={role} className="border-t border-border align-top"><td className="px-5 py-4 font-extrabold">{role}</td><td className="px-5 py-4 font-bold text-primary">{gross}</td><td className="px-5 py-4 font-bold text-[#267a5b]">{net}</td><td className="px-5 py-4 text-muted-foreground">{context}</td></tr>)}</tbody></table></div></div>
        <div className="mt-5 grid gap-4 md:grid-cols-3"><article className="rounded-2xl border border-border bg-card p-5"><Euro className="text-primary" size={20} /><h3 className="mt-3 font-extrabold">What is deducted?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Income tax, health insurance, pension, unemployment insurance, long-term-care insurance, and sometimes church tax.</p></article><article className="rounded-2xl border border-border bg-card p-5"><Stethoscope className="text-primary" size={20} /><h3 className="mt-3 font-extrabold">State or agreement?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The state alone does not set the base salary. VKA, TdL, private, church, and local agreements matter more than the state border.</p></article><article className="rounded-2xl border border-border bg-card p-5"><MapPin className="text-primary" size={20} /><h3 className="mt-3 font-extrabold">Compare living costs</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Munich and Stuttgart can offer large markets but expensive housing. Leipzig and some smaller cities may leave more of the netto salary available.</p></article></div>
      </section>

      <section aria-labelledby="states-heading">
        <div className="eyebrow">02 / The 16 states and the largest medical markets</div>
        <h2 id="states-heading" className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Which German states have the most doctors and hospitals?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Germany has 16 federal states. The official 2024 Destatis hospital table puts Bavaria first by hospital count, followed by North Rhine-Westphalia, Baden-Württemberg, Lower Saxony, and Hesse. The 2025 doctor figures below show NRW first by hospital doctors and by total working doctors.</p>
        <div className="mt-5 space-y-5">{topStates.map((item) => <article key={item.state} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="grid lg:grid-cols-[0.8fr_1.2fr]"><div className="relative min-h-[210px] bg-secondary"><img src={assetPath(item.image)} alt={`${item.capital}, capital of ${item.state}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-14 text-white"><p className="text-xs font-extrabold uppercase tracking-wider text-white/80">Capital photo · {item.capital}</p><h3 className="mt-1 text-xl font-black">{item.state}</h3></div></div><div className="p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-secondary px-3 py-1 text-xs font-black text-primary">#{item.rank} market by hospital doctors</span><span className="text-xs font-bold text-muted-foreground">{item.short}</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.note}</p><div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-secondary/60 p-3"><p className="text-lg font-black">{item.hospitals}</p><p className="mt-1 text-[11px] text-muted-foreground">hospitals</p></div><div className="rounded-lg bg-secondary/60 p-3"><p className="text-lg font-black">{item.hospitalDoctors}</p><p className="mt-1 text-[11px] text-muted-foreground">hospital doctors</p></div><div className="rounded-lg bg-secondary/60 p-3"><p className="text-lg font-black">{item.doctors}</p><p className="mt-1 text-[11px] text-muted-foreground">total doctors</p></div></div></div></div></article>)}</div>
        <p className="mt-4 rounded-xl bg-secondary/60 p-4 text-xs leading-5 text-muted-foreground">A large state does not guarantee an IMG job. Check vacancies, German language level, Approbation or Berufserlaubnis, specialty-training authorisation, and the department’s willingness to employ international doctors.</p>
      </section>

      <section aria-labelledby="shifts-heading">
        <div className="eyebrow">03 / Night shifts and extra pay</div>
        <h2 id="shifts-heading" className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Times, types, and a realistic pay example</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Hospitals use different rosters, but the supplied guide describes three common systems. Always ask for the average number of duties per month, how Bereitschaftsdienst is classified, and whether overtime is paid or converted into time off.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">{shiftTypes.map(([title, time, body]) => <article key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Moon size={19} /></div><h3 className="font-extrabold">{title}</h3></div><p className="mt-4 text-xs font-black uppercase tracking-wider text-primary">{time}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-5 sm:p-6"><div className="flex items-start gap-3"><Clock3 className="mt-0.5 shrink-0 text-[#267a5b]" size={20} /><div><h3 className="font-extrabold">Illustrative 12-hour VKA example</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A first-year Assistenzarzt on €5,722 gross monthly salary, working a 12-hour Stufe I duty, has 8.4 hours counted at an illustrative €36.86 per hour. That gives about €309.62, plus a 15% supplement of about €46.44: approximately <strong className="text-foreground">€356 gross for that duty</strong> before other applicable night, holiday, or overtime additions. It is an example, not a guaranteed flat rate.</p></div></div></div>
      </section>

      <section aria-labelledby="holidays-heading">
        <div className="eyebrow">04 / Holidays and time off</div>
        <h2 id="holidays-heading" className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">How many holidays are given each year?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3"><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><CalendarDays className="text-primary" size={20} /><h3 className="mt-3 font-extrabold">30 paid leave days</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Under the TV-Ärzte/VKA agreement, doctors working a five-day week receive 30 working days of annual leave per calendar year.</p></article><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><CalendarDays className="text-primary" size={20} /><h3 className="mt-3 font-extrabold">20-day legal minimum</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">German statutory minimum leave is 20 working days for a five-day week. A collective agreement or contract can provide more.</p></article><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><CalendarDays className="text-primary" size={20} /><h3 className="mt-3 font-extrabold">Public holidays vary</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Germany has nationwide public holidays plus state-specific holidays. A holiday worked during a roster may trigger compensatory time or an additional payment under the agreement.</p></article></div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"><div className="eyebrow">Decision guide</div><h2 className="mt-1 text-xl font-extrabold">What should an IMG compare before accepting a post?</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{["Gross and estimated net salary", "Average number and length of night duties", "VKA, TdL, private, or church agreement", "How Bereitschaftsdienst is counted", "Annual leave and time-off-in-lieu policy", "Training authorisation and operative exposure", "Current vacancies and German-language expectations", "Rent, transport, and cost of living in the city"].map(item => <div key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{item}</div>)}</div></section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"><div className="flex items-start gap-3"><FileText className="mt-0.5 shrink-0 text-primary" size={20} /><div><div className="eyebrow">Sources and methodology</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Hospital counts are from Destatis as at 27 September 2024. National doctor totals are from the Bundesärztekammer 2025 statistics. Salary, duty, and leave examples use the TV-Ärzte/VKA agreement and the supplied November 2026 article. Netto figures are illustrative estimates, not payroll promises.</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-3"><SourceLink label="Destatis hospitals by state" url="https://www.destatis.de/EN/Themes/Society-Environment/Health/Hospitals/Tables/gd-hospitals-laender.html" /><SourceLink label="Bundesärztekammer 2025 statistics" url="https://www.bundesaerztekammer.de/baek/ueber-uns/aerztestatistik/2025" /><SourceLink label="TV-Ärzte/VKA agreement" url="https://www.marburger-bund.de/sites/default/files/tarifvertraege/2025-06/25-06-16%20TV-%C3%84rzte%20VKA%20i.d.F.%2010.%20%C3%84ndTV.pdf" /><SourceLink label="Destatis vacation entitlement" url="https://www.destatis.de/EN/Themes/Labour/Labour-Market/Quality-Employment/Dimension2/2_2_VacationEntitlement.html" /></div></div></div></section>
    </div>
  );
}
