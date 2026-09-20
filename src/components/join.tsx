import { CheckCircle2, Loader2, MessageCircle, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/site-shell";
import { t } from "@/data/site";
import { usePrograms } from "@/lib/programs-store";
import { recommendProgram, type Recommendation } from "@/lib/recommend.functions";

const TIME_SLOTS = [
  { id: "morning", ar: "صباحي · 7:00 – 11:00", en: "Morning · 7:00 – 11:00" },
  { id: "noon", ar: "ظهيرة · 12:30 – 3:30", en: "Midday · 12:30 – 3:30" },
  { id: "evening", ar: "مسائي · 4:00 – 8:00", en: "Evening · 4:00 – 8:00" },
];

const INTEREST_CHIPS = [
  { ar: "اللغة الإنجليزية", en: "English language" },
  { ar: "القراءة والقصص", en: "Reading & stories" },
  { ar: "الرسم والفنون", en: "Art & drawing" },
  { ar: "العلوم والتجارب", en: "Science & experiments" },
  { ar: "الحركة واللعب", en: "Movement & play" },
  { ar: "الرياضيات والمنطق", en: "Math & logic" },
];

const field =
  "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

export function ProgramAdvisor({ onPick }: { onPick: (programId: string) => void }) {
  const { lang } = useLanguage();
  const { programs } = usePrograms();
  const [age, setAge] = useState("5");
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Recommendation | null>(null);

  const toggle = (value: string) =>
    setInterests((list) => (list.includes(value) ? list.filter((x) => x !== value) : [...list, value]));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (interests.length === 0 && notes.trim().length < 3) {
      setError(lang === "ar" ? "اختر اهتماماً واحداً على الأقل أو اكتب وصفاً قصيراً." : "Pick at least one interest or write a short note.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await recommendProgram({
        data: {
          age: Number(age),
          interests: interests.join("، ") || notes.trim(),
          notes: notes.trim() || null,
          lang,
        },
      });
      setResult(data);
    } catch {
      setError(
        lang === "ar"
          ? "تعذر إنشاء التوصية الآن. حاول مرة أخرى بعد قليل أو تواصل معنا عبر واتساب."
          : "We couldn't create the recommendation right now. Please try again shortly or reach us on WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  const named = (id: string | null) => programs.find((p) => p.id === id);
  const recommended = named(result?.programId ?? null);
  const alternative = named(result?.alternativeId ?? null);

  return (
    <div className="card p-6 sm:p-8">
      <span className="eyebrow">
        <Sparkles size={16} />
        {lang === "ar" ? "مساعد اختيار البرنامج" : "Program advisor"}
      </span>
      <h2 className="section-title mt-3 text-2xl">
        {lang === "ar" ? "أخبرنا عن طفلك، ونقترح البرنامج المناسب" : "Tell us about your child, we suggest the right program"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {lang === "ar"
          ? "أدخل عمر الطفل وأبرز اهتماماته، وسيقترح المساعد الذكي المسار الأنسب مع أسباب الاختيار."
          : "Enter the child's age and interests, and the assistant will suggest the best path with clear reasons."}
      </p>

      <form className="mt-7 grid gap-5" onSubmit={submit}>
        <label className="block text-sm font-bold">
          {lang === "ar" ? "عمر الطفل (بالسنوات)" : "Child's age (years)"}
          <input
            className={field}
            type="number"
            min={1}
            max={18}
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <div>
          <span className="text-sm font-bold">{lang === "ar" ? "اهتمامات الطفل" : "Child's interests"}</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {INTEREST_CHIPS.map((chip) => {
              const value = lang === "ar" ? chip.ar : chip.en;
              const active = interests.includes(value);
              return (
                <button
                  key={chip.en}
                  type="button"
                  onClick={() => toggle(value)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <label className="block text-sm font-bold">
          {lang === "ar" ? "ملاحظات إضافية (اختياري)" : "Extra notes (optional)"}
          <textarea
            className={field}
            rows={3}
            maxLength={400}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              lang === "ar" ? "مثال: يحب القصص ويحتاج دعماً في نطق الإنجليزية." : "e.g. loves stories and needs help with English pronunciation."
            }
          />
        </label>

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
          {loading
            ? lang === "ar"
              ? "جارٍ تجهيز التوصية…"
              : "Preparing recommendation…"
            : lang === "ar"
              ? "اقترح البرنامج المناسب"
              : "Suggest a program"}
        </Button>
      </form>

      {error && <p className="mt-5 rounded-md bg-berry-soft p-4 text-sm font-bold text-primary">{error}</p>}

      {result && (
        <div className="mt-7 rounded-md border border-primary/30 bg-berry-soft/60 p-6">
          <span className="tag bg-background">{lang === "ar" ? "التوصية" : "Recommendation"}</span>
          <h3 className="mt-4 text-xl font-extrabold">{result.headline}</h3>
          {recommended && <p className="mt-2 font-bold text-primary">{t(recommended.title, lang)}</p>}
          <p className="mt-3 text-sm leading-7">{result.why}</p>
          {result.tips.length > 0 && (
            <ul className="mt-4 grid gap-2">
              {result.tips.map((tip) => (
                <li className="flex gap-2 text-sm leading-7" key={tip}>
                  <CheckCircle2 className="mt-1 shrink-0 text-primary" size={16} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          )}
          {alternative && (
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === "ar" ? "بديل مناسب: " : "Good alternative: "}
              <b>{t(alternative.title, lang)}</b>
            </p>
          )}
          {recommended && (
            <Button className="mt-6" onClick={() => onPick(recommended.id)}>
              {lang === "ar" ? "سجّل في هذا البرنامج" : "Register for this program"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function EnrollForm({ programId, setProgramId }: { programId: string; setProgramId: (id: string) => void }) {
  const { lang } = useLanguage();
  const { programs } = usePrograms();
  const [slot, setSlot] = useState(TIME_SLOTS[0]!.id);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const program = programs.find((p) => p.id === programId);
  const slotLabel = TIME_SLOTS.find((s) => s.id === slot);

  if (sent) {
    return (
      <div className="card p-8 text-center" id="enroll">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-aqua-soft text-aqua">
          <CheckCircle2 size={32} />
        </span>
        <h2 className="section-title mt-5 text-2xl">{lang === "ar" ? "تم استلام طلب التسجيل" : "Registration received"}</h2>
        <p className="mt-4 text-sm leading-8 text-muted-foreground">
          {lang === "ar" ? (
            <>
              شكراً {parentName || "لك"}، سجّلنا طلب {childName || "طفلك"} في{" "}
              <b className="text-foreground">{program ? t(program.title, lang) : ""}</b> ضمن الفترة{" "}
              <b className="text-foreground">{slotLabel ? t({ ar: slotLabel.ar, en: slotLabel.en }, lang) : ""}</b>. سيتواصل فريق
              الأكاديمية معك لتأكيد المقعد وموعد الزيارة.
            </>
          ) : (
            <>
              Thank you {parentName || "for reaching out"}. We received the request for {childName || "your child"} in{" "}
              <b className="text-foreground">{program ? t(program.title, lang) : ""}</b> during the{" "}
              <b className="text-foreground">{slotLabel ? t({ ar: slotLabel.ar, en: slotLabel.en }, lang) : ""}</b> slot. Our team
              will contact you to confirm the seat and a visit time.
            </>
          )}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => setSent(false)}>
            {lang === "ar" ? "تسجيل طفل آخر" : "Register another child"}
          </Button>
          <Button asChild>
            <a href="https://wa.link/a7wsrs" target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              {lang === "ar" ? "متابعة عبر واتساب" : "Follow up on WhatsApp"}
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="enroll"
      className="card p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <span className="eyebrow">{lang === "ar" ? "نموذج التسجيل" : "Registration form"}</span>
      <h2 className="section-title mt-3 text-2xl">{lang === "ar" ? "احجز مقعد طفلك" : "Reserve your child's seat"}</h2>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold sm:col-span-2">
          {lang === "ar" ? "البرنامج" : "Program"}
          <select className={field} value={programId} onChange={(e) => setProgramId(e.target.value)} required>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {t(p.title, lang)} — {t(p.age, lang)}
              </option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2">
          <span className="text-sm font-bold">{lang === "ar" ? "الفترة المفضلة" : "Preferred time"}</span>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {TIME_SLOTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlot(s.id)}
                className={`rounded-md border px-4 py-3 text-sm font-bold transition ${slot === s.id ? "border-primary bg-berry-soft text-primary" : "border-border hover:border-primary"}`}
              >
                {lang === "ar" ? s.ar : s.en}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-sm font-bold">
          {lang === "ar" ? "اسم الطفل" : "Child's name"}
          <input className={field} required value={childName} onChange={(e) => setChildName(e.target.value)} />
        </label>
        <label className="block text-sm font-bold">
          {lang === "ar" ? "عمر الطفل" : "Child's age"}
          <input
            className={field}
            type="number"
            min={1}
            max={18}
            required
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
          />
        </label>
        <label className="block text-sm font-bold">
          {lang === "ar" ? "اسم ولي الأمر" : "Parent's name"}
          <input className={field} required value={parentName} onChange={(e) => setParentName(e.target.value)} />
        </label>
        <label className="block text-sm font-bold">
          {lang === "ar" ? "رقم الجوال" : "Mobile number"}
          <input
            className={field}
            type="tel"
            inputMode="tel"
            required
            placeholder="05XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="block text-sm font-bold sm:col-span-2">
          {lang === "ar" ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto">
        {lang === "ar" ? "إرسال طلب التسجيل" : "Send registration request"}
      </Button>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">
        {lang === "ar"
          ? "هذا نموذج تفاعلي للمعاينة؛ عند الربط مع أودو 19 يُنشئ الطلب سجل مسجّل في الفعاليات أو التعليم الإلكتروني تلقائياً."
          : "This is an interactive preview; once connected to Odoo 19 the request creates an attendee or student record automatically."}
      </p>
    </form>
  );
}

export function JoinPage({ initialProgram }: { initialProgram?: string | undefined }) {
  const { lang } = useLanguage();
  const { programs } = usePrograms();
  const [programId, setProgramId] = useState(
    initialProgram && programs.some((p) => p.id === initialProgram) ? initialProgram : (programs[0]?.id ?? ""),
  );

  const pick = (id: string) => {
    setProgramId(id);
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-wrap py-16">
      <span className="eyebrow">{lang === "ar" ? "التسجيل" : "Join us"}</span>
      <h1 className="section-title mt-3">
        {lang === "ar" ? "خطوتان للانضمام إلى كريستينا كيدز" : "Two steps to join Kristina Kidz"}
      </h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
        {lang === "ar"
          ? "ابدأ بمساعد اختيار البرنامج للحصول على توصية مخصصة، ثم أكمل نموذج التسجيل لحجز المقعد."
          : "Start with the advisor for a personal recommendation, then complete the form to reserve a seat."}
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
        <ProgramAdvisor onPick={pick} />
        <EnrollForm programId={programId} setProgramId={setProgramId} />
      </div>
    </div>
  );
}
