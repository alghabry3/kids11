import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { stepCountIs, streamText, tool } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "@/lib/ai-gateway.server";
import { programs } from "@/data/site";
import { academyEvents } from "@/data/odoo";
import { demoPartners } from "@/data/assistant-blueprint";

const ChatInput = z.object({
  lang: z.enum(["ar", "en"]),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().min(1).max(2000) }))
    .min(1)
    .max(30),
});

export type AssistantAction = {
  tool: string;
  odooModel: string;
  label: string;
  payload: Record<string, string | number>;
};

export type AssistantReply = { text: string; actions: AssistantAction[] };

const ref = (prefix: string) =>
  `${prefix}-${Math.floor(Math.random() * 9000 + 1000)}`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }): Promise<AssistantReply> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const lang = data.lang;
    const actions: AssistantAction[] = [];
    const push = (a: AssistantAction) => {
      actions.push(a);
      return a.payload;
    };

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const tools = {
      search_programs: tool({
        description:
          "Search academy programs and pricing plans (Odoo product.template / pricelist). Use for any question about courses, ages, times or prices.",
        inputSchema: z.object({ query: z.string().describe("age, interest or program name") }),
        execute: async ({ query }) => {
          const q = query.toLowerCase();
          const found = programs.filter(
            (p) =>
              p.title.ar.includes(query) ||
              p.title.en.toLowerCase().includes(q) ||
              p.age.ar.includes(query) ||
              q.length < 3,
          );
          const list = (found.length ? found : programs).slice(0, 5);
          push({
            tool: "search_programs",
            odooModel: "product.template",
            label: lang === "ar" ? "قراءة كتالوج البرامج" : "Read program catalogue",
            payload: { domain: `name ilike '${query}'`, records: list.length },
          });
          return list.map((p) => ({
            id: p.id,
            title: p.title[lang],
            age: p.age[lang],
            time: p.time,
            plans: p.plans.map((pl) => `${pl.label[lang]}: ${pl.price} SAR`),
            url: `/programs/${p.id}`,
          }));
        },
      }),
      list_events: tool({
        description: "List upcoming academy events with seats and tickets (Odoo event.event).",
        inputSchema: z.object({}),
        execute: async () => {
          push({
            tool: "list_events",
            odooModel: "event.event",
            label: lang === "ar" ? "قراءة الفعاليات القادمة" : "Read upcoming events",
            payload: { records: academyEvents.length },
          });
          return academyEvents.map((e) => ({
            id: e.id,
            title: e.title[lang],
            date: e.date[lang],
            seats: `${e.seatsTaken}/${e.seats}`,
            url: `/events/${e.id}`,
          }));
        },
      }),
      lookup_customer: tool({
        description:
          "Look up a demo customer record by reference number or phone (Odoo res.partner + sale.order + account.move). Ask the parent for their reference (e.g. KK-1024) before calling.",
        inputSchema: z.object({ reference: z.string() }),
        execute: async ({ reference }) => {
          const r = reference.trim().toLowerCase();
          const partner = demoPartners.find(
            (p) => p.ref.toLowerCase() === r || p.phone === reference.trim(),
          );
          push({
            tool: "lookup_customer",
            odooModel: "res.partner",
            label: lang === "ar" ? "قراءة بطاقة العميل" : "Read customer record",
            payload: { reference, found: partner ? 1 : 0 },
          });
          if (!partner) return { found: false };
          return {
            found: true,
            ref: partner.ref,
            name: partner.name[lang],
            child: partner.child[lang],
            program: programs.find((p) => p.id === partner.program)?.title[lang] ?? partner.program,
            invoice: partner.invoiceState[lang],
            balance: partner.balance,
            nextSession: partner.nextSession[lang],
          };
        },
      }),
      create_ticket: tool({
        description:
          "Open a support ticket for the customer (Odoo helpdesk.ticket). Ask for a name and a phone or reference first.",
        inputSchema: z.object({
          subject: z.string(),
          description: z.string(),
          contact: z.string(),
          priority: z.enum(["low", "normal", "high"]),
        }),
        execute: async ({ subject, description, contact, priority }) => {
          const id = ref("HD");
          push({
            tool: "create_ticket",
            odooModel: "helpdesk.ticket",
            label: lang === "ar" ? "إنشاء تذكرة في مكتب المساعدة" : "Create helpdesk ticket",
            payload: { id, subject, contact, priority, team: "Kristina Kidz Support" },
          });
          return { id, subject, priority, state: lang === "ar" ? "جديدة" : "New", contact, description };
        },
      }),
      create_lead: tool({
        description: "Create a CRM registration lead (Odoo crm.lead) when a parent wants to enroll.",
        inputSchema: z.object({
          parentName: z.string(),
          contact: z.string(),
          programId: z.string(),
          notes: z.string(),
        }),
        execute: async ({ parentName, contact, programId, notes }) => {
          const id = ref("CRM");
          push({
            tool: "create_lead",
            odooModel: "crm.lead",
            label: lang === "ar" ? "إنشاء فرصة تسجيل" : "Create registration lead",
            payload: { id, parentName, contact, programId, source: "AI Assistant" },
          });
          return { id, stage: lang === "ar" ? "جديد" : "New", parentName, contact, programId, notes };
        },
      }),
      handover_to_agent: tool({
        description:
          "Hand the conversation to a human agent (Odoo im_livechat). Use when the parent asks for a person or the question needs staff.",
        inputSchema: z.object({ reason: z.string() }),
        execute: async ({ reason }) => {
          push({
            tool: "handover_to_agent",
            odooModel: "im_livechat.channel",
            label: lang === "ar" ? "تحويل إلى موظف الاستقبال" : "Hand over to a live agent",
            payload: { reason, channel: "Kristina Kidz Reception" },
          });
          return {
            queued: true,
            note:
              lang === "ar"
                ? "تم تحويل المحادثة لموظف الاستقبال، وسيرد خلال ساعات العمل 2:00–9:00 م."
                : "Handed to reception, who will reply during 2:00–9:00 PM opening hours.",
          };
        },
      }),
    };

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      tools,
      stopWhen: stepCountIs(8),
      system:
        "You are «مساعد كريستينا» the assistant of Kristina Kidz Academy in Al Qatif, Saudi Arabia. " +
        "You are a design reference for an Odoo 19 website assistant, so always work through the provided tools instead of guessing. " +
        "Never invent prices, seats, ticket numbers, addresses or phone numbers — read them from tools only. " +
        "Known public facts: address 4384 Al Hussein bin Ali St, Al Qatif 32641; opening hours Sat–Thu 2:00–9:00 PM; WhatsApp https://wa.link/a7wsrs. " +
        "Before creating a ticket or a lead, collect a name and a phone or reference number. " +
        `Reply in ${lang === "ar" ? "warm natural Modern Standard Arabic" : "warm natural English"}, short paragraphs, no markdown tables. ` +
        "Keep answers under 120 words and end with one helpful next step.",
      messages: data.messages.map((m) => ({ role: m.role, content: m.text })),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const text = await result.text;
    return { text, actions };
  });
