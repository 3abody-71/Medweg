import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Globe,
  HelpCircle,
  Users,
} from "lucide-react";
import countries from "../data/countries.json";
import { useApp } from "../contexts/AppContext";
import { assetPath } from "../lib/assetPath";

export default function Home() {
  const { profile } = useApp();

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="home-hero fade-up overflow-hidden rounded-2xl p-6 shadow-lg sm:p-8 lg:p-10">
        <div className="home-hero-background" aria-hidden="true">
          <span className="home-hero-orb home-hero-orb-one" />
          <span className="home-hero-orb home-hero-orb-two" />
          <span className="home-hero-grid" />
        </div>
        <img
          src={assetPath("/assets/media/hero-medical-students_cfadeffa.jpg")}
          alt="Medical students working together in a hospital"
          className="home-hero-photo"
          aria-hidden="true"
        />
        <div className="home-hero-content relative mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
              <Globe size={15} />
              {profile.name ? (
                <>Hello, {profile.name.split(" ")[0]} — </>
              ) : null}
              Nine pathways, one clear map
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[42px]">
              {profile.name
                ? `${profile.name
                    .split(" ")[0]}, find the country that fits your next medical chapter.`
                : "Find the country that fits your next medical chapter."}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/90 md:text-[15px]">
              Every pathway below has a different sequence of exams, language
              evidence, registration, and applications. Start with context,
              then verify the detail.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="stat-number text-2xl font-extrabold text-white">
                {countries.length}
              </span>
              <span className="text-xs text-white/80">Markets covered</span>
            </div>
          </div>
          <div className="hidden w-[240px] shrink-0 rounded-2xl bg-white/10 p-4 backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between text-white">
              <span className="text-xs font-bold">Markets covered</span>
              <span className="text-sm font-extrabold">{countries.length}</span>
            </div>
            <Link
              to="/explore"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#2784b0] shadow-lg transition-transform hover:-translate-y-0.5"
              data-testid="link-hero-explore"
            >
              Compare specialties too <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/explore"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-explore"
          >
            <Compass size={14} /> Explore specialties
          </Link>
          <Link
            to="/questions"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-questions"
          >
            <HelpCircle size={14} /> Ask a question
          </Link>
          <Link
            to="/profile"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-profile"
          >
            <Compass size={14} /> Discover your pathway
          </Link>
          <Link
            to="/community"
            className="btn-quiet inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
            data-testid="link-home-community"
          >
            <Users size={14} /> Community
          </Link>
        </div>
        <span className="text-xs font-bold text-muted-foreground">
          A calm place to map your options
        </span>
      </div>

      {/* A note on the numbers */}
      <p className="text-sm leading-6 text-muted-foreground">
        <span className="font-bold">A note on the numbers:</span>{" "}
        Salary and requirements vary by institution, year, visa, and licensing
        situation. Verify current details with the official licensing body and
        individual training program before making decisions.
      </p>
    </div>
  );
}
