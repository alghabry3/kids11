import { Link } from "@tanstack/react-router";
import { Pencil, Plus, RotateCcw, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/site-language";
import { t } from "@/data/site";
import { usePrograms, slugify, type Plan, type Program } from "@/lib/programs-store";

const field =
  "mt-2 w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

const emptyProgram = (): Program => ({
  id: "",
  title: { ar: "", en: "" },
  age: { ar: "", en: "" },
  time: "",
  color: "berry",
  plans: [{ label: { ar: "", en: "" }, price: 0 }],
});

export function AdminProgramsPage() {
  const { lang } = useLanguage();
  const { programs, addProgram, updateProgram, deleteProgram, resetPrograms, isCustom } = usePrograms();
  const [draft, setDraft] = useState<Program | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const ar = lang === "ar";
  const startNew = () => {
    setEditingId(null);
    setDraft(emptyProgram());
  };
  const startEdit = (p: Program) => {
    setEditingId(p.id);
    setDraft(JSON.parse(JSON.stringify(p)) as Program);
  };
  const patch = (partial: Partial<Program>) => setDraft((d) => (d ? { ...d, ...partial } : d));
  const patchPlan = (index: number, partial: Partial<Plan>) =>
    setDraft((d) =>
      d ? { ...d, plans: d.plans.map((pl, i) => (i === index ? { ...pl, ...partial } : pl)) } : d,
    );

  const save = () => {
    if (!draft) return;
    const plans = draft.plans.filter((pl) => pl.label.ar.trim() || pl.label.en.trim());
    if (!draft.title.ar.trim() || !plans.length) {
      setNotice(ar ? "أدخل اسم البرنامج وباقة واحدة على الأقل." : "Enter a program name and at least one plan.");
      return;
    }
    const normalized: Program = {
      ...draft,
      plans: plans.map((pl) => ({
        label: { ar: pl.label.ar || pl.label.en, en: pl.label.en || pl.label.ar },
        price: Number(pl.price) || 0,
      })),
      title: { ar: draft.title.ar, en: draft.title.en || draft.title.ar },
      age: { ar: draft.age.ar, en: draft.age.en || draft.age.ar },
      id: draft.id || slugify(draft.title.en || draft.title.ar),
    };
    if (editingId) {
      updateProgram(editingId, normalized);
      setNotice(ar ? "تم حفظ التعديلات." : "Changes saved.");
    } else {
      if (programs.some((p) => p.id === normalized.id)) normalized.id = `${normalized.id}-${Date.now().toString(36)}`;
      addProgram(normalized);
      setNotice(ar ? "تمت إضافة البرنامج ويظهر الآن في صفحة البرامج." : "Program added and now visible on the programs page.");
    }
    setDraft(null);
    setEditingId(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <span className="eyebrow">{ar ? "إدارة المحتوى" : "Content management"}</span>
      <h1 className="section-title mt-3">{ar ? "إدارة البرامج والباقات والأسعار" : "Manage programs, plans & pricing"}</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
        {ar
          ? "هذه الشاشة تحاكي نموذج product.template في أودو: كل برنامج منتج، وكل باقة متغيّر بسعره. التعديلات تُحفظ في هذا المتصفح وتظهر مباشرة في صفحات الموقع."
          : "This screen mirrors Odoo's product.template: each program is a product and each plan a priced variant. Edits are stored in this browser and reflected across the site."}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        <Button onClick={startNew}>
          <Plus size={18} />
          {ar ? "برنامج جديد" : "New program"}
        </Button>
        <Button variant="outline" onClick={() => { resetPrograms(); setDraft(null); setNotice(ar ? "تمت الاستعادة للبيانات الأصلية." : "Restored to original data."); }}>
          <RotateCcw size={18} />
          {ar ? "استعادة الافتراضي" : "Reset to defaults"}
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/programs">{ar ? "عرض صفحة البرامج" : "View programs page"}</Link>
        </Button>
      </div>

      {notice && (
        <p className="mt-5 rounded-md border border-aqua/40 bg-aqua-soft px-4 py-3 text-sm font-bold">{notice}</p>
      )}

      {draft && (
        <div className="card mt-8 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold">
              {editingId ? (ar ? "تعديل برنامج" : "Edit program") : ar ? "إضافة برنامج" : "Add program"}
            </h2>
            <button className="icon-action" onClick={() => setDraft(null)} aria-label={ar ? "إغلاق" : "Close"}>
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              {ar ? "اسم البرنامج (عربي)" : "Program name (Arabic)"}
              <input className={field} value={draft.title.ar} onChange={(e) => patch({ title: { ...draft.title, ar: e.target.value } })} />
            </label>
            <label className="block text-sm font-bold">
              {ar ? "اسم البرنامج (إنجليزي)" : "Program name (English)"}
              <input className={field} value={draft.title.en} onChange={(e) => patch({ title: { ...draft.title, en: e.target.value } })} />
            </label>
            <label className="block text-sm font-bold">
              {ar ? "الفئة العمرية (عربي)" : "Age group (Arabic)"}
              <input className={field} value={draft.age.ar} onChange={(e) => patch({ age: { ...draft.age, ar: e.target.value } })} placeholder={ar ? "6 سنوات فأكثر" : "Ages 6+"} />
            </label>
            <label className="block text-sm font-bold">
              {ar ? "الفئة العمرية (إنجليزي)" : "Age group (English)"}
              <input className={field} value={draft.age.en} onChange={(e) => patch({ age: { ...draft.age, en: e.target.value } })} placeholder="Ages 6+" />
            </label>
            <label className="block text-sm font-bold">
              {ar ? "الأوقات" : "Timing"}
              <input className={field} value={draft.time} onChange={(e) => patch({ time: e.target.value })} placeholder="4:00–8:00" />
            </label>
            <label className="block text-sm font-bold">
              {ar ? "لون البطاقة" : "Card color"}
              <select className={field} value={draft.color} onChange={(e) => patch({ color: e.target.value })}>
                <option value="berry">{ar ? "توتي" : "Berry"}</option>
                <option value="aqua">{ar ? "تركوازي" : "Aqua"}</option>
                <option value="sun">{ar ? "أصفر" : "Sun"}</option>
              </select>
            </label>
          </div>

          <h3 className="mt-8 font-extrabold">{ar ? "الباقات والأسعار" : "Plans & pricing"}</h3>
          <div className="mt-4 grid gap-3">
            {draft.plans.map((pl, i) => (
              <div key={i} className="grid items-end gap-3 rounded-md border border-border p-4 sm:grid-cols-[1fr_1fr_140px_auto]">
                <label className="block text-xs font-bold">
                  {ar ? "اسم الباقة (عربي)" : "Plan (Arabic)"}
                  <input className={field} value={pl.label.ar} onChange={(e) => patchPlan(i, { label: { ...pl.label, ar: e.target.value } })} placeholder={ar ? "شهري · يومان" : "Monthly"} />
                </label>
                <label className="block text-xs font-bold">
                  {ar ? "اسم الباقة (إنجليزي)" : "Plan (English)"}
                  <input className={field} value={pl.label.en} onChange={(e) => patchPlan(i, { label: { ...pl.label, en: e.target.value } })} placeholder="Monthly · 2 days" />
                </label>
                <label className="block text-xs font-bold">
                  {ar ? "السعر (ر.س)" : "Price (SAR)"}
                  <input type="number" min={0} className={field} value={pl.price} onChange={(e) => patchPlan(i, { price: Number(e.target.value) })} />
                </label>
                <button
                  className="icon-action mb-1"
                  aria-label={ar ? "حذف الباقة" : "Remove plan"}
                  onClick={() => patch({ plans: draft.plans.filter((_, x) => x !== i) })}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-3" onClick={() => patch({ plans: [...draft.plans, { label: { ar: "", en: "" }, price: 0 }] })}>
            <Plus size={18} />
            {ar ? "إضافة باقة" : "Add plan"}
          </Button>

          <div className="mt-7 flex flex-wrap gap-2 border-t pt-6">
            <Button onClick={save}>
              <Save size={18} />
              {ar ? "حفظ" : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setDraft(null)}>
              {ar ? "إلغاء" : "Cancel"}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-4">
        {programs.map((p) => (
          <article key={p.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-extrabold">{t(p.title, lang)}</h2>
                  {isCustom(p.id) && <span className="tag bg-sun-soft">{ar ? "مضاف حديثاً" : "Newly added"}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(p.age, lang)} · {p.time} · <code className="text-xs font-extrabold">{p.id}</code>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => startEdit(p)}>
                  <Pencil size={16} />
                  {ar ? "تعديل" : "Edit"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteProgram(p.id);
                    setNotice(ar ? "تم حذف البرنامج." : "Program deleted.");
                    if (editingId === p.id) setDraft(null);
                  }}
                >
                  <Trash2 size={16} />
                  {ar ? "حذف" : "Delete"}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
              {p.plans.map((pl) => (
                <span key={pl.label.en + pl.price} className="tag bg-muted">
                  {t(pl.label, lang)} · <b className="ms-1 text-primary">{pl.price.toLocaleString()}</b>
                </span>
              ))}
            </div>
          </article>
        ))}
        {!programs.length && (
          <p className="card p-8 text-center text-sm text-muted-foreground">
            {ar ? "لا توجد برامج حالياً. أضف برنامجاً جديداً أو استعد البيانات الافتراضية." : "No programs yet. Add one or reset to defaults."}
          </p>
        )}
      </div>
    </section>
  );
}
