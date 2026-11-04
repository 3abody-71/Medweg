import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Lock,
  Milestone,
} from "lucide-react";
import countries from "../data/countries.json";
import { useApp } from "../contexts/AppContext";
import GermanyPathway from "../components/GermanyPathway";
import UsaPathway from "../components/UsaPathway";
import CanadaPathway from "../components/CanadaPathway";
import UkPathway from "../components/UkPathway";
import IrelandPathway from "../components/IrelandPathway";
import AustraliaPathway from "../components/AustraliaPathway";
import { assetPath } from "../lib/assetPath";
import { isCountryVisible } from "../config/featureVisibility";
import { countryName, uiText } from "../lib/i18n";

const ARABIC_PATHWAYS: Record<
  string,
  { title: string; intro: string; steps: string[]; note: string }
> = {
  usa: {
    title: "المسار الطبي في الولايات المتحدة",
    intro:
      "مسار منظم لكنه تنافسي للخريجين الدوليين، يبدأ بالتحقق والشهادة ثم اختبارات USMLE والخبرة السريرية والتقديم للإقامة.",
    steps: [
      "إنشاء حساب ECFMG والتحقق من كلية الطب والمصادر الأساسية.",
      "اجتياز USMLE Step 1 وStep 2 CK واستكمال متطلبات الشهادة.",
      "بناء خبرة سريرية في الولايات المتحدة والحصول على خطابات توصية.",
      "التقديم عبر ERAS والمشاركة في المقابلات وNRMP Match.",
    ],
    note: "التأشيرة ومتطلبات الولاية وبرنامج الإقامة قد تضيف شروطاً منفصلة.",
  },
  uk: {
    title: "المسار الطبي في المملكة المتحدة",
    intro:
      "مسار وطني منظم للخريجين الدوليين يبدأ بالتسجيل لدى GMC ثم PLAB أو المسار المقبول، وبعدها العمل السريري والتقديم للتدريب التخصصي.",
    steps: [
      "التحقق من أهلية التسجيل لدى GMC وتجهيز إثبات اللغة.",
      "اجتياز PLAB 1 وPLAB 2 عند الحاجة أو التحقق من المسار البديل المقبول.",
      "الحصول على تسجيل GMC مع ترخيص مزاولة والعمل في NHS أو وظيفة مناسبة.",
      "بناء الخبرة والملف المهني ثم التقديم عبر Oriel للتدريب التخصصي.",
    ],
    note: "أولوية التدريب الطبي قد تغيّر ترتيب النظر في الطلبات، لكنها لا تلغي متطلبات التسجيل أو الاختيار التنافسي.",
  },
  australia: {
    title: "المسار الطبي في أستراليا",
    intro:
      "تجمع أستراليا بين معايير التسجيل الوطنية والتوظيف على مستوى المستشفى والولاية، ويعتمد المسار على المؤهل والخبرة والتخصص المقصود.",
    steps: [
      "اختيار مسار AMC المناسب والتحقق من المؤهل والمصدر الأساسي.",
      "استيفاء معيار اللغة وإكمال الاختبارات أو التقييم المعتمد.",
      "الحصول على وظيفة تحت الإشراف واستكمال متطلبات التسجيل لدى Ahpra.",
      "التقدم من التسجيل العام إلى التدريب التخصصي حسب الولاية والكلية.",
    ],
    note: "التسجيل والتأشيرة والتوظيف متطلبات منفصلة؛ لا يحل أحدها محل الآخر.",
  },
  canada: {
    title: "المسار الطبي في كندا",
    intro:
      "مسار عالي المتطلبات يختلف حسب المقاطعة والبرنامج والجهة التنظيمية، مع أهمية اللغة والاختبارات والخبرة والقيود الخاصة بالخريجين الدوليين.",
    steps: [
      "تحديد المقاطعة والمسار المناسب: CaRMS أو PRA أو تقييم خاص.",
      "إكمال التحقق من المؤهل والاختبارات ومتطلبات اللغة للمقاطعة.",
      "مراجعة شروط الجنسية والإقامة والالتزام بالعمل أو الخدمة عند وجودها.",
      "التقديم إلى برنامج الإقامة أو التقييم السريري ثم التسجيل الإقليمي.",
    ],
    note: "لا يوجد مسار كندي واحد؛ يجب مراجعة شروط المقاطعة والبرنامج المحدد قبل دفع الرسوم.",
  },
  germany: {
    title: "المسار الطبي في ألمانيا",
    intro:
      "تحتاج ممارسة الطب السريري إلى الاعتراف بالمؤهل واللغة الألمانية، ثم الترخيص المهني والعمل والتقدم نحو التخصص.",
    steps: [
      "تجهيز الشهادة والسجل الأكاديمي والترجمة والتحقق من المؤهلات.",
      "الوصول إلى مستوى اللغة الألمانية B2 ثم لغة طبية بمستوى C1 Medizin.",
      "اجتياز Fachsprachprüfung وامتحان المعرفة عند طلب الجهة المختصة.",
      "الحصول على Approbation أو الترخيص المناسب ثم بدء العمل والتخصص.",
    ],
    note: "تختلف الإجراءات حسب الولاية الألمانية، لذلك يجب اتباع تعليمات الجهة المحلية المختصة.",
  },
  ireland: {
    title: "المسار الطبي في أيرلندا",
    intro:
      "مسار ناطق بالإنجليزية يبدأ بتسجيل Medical Council ثم العمل في المستشفى والتنافس على التدريب التخصصي.",
    steps: [
      "تجهيز المؤهل وفترة الامتياز وإثبات اللغة والوثائق المطلوبة.",
      "التقديم إلى Medical Council وتحديد ما إذا كانت PRES أو إعفاءاتها تنطبق.",
      "الحصول على وظيفة مستشفى مناسبة وبناء الخبرة والملف المهني.",
      "التقديم إلى CST أو BST أو HST أو المسار التخصصي المناسب.",
    ],
    note: "تحتاج وظائف الأطباء من خارج المنطقة الاقتصادية الأوروبية إلى تصريح عمل ووضع هجرة مناسب.",
  },
};

