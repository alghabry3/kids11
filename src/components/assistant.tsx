import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Bot,
  CheckCircle2,
  Database,
  Headphones,
  LifeBuoy,
  MessageSquare,
  Send,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/site-language";
import { t, type Lang } from "@/data/site";
import {
  assistantFlow,
  buildLayers,
  demoPartners,
  toolMap,
} from "@/data/assistant-blueprint";
import { askAssistant, type AssistantAction } from "@/lib/assistant.functions";

type ChatMessage = { role: "user" | "assistant"; text: string; actions?: AssistantAction[] };

const TICKETS_KEY = "kk.assistant.tickets.v1";

export type StoredTicket = { id: string; subject: string; contact: string; priority: string; at: string };

function readTickets(): StoredTicket[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(TICKETS_KEY) ?? "[]") as StoredTicket[];
  } catch {
    return [];
  }
}

const greeting = (lang: Lang) =>
  lang === "ar"
    ? "أهلاً بك في أكاديمية كريستينا كيدز. أستطيع إخبارك بالبرامج والأسعار، والفعاليات ومقاعدها، وحالة تسجيل طفلك، وأفتح لك تذكرة دعم أو أحوّلك لموظف الاستقبال. كيف أساعدك؟"
    : "Welcome to Kristina Kidz Academy. I can walk you through programs and pricing, events and seats, your child's registration, open a support ticket, or hand you to reception. How can I help?";

const suggestions = (lang: Lang) =>
  lang === "ar"
    ? ["ما البرامج المناسبة لطفل عمره 6 سنوات؟", "ما الفعاليات القادمة وكم المقاعد المتبقية؟", "رقم عميلي KK-1024، ما حالة تسجيل ابني؟", "افتح لي تذكرة: تأخر إشعار الدفع"]
    : ["Which program suits a 6-year-old?", "What events are coming and how many seats are left?", "My reference is KK-1024, what is my child's status?", "Open a ticket: payment receipt is delayed"];

function useAssistantChat() {
  const { lang } = useLanguage();
  const call = useServerFn(askAssistant);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<StoredTicket[]>([]);

  useEffect(() => setTickets(readTickets()), []);

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      setError(null);
      const history: ChatMessage[] = [...messages, { role: "user", text: clean }];
      setMessages(history);
      setBusy(true);
      try {
        const reply = await call({
          data: { lang, messages: history.map((m) => ({ role: m.role, text: m.text })) },
        });
        setMessages([...history, { role: "assistant", text: reply.text, actions: reply.actions }]);
        const created = reply.actions.filter((a) => a.tool === "create_ticket");
        if (created.length) {
          const next = [
            ...created.map((a) => ({
              id: String(a.payload["id"] ?? ""),
              subject: String(a.payload["subject"] ?? ""),
              contact: String(a.payload["contact"] ?? ""),
              priority: String(a.payload["priority"] ?? "normal"),
              at: new Date().toISOString(),
            })),
            ...readTickets(),
          ];
          setTickets(next);
          window.localStorage.setItem(TICKETS_KEY, JSON.stringify(next));
        }
      } catch {
        setError(
          lang === "ar"
            ? "تعذّر الوصول إلى المساعد الآن. جرّب مرة أخرى أو تواصل معنا عبر واتساب."
            : "The assistant is unavailable right now. Please try again or reach us on WhatsApp.",
        );
      } finally {
        setBusy(false);
      }
    },
    [busy, call, lang, messages],
  );

  return { messages, busy, error, send, tickets, lang };
}

function ActionChips({ actions, lang }: { actions: AssistantAction[]; lang: Lang }) {
  if (!actions.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
      {actions.map((a, i) => (
        <span
          key={`${a.tool}-${i}`}
          className="tag bg-[var(--aqua-soft)] text-[var(--aqua)]"
          title={Object.entries(a.payload)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" · ")}
        >
          <Database size={12} className="me-1" />
          {a.label} · {a.odooModel}
        </span>
      ))}
      <span className="text-[11px] font-bold text-muted-foreground">
        {lang === "ar" ? "استدعاءات ستنفَّذ داخل أودو" : "Calls executed inside Odoo"}
      </span>
    </div>
  );
}

