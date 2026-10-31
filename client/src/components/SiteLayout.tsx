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
} from "lucide-react";
import { assetPath } from "../lib/assetPath";
import { useAuth } from "../contexts/AuthContext";
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

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

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
                  {label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="icon-button"
              onClick={() => setDarkMode(value => !value)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkMode}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              data-testid="button-theme-toggle"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {user ? (
              <button
                className="btn-quiet hidden items-center gap-2 rounded-lg px-4 py-2 text-sm sm:inline-flex"
                onClick={() => void signOut()}
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/auth"
                className="btn-quiet hidden items-center gap-2 rounded-lg px-4 py-2 text-sm sm:inline-flex"
              >
                <User size={15} />
                Sign in
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
                    {label}
                  </Link>
                )
              )}
              <Link
                to={user ? "/profile" : "/auth"}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3"
              >
                <User size={16} />
                {user ? "My account" : "Sign in / Create account"}
              </Link>
              {user && (
                <button
                  onClick={() => void signOut()}
                  className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3 text-left"
                >
                  Sign out
                </button>
              )}
              <button
                type="button"
                onClick={() => setDarkMode(value => !value)}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3 text-left"
                aria-pressed={darkMode}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? "Light mode" : "Dark mode"}
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
                Clearer country pathways for medical graduates, from first
                comparison to the next practical step.
              </p>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                <Info size={15} /> About
              </h2>
              <Link to="/" className="footer-link">
                What is medvade?
              </Link>
              <Link to="/profile" className="footer-link">
                Discover your pathway
              </Link>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">Contact</h2>
              <a
                href="mailto:abodysaif2005@gmail.com"
                className="footer-link break-all"
              >
                Email us
              </a>
              <a href="tel:+201203298818" className="footer-link">
                +201203298818
              </a>
              <Link to="/community" className="footer-link">
                Join the community
              </Link>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                <ShieldCheck size={15} /> Legal
              </h2>
              <Link to="/privacy" className="footer-link">
                Privacy policy
              </Link>
              <Link to="/privacy#disclaimer" className="footer-link">
                Educational disclaimer
              </Link>
            </div>

            <div className="footer-column">
              <h2 className="footer-heading">
                <Users size={15} /> Connect
              </h2>
              <Link to="/community" className="footer-link">
                Community
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-[11px] leading-5 text-muted-foreground">
                For education only. Verify every detail with the official
                licensing body.
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