const ARABIC_PATHWAY_DETAILS: Record<
  string,
  {
    requirements: string[];
    planning: string[];
    career: string;
    immigration: string;
  }
> = {
  usa: {
    requirements: [
      "شهادة طبية مقبولة والتحقق من المصدر الأساسي عبر ECFMG.",
      "إثبات اللغة الإنجليزية ومتطلبات ECFMG Pathways عند انطباقها.",
      "اجتياز USMLE Step 1 وStep 2 CK وتجهيز الخبرة السريرية وخطابات التوصية.",
    ],
    planning: [
      "اختيار التخصص مبكراً وبناء سجل أكاديمي وسريري يناسبه.",
      "تجهيز السيرة الذاتية والبيانات الشخصية والرسائل قبل دورة ERAS.",
      "مقارنة البرامج حسب التدريب والموقع والتأشيرة وتكلفة المعيشة.",
    ],
    career:
      "بعد القبول تبدأ الإقامة الطبية، ثم امتحانات ومتطلبات التخصص والزمالة أو الممارسة المستقلة حسب الولاية.",
    immigration:
      "تأشيرة J-1 شائعة للتدريب الطبي، وقد تكون تأشيرة H-1B متاحة في بعض البرامج بشروط إضافية.",
  },
  uk: {
    requirements: [
      "مؤهل طبي مقبول والتحقق من المصدر الأساسي وإثبات اللغة الإنجليزية.",
      "استيفاء متطلبات GMC واجتياز PLAB 1 وPLAB 2 أو مسار تسجيل بديل.",
      "إثبات التدريب العملي واللياقة المهنية وحق العمل أو وضع الهجرة المناسب.",
    ],
    planning: [
      "البدء بوظيفة NHS أو وظيفة غير تدريبية عند الحاجة لبناء الخبرة والمراجع.",
      "تنظيم ملفك المهني: التقييمات والتدقيق والتعليم والبحث والخبرة التخصصية.",
      "قراءة مواصفات Oriel لكل تخصص لأن الأهلية والأولوية قد تختلف حسب السنة.",
    ],
    career:
      "بعد التسجيل يمكن العمل في وظيفة خدمة أو تدريب، ثم التقديم إلى Foundation أو Core أو Specialty Training حسب المرحلة.",
    immigration:
      "يجب تأكيد الرعاية وحق العمل ونوع التأشيرة قبل قبول وظيفة NHS؛ التأشيرة وحدها لا تمنح التسجيل الطبي.",
  },
  australia: {
    requirements: [
      "التحقق من المؤهل والهوية والمصدر الأساسي عبر المسار المناسب.",
      "إثبات اللغة الإنجليزية واستكمال تقييم AMC أو المسار المعتمد.",
      "خطة واضحة للتسجيل والإشراف والتوظيف حسب الولاية والتخصص.",
    ],
    planning: [
      "مراجعة متطلبات Medical Board وAhpra والكلية التخصصية المختارة.",
      "اختيار مستشفى أو وظيفة تحت الإشراف تسمح بتوثيق الكفاءة السريرية.",
      "حساب تكلفة الامتحانات والسفر والتسجيل والتأمين والمعيشة.",
    ],
    career:
      "قد يبدأ الطبيب بوظيفة تحت الإشراف أو تسجيل محدود، ثم ينتقل إلى التسجيل العام والتدريب التخصصي.",
    immigration:
      "التأشيرة والتسجيل والتوظيف إجراءات منفصلة؛ احصل على المشورة الحالية من Home Affairs وصاحب العمل.",
  },
  canada: {
    requirements: [
      "اختيار المقاطعة والجهة التنظيمية ومعرفة قيود الخريجين الدوليين.",
      "التحقق من المؤهل وإكمال اختبارات MCC وإثبات اللغة المطلوب.",
      "مراجعة شروط الإقامة أو الجنسية والالتزام بالخدمة قبل التقديم.",
    ],
    planning: [
      "مقارنة CaRMS وPRA والمسارات الخاصة بكل مقاطعة قبل دفع رسوم التقييم.",
      "إعداد خطابات التوصية والخبرة السريرية والوثائق بطريقة تناسب البرنامج.",
      "التخطيط لتكاليف الامتحانات والسفر ومدة الانتظار والمنافسة المحلية.",
    ],
    career:
      "قد يكون المسار عبر الإقامة الكندية أو تقييم الممارسة السابقة، وتحدد المقاطعة نطاق الترخيص والعمل.",
    immigration:
      "قد يرتبط تصريح العمل بالترشيح الإقليمي أو بعقد محدد؛ تحقق من متطلبات IRCC والمقاطعة معاً.",
  },
  germany: {
    requirements: [
      "الشهادة الطبية والسجل الأكاديمي والترجمة والوثائق المهنية المطلوبة.",
      "اللغة الألمانية العامة B2 واللغة الطبية C1 Medizin في المسار الشائع.",
      "إثبات اللياقة وحسن السيرة واجتياز اختبارات اللغة والمعرفة عند طلبها.",
    ],
    planning: [
      "اختيار الولاية المسؤولة ومراجعة تعليماتها قبل إرسال الملف.",
      "الاستعداد لـ Fachsprachprüfung ثم Kenntnisprüfung عند الحاجة.",
      "مقارنة المستشفى والتخصص والراتب وتكلفة المعيشة قبل قبول العرض.",
    ],
    career:
      "بعد الترخيص يمكن بدء وظيفة طبيب مساعد ثم التقدم داخل قسم معتمد نحو شهادة التخصص الألمانية.",
    immigration:
      "قد تناسب تأشيرة البحث عن عمل أو العمل الماهر بعض الحالات، لكنها لا تستبدل الاعتراف والترخيص الطبي.",
  },
  ireland: {
    requirements: [
      "مؤهل طبي وفترة امتياز موثقة وإثبات اللغة الإنجليزية.",
      "تحديد فئة التسجيل لدى Medical Council ومعرفة ما إذا كانت PRES أو إعفاءاتها تنطبق.",
      "وثائق حسن السيرة والتسجيل السابق والهوية والمرجعيات المهنية.",
    ],
    planning: [
      "استخدام وظيفة مستشفى أولية لبناء خبرة ومراجع داخل النظام الصحي الأيرلندي.",
      "اختيار CST أو BST أو HST حسب التخصص والقدرة التنافسية.",
      "الاستعداد لاختلاف متطلبات المستشفى والكلية والمنافسة السنوية.",
    ],
    career:
      "يمكن الانتقال من وظيفة المستشفى إلى التدريب التخصصي الرسمي، ثم إلى تسجيل التخصص والممارسة المستقلة.",
    immigration:
      "يحتاج الطبيب من خارج المنطقة الاقتصادية الأوروبية إلى تصريح عمل ووضع هجرة مناسب قبل بدء العمل.",
  },
};

