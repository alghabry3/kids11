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
  Users,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/site-shell";
import { t } from "@/data/site";
import { usePrograms } from "@/lib/programs-store";
import { OdooModulesSection } from "@/components/detail-pages";
import hero from "@/assets/academy-hero.jpg";
import bird from "@/assets/kristina-bird.png.asset.json";

function Arrow() {
  const { lang } = useLanguage();
  return lang === "ar" ? ArrowLeft : ArrowRight;
}

type Feature = [LucideIcon, string, string];
type FilterItem = [string, string, string];

export function Hero() {
  const { lang } = useLanguage();
  const ArrowComp = Arrow();
  const features: Feature[] = [
    [Heart, "الرعاية التي تمنح الأمان", "Care that feels safe"],
    [Search, "اكتشاف نقاط القوة", "Discovering strengths"],
    [GraduationCap, "تعلم يبقى أثره", "Learning that lasts"],
  ];
  return (
    <>
      <section className="relative min-h-[76vh] overflow-hidden">
        <img
          src={hero}
          width={1600}
          height={1104}
          alt={lang === "ar" ? "أطفال يتعلمون معاً في الأكاديمية" : "Children learning together at the academy"}
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/10 rtl:bg-gradient-to-r" />
        <div className="page-wrap relative flex min-h-[76vh] items-center">
          <div className="max-w-2xl py-24">
            <span className="eyebrow">
              <Sparkles size={16} />
              {lang === "ar" ? "مساحة لكل موهبة" : "A place for every talent"}
            </span>
            <h1 className="display-title mt-5">
              {lang === "ar" ? (
                <>
                  نكتشف ما يُبدع فيه <span className="text-primary">طفلك</span>
                </>
              ) : (
                <>
                  Discover what makes your <span className="text-primary">child shine</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {lang === "ar"
                ? "برامج تعليمية وتجارب عملية تساعد الطفل على فهم قدراته، وبناء لغته، والتعبير عن أفكاره بثقة."
                : "Practical learning experiences that help children understand their strengths, build language skills, and express ideas with confidence."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/programs">
                  {lang === "ar" ? "استكشف البرامج" : "Explore programs"}
                  <ArrowComp size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">{lang === "ar" ? "تعرف علينا" : "Meet the academy"}</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-5 text-sm font-bold">
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
  return (
    <>
      <Hero />
      <section className="page-wrap py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="eyebrow">{lang === "ar" ? "برامجنا" : "Our programs"}</span>
            <h2 className="section-title mt-3">
              {lang === "ar" ? "مسارات تناسب مرحلة طفلك" : "Paths for every learning stage"}
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/programs">{lang === "ar" ? "جميع الأسعار" : "All pricing"}</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {programs.slice(0, 3).map((p, i) => (
            <article
              className={`card lift overflow-hidden border-t-4 ${i === 0 ? "border-t-primary" : i === 1 ? "border-t-sun" : "border-t-aqua"}`}
              key={p.id}
            >
              <div className="p-6">
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
                <div className="mt-6 flex items-end justify-between">
                  <span className="text-sm text-muted-foreground">{lang === "ar" ? "تبدأ من" : "From"}</span>
                  <strong className="text-2xl text-primary">
                    {p.plans[0]?.price ?? 0} <small>{lang === "ar" ? "ر.س" : "SAR"}</small>
                  </strong>
                </div>
                <Link
                  to="/programs/$programId"
                  params={{ programId: p.id }}
                  className="mt-4 inline-block text-sm font-extrabold text-primary hover:underline"
                >
                  {lang === "ar" ? "تفاصيل البرنامج والباقات" : "Program details & plans"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-aqua-soft py-20">
        <div className="page-wrap grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="eyebrow">{lang === "ar" ? "تعلم يتجاوز الصف" : "Learning beyond the classroom"}</span>
            <h2 className="section-title mt-3">
              {lang === "ar" ? "الدرس، النشاط، والتقدم في مكان واحد" : "Lessons, activities, and progress in one place"}
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              {lang === "ar"
                ? "يواصل الطفل تعلمه من المنزل عبر محتوى بسيط وتفاعلي، بينما يتابع ولي الأمر إنجازه خطوة بخطوة."
                : "Children continue at home with clear interactive content, while parents follow progress step by step."}
            </p>
            <Button className="mt-7" asChild>
              <Link to="/learning">{lang === "ar" ? "شاهد تجربة التعلم" : "View learning experience"}</Link>
            </Button>
          </div>
          <div className="card p-6 shadow-brand">
            <div className="flex items-center justify-between">
              <span className="tag bg-aqua-soft text-aqua">English for Kids</span>
              <span className="font-extrabold text-primary">68%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] bg-aqua" />
            </div>
            {["Welcome to English", "Alphabet Sounds", "Colors & Shapes"].map((x, i) => (
              <div className="mt-4 flex items-center gap-3 border-t pt-4" key={x}>
                <span
                  className={`grid size-9 place-items-center rounded-full ${i < 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {i < 2 ? <CheckCircle2 size={18} /> : <Play size={17} />}
                </span>
                <span className="font-bold">{x}</span>
              </div>
            ))}
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
  const lessons = [
    { ar: "مرحباً بك في الإنجليزية", en: "Welcome to English" },
    { ar: "أصوات الحروف", en: "Alphabet Sounds" },
    { ar: "الألوان والأشكال", en: "Colors & Shapes" },
    { ar: "كلمات الصف الأساسية", en: "Classroom Words" },
  ];
  return (
    <PageIntro
      eyebrow={lang === "ar" ? "التعلم الإلكتروني" : "eLearning"}
      title="English for Kids"
      text={
        lang === "ar"
          ? "نموذج تفاعلي لمسار الطفل التعليمي ومتابعة الإنجاز."
          : "An interactive preview of the child's learning path and progress."
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]">
        <aside className="card p-6">
          <div className="grid size-14 place-items-center rounded-md bg-aqua-soft text-aqua">
            <GraduationCap />
          </div>
          <h2 className="mt-5 text-xl font-extrabold">
            {lang === "ar" ? "أساسيات اللغة الإنجليزية" : "English Foundations"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {lang === "ar" ? "مفردات وأصوات وأنشطة قصيرة تناسب الأطفال." : "Short vocabulary, phonics and playful activities."}
          </p>
          <div className="mt-6 h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(done.filter(Boolean).length / 4) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-bold">
            {done.filter(Boolean).length} / 4 {lang === "ar" ? "دروس مكتملة" : "lessons complete"}
          </p>
          <Button variant="outline" className="mt-5 w-full" asChild>
            <Link to="/learning/english-kids">{lang === "ar" ? "افتح تجربة المسار الكاملة" : "Open the full course"}</Link>
          </Button>
        </aside>
        <div className="card divide-y">
          {lessons.map((l, i) => (
            <button
              key={l.en}
              className="flex w-full items-center gap-4 p-5 text-start hover:bg-muted/50"
              onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full ${done[i] ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {done[i] ? <CheckCircle2 /> : <Play size={18} />}
              </span>

              <span className="flex-1">
                <b>{lang === "ar" ? l.ar : l.en}</b>
                <small className="mt-1 block text-muted-foreground">
                  {lang === "ar" ? "نشاط تفاعلي · 8 دقائق" : "Interactive activity · 8 min"}
                </small>
              </span>
              <span className="text-xs font-bold text-primary">
                {done[i] ? (lang === "ar" ? "مكتمل" : "Done") : lang === "ar" ? "ابدأ" : "Start"}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 card flex flex-wrap items-center justify-between gap-4 bg-sun-soft p-6">
        <div className="flex items-center gap-4">
          <Award className="text-sun" size={36} />
          <div>
            <b>{lang === "ar" ? "شهادة إتمام المسار" : "Course completion certificate"}</b>
            <p className="text-sm text-muted-foreground">
              {lang === "ar"
                ? "تُفتح بعد إكمال جميع الدروس والتقييم."
                : "Unlocked after lessons and assessment are completed."}
            </p>
          </div>
        </div>
        <Button variant="outline" disabled>
          {lang === "ar" ? "غير متاحة بعد" : "Not yet available"}
        </Button>
      </div>
    </PageIntro>
  );
}

export function EventsPage() {
  const { lang } = useLanguage();
  const events = [
    {
      id: "national-day",
      day: "23",
      month: lang === "ar" ? "سبتمبر" : "SEP",
      title: lang === "ar" ? "احتفاء اليوم الوطني" : "Saudi National Day Celebration",
      type: lang === "ar" ? "فعالية مجتمعية" : "Community event",
    },
    {
      id: "talents-lab",
      day: "08",
      month: lang === "ar" ? "أكتوبر" : "OCT",
      title: lang === "ar" ? "مختبر المواهب الصغير" : "Little Talents Lab",
      type: lang === "ar" ? "ورشة أطفال" : "Kids workshop",
    },
    {
      id: "language-day",
      day: "22",
      month: lang === "ar" ? "أكتوبر" : "OCT",
      title: lang === "ar" ? "يوم اللغة المرح" : "Fun Language Day",
      type: lang === "ar" ? "نشاط تعليمي" : "Learning activity",
    },
  ];
  return (
    <PageIntro
      eyebrow={lang === "ar" ? "الفعاليات" : "Events"}
      title={lang === "ar" ? "أيام تصنع ذكريات ومعرفة" : "Days filled with discovery"}
      text={lang === "ar" ? "استكشف الأنشطة المقبلة وسجل اهتمامك بسهولة." : "Explore upcoming activities and register your interest."}
    >
      <div className="grid gap-5">
        {events.map((e, i) => (
          <article className="card grid items-center gap-5 p-5 sm:grid-cols-[90px_1fr_auto]" key={e.title}>
            <div
              className={`grid h-20 place-items-center rounded-md ${i === 0 ? "bg-berry-soft text-primary" : i === 1 ? "bg-aqua-soft text-aqua" : "bg-sun-soft text-foreground"}`}
            >
              <div className="text-center">
                <b className="block text-2xl">{e.day}</b>
                <small className="font-extrabold">{e.month}</small>
              </div>
            </div>
            <div>
              <span className="tag bg-muted">{e.type}</span>
              <h2 className="mt-3 text-xl font-extrabold">
                <Link to="/events/$eventId" params={{ eventId: e.id }} className="transition hover:text-primary">
                  {e.title}
                </Link>
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 size={16} />
                {lang === "ar" ? "5:00 – 7:00 مساءً · مقر الأكاديمية" : "5:00 – 7:00 PM · Academy venue"}
              </p>
              <Link
                to="/events/$eventId"
                params={{ eventId: e.id }}
                className="mt-2 inline-block text-sm font-extrabold text-primary hover:underline"
              >
                {lang === "ar" ? "التفاصيل والمقاعد والتذاكر" : "Details, seats & tickets"}
              </Link>
            </div>
            <Button asChild>
              <Link to="/join">
                {lang === "ar" ? "سجل اهتمامك" : "Register interest"}
              </Link>
            </Button>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        {lang === "ar"
          ? "الفعاليات المعروضة نموذجية للمعاينة، وتُحدّث بالمواعيد المعتمدة من الأكاديمية."
          : "Events shown are preview content and will be updated with confirmed academy dates."}
      </p>
    </PageIntro>
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
