import { Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CirclePlay,
  Clock3,
  FileText,
  HelpCircle,
  ListChecks,
  MapPin,
  MessageCircle,
  Puzzle,
  Sparkles,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/site-shell";
import { t, type Bilingual } from "@/data/site";
import { usePrograms } from "@/lib/programs-store";
import { academyEvents, demoCourse, odooModules, programDetails, slideKindLabel } from "@/data/odoo";
import type { Slide } from "@/data/odoo";

export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="soft-grid border-b">
        <div className="page-wrap py-16 sm:py-20">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="section-title mt-4 max-w-4xl">{title}</h1>
          <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">{text}</p>
        </div>
      </header>
      <div className="page-wrap py-14 sm:py-20">{children}</div>
    </>
  );
}

function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

const slideIcons: Record<Slide["kind"], LucideIcon> = { video: CirclePlay, content: FileText, activity: Puzzle, quiz: HelpCircle };

// ================= صفحة تفاصيل البرنامج — نمط صفحة منتج في المتجر =================

export function ProgramDetailPage({ programId }: { programId: string }) {
  const { lang } = useLanguage();
  const { programs } = usePrograms();
  const baseDetail = programDetails[programId];
  const program = programs.find((p) => p.id === programId);
  const [planIndex, setPlanIndex] = useState(0);
  const [tab, setTab] = useState<"about" | "highlights" | "practical">("about");
  const ArrowComp = lang === "ar" ? ArrowLeft : ArrowRight;

  if (!program) throw notFound();

  const detail = baseDetail ?? {
    tagline: program.title,
    description: {
      ar: "برنامج مُضاف من شاشة إدارة البرامج، وتظهر تفاصيله هنا تلقائياً كما يظهر أي منتج جديد في متجر أودو.",
      en: "A program added from the management screen; its details appear here automatically, like any new Odoo product.",
    },
    includes: [
      { ar: "متابعة دورية لولي الأمر", en: "Regular parent updates" },
      { ar: "مواد وأنشطة مناسبة للعمر", en: "Age-appropriate materials and activities" },
    ],
    highlights: [
      { ar: "مجموعات صغيرة تتيح متابعة كل طفل", en: "Small groups that allow individual follow-up" },
      { ar: "جدول مرن يناسب أوقات الأسرة", en: "A flexible schedule that suits family timings" },
    ],
    practical: {
      ar: `الفئة العمرية ${t(program.age, "ar")}، والأوقات ${program.time}. يرجى تأكيد توفر المقاعد قبل التسجيل.`,
      en: `Age group ${t(program.age, "en")}, timing ${program.time}. Please confirm seat availability before registering.`,
    },
    odooModels: ["product.template", "product.product", "sale.order", "website_sale"],
  };

  const plan = program.plans[planIndex] ?? program.plans[0];
  const tabs: [typeof tab, string][] = [
    ["about", lang === "ar" ? "نظرة عامة" : "Overview"],
    ["highlights", lang === "ar" ? "ما يميز البرنامج" : "Highlights"],
    ["practical", lang === "ar" ? "تفاصيل عملية" : "Practical details"],
  ];
  const related = programs.filter((p) => p.id !== programId).slice(0, 3);

  return (
    <PageIntro
      eyebrow={lang === "ar" ? "البرامج والأسعار" : "Programs & pricing"}
      title={t(program.title, lang)}
      text={t(detail.tagline, lang)}
    >
      <Breadcrumb
        items={[
          { label: lang === "ar" ? "الرئيسية" : "Home", to: "/" },
          { label: lang === "ar" ? "البرامج" : "Programs", to: "/programs" },
          { label: t(program.title, lang) },
        ]}
      />
      <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="tag bg-berry-soft text-primary">{t(program.age, lang)}</span>
            <span className="tag bg-aqua-soft text-aqua">
              <Clock3 size={14} className="me-1.5" />
              {program.time}
            </span>
          </div>

          <div className="mt-6 flex gap-1 overflow-x-auto rounded-md border border-border bg-muted/50 p-1">
            {tabs.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm font-extrabold transition ${
                  tab === key ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="card mt-5 p-6 sm:p-8">
            {tab === "about" && (
              <>
                <h2 className="text-lg font-extrabold">{lang === "ar" ? "عن البرنامج" : "About this program"}</h2>
                <p className="mt-4 leading-8 text-muted-foreground">{t(detail.description, lang)}</p>
                <h3 className="mt-7 font-extrabold">{lang === "ar" ? "ما تشمله الباقة" : "What's included"}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {detail.includes.map((item) => (
                    <li key={item.en} className="flex items-start gap-2.5 text-sm font-bold">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-aqua" />
                      {t(item, lang)}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {tab === "highlights" && (
              <ul className="grid gap-4">
                {detail.highlights.map((item, i) => (
                  <li key={item.en} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-sun-soft text-sm font-extrabold text-foreground">
                      {i + 1}
                    </span>
                    <span className="leading-8 font-bold">{t(item, lang)}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "practical" && (
              <div className="grid gap-4">
                <p className="leading-8 text-muted-foreground">{t(detail.practical, lang)}</p>
                <div className="flex flex-wrap gap-2 border-t pt-5">
                  {detail.odooModels.map((m) => (
                    <code key={m} className="rounded-sm bg-muted px-2.5 py-1 text-xs font-extrabold text-muted-foreground">
                      {m}
                    </code>
                  ))}
                </div>
                <p className="text-xs leading-6 text-muted-foreground">
                  {lang === "ar"
                    ? "البيانات أعلاه تُخزَّن عند التنفيذ على أودو في النماذج المذكورة: البرنامج كمنتج، والباقات كخيارات متغيرة."
                    : "On Odoo this data lives in the models above: the program as a product and the plans as product variants."}
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="card sticky top-28 p-6 shadow-brand">
          <span className="text-xs font-extrabold text-muted-foreground">
            {lang === "ar" ? "اختر الباقة المناسبة" : "Choose a plan"}
          </span>
          <div className="mt-4 grid gap-2">
            {program.plans.map((pl, i) => (
              <button
                key={pl.label.en}
                onClick={() => setPlanIndex(i)}
                className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-start text-sm transition ${
                  i === planIndex ? "border-primary bg-berry-soft" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-bold">{t(pl.label, lang)}</span>
                <b className={i === planIndex ? "text-primary" : ""}>
                  {pl.price.toLocaleString()} <small>{lang === "ar" ? "ر.س" : "SAR"}</small>
                </b>
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-end justify-between border-t pt-5">
            <span className="text-sm text-muted-foreground">{lang === "ar" ? "الإجمالي" : "Total"}</span>
            <strong className="text-3xl text-primary">
              {(plan?.price ?? 0).toLocaleString()} <small className="text-base">{lang === "ar" ? "ر.س" : "SAR"}</small>
            </strong>
          </div>
          <Button size="lg" className="mt-5 w-full" asChild>
            <Link to="/join" search={{ program: programId }}>
              {lang === "ar" ? "سجّل في هذه الباقة" : "Register for this plan"}
              <ArrowComp size={18} />
            </Link>
          </Button>
          <Button variant="outline" className="mt-2 w-full" asChild>
            <a href="https://wa.link/a7wsrs" target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              {lang === "ar" ? "استفسار سريع" : "Quick question"}
            </a>
          </Button>
          <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">
            {lang === "ar"
              ? "التسجيل تجريبي في هذا النموذج، ويُصدر طلب بيع جاهز للتأكيد عند التنفيذ على أودو."
              : "Registration here is a preview; on Odoo it issues a ready-to-confirm sales order."}
          </p>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="section-title !text-2xl">{lang === "ar" ? "برامج قد تناسبك أيضاً" : "You may also like"}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.id}
              to="/programs/$programId"
              params={{ programId: p.id }}
              className="card lift block border-t-4 border-t-aqua p-6"
            >
              <span className="tag bg-muted">{t(p.age, lang)}</span>
              <h3 className="mt-4 font-extrabold">{t(p.title, lang)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "ar" ? "تبدأ من" : "From"} {p.plans[0]?.price.toLocaleString()} {lang === "ar" ? "ر.س" : "SAR"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageIntro>
  );
}

// ================= صفحة الدورة التفاعلية — نمط قناة التعلم الإلكتروني =================

export function CourseDetailPage() {
  const { lang } = useLanguage();
  const course = demoCourse;
  const flat = useMemo(() => course.sections.flatMap((s, si) => s.slides.map((sl, li) => ({ key: `${si}-${li}`, ...sl }))), [course]);
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(flat.map((s, i) => [s.key, i < 2])),
  );
  const [active, setActive] = useState<string>(flat[2]?.key ?? "");
  const activeSlide = flat.find((s) => s.key === active);
  const completed = Object.values(done).filter(Boolean).length;
  const percent = Math.round((completed / flat.length) * 100);
  const allDone = completed === flat.length;
  const totalMinutes = flat.reduce((sum, s) => sum + s.minutes, 0);

  return (
    <PageIntro
      eyebrow={lang === "ar" ? "التعلم الإلكتروني" : "eLearning"}
      title={course.title}
      text={t(course.subtitle, lang)}
    >
      <Breadcrumb
        items={[
          { label: lang === "ar" ? "الرئيسية" : "Home", to: "/" },
          { label: lang === "ar" ? "التعلم الإلكتروني" : "eLearning", to: "/learning" },
          { label: course.title },
        ]}
      />
      <div className="grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="tag bg-aqua-soft text-aqua">{t(course.level, lang)}</span>
            {course.tags.map((tag) => (
              <span key={tag} className="tag bg-muted">
                {tag}
              </span>
            ))}
          </div>

          {course.sections.map((section, si) => (
            <section className="card mt-6 overflow-hidden" key={section.title.en}>
              <header className="flex items-center gap-3 border-b bg-muted/50 px-5 py-4">
                <ListChecks className="text-primary" size={20} />
                <h2 className="font-extrabold">{t(section.title, lang)}</h2>
                <span className="ms-auto text-xs font-bold text-muted-foreground">
                  {section.slides.length} {lang === "ar" ? "عناصر" : "items"}
                </span>
              </header>
              <div className="divide-y">
                {section.slides.map((slide, li) => {
                  const key = `${si}-${li}`;
                  const Icon = slideIcons[slide.kind];
                  return (
                    <div key={key} className="flex items-center gap-3 px-5 py-4">
                      <button
                        onClick={() => setActive(key)}
                        className={`grid size-11 shrink-0 place-items-center rounded-full transition ${
                          active === key ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-berry-soft"
                        }`}
                        aria-label={lang === "ar" ? "عرض الدرس" : "Preview lesson"}
                      >
                        <Icon size={18} />
                      </button>
                      <button onClick={() => setActive(key)} className="min-w-0 flex-1 text-start">
                        <b className="block truncate">{t(slide.title, lang)}</b>
                        <small className="mt-0.5 block text-muted-foreground">
                          {t(slideKindLabel[slide.kind], lang)} · {slide.minutes}{" "}
                          {lang === "ar" ? "دقائق" : "min"}
                        </small>
                      </button>
                      <button
                        onClick={() => setDone((d) => ({ ...d, [key]: !d[key] }))}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-extrabold transition ${
                          done[key] ? "bg-aqua-soft text-aqua" : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <CheckCircle2 size={15} />
                        {done[key] ? (lang === "ar" ? "مكتمل" : "Done") : lang === "ar" ? "علّم كمنجز" : "Mark done"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="grid gap-5">
          <div className="card sticky top-28 p-6 shadow-brand">
            <div className="flex items-center justify-between">
              <span className="font-extrabold">{lang === "ar" ? "تقدمك في المسار" : "Your progress"}</span>
              <b className="text-2xl text-primary">{percent}%</b>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-xs font-bold text-muted-foreground">
              {completed} / {flat.length} {lang === "ar" ? "عنصر مكتمل ·" : "items complete ·"} {totalMinutes}{" "}
              {lang === "ar" ? "دقيقة محتوى" : "minutes of content"}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 border-t pt-5 text-xs font-extrabold text-muted-foreground">
              {(["video", "content", "activity", "quiz"] as const).map((k) => {
                const Icon = slideIcons[k];
                return (
                  <span key={k} className="flex items-center gap-1.5">
                    <Icon size={14} />
                    {t(slideKindLabel[k], lang)}
                  </span>
                );
              })}
            </div>
          </div>

          {activeSlide && (
            <div className="card bg-berry-soft/60 p-6">
              <span className="eyebrow">{lang === "ar" ? "معاينة العنصر" : "Item preview"}</span>
              <h3 className="mt-3 font-extrabold">{t(activeSlide.title, lang)}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(activeSlide.preview, lang)}</p>
              {activeSlide.kind === "quiz" && (
                <div className="mt-4 rounded-md border border-border bg-card p-4 text-sm font-bold">
                  {lang === "ar" ? "سؤال نموذجي:" : "Sample question:"}
                  <p className="mt-2 leading-7 font-normal text-muted-foreground">
                    {lang === "ar"
                      ? "أي صورة تبدأ بصوت الحرف الأول؟ اختر الإجابة الصحيحة من ثلاث."
                      : "Which picture starts with the target sound? Pick the right one of three."}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className={`card flex items-center gap-4 p-6 transition ${allDone ? "bg-sun-soft" : ""}`}>
            <Award className={allDone ? "text-sun" : "text-muted-foreground"} size={36} />
            <div>
              <b>{lang === "ar" ? "شهادة إتمام المسار" : "Course certificate"}</b>
              <p className="text-sm leading-7 text-muted-foreground">
                {allDone
                  ? lang === "ar"
                    ? "أحسنت! أكملت جميع العناصر وفتحت شهادتك."
                    : "Great! You completed everything and unlocked your certificate."
                  : lang === "ar"
                    ? "تُفتح بعد إكمال جميع العناصر."
                    : "Unlocked after completing all items."}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PageIntro>
  );
}

// ================= صفحة تفاصيل الفعالية — نمط صفحة حدث =================

export function EventDetailPage({ eventId }: { eventId: string }) {
  const { lang } = useLanguage();
  const ev = academyEvents.find((e) => e.id === eventId);
  const [ticket, setTicket] = useState(0);
  const [sent, setSent] = useState(false);
  if (!ev) throw notFound();

  const seatsLeft = ev.seats - ev.seatsTaken;
  const seatPercent = Math.round((ev.seatsTaken / ev.seats) * 100);
  const chosen = ev.tickets[ticket];

  return (
    <PageIntro
      eyebrow={lang === "ar" ? "الفعاليات" : "Events"}
      title={t(ev.title, lang)}
      text={t(ev.time, lang)}
    >
      <Breadcrumb
        items={[
          { label: lang === "ar" ? "الرئيسية" : "Home", to: "/" },
          { label: lang === "ar" ? "الفعاليات" : "Events", to: "/events" },
          { label: t(ev.title, lang) },
        ]}
      />
      <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="tag bg-berry-soft text-primary">{t(ev.type, lang)}</span>
            <span className="tag bg-aqua-soft text-aqua">
              <Users size={14} className="me-1.5" />
              {t(ev.audience, lang)}
            </span>
          </div>
          <p className="mt-6 leading-8 text-muted-foreground">{t(ev.description, lang)}</p>

          <h2 className="mt-10 text-lg font-extrabold">{lang === "ar" ? "البرنامج الزمني" : "Schedule"}</h2>
          <ol className="card mt-4 divide-y">
            {ev.schedule.map((s, i) => (
              <li key={s.time} className="flex items-center gap-4 p-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-aqua-soft text-xs font-extrabold text-aqua">
                  {s.time}
                </span>
                <span className="font-bold">{t(s.item, lang)}</span>
                {i === 0 && <Sparkles size={16} className="ms-auto text-sun" />}
              </li>
            ))}
          </ol>
        </div>

        <aside className="grid gap-5">
          <div className="card sticky top-28 p-6 shadow-brand">
            <div className="flex items-center gap-4 border-b pb-5">
              <div className="grid size-16 shrink-0 place-items-center rounded-md bg-berry-soft text-primary">
                <div className="text-center">
                  <b className="block text-xl">{ev.day}</b>
                  <small className="text-[10px] font-extrabold">{t(ev.month, lang)}</small>
                </div>
              </div>
              <div className="text-sm leading-7">
                <p className="flex items-center gap-2 font-bold">
                  <Clock3 size={15} className="text-aqua" />
                  {t(ev.time, lang)}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={15} className="text-aqua" />
                  {lang === "ar" ? "مقر الأكاديمية · القطيف" : "Academy venue · Al Qatif"}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span>{lang === "ar" ? "المقاعد المحجوزة" : "Seats booked"}</span>
                <span className="text-primary">
                  {seatsLeft} {lang === "ar" ? "متبقٍ من" : "left of"} {ev.seats}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-sun transition-all" style={{ width: `${seatPercent}%` }} />
              </div>
            </div>

            <span className="mt-6 block text-xs font-extrabold text-muted-foreground">
              {lang === "ar" ? "التذاكر" : "Tickets"}
            </span>
            <div className="mt-3 grid gap-2">
              {ev.tickets.map((tk, i) => (
                <button
                  key={tk.name.en}
                  onClick={() => setTicket(i)}
                  className={`rounded-md border px-4 py-3 text-start transition ${
                    i === ticket ? "border-primary bg-berry-soft" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <b>{t(tk.name, lang)}</b>
                    <b className={i === ticket ? "text-primary" : ""}>
                      {tk.price === 0 ? (lang === "ar" ? "مجاناً" : "Free") : `${tk.price} ${lang === "ar" ? "ر.س" : "SAR"}`}
                    </b>
                  </div>
                  <small className="mt-1 block text-muted-foreground">{t(tk.note, lang)}</small>
                </button>
              ))}
            </div>

            {sent ? (
              <div className="mt-5 rounded-md border border-aqua/40 bg-aqua-soft p-4 text-sm font-bold leading-7">
                <CheckCircle2 size={18} className="me-1.5 inline text-aqua" />
                {lang === "ar"
                  ? "تم تسجيل اهتمامك! سنتواصل معك عبر واتساب لتأكيد المقعد."
                  : "Your interest is registered! We'll confirm your seat via WhatsApp."}
              </div>
            ) : (
              <Button size="lg" className="mt-5 w-full" onClick={() => setSent(true)}>
                <Ticket size={18} />
                {lang === "ar" ? `سجّل · ${chosen ? t(chosen.name, lang) : ""}` : `Register · ${chosen ? t(chosen.name, lang) : ""}`}
              </Button>
            )}
            <Button variant="outline" className="mt-2 w-full" asChild>
              <a href="https://wa.link/a7wsrs" target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                {lang === "ar" ? "استفسار عبر واتساب" : "Ask on WhatsApp"}
              </a>
            </Button>
            <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">
              {lang === "ar"
                ? "الفعاليات المعروضة نموذجية، وعند التنفيذ على أودو يُصدر التسجيل سجل حضور جاهزاً."
                : "Events shown are preview content; on Odoo registration creates a ready attendee record."}
            </p>
          </div>
        </aside>
      </div>
    </PageIntro>
  );
}

// ================= خريطة نماذج أودو التفاعلية =================

export function OdooModulesSection() {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState(odooModules[0]!.id);
  const active = odooModules.find((m) => m.id === activeId)!;
  const icons: Record<string, LucideIcon> = {
    website: BookOpen,
    ecommerce: Sparkles,
    elearning: BookOpen,
    events: CalendarDays,
    contacts: Users,
    hr: Users,
    "academy-core": Award,
    "parent-portal": MessageCircle,
  };
  const Icon = icons[active.id] ?? BookOpen;

  return (
    <section className="mt-14">
      <h2 className="section-title">{lang === "ar" ? "كيف تُعرض بيانات أودو 19 في الموقع؟" : "How Odoo 19 data shows up on the site"}</h2>
      <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
        {lang === "ar"
          ? "اختر أي وحدة لتشاهد النماذج الأساسية التي تُخزَّن فيها البيانات، وكيف يعرضها الموقع. الوحدات المميزة بشعار «إضافة مخصصة» تحتاج بناءً خاصاً عند التنفيذ."
          : "Pick a module to see the core models storing its data and how the site displays them. Modules marked “custom extension” need a tailored build."}
      </p>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
          {odooModules.map((m) => {
            const MIcon = icons[m.id] ?? BookOpen;
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`flex flex-col items-start gap-2 rounded-md border p-4 text-start transition ${
                  activeId === m.id ? "border-primary bg-berry-soft" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <MIcon size={20} className={activeId === m.id ? "text-primary" : "text-aqua"} />
                <b className="text-sm leading-6">{t(m.name, lang)}</b>
                <span className={`tag ${m.custom ? "bg-sun-soft" : "bg-muted"}`}>
                  {m.custom ? (lang === "ar" ? "إضافة مخصصة" : m.appName) : m.appName}
                </span>
              </button>
            );
          })}
        </div>
        <div className="card p-6 sm:p-8" key={active.id}>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-md bg-berry-soft text-primary">
              <Icon />
            </span>
            <div>
              <h3 className="text-lg font-extrabold">{t(active.name, lang)}</h3>
              <small className="font-extrabold text-muted-foreground">{active.appName}</small>
            </div>
          </div>
          <h4 className="mt-6 text-sm font-extrabold text-muted-foreground">
            {lang === "ar" ? "النماذج الأساسية" : "Core models"}
          </h4>
          <ul className="mt-3 divide-y rounded-md border border-border">
            {active.models.map((m) => (
              <li key={m.model} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <code className="rounded-sm bg-muted px-2 py-0.5 text-xs font-extrabold">{m.model}</code>
                <span className="font-bold">{t(m.label, lang)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t pt-5 text-sm leading-8 text-muted-foreground">{t(active.shownAs, lang)}</p>
          {active.id === "program-admin" && (
            <Link
              to="/admin/programs"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground"
            >
              {lang === "ar" ? "افتح شاشة إدارة البرامج" : "Open the program management screen"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