function ArabicPathwaySummary({ countryId }: { countryId: string }) {
  const pathway = ARABIC_PATHWAYS[countryId];
  const detail = ARABIC_PATHWAY_DETAILS[countryId];
  if (!pathway) return null;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="eyebrow">المسار الرئيسي</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {pathway.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          {pathway.intro}
        </p>
      </div>
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-extrabold">المتطلبات الأساسية</h3>
        <div className="mt-4 grid gap-3">
          {detail?.requirements.map(item => (
            <p
              key={item}
              className="rounded-xl bg-secondary/55 p-4 text-sm leading-6"
            >
              {item}
            </p>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-extrabold">الخطوات بالتفصيل</h3>
        <div className="mt-4 grid gap-3">
          {pathway.steps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                {index + 1}
              </span>
              <p className="text-sm leading-6">{step}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-extrabold">التخطيط للتدريب والوظيفة</h3>
        <div className="mt-4 grid gap-3">
          {detail?.planning.map(item => (
            <p
              key={item}
              className="rounded-xl border border-border bg-background p-4 text-sm leading-6"
            >
              {item}
            </p>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {detail?.career}
        </p>
      </section>
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-extrabold">الهجرة والتأشيرة</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {detail?.immigration}
        </p>
      </section>
      <p className="mt-5 rounded-xl border border-[#e5c992] bg-[#fffaf0] p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">ملاحظة مهمة: </strong>
        {pathway.note}
      </p>
      <p className="mt-5 text-xs leading-5 text-muted-foreground">
        هذه معلومات توجيهية تعليمية. تحقق دائماً من المتطلبات الحالية مع جهة
        الترخيص والبرنامج الرسمي قبل التقديم أو دفع الرسوم.
      </p>
    </section>
  );
}

export default function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const { savedCountryIds, toggleCountry, isArabic } = useApp();

  const country = countries.find(c => c.id === id);

  if (id && !isCountryVisible(id)) return <Navigate to="/" replace />;

  if (!country) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-10 text-center">
        <p className="text-lg font-extrabold">Pathway not found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This country may have moved. Return to the pathway library to
          continue.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-secondary"
          data-testid="link-back-countries"
        >
          <ArrowLeft size={13} /> Back to country pathways
        </Link>
      </div>
    );
  }

  const saved = savedCountryIds.includes(country.id);
  const displayName = countryName(country.id, country.name, isArabic);

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="topbar-link inline-flex items-center gap-2 text-sm"
        data-testid="link-back-countries"
      >
        <ArrowLeft size={14} />{" "}
        {uiText(isArabic, "Country pathways", "مسارات الدول")}
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="country-card-image h-56">
          <img
            src={assetPath(country.image)}
            alt={displayName}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-lg bg-white/92 px-3 py-1.5 text-sm font-extrabold shadow-sm">
            {country.flag}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {displayName}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {uiText(
                  isArabic,
                  "Pathway context for international medical graduates",
                  "معلومات المسار للخريجين الطبيين الدوليين"
                )}
              </p>
            </div>
            <button
              onClick={() => toggleCountry(country.id)}
              className={`btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold ${saved ? "text-primary" : ""}`}
              data-testid={`button-save-country-${country.id}`}
            >
              {saved
                ? uiText(isArabic, "Saved", "تم الحفظ")
                : uiText(isArabic, "Save country", "حفظ الدولة")}
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            {isArabic
              ? uiText(
                  isArabic,
                  country.summary,
                  "مسار طبي منظم يساعد الخريجين الدوليين على فهم التسجيل والتدريب والخطوات العملية في هذه الدولة."
                )
              : country.summary}
          </p>
        </div>
      </div>

      {isArabic ? (
        <ArabicPathwaySummary countryId={country.id} />
      ) : country.id === "usa" ? (
        <UsaPathway />
      ) : country.id === "germany" ? (
        <GermanyPathway />
      ) : country.id === "canada" ? (
        <CanadaPathway />
      ) : country.id === "uk" ? (
        <UkPathway />
      ) : country.id === "ireland" ? (
        <IrelandPathway />
      ) : country.id === "australia" ? (
        <AustraliaPathway />
      ) : null}
      {country.id !== "usa" &&
        country.id !== "germany" &&
        country.id !== "canada" &&
        country.id !== "uk" &&
        country.id !== "ireland" &&
        country.id !== "australia" && (
          <>
            <section>
              <h2 className="text-lg font-extrabold">
                {uiText(isArabic, "At a glance", "نظرة سريعة")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {uiText(isArabic, "Licensing body", "جهة الترخيص")}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.licensingBody}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {uiText(isArabic, "Language evidence", "إثبات اللغة")}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.languageRequirement}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {uiText(isArabic, "Residency range", "مدة الإقامة")}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.residencyRange}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {uiText(
                      isArabic,
                      "Salary during training",
                      "الراتب أثناء التدريب"
                    )}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {country.salaryRange}
                  </p>
                </div>
              </div>
            </section>
            <section className="citizenship-card rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#c77f1e]" />
                <h2 className="text-base font-extrabold">
                  {uiText(
                    isArabic,
                    "Citizenship timeline (general)",
                    "الجدول العام للحصول على الجنسية"
                  )}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-6">
                {country.citizenshipTimeline}
              </p>
              <p className="mt-4 rounded-lg bg-white/60 p-3 text-xs leading-5 text-muted-foreground">
                {uiText(
                  isArabic,
                  "General orientation only. Eligibility, residence type, language, permanent residence, absences, and processing time matter. This is not legal advice.",
                  "معلومات توجيهية عامة فقط. تعتمد الأهلية على نوع الإقامة واللغة والإقامة الدائمة وفترات الغياب ومدة معالجة الطلب. هذه ليست استشارة قانونية."
                )}
              </p>
              {country.officialAuthorityUrl && (
                <a
                  href={country.officialAuthorityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  {uiText(isArabic, "Official guidance", "الإرشادات الرسمية")}{" "}
                  <ExternalLink size={12} />
                </a>
              )}
            </section>
            <div className="grid gap-6 lg:grid-cols-2">
              <section>
                <h2 className="text-lg font-extrabold">
                  {uiText(
                    isArabic,
                    "Typical requirements",
                    "المتطلبات المعتادة"
                  )}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {country.requirements.map(req => (
                    <li key={req} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-extrabold">
                  {uiText(isArabic, "A practical sequence", "التسلسل العملي")}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  {uiText(
                    isArabic,
                    "The sequence is an orientation, not an application checklist. Requirements can differ by authority and program.",
                    "هذا التسلسل للتوجيه وليس قائمة طلب رسمية. قد تختلف المتطلبات حسب الجهة والبرنامج."
                  )}
                </p>
                <ol className="mt-4 space-y-4">
                  {country.steps.map((step, i) => (
                    <li key={step} className="route-step">
                      <span className="step-dot">{i + 1}</span>
                      <p className="text-sm leading-5">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            <section>
              <h2 className="text-lg font-extrabold">
                {uiText(
                  isArabic,
                  "What the road usually looks like",
                  "كيف يبدو المسار عادةً"
                )}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {uiText(
                  isArabic,
                  "Most international graduates move from language evidence and primary source verification, through registration and supervised clinical experience, into a structured training program, and finally toward long-term residency options. The pace differs by country, but the shape of the road is recognisable.",
                  "ينتقل معظم الخريجين الدوليين من إثبات اللغة والتحقق من المصدر الأساسي، مروراً بالتسجيل والخبرة السريرية تحت الإشراف، إلى برنامج تدريب منظم ثم خيارات الإقامة طويلة الأمد. تختلف السرعة حسب الدولة، لكن شكل المسار واضح."
                )}
              </p>
            </section>
            <section className="rounded-2xl border border-dashed border-border bg-card/60 p-6">
              <div className="flex items-center gap-2">
                <Milestone size={16} className="text-muted-foreground" />
                <h2 className="text-base font-extrabold">
                  {uiText(isArabic, "Country updates", "تحديثات الدولة")}
                </h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {uiText(
                  isArabic,
                  "These empty spaces are ready for a short country briefing, a direct MP4 video link, or your own notes.",
                  "هذه المساحات جاهزة لإضافة موجز قصير عن الدولة أو رابط فيديو مباشر أو ملاحظاتك الخاصة."
                )}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background/70 p-4 text-sm">
                  <p className="font-bold">
                    {uiText(
                      isArabic,
                      "Country status letter",
                      "موجز حالة الدولة"
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {uiText(
                      isArabic,
                      "No briefing yet — you can add one later.",
                      "لا يوجد موجز بعد — يمكنك إضافته لاحقاً."
                    )}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background/70 p-4 text-sm">
                  <p className="font-bold">
                    {uiText(isArabic, "Country video", "فيديو عن الدولة")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {uiText(
                      isArabic,
                      "No video yet — you can add a direct video URL later.",
                      "لا يوجد فيديو بعد — يمكنك إضافة رابط مباشر لاحقاً."
                    )}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

      <section id="pathway-info" className="scroll-mt-24">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              {uiText(isArabic, "Pathway library", "مكتبة المسارات")}
            </p>
            <h2 className="mt-1 text-lg font-extrabold">
              {uiText(
                isArabic,
                `More about the ${country.name} pathway`,
                `المزيد عن مسار ${displayName}`
              )}
            </h2>
          </div>
          <BookOpen size={20} className="text-primary" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-extrabold">
              {uiText(isArabic, "Licensing & registration", "الترخيص والتسجيل")}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {uiText(
                isArabic,
                "Understand the main authority, verification steps, and registration milestones for this route.",
                "تعرّف على الجهة الرئيسية وخطوات التحقق ومراحل التسجيل لهذا المسار."
              )}
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-extrabold">
              {uiText(isArabic, "Language & documents", "اللغة والوثائق")}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {uiText(
                isArabic,
                "Prepare the language evidence and core documents commonly requested from international graduates.",
                "جهّز إثبات اللغة والوثائق الأساسية المطلوبة عادةً من الخريجين الدوليين."
              )}
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-extrabold">
              {uiText(isArabic, "Training & applications", "التدريب والطلبات")}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {uiText(
                isArabic,
                "Map the training stage, application route, and practical next step before you apply.",
                "حدّد مرحلة التدريب وطريقة التقديم والخطوة العملية التالية قبل التقديم."
              )}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
