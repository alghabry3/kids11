import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/site-language";
import { t } from "@/data/site";
import { usePrograms } from "@/lib/programs-store";
import { OdooModulesSection } from "@/components/detail-pages";
import { academyEvents, demoCourse, odooModules } from "@/data/odoo";
import hero from "@/assets/academy-hero.jpg";
import eventLanguageDay from "@/assets/event-language-day.jpg";
import eventNationalDay from "@/assets/event-national-day.jpg";
import eventTalentsLab from "@/assets/event-talents-lab.jpg";
import bird from "@/assets/kristina-bird.png.asset.json";

function ArrowIcon({ size = 18 }: { size?: number }) {
  const { lang } = useLanguage();
  return lang === "ar" ? <ArrowLeft size={size} /> : <ArrowRight size={size} />;
}

type Feature = [LucideIcon, string, string];
type FilterItem = [string, string, string];

export function Hero() {
  const { lang } = useLanguage();
  const features: Feature[] = [
    [BookOpen, "البرامج كبطاقات منتجات", "Programs as product cards"],
    [CalendarDays, "الفعاليات بتذاكر ومقاعد", "Events with tickets & seats"],
    [GraduationCap, "دورة تعليمية بتقدم واضح", "Course progress made visible"],
  ];
  return (
    <>
      <section className="relative min-h-[82vh] overflow-hidden">
        <img
          src={hero}
          width={1600}
          height={1104}
          alt={lang === "ar" ? "أطفال يتعلمون معاً في الأكاديمية" : "Children learning together at the academy"}
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/95 to-background/20 rtl:bg-gradient-to-r" />
        <div className="page-wrap relative grid min-h-[82vh] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Sparkles size={16} />
              {lang === "ar" ? "واجهة رئيسية جاهزة للبناء على أودو" : "Odoo-ready academy homepage"}
            </span>
            <h1 className="display-title mt-5">
              {lang === "ar" ? (
                <>
                  أكاديمية تكتشف موهبة <span className="text-primary">الطفل</span> وتحوّلها إلى مسار واضح
                </>
              ) : (
                <>
                  Discover a child's <span className="text-primary">talent</span> and turn it into a clear path
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {lang === "ar"
                ? "تصميم رئيسي يعرض برامج الأكاديمية وأسعارها، الدورة التعليمية، الفعاليات، والتسجيل بنفس منطق صفحات الموقع والمتجر والتعلم الإلكتروني والفعاليات في أودو."
                : "A homepage that presents programs, pricing, learning, events, and registration in the same flow used by Odoo Website, eCommerce, eLearning, and Events."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/programs">
                  {lang === "ar" ? "استعرض البرامج" : "Browse programs"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/join">{lang === "ar" ? "ابدأ التسجيل" : "Start registration"}</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-5 text-sm font-extrabold">
              <span className="flex items-center gap-2">
                <Star className="fill-sun text-sun" size={20} />
                5.0 {lang === "ar" ? "من 56 تقييماً" : "from 56 reviews"}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="text-aqua" size={20} />
                {lang === "ar" ? "القطيف" : "Al Qatif"}
              </span>
            </div>
          </div>
          <div className="grid gap-4 lg:justify-self-end">
            <div className="card max-w-xl overflow-hidden shadow-brand">
              <div className="brand-stripe" />
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="tag bg-berry-soft text-primary">product.template</span>
                    <h2 className="mt-4 text-2xl font-black leading-tight">
                      {lang === "ar" ? "تأسيس اللغة الإنجليزية" : "English Foundation"}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {lang === "ar" ? "برنامج قابل للبيع كباقة شهرية أو فصلية." : "A sellable program with monthly and term plans."}
                    </p>
                  </div>
                  <BookOpen className="shrink-0 text-primary" size={30} />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-md bg-muted p-3">
                    <b className="block text-primary">350</b>
                    <span className="text-xs text-muted-foreground">{lang === "ar" ? "ر.س بداية" : "SAR from"}</span>
                  </div>
                  <div className="rounded-md bg-aqua-soft p-3">
                    <b className="block text-aqua">6+</b>
                    <span className="text-xs text-muted-foreground">{lang === "ar" ? "سنوات" : "years"}</span>
                  </div>
                  <div className="rounded-md bg-sun-soft p-3">
                    <b className="block text-sun">12:30</b>
                    <span className="text-xs text-muted-foreground">{lang === "ar" ? "موعد" : "time"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <span className="tag bg-aqua-soft text-aqua">event.event</span>
                <b className="mt-4 block text-lg">{lang === "ar" ? "مختبر المواهب" : "Talents Lab"}</b>
                <p className="mt-2 text-sm text-muted-foreground">7 {lang === "ar" ? "مقاعد متبقية" : "seats left"}</p>
              </div>
              <div className="card p-5">
                <span className="tag bg-sun-soft text-sun">slide.channel</span>
                <b className="mt-4 block text-lg">English for Kids</b>
                <p className="mt-2 text-sm text-muted-foreground">68% {lang === "ar" ? "تقدم" : "progress"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-wrap -mt-8 relative z-10 grid gap-3 sm:grid-cols-3">
        {features.map(([Icon, ar, en]) => (
          <div className="card flex items-center gap-4 p-5 shadow-sm" key={ar}>
            <span className="grid size-12 place-items-center rounded-md bg-berry-soft text-primary">
              <Icon size={24} />
            </span>
            <b>{lang === "ar" ? ar : en}</b>
          </div>
        ))}
      </section>
    </>
  );
}

export function HomePage() {
  const { lang } = useLanguage();
  const { programs } = usePrograms();
  const featuredPrograms = programs.slice(0, 4);
  const odooHomeBlocks = odooModules.filter((module) => ["website", "ecommerce", "elearning", "events", "contacts", "program-admin"].includes(module.id));
  const totalSeats = academyEvents.reduce((sum, event) => sum + event.seats - event.seatsTaken, 0);
  const courseSlides = demoCourse.sections.reduce((sum, section) => sum + section.slides.length, 0);
  return (
    <>
      <Hero />
      <section className="page-wrap py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">{lang === "ar" ? "واجهة المتجر" : "Storefront"}</span>
            <h2 className="section-title mt-3">
              {lang === "ar" ? "البرامج تظهر كمنتجات قابلة للاختيار والشراء" : "Programs presented as selectable products"}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {lang === "ar"
                ? "كل برنامج له عمر مناسب، وقت حضور، وباقات سعرية واضحة؛ وهي نفس البيانات التي يمكن عرضها من المنتج وخياراته في المتجر."
                : "Each program has age, time, and clear plans — the same data that can be rendered from products and variants in the store."}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="card p-5"><b className="text-2xl text-primary">{programs.length}</b><span className="mt-1 block text-sm text-muted-foreground">{lang === "ar" ? "برامج منشورة" : "published programs"}</span></div>
            <div className="card p-5"><b className="text-2xl text-aqua">{academyEvents.length}</b><span className="mt-1 block text-sm text-muted-foreground">{lang === "ar" ? "فعاليات نشطة" : "active events"}</span></div>
            <div className="card p-5"><b className="text-2xl text-sun">{courseSlides}</b><span className="mt-1 block text-sm text-muted-foreground">{lang === "ar" ? "دروس وأنشطة" : "lessons & activities"}</span></div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredPrograms.map((p, i) => (
            <article
              className={`card lift flex min-h-[20rem] flex-col overflow-hidden border-t-4 ${i % 3 === 0 ? "border-t-primary" : i % 3 === 1 ? "border-t-sun" : "border-t-aqua"}`}
              key={p.id}
            >
              <div className="flex flex-1 flex-col p-6">
                <span className="tag bg-muted">{t(p.age, lang)}</span>
                <h3 className="mt-5 text-xl font-extrabold">
                  <Link to="/programs/$programId" params={{ programId: p.id }} className="transition hover:text-primary">
                    {t(p.title, lang)}
                  </Link>
                </h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 size={16} />
                  {p.time}
                </p>
                <div className="mt-auto flex items-end justify-between pt-8">
                  <span className="text-sm text-muted-foreground">{lang === "ar" ? "تبدأ من" : "From"}</span>
                  <strong className="text-2xl text-primary">
                    {p.plans[0]?.price ?? 0} <small>{lang === "ar" ? "ر.س" : "SAR"}</small>
                  </strong>
                </div>
                <div className="mt-5 grid gap-2">
                  <Button size="sm" asChild>
                    <Link to="/programs/$programId" params={{ programId: p.id }}>{lang === "ar" ? "تفاصيل الباقات" : "View plans"}</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/join" search={{ program: p.id }}>{lang === "ar" ? "تسجيل سريع" : "Quick register"}</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/programs">{lang === "ar" ? "عرض جميع البرامج والأسعار" : "View all programs and pricing"}<ArrowIcon size={17} /></Link>
          </Button>
        </div>
      </section>

      <section className="bg-aqua-soft py-20 sm:py-24">
        <div className="page-wrap grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="eyebrow">{lang === "ar" ? "التعلم الإلكتروني" : "eLearning"}</span>
            <h2 className="section-title mt-3">
              {lang === "ar" ? "مسار تعليمي منظم للطفل وولي الأمر" : "A structured learning path for child and parent"}
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              {lang === "ar"
                ? "تعرض الرئيسية الدورة كوحدات ودروس وأنشطة وتقدم، ثم تقود الزائر إلى صفحة الدورة الكاملة كما يفعل موديول التعلم الإلكتروني."
                : "The homepage shows the course as units, lessons, activities, and progress, then leads visitors into the full course page."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/learning/english-kids">{lang === "ar" ? "افتح الدورة" : "Open course"}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/learning">{lang === "ar" ? "تجربة التعلم" : "Learning preview"}</Link>
              </Button>
            </div>
          </div>
          <div className="card overflow-hidden shadow-brand">
            <div className="border-b bg-card p-6">
              <span className="tag bg-aqua-soft text-aqua">slide.channel</span>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black">{demoCourse.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(demoCourse.subtitle, lang)}</p>
                </div>
                <strong className="text-3xl text-primary">68%</strong>
              </div>
            </div>
            <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="font-extrabold">{lang === "ar" ? "تقدم الطفل" : "Child progress"}</span>
              <span className="text-sm font-bold text-muted-foreground">{courseSlides} {lang === "ar" ? "عناصر" : "items"}</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] bg-aqua" />
            </div>
            {demoCourse.sections.slice(0, 3).map((section, i) => (
              <div className="mt-4 flex items-center gap-3 border-t pt-4" key={section.title.en}>
                <span
                  className={`grid size-9 place-items-center rounded-full ${i < 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {i < 2 ? <CheckCircle2 size={18} /> : <Play size={17} />}
                </span>
                <span className="font-bold">{t(section.title, lang)}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="eyebrow">{lang === "ar" ? "أجندة الأكاديمية" : "Academy calendar"}</span>
            <h2 className="section-title mt-3">
              {lang === "ar" ? "فعاليات تظهر من بيانات الحدث والتذاكر" : "Events driven by event and ticket data"}
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              {lang === "ar"
                ? "تظهر الفعالية بتاريخها، فئتها، مقاعدها، وسعر تذكرتها، مع انتقال مباشر إلى صفحة التفاصيل والحجز."
                : "Each event shows its date, category, seats, and ticket price, with direct access to booking details."}
            </p>
            <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
              <div className="card bg-berry-soft p-5"><b className="text-3xl text-primary">{totalSeats}</b><span className="mt-1 block text-sm font-bold text-muted-foreground">{lang === "ar" ? "مقاعد متاحة" : "available seats"}</span></div>
              <div className="card bg-sun-soft p-5"><b className="text-3xl text-sun">{academyEvents.length}</b><span className="mt-1 block text-sm font-bold text-muted-foreground">{lang === "ar" ? "فعاليات منشورة" : "published events"}</span></div>
            </div>
          </div>
          <div className="grid gap-4">
            {academyEvents.map((event) => {
              const remaining = event.seats - event.seatsTaken;
              const price = event.tickets[0]?.price ?? 0;
              return (
                <article className="card grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center" key={event.id}>
                  <div className="grid size-20 place-items-center rounded-md bg-muted text-center">
                    <b className="block text-2xl text-primary">{event.day}</b>
                    <span className="text-xs font-extrabold text-muted-foreground">{t(event.month, lang)}</span>
                  </div>
                  <div>
                    <span className="tag bg-aqua-soft text-aqua">event.event</span>
                    <h3 className="mt-2 text-xl font-black">{t(event.title, lang)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t(event.type, lang)} · {t(event.time, lang)} · {remaining} {lang === "ar" ? "مقاعد" : "seats"}</p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/events/$eventId" params={{ eventId: event.id }}>
                      {price === 0 ? (lang === "ar" ? "مجاني" : "Free") : `${price} ${lang === "ar" ? "ر.س" : "SAR"}`}
                      <ArrowIcon size={16} />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 sm:py-24">
        <div className="page-wrap">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">{lang === "ar" ? "بيانات أودو القياسية" : "Standard Odoo data"}</span>
              <h2 className="section-title mt-3">
                {lang === "ar" ? "الصفحة الرئيسية كمجموعة أقسام قابلة للبناء" : "Homepage blocks ready to rebuild"}
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/about">{lang === "ar" ? "خريطة النماذج" : "Model map"}<ArrowIcon size={17} /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {odooHomeBlocks.map((module) => (
              <article className="card p-6" key={module.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="tag bg-card text-primary">{module.appName}</span>
                    <h3 className="mt-4 text-xl font-black">{t(module.name, lang)}</h3>
                  </div>
                  {module.id === "events" ? <CalendarDays className="text-aqua" /> : module.id === "elearning" ? <GraduationCap className="text-aqua" /> : module.id === "contacts" ? <Users className="text-aqua" /> : <BookOpen className="text-aqua" />}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {module.models.slice(0, 3).map((model) => (
                    <span className="rounded-full border bg-background px-3 py-1 text-xs font-bold text-muted-foreground" key={model.model}>{model.model}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap py-20 sm:py-24">
        <div className="grid overflow-hidden rounded-lg border bg-card shadow-brand lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-7 sm:p-10">
            <span className="eyebrow">{lang === "ar" ? "من الزائر إلى التسجيل" : "Visitor to registration"}</span>
            <h2 className="section-title mt-3">
              {lang === "ar" ? "مسار واضح لولي الأمر من الاستفسار حتى اختيار البرنامج" : "A clear parent journey from inquiry to program choice"}
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              {lang === "ar"
                ? "تجمع الصفحة الرئيسية أهم نقاط القرار: برنامج مناسب، موعد فعالية، تجربة تعلم، ومساعد ذكي يفتح تذكرة أو يحوّل الاستفسار للتسجيل."
                : "The homepage collects the key decisions: a suitable program, an event date, a learning preview, and an assistant that can open a ticket or guide registration."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/assistant">{lang === "ar" ? "اسأل المساعد" : "Ask assistant"}<MessageCircle size={18} /></Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">{lang === "ar" ? "تواصل معنا" : "Contact us"}</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-0 border-t lg:border-s lg:border-t-0">
            {[
              [Search, lang === "ar" ? "يبحث ولي الأمر عن البرنامج" : "Parent explores programs", "website.page"],
              [Heart, lang === "ar" ? "تُحفظ بيانات التواصل" : "Contact details are captured", "res.partner"],
              [Ticket, lang === "ar" ? "يُنشأ تسجيل أو تذكرة" : "Registration or ticket is created", "sale.order"],
              [Award, lang === "ar" ? "تظهر المتابعة والتقدم" : "Progress and follow-up appear", "slide.slide.partner"],
            ].map(([Icon, label, model]) => {
              const StepIcon = Icon as LucideIcon;
              return (
                <div className="flex items-center gap-4 border-b p-5 last:border-b-0" key={String(model)}>
                  <span className="grid size-12 shrink-0 place-items-center rounded-md bg-berry-soft text-primary"><StepIcon size={22} /></span>
                  <div>
                    <b>{String(label)}</b>
                    <span className="mt-1 block text-xs font-bold text-muted-foreground">{String(model)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProgramsPage() {
  const { lang } = useLanguage();
  const { programs } = usePrograms();
  const [filter, setFilter] = useState<string>("all");
  const filters: FilterItem[] = [
    ["all", "الكل", "All"],
    ["young", "2–5 سنوات", "Ages 2–5"],
    ["school", "5+ سنوات", "Ages 5+"],
  ];
  const list = useMemo(
    () =>
      programs.filter((p) =>
        filter === "all" ? true : filter === "young" ? p.id.startsWith("hosting") : !p.id.startsWith("hosting"),
      ),
    [filter, programs],
  );
  return (
    <PageIntro
      eyebrow={lang === "ar" ? "البرامج والأسعار" : "Programs & pricing"}
      title={lang === "ar" ? "اختر المسار الأنسب لطفلك" : "Choose the right path for your child"}
      text={
        lang === "ar"
          ? "أسعار العام الأكاديمي 2026–2027 كما وردت في جدول الأكاديمية."
          : "Academic year 2026–2027 pricing, based on the academy schedule."
      }
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(([value, ar, en]) => (
          <Button key={value} variant={filter === value ? "primary" : "outline"} onClick={() => setFilter(value)}>
            {lang === "ar" ? ar : en}
          </Button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((p) => (
          <article className="card overflow-hidden" key={p.id}>
            <div className="border-b bg-muted/50 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">
                      <Link to="/programs/$programId" params={{ programId: p.id }} className="transition hover:text-primary">
                        {t(p.title, lang)}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t(p.age, lang)} · {p.time}
                    </p>
                  </div>
                <BookOpen className="text-primary" />
              </div>
            </div>
            <div className="divide-y px-6">
              {p.plans.map((pl) => (
                <div className="flex items-center justify-between gap-4 py-4" key={pl.price + pl.label.en}>
                  <span className="text-sm font-bold">{t(pl.label, lang)}</span>
                  <b className="text-primary">
                    {pl.price.toLocaleString()} {lang === "ar" ? "ر.س" : "SAR"}
                  </b>
                </div>
              ))}
            </div>
            <div className="grid gap-2 p-6 pt-2 sm:grid-cols-2">
              <Button asChild>
                <Link to="/join" search={{ program: p.id }}>
                  {lang === "ar" ? "سجّل الآن" : "Register now"}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.link/a7wsrs" target="_blank" rel="noreferrer">
                  <MessageCircle size={18} />
                  {lang === "ar" ? "استفسار سريع" : "Quick question"}
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm leading-7 text-muted-foreground">
        {lang === "ar"
          ? "الأسعار والأوقات قابلة للتحديث وفق الجدول النهائي للأكاديمية. يرجى تأكيد توفر المقاعد قبل السداد."
          : "Prices and times may be updated according to the academy's final schedule. Please confirm availability before payment."}
      </p>
    </PageIntro>
  );
}

export function LearningPage() {
  const { lang } = useLanguage();
  const [done, setDone] = useState<boolean[]>([true, true, false, false]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const lessons = demoCourse.sections.map((section, index) => ({
    title: section.slides[0]?.title ?? section.title,
    meta: section.title,
    minutes: section.slides.reduce((sum, slide) => sum + slide.minutes, 0),
    kind: section.slides.some((slide) => slide.kind === "quiz") ? "quiz" : "video",
    index,
  }));
  const courseCatalog = [
    {
      id: "english-kids",
      title: "English for Kids",
      subtitle: { ar: "اللغة الإنجليزية للأطفال", en: "English foundations for children" },
      category: "languages",
      level: { ar: "تمهيدي", en: "Starter" },
      lessons: 9,
      hours: 1,
      rating: 4.9,
      progress: 50,
    },
    {
      id: "phonics",
      title: "Phonics Adventures",
      subtitle: { ar: "رحلة ممتعة مع أصوات الحروف", en: "A playful journey through letter sounds" },
      category: "languages",
      level: { ar: "مبتدئ", en: "Beginner" },
      lessons: 12,
      hours: 2,
      rating: 4.8,
      progress: 0,
    },
    {
      id: "creative-skills",
      title: lang === "ar" ? "المهارات الإبداعية" : "Creative Skills",
      subtitle: { ar: "أنشطة قصيرة تنمّي التعبير والخيال", en: "Short activities for expression and imagination" },
      category: "skills",
      level: { ar: "جميع المستويات", en: "All levels" },
      lessons: 8,
      hours: 1,
      rating: 4.7,
      progress: 0,
    },
  ];
  const categories = [
    { id: "all", ar: "كل الدورات", en: "All courses" },
    { id: "languages", ar: "اللغات", en: "Languages" },
    { id: "skills", ar: "المهارات", en: "Skills" },
  ];
  const filteredCourses = courseCatalog.filter((course) => {
    const matchesCategory = category === "all" || course.category === category;
    const searchable = `${course.title} ${course.subtitle.ar} ${course.subtitle.en}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  });
  const completed = done.filter(Boolean).length;
  const progress = Math.round((completed / lessons.length) * 100);

  return (
    <main className="pb-24">
      <section className="border-b bg-card">
        <div className="page-wrap py-12 sm:py-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow"><GraduationCap size={17} />{lang === "ar" ? "أكاديمية كريستينا الرقمية" : "Kristina Digital Academy"}</span>
              <h1 className="section-title mt-4">{lang === "ar" ? "مساحة تعلم تشجّع الطفل على الإنجاز" : "A learning space that celebrates progress"}</h1>
              <p className="mt-4 max-w-xl leading-8 text-muted-foreground">{lang === "ar" ? "دورات قصيرة ومنظمة، أنشطة تفاعلية، وتقدم واضح يمكن للطفل وولي الأمر متابعته خطوة بخطوة." : "Short structured courses, interactive activities, and clear progress for children and parents to follow."}</p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-md bg-aqua-soft px-5 py-4 text-center"><b className="block text-2xl text-aqua">3</b><span className="text-xs font-bold text-muted-foreground">{lang === "ar" ? "دورات متاحة" : "Courses"}</span></div>
              <div className="rounded-md bg-sun-soft px-5 py-4 text-center"><b className="block text-2xl text-sun">9</b><span className="text-xs font-bold text-muted-foreground">{lang === "ar" ? "أوسمة" : "Badges"}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-7 py-10 lg:grid-cols-[0.72fr_1.58fr] lg:items-start">
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="card overflow-hidden shadow-brand">
            <div className="brand-stripe" />
            <div className="p-6 text-center">
              <div className="mx-auto grid size-24 place-items-center rounded-full border-8 border-sun-soft bg-sun text-3xl font-black text-accent-foreground">1</div>
              <p className="mt-4 text-xs font-extrabold text-muted-foreground">{lang === "ar" ? "رتبة المتعلم" : "Learner rank"}</p>
              <h2 className="mt-1 text-2xl font-black text-primary">Doctor</h2>
              <p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? "أهلاً بك، علي" : "Welcome, Ali"}</p>
              <div className="mt-6 text-start">
                <div className="flex items-center justify-between text-xs font-extrabold"><span>{lang === "ar" ? "نحو الرتبة التالية" : "Next rank"}</span><span>{progress}%</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-sun transition-all" style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-md border bg-aqua-soft p-3">
                <span className="text-sm font-extrabold text-aqua">{lang === "ar" ? "الأوسمة المحققة" : "Earned badges"}</span>
                <div className="flex gap-1" aria-label={lang === "ar" ? "ثلاثة أوسمة" : "Three badges"}><Award className="text-sun" size={20} /><Star className="fill-aqua text-aqua" size={20} /><Sparkles className="text-primary" size={20} /></div>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-black text-aqua">{lang === "ar" ? "أحدث الإنجازات" : "Latest achievements"}</h3>
            <div className="mt-4 flex gap-3 border-t pt-4"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-berry-soft text-primary"><CheckCircle2 size={20} /></span><div><b className="text-sm">{lang === "ar" ? "إتمام درس أصوات الحروف" : "Alphabet Sounds completed"}</b><p className="mt-1 text-xs text-muted-foreground">{lang === "ar" ? "آخر نشاط مسجل في المسار" : "Latest activity in your track"}</p></div></div>
          </div>
        </aside>

        <div className="space-y-8">
          <section className="relative overflow-hidden rounded-lg bg-ink p-7 text-ink-foreground shadow-brand sm:p-10">
            <div className="relative z-10 max-w-2xl">
              <span className="tag bg-sun text-accent-foreground">{lang === "ar" ? "دورة نشطة" : "Active course"}</span>
              <p className="mt-5 text-sm font-extrabold text-aqua">{t(demoCourse.level, lang)}</p>
              <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">English for Kids<br/><span className="text-ink-muted">{lang === "ar" ? "اللغة الإنجليزية للأطفال" : "English for children"}</span></h2>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-ink-muted"><span className="flex items-center gap-2"><Clock3 className="text-aqua" size={18} />60 {lang === "ar" ? "دقيقة" : "minutes"}</span><span className="flex items-center gap-2"><BookOpen className="text-aqua" size={18} />9 {lang === "ar" ? "دروس" : "lessons"}</span><span className="flex items-center gap-2"><Award className="text-sun" size={18} />{lang === "ar" ? "شهادة إتمام" : "Certificate"}</span></div>
              <div className="mt-8 max-w-lg"><div className="flex justify-between text-sm font-extrabold"><span>{lang === "ar" ? "نسبة الإنجاز" : "Course progress"}</span><span>{progress}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-line"><div className="h-full rounded-full bg-sun transition-all" style={{ width: `${progress}%` }} /></div></div>
              <Button className="mt-7" asChild><Link to="/learning/english-kids"><Play size={17} />{lang === "ar" ? "مواصلة التعلم" : "Continue learning"}</Link></Button>
            </div>
            <GraduationCap className="absolute -bottom-8 end-4 text-ink-line" size={190} strokeWidth={1} aria-hidden="true" />
          </section>

          <section>
            <div className="flex items-end justify-between gap-4"><div><span className="eyebrow">{lang === "ar" ? "مساري الحالي" : "My current track"}</span><h2 className="mt-2 text-2xl font-black">{lang === "ar" ? "منهاج الدورة" : "Course curriculum"}</h2></div><b className="text-sm text-aqua">{completed}/{lessons.length} {lang === "ar" ? "وحدات" : "units"}</b></div>
            <div className="mt-5 space-y-3">
              {lessons.map((lesson, index) => (
                <article className={`card flex flex-col gap-4 p-5 transition-all sm:flex-row sm:items-center ${!done[index] && index === completed ? "border-sun bg-sun-soft" : ""}`} key={lesson.index}>
                  <span className={`grid size-12 shrink-0 place-items-center rounded-md font-display text-lg font-black ${done[index] ? "bg-aqua-soft text-aqua" : index === completed ? "bg-sun text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1"><h3 className="font-black">{t(lesson.title, lang)}</h3><p className="mt-1 text-sm text-muted-foreground">{t(lesson.meta, lang)} · {lesson.minutes} {lang === "ar" ? "دقيقة" : "min"}</p></div>
                  {done[index] ? <span className="tag bg-aqua-soft text-aqua"><CheckCircle2 size={15} />{lang === "ar" ? "مكتمل" : "Complete"}</span> : index === completed ? <Button size="sm" onClick={() => setDone((items) => items.map((value, itemIndex) => itemIndex === index ? true : value))}><Play size={15} />{lang === "ar" ? "ابدأ الوحدة" : "Start unit"}</Button> : <span className="tag bg-muted text-muted-foreground">{lang === "ar" ? "يفتح بالتتابع" : "Unlocks next"}</span>}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="border-y bg-card py-14">
        <div className="page-wrap">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><span className="eyebrow"><BookOpen size={16} />{lang === "ar" ? "مكتبة الأكاديمية" : "Academy library"}</span><h2 className="section-title mt-3">{lang === "ar" ? "استكشف الدورات" : "Explore courses"}</h2></div><label className="relative block w-full lg:max-w-sm"><Search className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><span className="sr-only">{lang === "ar" ? "ابحث عن دورة" : "Search courses"}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "ar" ? "ابحث باسم الدورة أو المهارة" : "Search by course or skill"} className="h-12 w-full rounded-md border bg-background ps-11 pe-4 outline-none focus:ring-2 focus:ring-ring" /></label></div>
          <div className="mt-6 flex flex-wrap gap-2">{categories.map((item) => <Button key={item.id} size="sm" variant={category === item.id ? "default" : "outline"} onClick={() => setCategory(item.id)}>{lang === "ar" ? item.ar : item.en}</Button>)}</div>
          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => <article className="card overflow-hidden lift" key={course.id}><div className={`h-2 ${index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-aqua" : "bg-sun"}`} /><div className="p-6"><div className="flex items-start justify-between gap-3"><span className="tag bg-muted text-muted-foreground">{t(course.level, lang)}</span><span className="flex items-center gap-1 text-sm font-black"><Star className="fill-sun text-sun" size={16} />{course.rating}</span></div><h3 className="mt-5 text-xl font-black">{course.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{t(course.subtitle, lang)}</p><div className="mt-5 flex gap-5 border-y py-4 text-xs font-extrabold text-muted-foreground"><span>{course.lessons} {lang === "ar" ? "دروس" : "lessons"}</span><span>{course.hours} {lang === "ar" ? "ساعة" : "hour"}</span><span>{lang === "ar" ? "أنشطة وتقييم" : "Activities & quiz"}</span></div><Button className="mt-5 w-full" variant={course.progress ? "default" : "outline"} asChild><Link to="/learning/english-kids">{course.progress ? (lang === "ar" ? "متابعة الدورة" : "Continue course") : (lang === "ar" ? "استكشف الدورة" : "Explore course")}</Link></Button></div></article>)}
          </div>
          {!filteredCourses.length && <p className="mt-8 rounded-md border border-dashed p-8 text-center text-muted-foreground">{lang === "ar" ? "لا توجد دورات مطابقة لبحثك." : "No courses match your search."}</p>}
        </div>
      </section>

      <section className="page-wrap py-12"><div className="flex flex-col items-start justify-between gap-5 rounded-lg bg-sun-soft p-6 sm:flex-row sm:items-center"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-md bg-sun text-accent-foreground"><Award /></span><div><h2 className="font-black">{lang === "ar" ? "شهادة إتمام المسار" : "Course completion certificate"}</h2><p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? "تُتاح تلقائياً بعد إكمال الوحدات والتقييم الختامي." : "Available automatically after all units and the final assessment."}</p></div></div><Button variant="outline" disabled={progress < 100}>{progress < 100 ? (lang === "ar" ? "أكمل المسار أولاً" : "Complete the track first") : (lang === "ar" ? "عرض الشهادة" : "View certificate")}</Button></div></section>
    </main>
  );
}

export function EventsPage() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const featured = academyEvents.find((event) => event.id === "talents-lab") ?? academyEvents[0];
  const eventImages: Record<string, string> = {
    "national-day": eventNationalDay,
    "talents-lab": eventTalentsLab,
    "language-day": eventLanguageDay,
  };
  const filters = [
    { id: "all", ar: "جميع الفعاليات", en: "All events" },
    { id: "community", ar: "مجتمعية", en: "Community" },
    { id: "workshop", ar: "ورش الأطفال", en: "Workshops" },
    { id: "learning", ar: "تعليمية", en: "Learning" },
  ];
  const filteredEvents = academyEvents.filter((event) => {
    const category = event.id === "national-day" ? "community" : event.id === "talents-lab" ? "workshop" : "learning";
    const matchesFilter = filter === "all" || category === filter;
    const searchText = `${t(event.title, lang)} ${t(event.type, lang)} ${t(event.audience, lang)}`.toLowerCase();
    return matchesFilter && searchText.includes(query.trim().toLowerCase());
  });

  if (!featured) return null;

  const featuredRemaining = featured.seats - featured.seatsTaken;
  const featuredPrice = featured.tickets[0]?.price ?? 0;
  return (
    <div className="bg-background pb-24 pt-12 sm:pt-16">
      <div className="page-wrap">
        <header className="flex flex-col justify-between gap-5 border-b-4 border-foreground pb-7 md:flex-row md:items-end">
          <div>
            <span className="eyebrow"><CalendarDays size={17} />{lang === "ar" ? "أجندة الأكاديمية" : "Academy calendar"}</span>
            <h1 className="mt-3 font-display text-5xl font-black leading-none sm:text-7xl">
              {lang === "ar" ? "فعالياتنا" : "Our events"}
            </h1>
            <p className="mt-4 text-lg font-semibold text-muted-foreground">
              {lang === "ar" ? "أنشطة مختارة تجمع بين المعرفة والمرح والوقت العائلي." : "Curated activities blending learning, play, and family time."}
            </p>
          </div>
          <p className="max-w-sm border-s-2 border-aqua ps-4 text-sm leading-7 text-muted-foreground">
            {lang === "ar" ? "ورش وتجارب تعليمية مصممة لتمنح كل طفل مساحة يكتشف فيها اهتماماته ويشارك بثقة." : "Workshops and learning experiences where every child can discover interests and participate with confidence."}
          </p>
        </header>

        <section className="mt-10 grid overflow-hidden rounded-lg border bg-card shadow-brand lg:grid-cols-12">
          <div className="relative min-h-[340px] overflow-hidden lg:col-span-7 lg:min-h-[580px]">
            <img src={eventTalentsLab} width={1408} height={912} alt={t(featured.title, lang)} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:hidden" />
            <span className="absolute start-5 top-5 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground shadow-brand">
              {lang === "ar" ? "الفعالية المختارة" : "Featured event"}
            </span>
          </div>
          <div className="flex flex-col justify-center bg-muted/45 p-6 sm:p-9 lg:col-span-5 lg:p-11">
            <div className="flex items-center gap-4 text-primary">
              <span className="font-display text-5xl font-black">{featured.day}</span>
              <div className="font-extrabold leading-6"><span className="block">{t(featured.month, lang)}</span><span className="text-xs text-muted-foreground">{t(featured.type, lang)}</span></div>
            </div>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight sm:text-4xl">{t(featured.title, lang)}</h2>
            <p className="mt-5 line-clamp-4 text-base leading-8 text-muted-foreground">{t(featured.description, lang)}</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-md border bg-card p-4"><Users className="mb-3 text-aqua" size={20} /><small className="block text-muted-foreground">{lang === "ar" ? "المقاعد المتبقية" : "Seats remaining"}</small><b className="mt-1 block text-xl">{featuredRemaining}</b></div>
              <div className="rounded-md border bg-card p-4"><Clock3 className="mb-3 text-sun" size={20} /><small className="block text-muted-foreground">{lang === "ar" ? "الوقت" : "Time"}</small><b className="mt-1 block text-sm">{t(featured.time, lang)}</b></div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-md border border-primary/20 bg-berry-soft p-4 text-sm">
              <span className="font-bold">{t(featured.audience, lang)}</span>
              <strong className="shrink-0 text-primary">{featuredPrice === 0 ? (lang === "ar" ? "مجاني" : "Free") : `${featuredPrice} ${lang === "ar" ? "ر.س" : "SAR"}`}</strong>
            </div>
            <Button size="lg" className="mt-6 w-full" asChild>
              <Link to="/events/$eventId" params={{ eventId: featured.id }}>
                <Ticket size={19} />{lang === "ar" ? "احجز تذكرتك" : "Book your ticket"}<ArrowIcon size={19} />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col justify-between gap-5 border-b pb-6 lg:flex-row lg:items-end">
            <div><span className="eyebrow">{lang === "ar" ? "استكشف الأجندة" : "Explore the calendar"}</span><h2 className="mt-2 text-3xl font-black">{lang === "ar" ? "فعاليات تناسب اهتمامات طفلك" : "Events for every interest"}</h2></div>
            <label className="relative block w-full lg:max-w-xs">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <span className="sr-only">{lang === "ar" ? "ابحث في الفعاليات" : "Search events"}</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "ar" ? "ابحث عن فعالية…" : "Search events…"} className="h-11 w-full rounded-md border bg-card ps-10 pe-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30" />
            </label>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {filters.map((item) => <Button key={item.id} size="sm" variant={filter === item.id ? "primary" : "outline"} onClick={() => setFilter(item.id)}>{lang === "ar" ? item.ar : item.en}</Button>)}
          </div>

          {filteredEvents.length > 0 ? (
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => {
                const remaining = event.seats - event.seatsTaken;
                const price = event.tickets[0]?.price ?? 0;
                return (
                  <article className="group min-w-0" key={event.id}>
                    <Link to="/events/$eventId" params={{ eventId: event.id }} className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                      <img loading="lazy" src={eventImages[event.id]} width={912} height={1104} alt={t(event.title, lang)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                        <span className="text-sm font-bold text-sun">{event.day} {t(event.month, lang)} · {t(event.type, lang)}</span>
                        <h3 className="mt-2 text-2xl font-black leading-tight">{t(event.title, lang)}</h3>
                      </div>
                    </Link>
                    <div className="mt-4 flex items-center justify-between gap-4 border-b pb-4">
                      <div className="text-sm"><b className={remaining <= 8 ? "text-primary" : "text-aqua"}>{remaining} {lang === "ar" ? "مقاعد متبقية" : "seats left"}</b><span className="mt-1 block text-muted-foreground">{price === 0 ? (lang === "ar" ? "دخول مجاني" : "Free entry") : `${price} ${lang === "ar" ? "ر.س" : "SAR"}`}</span></div>
                      <Button variant="link" className="px-0" asChild><Link to="/events/$eventId" params={{ eventId: event.id }}>{lang === "ar" ? "التفاصيل والحجز" : "Details & booking"}<ArrowIcon size={16} /></Link></Button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : <div className="mt-8 rounded-lg border border-dashed p-10 text-center text-muted-foreground">{lang === "ar" ? "لا توجد فعاليات مطابقة لبحثك." : "No events match your search."}</div>}
        </section>

        <section className="mt-16 grid items-center gap-6 border-y bg-aqua-soft px-6 py-9 md:grid-cols-[1fr_auto] md:px-10">
          <div><span className="eyebrow">{lang === "ar" ? "قبل الحضور" : "Before you visit"}</span><h2 className="mt-2 text-2xl font-black">{lang === "ar" ? "كل ما تحتاجه الأسرة في صفحة الفعالية" : "Everything your family needs in one event page"}</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">{lang === "ar" ? "اطّلع على البرنامج الزمني، الفئة العمرية، التذاكر والمقاعد المتاحة قبل تأكيد التسجيل." : "Review the schedule, age group, tickets, and available seats before confirming registration."}</p></div>
          <Button variant="dark" asChild><Link to="/contact">{lang === "ar" ? "تواصل مع الأكاديمية" : "Contact the academy"}<ArrowIcon size={16} /></Link></Button>
        </section>
      </div>
    </div>
  );
}

export function AboutPage() {
  const { lang } = useLanguage();
  const features: Feature[] = [
    [ShieldCheck, "بيئة داعمة", "Supportive environment"],
    [Sparkles, "تجارب تكشف الموهبة", "Talent-discovery experiences"],
    [Users, "شراكة مع ولي الأمر", "Parent partnership"],
  ];
  const modules: Feature[] = [
    [BookOpen, "التعلم الإلكتروني", "eLearning"],
    [CalendarDays, "الفعاليات", "Events"],
    [Users, "جهات الاتصال وإدارة العلاقات", "Contacts & CRM"],
    [Award, "الاستبيانات والشهادات", "Surveys & Certificates"],
  ];
  return (
    <PageIntro
      eyebrow={lang === "ar" ? "عن كريستينا كيدز" : "About Kristina Kidz"}
      title={lang === "ar" ? "نبدأ من الطفل، لا من القالب" : "We begin with the child, not a template"}
      text={
        lang === "ar"
          ? "أكاديمية تعليمية في القطيف تهتم باكتشاف المواهب وبناء المهارات من خلال التعلم النشط والبيئة الداعمة."
          : "An academy in Al Qatif focused on discovering talents and building skills through active learning."
      }
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card p-8">
          <img src={bird.url} alt="Kristina Kidz" className="mx-auto h-52 w-52 object-contain" />
        </div>
        <div className="grid gap-4">
          {features.map(([Icon, ar, en]) => (
            <div className="card flex gap-4 p-5" key={ar}>
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-berry-soft text-primary">
                <Icon />
              </span>
              <div>
                <h3 className="font-extrabold">{lang === "ar" ? ar : en}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {lang === "ar"
                    ? "متابعة واضحة وتجربة مصممة لتناسب احتياج كل طفل."
                    : "Clear follow-up and an experience shaped around each child's needs."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="mt-14">
        <h2 className="section-title">{lang === "ar" ? "كيف تعمل المنصة مع أودو 19؟" : "How the platform maps to Odoo 19"}</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(([Icon, label]) => (
            <div className="card p-5" key={label}>
              <Icon className="text-aqua" />
              <b className="mt-4 block">{label}</b>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          {lang === "ar"
            ? "عند تحويل النموذج إلى أودو، تُربط الدورات المدفوعة بالمتجر، والمحتوى بالتعلم الإلكتروني، والورش بالفعاليات. ملفات الطلاب والدرجات والحضور وتواصل أولياء الأمور تُنفذ كتوسعة مخصصة، بينما تُدار بيانات الموظفين وحضورهم عبر تطبيقات الموارد البشرية الأساسية."
            : "In Odoo, paid courses map to eCommerce, content to eLearning, and workshops to Events. Student records, grades, attendance, and parent communication require a tailored extension; employee records and attendance use the standard HR apps."}
        </p>
      </section>
      <OdooModulesSection />
    </PageIntro>
  );
}

export function ContactPage() {
  const { lang } = useLanguage();
  return (
    <PageIntro
      eyebrow={lang === "ar" ? "تواصل معنا" : "Contact"}
      title={lang === "ar" ? "نساعدك في اختيار البداية المناسبة" : "Let's choose the right starting point"}
      text={
        lang === "ar"
          ? "تواصل مباشرة للاستفسار عن البرامج، الأعمار، والمقاعد المتاحة."
          : "Contact the academy about programs, age groups, and availability."
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <Info
            icon={<MapPin />}
            title={lang === "ar" ? "العنوان" : "Address"}
            text={
              lang === "ar"
                ? "4384 شارع الحسين بن علي، حي، القطيف 32641، المملكة العربية السعودية"
                : "4384 Al Hussein Bin Ali St, Al Qatif 32641, Saudi Arabia"
            }
          />
          <Info
            icon={<Clock3 />}
            title={lang === "ar" ? "ساعات العمل" : "Opening hours"}
            text={lang === "ar" ? "السبت إلى الخميس، 2:00–9:00 مساءً · الجمعة مغلق" : "Saturday–Thursday, 2:00–9:00 PM · Friday closed"}
          />
          <Info
            icon={<MessageCircle />}
            title="WhatsApp"
            text={lang === "ar" ? "تواصل عبر الرابط الرسمي المنشور" : "Use the academy's published contact link"}
          />
          <Button size="lg" className="w-full" asChild>
            <a href="https://wa.link/a7wsrs" target="_blank" rel="noreferrer">
              {lang === "ar" ? "ابدأ محادثة واتساب" : "Start WhatsApp chat"}
            </a>
          </Button>
        </div>
        <div className="card overflow-hidden">
          <iframe
            title="Kristina Kidz Academy location"
            className="h-[480px] w-full border-0"
            loading="lazy"
            src="https://www.google.com/maps?q=26.5854188,50.0201666&z=16&output=embed"
          />
        </div>
      </div>
    </PageIntro>
  );
}

function Info({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="card flex gap-4 p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-aqua-soft text-aqua">{icon}</span>
      <div>
        <b>{title}</b>
        <p className="mt-1 text-sm leading-7 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function PageIntro({
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
