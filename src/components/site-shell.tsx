import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpLeft, BookOpen, CalendarDays, ClipboardList, Globe2, Home, Instagram, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AssistantWidget } from "@/components/assistant";
import { useLanguage } from "@/components/site-language";
import bird from "@/assets/kristina-bird.png.asset.json";
import logo from "@/assets/kristina-kidz-logo.png.asset.json";

const nav = [
  { to: "/", ar: "الرئيسية", en: "Home" },
  { to: "/programs", ar: "البرامج والأسعار", en: "Programs" },
  { to: "/learning", ar: "التعلم الإلكتروني", en: "eLearning" },
  { to: "/events", ar: "الفعاليات", en: "Events" },
  { to: "/about", ar: "عن الأكاديمية", en: "About" },
  { to: "/contact", ar: "تواصل معنا", en: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="brand-stripe" />
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="shrink-0">
            <img src={logo.url} alt="Kristina Kidz" className="h-11 w-auto sm:h-12" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={`nav-link ${path === n.to ? "nav-active" : ""}`}>
                {lang === "ar" ? n.ar : n.en}
              </Link>
            ))}
            <Link to="/assistant" className="nav-link flex items-center gap-1.5 text-primary">
              <Sparkles size={15} />
              {lang === "ar" ? "المساعد" : "Assistant"}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/join"
              className="hidden rounded-md bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground lg:inline-flex"
            >
              {lang === "ar" ? "سجّل الآن" : "Register"}
            </Link>
            <button
              className="icon-action gap-2 px-3"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label="Change language"
            >
              <Globe2 size={18} />
              <span>{lang === "ar" ? "EN" : "العربية"}</span>
            </button>
            <button className="icon-action lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="grid border-t border-border bg-background px-5 py-4 lg:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-bold">
                {lang === "ar" ? n.ar : n.en}
              </Link>
            ))}
            <Link to="/assistant" onClick={() => setOpen(false)} className="flex items-center gap-2 py-3 font-bold text-primary">
              <Sparkles size={16} /> {lang === "ar" ? "المساعد الذكي" : "AI Assistant"}
            </Link>
          </nav>
        )}
      </header>
      <main className="pb-20 lg:pb-0">{children}</main>
      <nav
        className="fixed bottom-0 inset-x-0 z-50 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
        aria-label={lang === "ar" ? "تنقل سريع" : "Quick navigation"}
      >
        {[
          { to: "/", icon: Home, ar: "الرئيسية", en: "Home" },
          { to: "/programs", icon: BookOpen, ar: "البرامج", en: "Programs" },
          { to: "/join", icon: ClipboardList, ar: "التسجيل", en: "Register" },
          { to: "/events", icon: CalendarDays, ar: "الفعاليات", en: "Events" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold ${path === item.to ? "text-primary" : "text-muted-foreground"}`}
            >
              <Icon size={20} />
              {lang === "ar" ? item.ar : item.en}
            </Link>
          );
        })}
        <a
          href="https://wa.link/a7wsrs"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold text-muted-foreground"
        >
          <MessageCircle size={20} />
          {lang === "ar" ? "تواصل" : "Chat"}
        </a>
      </nav>
      <AssistantWidget />
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <img src={bird.url} alt="" className="h-20 w-20 object-contain" />
            <p className="mt-4 max-w-sm text-sm leading-7 text-ink-muted">
              {lang === "ar"
                ? "مساحة تعليمية تنطلق من فضول الطفل، وتمنحه فرصة ليكتشف قدراته ويتعلم بثقة."
                : "A learning space that begins with curiosity and helps every child discover their strengths."}
            </p>
          </div>
          <div>
            <h3 className="font-extrabold">{lang === "ar" ? "زيارة الأكاديمية" : "Visit us"}</h3>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              4384 شارع الحسين بن علي، القطيف 32641
              <br />
              {lang === "ar" ? "السبت–الخميس · 2:00–9:00 م" : "Sat–Thu · 2:00–9:00 PM"}
            </p>
          </div>
          <div>
            <h3 className="font-extrabold">{lang === "ar" ? "روابط سريعة" : "Quick links"}</h3>
            <div className="mt-4 flex gap-3">
              <a
                className="footer-icon"
                href="https://www.instagram.com/kristinakidz.sa/?hl=ar"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a className="footer-icon" href="https://wa.link/a7wsrs" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <ArrowUpLeft />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-ink-line py-5 text-center text-xs text-ink-muted">© 2026 Kristina Kidz Academy</div>
      </footer>
    </div>
  );
}
