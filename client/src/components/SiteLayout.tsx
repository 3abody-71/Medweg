import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Menu,
  X,
  Moon,
  Sun,
  Stethoscope,
  Users,
  Info,
  ShieldCheck,
  Compass,
  HelpCircle,
  GraduationCap,
  Languages,
} from "lucide-react";
import { assetPath } from "../lib/assetPath";
import { useAuth } from "../contexts/AuthContext";
import { LANGUAGE_LABELS, useApp } from "../contexts/AppContext";
import { FEATURE_VISIBILITY } from "../config/featureVisibility";

const NAV_ITEMS = [
  { href: "/", label: "Countries", icon: Stethoscope, enabled: true },
  {
    href: "/explore",
    label: "Specialties",
    icon: Compass,
    enabled: FEATURE_VISIBILITY.specialties,
  },
  {
    href: "/questions",
    label: "Questions",
    icon: HelpCircle,
    enabled: FEATURE_VISIBILITY.questions,
  },
  {
    href: "/mentors",
    label: "Mentors",
    icon: GraduationCap,
    enabled: FEATURE_VISIBILITY.mentors,
  },
  {
    href: "/profile",
    label: "Discover your pathway",
    icon: User,
    enabled: true,
  },
  { href: "/community", label: "Community", icon: Users, enabled: true },
];

