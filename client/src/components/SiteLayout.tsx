import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Compass,
  HelpCircle,
  User,
  Mail,
  Phone,
  Menu,
  X,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { assetPath } from "../lib/assetPath";

const NAV_ITEMS = [
  { href: "/", label: "Countries", icon: Stethoscope },
  { href: "/explore", label: "Specialties", icon: Compass },
  { href: "/questions", label: "Questions", icon: HelpCircle },
  { href: "/profile", label: "Discover your pathway", icon: User },
  { href: "/community", label: "Community", icon: Users },
];

const CONTACT_EMAIL = "contact@medweg.com";
const CONTACT_PHONE = "+249 000 000 000";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

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
            <span className="brand-mark grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <img src={assetPath("/assets/media/medweg-compass.png")} alt="Medweg compass" className="h-8 w-8 object-contain" />
            </span>
            <span>
              <span className="brand-wordmark block">Medweg</span>
              <span className="guide">Guide</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`topbar-link inline-flex items-center gap-2 ${isActive(href) ? "active" : ""}`}
                data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon size={16} strokeWidth={1.9} />
                {label}
                {isActive(href) && (
                  <span className="h-[3px] w-full min-w-[18px] rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="btn-contact hidden items-center gap-2 rounded-lg px-4 py-2 text-sm sm:inline-flex"
                  data-testid="button-contact-desktop"
                >
                  <Mail size={15} />
                  Contact Me
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem asChild>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Medweg inquiry")}`}
                  >
                    <Mail size={15} /> Email — {CONTACT_EMAIL}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={`tel:${CONTACT_PHONE}`}>
                    <Phone size={15} /> {CONTACT_PHONE}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="icon-button lg:hidden"
              data-testid="button-mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-card lg:hidden">
            <nav className="mx-auto flex max-w-[1450px] flex-col px-4 py-3">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className={`topbar-link flex items-center gap-3 rounded-lg px-3 py-3 ${isActive(href) ? "active" : ""}`}
                >
                  <Icon size={16} strokeWidth={1.9} />
                  {label}
                </Link>
              ))}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Medweg inquiry")}`}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3"
                data-testid="link-contact-mobile-menu"
              >
                <Mail size={16} />
                Contact Me — {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="topbar-link flex items-center gap-3 rounded-lg px-3 py-3"
                data-testid="link-contact-mobile-whatsapp"
              >
                <Phone size={16} />
                {CONTACT_PHONE}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-[1450px] flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        {children}
      </main>

      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-[1450px] flex-col items-start justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              <img src={assetPath("/assets/media/medweg-compass.png")} alt="Medweg compass" className="h-7 w-7 object-contain" />
            </span>
            <span className="text-xs font-bold">Medweg</span>
          </div>
          <p className="text-[11px] leading-5 text-muted-foreground">
            For education only. Verify every detail with the official licensing body.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            data-testid="link-footer-contact"
          >
            <Mail size={14} />
            {CONTACT_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}
