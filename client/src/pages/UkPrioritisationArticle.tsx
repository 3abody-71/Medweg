import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  BriefcaseMedical,
  CheckCircle2,
  Clock3,
  FileText,
  Scale,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assetPath } from "../lib/assetPath";

const officialLinks = [
  [
    "NHS Foundation Programme announcement",
    "https://foundationprogramme.nhs.uk/important-update-medical-training-prioritisation-act-becomes-law/",
  ],
  [
    "Government impact statement",
    "https://www.gov.uk/government/publications/impact-statement-medical-training-prioritisation-bill/medical-training-prioritisation-bill-impact-statement",
  ],
  [
    "Parliament written statement",
    "https://questions-statements.parliament.uk/written-statements/detail/2026-09-15/hcws350",
  ],
  [
    "2026 specialty training regulations",
    "https://www.legislation.gov.uk/uksi/2026/1019/made",
  ],
  [
    "Parliamentary briefing",
    "https://commonslibrary.parliament.uk/research-briefings/cbp-10473/",
  ],
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
          <Icon size={19} />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="mt-4 text-2xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-sm leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

function SourceLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
    >
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

export default function UkPrioritisationArticle() {
  return (
    <div className="space-y-8">
      <Link
        to="/countries/uk/pathway-info"
        className="topbar-link inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft size={14} /> UK pathway info
      </Link>

      <header className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[330px] overflow-hidden bg-[#1b2a3c]">
            <img
              src={assetPath("/assets/uk/uk-prioritisation-hero.jpeg")}
              alt="Doctor working in an operating theatre"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#111d2d]/95 via-[#203c58]/40 to-[#9c303e]/30" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">
                UK / 2026 policy guide
              </p>
              <h1 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                UK Medical Training Prioritisation 2026: A Guide for IMGs
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-secondary px-3 py-1.5">
                IMG guide
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                Foundation training
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                Specialty training
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              The Medical Training (Prioritisation) Act changed the order in
              which some UK postgraduate training places are allocated. This
              guide explains what the rule means for international medical
              graduates, how NHS experience fits into the framework, and how to
              decide whether the UK remains a sensible route.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-primary">
              <FileText size={15} /> Updated November 2026
            </div>
          </div>
        </div>
      </header>

      <section>
        <SectionTitle
          eyebrow="At a glance"
          title="The points that matter first"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={BookOpen}
            label="Became law"
            value="5 Mar 2026"
            detail="The Act received Royal Assent and became law."
          />
          <StatCard
            icon={Clock3}
            label="First affected intake"
            value="Aug 2026"
            detail="The NHS confirmed immediate application to relevant training programmes."
          />
          <StatCard
            icon={Scale}
            label="Core effect"
            value="Priority order"
            detail="It changes allocation priority; it does not guarantee a post."
          />
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="01 / What is the prioritisation rule?"
          title="It changes who is considered first for training places"
        />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The rule is a statutory priority system for postgraduate medical
          training. It does not replace GMC registration, the programme’s person
          specification, immigration permission, or competitive selection. An
          applicant can remain eligible to apply without being in the group
          considered first.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Foundation training</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              UK medical graduates receive priority for UK Foundation Programme
              places. The priority group also includes qualifying graduates from
              the Republic of Ireland and qualifying graduates from medical
              institutions in Iceland, Norway, Liechtenstein, and Switzerland,
              reflecting the relevant international agreements.
            </p>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              The statutory definitions contain conditions about where and how
              the medical qualification was obtained. Use the current Foundation
              Programme guidance for the exact application rules.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Specialty training</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For specialty training offers made in 2026, priority includes the
              UK, Irish, and specified international medical graduates, people
              who have completed or are completing relevant prior UK training,
              and applicants in specified citizenship or immigration-status
              categories.
            </p>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              For places starting from 2027, the regulations prioritise the same
              broad status categories for interviews and offers. These include
              British or qualifying Irish citizens, Commonwealth citizens with
              UK right of abode, people with indefinite leave, and people with
              EU Settlement Scheme residence rights.
            </p>
          </article>
        </div>
        <div className="mt-5 rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-6">
          <div className="flex items-start gap-3">
            <Scale className="mt-0.5 shrink-0 text-[#9a5b12]" size={19} />
            <div>
              <h3 className="font-extrabold">What the rule does not say</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                It does not say that every IMG is barred from training or that
                every UK graduate will automatically receive a place. The
                priority is applied within the recruitment and allocation
                process, after the applicant meets the relevant programme
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="02 / Why is the policy being used this year?"
          title="The government is responding to intense competition for training posts"
        />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The government says the policy is intended to create a clearer path
          from UK medical school into postgraduate training, protect the public
          investment in medical education, improve retention, and reduce
          long-term reliance on international recruitment. The policy was also
          introduced while applications and the number of doctors seeking
          specialty training were growing faster than the number of available
          posts.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <StatCard
            icon={BriefcaseMedical}
            label="2025 specialty round"
            value="80,218"
            detail="Applications for 9,479 specialty training posts, an average of 8.5 applications per post."
          />
          <StatCard
            icon={CheckCircle2}
            label="Reported success rate"
            value="23% vs 69%"
            detail="The parliamentary briefing reported this 2023–24 success-rate comparison for international and UK-trained doctors."
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          This is the government’s policy rationale, not a promise that the
          change will improve every applicant’s prospects. The parliamentary
          briefing records concerns about the effect on IMGs who already have
          professional and personal ties to the NHS, as well as concerns about
          staffing gaps.
        </p>
      </section>

      <section>
        <SectionTitle
          eyebrow="03 / Who is eligible?"
          title="Eligibility and priority are different questions"
        />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          An IMG may still apply for UK training if they meet the GMC,
          registration, immigration, and programme requirements. The key issue
          is whether the applicant also falls within a statutory priority group
          when interviews or offers are allocated.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-6">
            <h3 className="text-lg font-extrabold text-[#176743]">
              Applicants who may receive priority
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-6">
              {[
                "Qualifying graduates of UK or Republic of Ireland medical schools.",
                "Qualifying graduates from institutions in Iceland, Norway, Liechtenstein, or Switzerland.",
                "Applicants who have completed or are completing the relevant prior stage of UK training.",
                "For specialty offers in 2026 and the current 2027 regulations, specified citizenship, right-of-abode, indefinite-leave, or EU Settlement Scheme status.",
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="mt-1 shrink-0 text-[#267a5b]"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Examples that need care</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                A British citizen with an overseas medical degree can fall into
                the specialty-training status category, but that does not make
                them a UK medical graduate for every part of the Act.
              </p>
              <p>
                An IMG holding only a time-limited work visa is not
                automatically in the listed specialty-training status
                categories. A Skilled Worker visa alone should not be treated as
                equivalent to indefinite leave or settled status.
              </p>
              <p>
                In every case, check the recruitment year, the exact programme,
                and the current Oriel person specification. A priority category
                does not remove the need for GMC registration or other
                application requirements.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="04 / How can an IMG become a stronger candidate?"
          title="NHS experience helps, but it is not a shortcut around the rule"
        />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          For specialty offers made in 2026, the Act used specified immigration
          statuses as a temporary proxy for applicants who were more likely to
          have significant NHS experience. NHS employment by itself was not a
          separate universal priority category. For later years, the policy
          intention is to identify significant experience working as a doctor in
          the NHS or the other UK health services, but the exact threshold
          remains subject to the regulations and recruitment guidance in force.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Obtain GMC registration",
              "Keep your licence, evidence, and fitness-to-practise information current.",
            ],
            [
              "Work safely in the NHS",
              "A supervised NHS service or trust-grade role can build local clinical experience and references.",
            ],
            [
              "Document your portfolio",
              "Keep workplace assessments, audits, quality improvement, teaching, courses, and publications organised.",
            ],
            [
              "Read the person specification",
              "Apply only where your registration, experience, exams, and immigration status meet the current criteria.",
            ],
          ].map(([title, body], index) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-xs font-extrabold text-primary">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-base font-extrabold leading-5">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-[#d5e2f2] bg-[#f5f9ff] p-6">
          <h3 className="font-extrabold">A practical point for IMGs</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            An NHS job can improve your knowledge of local pathways,
            prescribing, documentation, escalation, multidisciplinary working,
            and clinical governance. It can also give you UK-based supervisors
            and references. It does not, however, guarantee a specialty-training
            interview or offer. Keep evidence of your exact role, dates, grade,
            duties, and assessments rather than relying on the job title alone.
          </p>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="05 / Should you choose the UK pathway after this Act?"
          title="Yes, if you choose it with a realistic training plan"
        />
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#b8dccf] bg-[#f3fbf7] p-6">
            <h3 className="text-lg font-extrabold text-[#176743]">
              The UK may still suit you if
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-6">
              {[
                "You want a nationally coordinated GMC and NHS route rather than a US-style residency match.",
                "You are prepared to obtain registration, enter a service or locally employed role if needed, and build evidence before specialty training.",
                "Your target specialty, finances, visa position, and preferred location fit the current recruitment reality.",
                "You value paid clinical employment and are willing to remain flexible about geography and timing.",
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="mt-1 shrink-0 text-[#267a5b]"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-[#edd1d1] bg-[#fff8f8] p-6">
            <h3 className="text-lg font-extrabold text-[#9b2738]">
              Reconsider or compare alternatives if
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-6">
              {[
                "Your only acceptable outcome is immediate entry into a competitive specialty-training post.",
                "You cannot accept a non-training NHS role, a longer preparation period, or a location outside your first choice.",
                "Your immigration status does not support the route you are planning, or you have not confirmed sponsorship and right-to-work requirements.",
                "Your preferred specialty has a very small number of posts and you have not yet built a competitive portfolio.",
              ].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <Scale size={15} className="mt-1 shrink-0 text-[#b52237]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <BriefcaseMedical
              className="mt-0.5 shrink-0 text-primary"
              size={20}
            />
            <div>
              <h3 className="text-xl font-extrabold">Bottom line</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The Act makes the route more competitive for many IMGs, but it
                does not close the UK pathway. The safest plan is to treat GMC
                registration and NHS employment as one stage, specialty
                recruitment as a separate competitive stage, and the Act as one
                factor in your decision—not as a guarantee or an automatic
                rejection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="text-xs leading-5 text-muted-foreground">
          This guide is general educational information for international
          medical graduates. Prioritisation, recruitment, immigration, and GMC
          requirements can change. Confirm the current rules with the relevant
          official authority before applying or paying fees.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
          {officialLinks.map(([label, url]) => (
            <SourceLink key={label} label={label} url={url} />
          ))}
        </div>
      </footer>
    </div>
  );
}