const NAV_LABELS: Record<string, string> = {
  Countries: "الدول",
  Specialties: "التخصصات",
  Questions: "الأسئلة",
  Mentors: "المرشدون",
  "Discover your pathway": "اكتشف مسارك",
  Community: "المجتمع",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { language, setLanguage, isArabic } = useApp();
  const text = (english: string, arabic: string) =>
    isArabic ? arabic : english;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("medvade-theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("medvade-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const elementId = "google_translate_element";
    if (document.getElementById(elementId)) return;

    const element = document.createElement("div");
    element.id = elementId;
    element.className = "notranslate";
    element.style.position = "fixed";
    element.style.left = "-10000px";
    element.style.top = "-10000px";
    element.style.width = "1px";
    element.style.height = "1px";
    element.style.overflow = "hidden";
    document.body.appendChild(element);

    const globalWindow = window as typeof window & {
      googleTranslateElementInit?: () => void;
      google?: {
        translate?: {
          TranslateElement?: new (
            options: Record<string, unknown>,
            id: string
          ) => unknown;
        };
      };
    };
    globalWindow.googleTranslateElementInit = () => {
      const TranslateElement = globalWindow.google?.translate?.TranslateElement;
      if (TranslateElement) {
        new TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,en",
            autoDisplay: false,
          },
          elementId
        );
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      element.remove();
    };
  }, []);

  useEffect(() => {
    if (!isArabic) return;
    const key = "medweg-translated-path";
    if (sessionStorage.getItem(key) === location.pathname) return;
    sessionStorage.setItem(key, location.pathname);
    window.location.reload();
  }, [isArabic, location.pathname]);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const changeLanguage = (nextLanguage: "en" | "ar") => {
    document.cookie =
      nextLanguage === "ar"
        ? "googtrans=/en/ar; path=/"
        : "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    localStorage.setItem("medweg-language", nextLanguage);
    sessionStorage.removeItem("medweg-translated-path");
    setLanguage(nextLanguage);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header
        className={`topbar ${scrolled ? "shadow-sm" : ""}`}
        data-testid="topbar"
      >
        <div className="mx-auto flex h-[68px] max-w-[1450px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            to="/"
            className="flex items-center gap-3"
            data-testid="link-logo"
          >
            <img
              src={assetPath("/assets/media/medvade-logo-v2.png")}
              alt="medvade"
              className="h-10 w-auto max-w-[190px] object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV_ITEMS.filter(item => item.enabled).map(
              ({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className={`topbar-link inline-flex items-center gap-2 ${isActive(href) ? "active" : ""}`}
                  data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="nav-icon grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary/70">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  {isArabic ? NAV_LABELS[label] : label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary sm:px-3"
              onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
              aria-label={text("Switch to Arabic", "التبديل إلى الإنجليزية")}
              title={text("Switch to Arabic", "التبديل إلى الإنجليزية")}
              data-testid="button-language-toggle"
            >
              <Languages size={15} />
              {language === "en" ? LANGUAGE_LABELS.ar : LANGUAGE_LABELS.en}
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={() => setDarkMode(value => !value)}
              aria-label={
                darkMode
                  ? text("Switch to light mode", "التبديل إلى الوضع الفاتح")
                  : text("Switch to dark mode", "التبديل إلى الوضع الداكن")
              }
              aria-pressed={darkMode}
              title={
                darkMode
                  ? text("Switch to light mode", "التبديل إلى الوضع الفاتح")
                  : text("Switch to dark mode", "التبديل إلى الوضع الداكن")
              }
              data-testid="button-theme-toggle"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {user ? (
              <button
                className="btn-quiet hidden items-center gap-2 rounded-lg px-4 py-2 text-sm sm:inline-flex"
                onClick={() => void signOut()}
              >
                {text("Sign out", "تسجيل الخروج")}
              </button>
            ) : (
              <Link
                to="/auth"
                className="btn-quiet hidden items-center gap-2 rounded-lg px-4 py-2 text-sm sm:inline-flex"
              >
                <User size={15} />
                {text("Sign in", "تسجيل الدخول")}
              </Link>
            )}
            <button
              className="icon-button lg:hidden"
              data-testid="button-mobile-menu"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-card lg:hidden">
            <nav className="mx-auto flex max-w-[1450px] flex-col px-4 py-3">
              {NAV_ITEMS.filter(item => item.enabled).map(
                ({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    to={href}
                    className={`topbar-link flex items-center gap-3 rounded-lg px-3 py-3 ${isActive(href) ? "active" : ""}`}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary/70">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    {isArabic ? NAV_LABELS[label] : label}
                  </Link>
                )
              )}
              <Link
                to={user ? "/profile" : "/auth"}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3"
              >
                <User size={16} />
                {user
                  ? text("My account", "حسابي")
                  : text(
                      "Sign in / Create account",
                      "تسجيل الدخول / إنشاء حساب"
                    )}
              </Link>
              {user && (
                <button
                  onClick={() => void signOut()}
                  className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3 text-left"
                >
                  {text("Sign out", "تسجيل الخروج")}
                </button>
              )}
              <button
                type="button"
                onClick={() => setDarkMode(value => !value)}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3 text-left"
                aria-pressed={darkMode}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode
                  ? text("Light mode", "الوضع الفاتح")
                  : text("Dark mode", "الوضع الداكن")}
              </button>
              <button
                type="button"
                onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3 text-left"
                aria-label={text("Switch to Arabic", "التبديل إلى الإنجليزية")}
              >
                <Languages size={16} />
                {text("العربية", "English")}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-[1450px] flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        {children}
      </main>

      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-10">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="flex items-center gap-3">
                <img
                  src={assetPath("/assets/media/medvade-logo-v2.png")}
                  alt="medvade"
                  className="h-9 w-auto max-w-[170px] object-contain"
                />
              </div>
              <p className="mt-4 max-w-xs text-xs leading-5 text-muted-foreground">
                {text(
                  "Clearer country pathways for medical graduates, from first comparison to the next practical step.",
                  "مسارات أوضح للأطباء والخريجين الطبيين، من المقارنة الأولى إلى الخطوة العملية التالية."
                )}
              </p>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                <Info size={15} /> {text("About", "عن الموقع")}
              </h2>
              <Link to="/" className="footer-link">
                {text("What is medvade?", "ما هو MedWeg؟")}
              </Link>
              <Link to="/profile" className="footer-link">
                {text("Discover your pathway", "اكتشف مسارك")}
              </Link>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                {text("Contact", "تواصل معنا")}
              </h2>
              <a
                href="mailto:abodysaif2005@gmail.com"
                className="footer-link break-all"
              >
                {text("Email us", "راسلنا")}
              </a>
              <a href="tel:+201203298818" className="footer-link">
                +201203298818
              </a>
              <Link to="/community" className="footer-link">
                {text("Join the community", "انضم إلى المجتمع")}
              </Link>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                <ShieldCheck size={15} /> {text("Legal", "قانوني")}
              </h2>
              <Link to="/privacy" className="footer-link">
                {text("Privacy policy", "سياسة الخصوصية")}
              </Link>
              <Link to="/privacy#disclaimer" className="footer-link">
                {text("Educational disclaimer", "إخلاء المسؤولية التعليمية")}
              </Link>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                <Users size={15} /> {text("Connect", "تواصل")}
              </h2>
              <Link to="/community" className="footer-link">
                {text("Community", "المجتمع")}
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-[11px] leading-5 text-muted-foreground">
                {text(
                  "For education only. Verify every detail with the official licensing body.",
                  "لأغراض تعليمية فقط. تحقق من كل التفاصيل مع جهة الترخيص الرسمية."
                )}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="mailto:abodysaif2005@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  data-testid="link-footer-contact"
                >
                  <Mail size={14} />
                  abodysaif2005@gmail.com
                </a>
                <a
                  href="tel:+201203298818"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  data-testid="link-footer-phone"
                >
                  <Phone size={14} />
                  +201203298818
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
