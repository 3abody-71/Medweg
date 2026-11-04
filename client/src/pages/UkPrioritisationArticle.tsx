import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseMedical,
  CheckCircle2,
  FileText,
  HelpCircle,
  Scale,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assetPath } from "../lib/assetPath";
import { useApp } from "../contexts/AppContext";
import { uiText } from "../lib/i18n";

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

function Question({
  number,
  question,
  children,
}: {
  number: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          <HelpCircle size={20} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Question {number}
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
            {question}
          </h2>
        </div>
      </div>
      <div className="mt-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </section>
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
  const { isArabic } = useApp();
  const t = (english: string, arabic: string) =>
    uiText(isArabic, english, arabic);

  return (
    <div className="space-y-6">
      <Link
        to="/countries/uk/pathway-info"
        className="topbar-link inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft size={14} />{" "}
        {t("UK pathway info", "معلومات مسار المملكة المتحدة")}
      </Link>

      <header className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[330px] overflow-hidden bg-[#1b2a3c]">
            <img
              src={assetPath("/assets/uk/uk-prioritisation-hero.jpeg")}
              alt="Doctor working in an operating theatre"
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#111d2d]/95 via-[#203c58]/40 to-[#9c303e]/30" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">
                {t(
                  "UK / 2026 policy FAQ",
                  "المملكة المتحدة / الأسئلة الشائعة لسياسة 2026"
                )}
              </p>
              <h1 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t(
                  "What does UK medical training prioritisation mean for IMGs?",
                  "ماذا تعني أولوية التدريب الطبي في المملكة المتحدة للخريجين الدوليين؟"
                )}
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-secondary px-3 py-1.5">
                {t("Questions & answers", "أسئلة وأجوبة")}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                {t("Foundation training", "التدريب التأسيسي")}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1.5">
                {t("Specialty training", "تدريب التخصص")}
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {t(
                "The Medical Training (Prioritisation) Act changed the order in which some UK postgraduate training places are allocated. This FAQ explains what the rule means for international medical graduates, how NHS experience fits into the framework, and how to decide whether the UK remains a sensible route.",
                "غيّر قانون أولوية التدريب الطبي ترتيب تخصيص بعض أماكن التدريب الطبي بعد التخرج في المملكة المتحدة. توضح هذه الأسئلة الشائعة معنى القاعدة للخريجين الطبيين الدوليين، وكيف تندرج خبرة NHS ضمن الإطار، وكيف تقرر ما إذا كان مسار المملكة المتحدة مناسباً لك."
              )}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-primary">
              <FileText size={15} />{" "}
              {t("Updated November 2026", "آخر تحديث: نوفمبر 2026")}
            </div>
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-[#e5c992] bg-[#fffaf0] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Scale className="mt-0.5 shrink-0 text-[#9a5b12]" size={19} />
          <div>
            <h2 className="font-extrabold">
              {t("Quick answer", "الإجابة المختصرة")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t(
                "The Act changes who is considered first for some UK postgraduate training places. It does not automatically bar every IMG, and it does not guarantee a place to every UK graduate. Applicants must still meet GMC, programme, immigration, and competitive-selection requirements.",
                "يغيّر القانون من يتم النظر في طلبه أولاً لبعض أماكن التدريب الطبي بعد التخرج في المملكة المتحدة. ولا يمنع تلقائياً كل خريج دولي، كما لا يضمن مكاناً لكل خريج بريطاني. يجب أن يستوفي المتقدمون متطلبات GMC والبرنامج والهجرة والاختيار التنافسي."
              )}
            </p>
          </div>
        </div>
      </div>

      <Question
        number="1"
        question={t(
          "What is the UK medical training prioritisation rule?",
          "ما هي قاعدة أولوية التدريب الطبي في المملكة المتحدة؟"
        )}
      >
        <p>
          It is a statutory priority system for postgraduate medical training.
          It changes the order in which eligible applicants are considered for
          interviews, offers, or allocated places. It does not replace GMC
          registration, the programme person specification, immigration
          permission, or competitive selection.
        </p>
        <p className="mt-4">
          For Foundation Programme places, UK medical graduates receive
          priority. The priority group also includes qualifying graduates from
          the Republic of Ireland and qualifying graduates from medical
          institutions in Iceland, Norway, Liechtenstein, and Switzerland,
          subject to the statutory conditions.
        </p>
        <p className="mt-4">
          For specialty training offers made in 2026, priority includes UK,
          Irish, and specified international medical graduates, people who have
          completed or are completing relevant prior UK training, and applicants
          in specified citizenship or immigration-status categories. For places
          starting from 2027, the regulations prioritise the same broad status
          categories for interviews and offers.
        </p>
      </Question>

      <Question
        number="2"
        question={t(
          "Does the rule mean that every IMG is barred from UK training?",
          "هل تعني القاعدة منع كل خريج دولي من التدريب في المملكة المتحدة؟"
        )}
      >
        <p>
          No. An IMG may still apply if they meet the GMC, registration,
          immigration, and programme requirements. The important difference is
          whether the applicant also falls within a statutory priority group
          when interviews or offers are allocated.
        </p>
        <p className="mt-4">
          Priority is applied within the recruitment and allocation process. It
          is not an automatic rejection, and it is not an automatic training
          place. Always check the recruitment year, the exact programme, and the
          current Oriel person specification.
        </p>
      </Question>

      <Question
        number="3"
        question={t(
          "Who may receive priority for specialty training?",
          "من يمكن أن يحصل على أولوية في تدريب التخصص؟"
        )}
      >
        <div className="space-y-3">
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
        <p className="mt-4">
          The exact category matters. For example, a British citizen with an
          overseas medical degree may fall into a specialty-training status
          category, but that does not make them a UK medical graduate for every
          part of the Act. An IMG holding only a time-limited work visa is not
          automatically equivalent to someone with indefinite leave or settled
          status.
        </p>
      </Question>

      <Question
        number="4"
        question={t(
          "Why was this policy introduced in 2026?",
          "لماذا أُدخلت هذه السياسة في عام 2026؟"
        )}
      >
        <p>
          The government says the policy is intended to create a clearer path
          from UK medical school into postgraduate training, protect public
          investment in medical education, improve retention, and reduce
          long-term reliance on international recruitment.
        </p>
        <p className="mt-4">
          It was also introduced while applications and the number of doctors
          seeking specialty training were growing faster than the number of
          available posts. The 2025 specialty round recorded 80,218 applications
          for 9,479 posts—an average of 8.5 applications per post. The
          parliamentary briefing reported a 23% success rate for international
          doctors compared with 69% for UK-trained doctors in 2023–24.
        </p>
        <p className="mt-4">
          These figures explain the policy rationale; they are not a promise
          that the change will improve every applicant’s prospects. The
          parliamentary briefing also records concerns about the effect on IMGs
          with existing NHS ties and about staffing gaps.
        </p>
      </Question>

      <Question
        number="5"
        question={t(
          "Does NHS experience give an IMG priority?",
          "هل تمنح خبرة NHS الخريج الدولي أولوية؟"
        )}
      >
        <p>
          Not automatically. For specialty offers made in 2026, the Act used
          specified immigration statuses as a temporary proxy for applicants
          more likely to have significant NHS experience. NHS employment by
          itself was not a separate universal priority category.
        </p>
        <p className="mt-4">
          For later years, the policy intention is to identify significant
          experience working as a doctor in the NHS or other UK health services,
          but the exact threshold depends on the regulations and recruitment
          guidance in force.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
              "Organise workplace assessments, audits, quality improvement, teaching, courses, and publications.",
            ],
            [
              "Read the person specification",
              "Apply only where your registration, experience, exams, and immigration status meet the current criteria.",
            ],
          ].map(([title, body]) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-background p-4"
            >
              <h3 className="font-extrabold">{title}</h3>
              <p className="mt-1 text-sm">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5">
          An NHS job can improve your knowledge of local pathways, prescribing,
          documentation, escalation, multidisciplinary working, and clinical
          governance. It can also give you UK-based supervisors and references.
          It does not guarantee a specialty-training interview or offer, so keep
          evidence of your exact role, dates, grade, duties, and assessments.
        </p>
      </Question>

      <Question
        number="6"
        question={t(
          "Should an IMG still choose the UK pathway?",
          "هل لا يزال على الخريج الدولي اختيار مسار المملكة المتحدة؟"
        )}
      >
        <p>
          The UK may still suit you if you want a nationally coordinated GMC and
          NHS route, are prepared to obtain registration and possibly enter a
          service or locally employed role first, and can build evidence before
          specialty training. Your target specialty, finances, visa position,
          preferred location, and willingness to remain flexible about timing
          all matter.
        </p>
        <p className="mt-4">
          Compare alternatives if your only acceptable outcome is immediate
          entry into a competitive specialty-training post, you cannot accept a
          non-training NHS role or a longer preparation period, your immigration
          plan is not confirmed, or your preferred specialty has very few posts
          and you have not yet built a competitive portfolio.
        </p>
        <div className="mt-5 rounded-xl border border-[#d5e2f2] bg-[#f5f9ff] p-5">
          <div className="flex items-start gap-3">
            <BriefcaseMedical
              className="mt-0.5 shrink-0 text-primary"
              size={20}
            />
            <div>
              <h3 className="font-extrabold">{t("Bottom line", "الخلاصة")}</h3>
              <p className="mt-1">
                The Act makes the route more competitive for many IMGs, but it
                does not close the UK pathway. Treat GMC registration and NHS
                employment as one stage, specialty recruitment as a separate
                competitive stage, and the Act as one factor in your
                decision—not as a guarantee or an automatic rejection.
              </p>
            </div>
          </div>
        </div>
      </Question>

      <footer className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="text-xs leading-5 text-muted-foreground">
          {t(
            "This FAQ is general educational information for international medical graduates. Prioritisation, recruitment, immigration, and GMC requirements can change. Confirm the current rules with the relevant official authority before applying or paying fees.",
            "هذه الأسئلة الشائعة معلومات تعليمية عامة للخريجين الطبيين الدوليين. قد تتغير قواعد الأولوية والتوظيف والهجرة ومتطلبات GMC. تأكد من القواعد الحالية مع الجهة الرسمية المختصة قبل التقديم أو دفع الرسوم."
          )}
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
