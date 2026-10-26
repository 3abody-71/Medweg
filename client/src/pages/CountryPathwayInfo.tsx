import { ArrowLeft, ArrowRight, BookOpen, FileText } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import countries from "../data/countries.json";
import { isCountryVisible } from "../config/featureVisibility";
import { assetPath } from "../lib/assetPath";

export default function CountryPathwayInfo() {
  const { id } = useParams<{ id: string }>();
  const country = countries.find(item => item.id === id);

  if (!country || (id && !isCountryVisible(id))) return <Navigate to="/" replace />;

  return (
    <div className="space-y-8">
      <Link to={`/countries/${country.id}`} className="topbar-link inline-flex items-center gap-2 text-sm"><ArrowLeft size={14} /> Main route</Link>

      <header className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="eyebrow">{country.flag} {country.name} / Pathway library</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Pathway information</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Short, expandable articles for the {country.name} route. This is separate from the main pathway page, so more guides can be added here without changing the route itself.</p>
      </header>

      <section aria-labelledby="article-library-heading">
        <div className="flex items-end justify-between gap-3"><div><p className="eyebrow">Article library</p><h2 id="article-library-heading" className="mt-1 text-xl font-extrabold">Available guides</h2></div><BookOpen size={20} className="text-primary" /></div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {country.id === "usa" ? (
            <Link to="/countries/usa/pathway-info/usmle" className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <div className="h-28 bg-secondary"><img src={assetPath("/assets/usa/usmle/pathoma-anki-sketchy-collage.jpg")} alt="USMLE preparation books and resources" className="h-full w-full object-cover object-center" /></div>
              <div className="p-5"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><FileText size={19} /></div><ArrowRight size={17} className="text-primary transition group-hover:translate-x-1" /></div>
              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-primary">USMLE / Exams</p>
              <h3 className="mt-1 text-lg font-extrabold">Step 1 and Step 2 Preparation</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Essential numbers, subjects, preparation, costs, results, and retakes for IMGs.</p>
              </div>
            </Link>
          ) : null}
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-5"><p className="text-sm font-extrabold">More articles coming soon</p><p className="mt-2 text-sm leading-6 text-muted-foreground">This library is ready for additional country-specific guides.</p></div>
        </div>
      </section>
    </div>
  );
}