export function AssistantChat({ compact = false }: { compact?: boolean }) {
  const { messages, busy, error, send, lang } = useAssistantChat();
  const [input, setInput] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);
  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  const submit = async (value: string) => {
    setInput("");
    await send(value);
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={boxRef} className={`flex-1 space-y-4 overflow-y-auto p-4 ${compact ? "" : "min-h-[26rem]"}`}>
        <div className="max-w-[92%] rounded-lg bg-[var(--berry-soft)] p-3 text-sm leading-7 text-foreground">
          {greeting(lang)}
        </div>
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ms-auto max-w-[85%] rounded-lg bg-primary px-3.5 py-2.5 text-sm font-semibold leading-7 text-primary-foreground">
              {m.text}
            </div>
          ) : (
            <div key={i} className="max-w-[92%] text-sm leading-7 text-foreground">
              <p className="whitespace-pre-wrap">{m.text}</p>
              <ActionChips actions={m.actions ?? []} lang={lang} />
            </div>
          ),
        )}
        {busy && (
          <p className="animate-pulse text-sm font-bold text-muted-foreground">
            {lang === "ar" ? "المساعد يقرأ بيانات النظام…" : "The assistant is reading system data…"}
          </p>
        )}
        {error && <p className="rounded-md bg-destructive/10 p-3 text-sm font-bold text-destructive">{error}</p>}
        {!messages.length && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions(lang).map((s) => (
              <button key={s} onClick={() => void submit(s)} className="tag border border-border bg-muted text-foreground">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void submit(input);
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === "ar" ? "اكتب سؤالك هنا…" : "Type your question…"}
          className="h-11 flex-1 rounded-md border border-input bg-background px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label={lang === "ar" ? "إرسال" : "Send"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export function AssistantWidget() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={lang === "ar" ? "المساعد الذكي" : "AI assistant"}
        className="fixed bottom-24 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-brand lg:bottom-6"
      >
        {open ? <X size={22} /> : <Bot size={24} />}
      </button>
      {open && (
        <div className="card fixed bottom-40 end-5 z-50 flex h-[32rem] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden shadow-brand lg:bottom-24">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-ink-foreground">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <div>
                <p className="text-sm font-extrabold">{lang === "ar" ? "مساعد كريستينا" : "Kristina Assistant"}</p>
                <p className="text-[11px] text-ink-muted">
                  {lang === "ar" ? "نموذج مساعد أودو 19" : "Odoo 19 assistant prototype"}
                </p>
              </div>
            </div>
            <Link to="/assistant" onClick={() => setOpen(false)} className="text-[11px] font-bold underline">
              {lang === "ar" ? "تفاصيل التنفيذ" : "Blueprint"}
            </Link>
          </div>
          <AssistantChat compact />
        </div>
      )}
    </>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Bot;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="section-title flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--berry-soft)] text-primary">
          <Icon size={22} />
        </span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function AssistantPage() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const { tickets } = useAssistantChat();

  return (
    <div className="page-wrap py-14">
      <span className="eyebrow">
        <Bot size={16} /> {ar ? "مساعد ذكي داخل الموقع" : "In-site AI assistant"}
      </span>
      <h1 className="display-title mt-3 max-w-4xl">
        {ar ? "مساعد كريستينا الذكي — مقترح تنفيذي لأودو 19" : "Kristina AI Assistant — an Odoo 19 build reference"}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
        {ar
          ? "هذا نموذج عامل يوضّح كيف سيتصرف المساعد داخل موقع أودو 19: يقرأ البرامج والأسعار والفعاليات وبطاقة العميل، ويفتح تذاكر دعم فعلية، ويحوّل المحادثة لموظف عبر الدردشة المباشرة. كل استدعاء تراه في المحادثة مكتوب بجانب النموذج المقابل له في أودو ليكون مرجعاً مباشراً عند البناء."
          : "A working prototype of how the assistant behaves inside an Odoo 19 website: it reads programs, pricing, events and the customer record, opens real support tickets and hands over to a live agent. Every call in the chat is labelled with its matching Odoo model so it can be rebuilt as-is."}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 bg-ink px-4 py-3 text-ink-foreground">
            <MessageSquare size={18} />
            <p className="text-sm font-extrabold">{ar ? "جرّب المساعد الآن" : "Try the assistant"}</p>
          </div>
          <AssistantChat />
        </div>
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="flex items-center gap-2 font-extrabold">
              <LifeBuoy size={18} className="text-primary" />
              {ar ? "تذاكر فُتحت من المحادثة" : "Tickets opened from chat"}
            </h3>
            <p className="mt-1 text-xs font-bold text-muted-foreground">helpdesk.ticket</p>
            {tickets.length ? (
              <ul className="mt-4 space-y-3">
                {tickets.slice(0, 5).map((tk) => (
                  <li key={tk.id} className="rounded-md border border-border p-3 text-sm">
                    <div className="flex items-center justify-between font-extrabold">
                      <span>{tk.id}</span>
                      <span className="tag bg-[var(--sun-soft)] text-[var(--accent-foreground)]">{tk.priority}</span>
                    </div>
                    <p className="mt-1 leading-7 text-muted-foreground">{tk.subject}</p>
                    <p className="text-xs text-muted-foreground">{tk.contact}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {ar
                  ? "اطلب من المساعد فتح تذكرة دعم وستظهر هنا برقمها المرجعي، تماماً كما ستظهر في مكتب المساعدة."
                  : "Ask the assistant to open a ticket and it will appear here with its reference, exactly as it would in Helpdesk."}
              </p>
            )}
          </div>
          <div className="card p-5">
            <h3 className="flex items-center gap-2 font-extrabold">
              <Headphones size={18} className="text-primary" />
              {ar ? "حسابات تجريبية للاختبار" : "Demo accounts for testing"}
            </h3>
            <p className="mt-1 text-xs font-bold text-muted-foreground">res.partner</p>
            <ul className="mt-4 space-y-2 text-sm">
              {demoPartners.map((p) => (
                <li key={p.ref} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0">
                  <span className="font-extrabold">{p.ref}</span>
                  <span className="text-muted-foreground">{t(p.name, lang)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              {ar
                ? "بيانات تجريبية للعرض فقط، وتُستبدل ببطاقات العملاء الحقيقية عند التنفيذ داخل أودو."
                : "Sample records for the prototype only; replaced by real partner records in Odoo."}
            </p>
          </div>
        </div>
      </div>

      <Panel icon={Database} title={ar ? "خريطة الأدوات مقابل نماذج أودو" : "Tools mapped to Odoo models"}>
        <div className="grid gap-4 md:grid-cols-2">
          {toolMap.map((m) => (
            <article key={m.tool} className="card lift p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-extrabold">{t(m.label, lang)}</h3>
                <span className="tag bg-[var(--berry-soft)] text-primary">{t(m.module, lang)}</span>
              </div>
              <p className="mt-3 font-mono text-xs leading-6 text-muted-foreground" dir="ltr">
                {m.tool}() → {m.odooModel}
                <br />
                {m.method}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(m.note, lang)}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel icon={Workflow} title={ar ? "مسار الرسالة داخل النظام" : "How a message travels through the system"}>
        <ol className="grid gap-4 md:grid-cols-5">
          {assistantFlow.map((s) => (
            <li key={s.step.en} className="card p-5">
              <p className="font-extrabold text-primary">{t(s.step, lang)}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(s.detail, lang)}</p>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel icon={Sparkles} title={ar ? "بنية الموديول المخصّص" : "Custom module structure"}>
        <div className="grid gap-4 md:grid-cols-2">
          {buildLayers.map((l) => (
            <article key={l.path} className="card p-5">
              <h3 className="font-extrabold">{t(l.title, lang)}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground" dir="ltr">
                kk_assistant/{l.path}
              </p>
              <ul className="mt-4 space-y-2">
                {l.items.map((i) => (
                  <li key={i.en} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 size={16} className="mt-1.5 shrink-0 text-[var(--aqua)]" />
                    {t(i, lang)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Panel>

      <div className="card mt-14 flex flex-wrap items-center justify-between gap-4 bg-ink p-6 text-ink-foreground">
        <p className="max-w-xl text-sm leading-7">
          {ar
            ? "الخطوة التالية عند التنفيذ: تثبيت موديول kk_assistant فوق Website وHelpdesk وLive Chat وCRM، وربط الأدوات ببيانات النظام الحقيقية."
            : "Next step in Odoo: install kk_assistant on top of Website, Helpdesk, Live Chat and CRM and bind the tools to real system data."}
        </p>
        <Button asChild variant="outline">
          <Link to="/about">{ar ? "خريطة نماذج أودو الكاملة" : "Full Odoo model map"}</Link>
        </Button>
      </div>
    </div>
  );
}
