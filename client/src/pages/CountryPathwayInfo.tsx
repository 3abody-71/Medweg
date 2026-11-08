import { ArrowLeft, ArrowRight, BookOpen, FileText } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import countries from "../data/countries.json";
import { isCountryVisible } from "../config/featureVisibility";
import { assetPath } from "../lib/assetPath";
import { countryName, uiText } from "../lib/i18n";
import { useApp } from "../contexts/AppContext";

export default function CountryPathwayInfo() {
  const { id } = useParams<{ id: string }>();
  const { isArabic } = useApp();
  const country = countries.find(item => item.id === id);

  if (!country || (id && !isCountryVisible(id)))
    return <Navigate to="/" replace />;

  const displayName = countryName(country.id, country.name, isArabic);

  return (
    <div className="space-y-8">
      <Link
        to={`/countries/${country.id}`}
        className="topbar-link inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft size={14} />{" "}
        {uiText(isArabic, "Main route", "المسار الرئيسي")}
      </Link>

      <header className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="eyebrow">
          {country.flag} {displayName} /{" "}
          {uiText(isArabic, "Pathway library", "مكتبة المسارات")}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {uiText(isArabic, "Pathway information", "معلومات المسار")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          {uiText(
            isArabic,
            `Short, expandable articles for the ${country.name} route. This is separate from the main pathway page, so more guides can be added here without changing the route itself.`,
            `مقالات مختصرة قابلة للتوسع عن مسار ${displayName}. هذه الصفحة منفصلة عن المسار الرئيسي، لذلك يمكن إضافة أدلة جديدة هنا دون تغيير المسار نفسه.`
          )}
        </p>
      </header>

      <section aria-labelledby="article-library-heading">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">
              {uiText(isArabic, "Article library", "مكتبة المقالات")}
            </p>
            <h2
              id="article-library-heading"
              className="mt-1 text-xl font-extrabold"
            >
              {uiText(isArabic, "Available guides", "الأدلة المتاحة")}
            </h2>
          </div>
          <BookOpen size={20} className="text-primary" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {country.id === "usa" ? (
            <Link
              to="/countries/usa/pathway-info/usmle"
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="h-28 bg-secondary">
                <img
                  src={assetPath(
                    "/assets/usa/usmle/pathoma-anki-sketchy-collage.jpg"
                  )}
                  alt="USMLE preparation books and resources"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                    <FileText size={19} />
                  </div>
                  <ArrowRight
                    size={17}
                    className="text-primary transition group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  {uiText(isArabic, "USMLE / Exams", "USMLE / الاختبارات")}
                </p>
                <h3 className="mt-1 text-lg font-extrabold">
                  {uiText(
                    isArabic,
                    "Step 1 and Step 2 Preparation",
                    "التحضير للخطوتين الأولى والثانية"
                  )}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {uiText(
                    isArabic,
                    "Essential numbers, subjects, preparation, costs, results, and retakes for IMGs.",
                    "الأرقام والمواد والتحضير والتكاليف والنتائج وإعادة الاختبار للخريجين الدوليين."
                  )}
                </p>
              </div>
            </Link>
          ) : null}
          {country.id === "uk" ? (
            <Link
              to="/countries/uk/pathway-info/prioritisation-2026"
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="h-28 bg-secondary">
                <img
                  src={assetPath("/assets/uk/uk-prioritisation-hero.jpeg")}
                  alt="Doctor working in an operating theatre"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                    <FileText size={19} />
                  </div>
                  <ArrowRight
                    size={17}
                    className="text-primary transition group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  {uiText(
                    isArabic,
                    "UK / 2026 policy",
                    "المملكة المتحدة / سياسة 2026"
                  )}
                </p>
                <h3 className="mt-1 text-lg font-extrabold">
                  {uiText(
                    isArabic,
                    "UK Medical Training Prioritisation 2026",
                    "أولوية التدريب الطبي في المملكة المتحدة 2026"
                  )}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {uiText(
                    isArabic,
                    "What the Act means for IMGs, NHS experience, specialty training, and choosing the UK route.",
                    "ماذا يعني القانون للخريجين الدوليين، وخبرة NHS، وتدريب التخصص، واختيار مسار المملكة المتحدة."
                  )}
                </p>
              </div>
            </Link>
          ) : null}
          {country.id === "germany" ? (
            <Link
              to="/countries/germany/pathway-info/states-salaries-shifts"
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="h-28 bg-secondary">
                <img
                  src={assetPath("/assets/germany/states/germany-states-map.jpg")}
                  alt="Map of the 16 German federal states"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                    <FileText size={19} />
                  </div>
                  <ArrowRight
                    size={17}
                    className="text-primary transition group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  Germany / Doctors and states
                </p>
                <h3 className="mt-1 text-lg font-extrabold">
                  Salaries, states, night shifts, and holidays
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Compare gross and net pay, the largest medical markets, duty types, and annual leave.
                </p>
              </div>
            </Link>
          ) : null}
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-5">
            <p className="text-sm font-extrabold">
              {uiText(
                isArabic,
                "More articles coming soon",
                "مقالات إضافية قريباً"
              )}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {uiText(
                isArabic,
                "This library is ready for additional country-specific guides.",
                "هذه المكتبة جاهزة لإضافة أدلة خاصة بكل دولة."
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
