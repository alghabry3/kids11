import type { Bilingual } from "@/data/site";

/** بيانات تجريبية تمثل سجلات res.partner في أودو (قابلة للاستبدال ببيانات النظام الحقيقية). */
export type DemoPartner = {
  ref: string;
  name: Bilingual;
  phone: string;
  child: Bilingual;
  program: string;
  invoiceState: Bilingual;
  balance: number;
  nextSession: Bilingual;
};

export const demoPartners: DemoPartner[] = [
  {
    ref: "KK-1024",
    name: { ar: "أم محمد الشمري", en: "Umm Mohammed Al-Shammari" },
    phone: "0501234567",
    child: { ar: "محمد · 7 سنوات", en: "Mohammed · 7 years" },
    program: "foundation",
    invoiceState: { ar: "فاتورة مدفوعة", en: "Invoice paid" },
    balance: 0,
    nextSession: { ar: "الأحد 12:30 م · قاعة اللغة", en: "Sunday 12:30 PM · Language room" },
  },
  {
    ref: "KK-1071",
    name: { ar: "أبو سارة العلي", en: "Abu Sarah Al-Ali" },
    phone: "0559876543",
    child: { ar: "سارة · 4 سنوات", en: "Sarah · 4 years" },
    program: "hosting-4",
    invoiceState: { ar: "فاتورة بانتظار السداد", en: "Invoice awaiting payment" },
    balance: 1500,
    nextSession: { ar: "الثلاثاء 7:00 ص · قاعة الاستضافة", en: "Tuesday 7:00 AM · Hosting room" },
  },
  {
    ref: "KK-1103",
    name: { ar: "أم ليان الدوسري", en: "Umm Layan Al-Dosari" },
    phone: "0533344556",
    child: { ar: "ليان · 9 سنوات", en: "Layan · 9 years" },
    program: "international",
    invoiceState: { ar: "عرض سعر مفتوح", en: "Open quotation" },
    balance: 2400,
    nextSession: { ar: "الاثنين 4:00 م · قاعة الدعم الدراسي", en: "Monday 4:00 PM · Tutoring room" },
  },
];

/** خريطة الأدوات: كل أداة في المساعد تقابل موديل/دالة فعلية في أودو 19. */
export type ToolMap = {
  tool: string;
  label: Bilingual;
  odooModel: string;
  method: string;
  module: Bilingual;
  note: Bilingual;
};

export const toolMap: ToolMap[] = [
  {
    tool: "search_programs",
    label: { ar: "البحث في البرامج والأسعار", en: "Search programs & pricing" },
    odooModel: "product.template / product.pricelist.item",
    method: "search_read(domain, fields)",
    module: { ar: "المتجر الإلكتروني (eCommerce)", en: "eCommerce" },
    note: {
      ar: "كل برنامج منتج قابل للبيع، وكل باقة متغير سعري؛ المساعد يقرأها بنفس صلاحيات المستخدم.",
      en: "Each program is a sellable product and each plan a price variant read with the user's own access rights.",
    },
  },
  {
    tool: "list_events",
    label: { ar: "عرض الفعاليات والمقاعد", en: "List events & seats" },
    odooModel: "event.event / event.event.ticket",
    method: "search_read + seats_available",
    module: { ar: "الفعاليات (Events)", en: "Events" },
    note: {
      ar: "يعرض المواعيد والمقاعد المتبقية ويولّد رابط التسجيل من صفحة الفعالية في الموقع.",
      en: "Returns dates and remaining seats and builds the website registration link.",
    },
  },
  {
    tool: "lookup_customer",
    label: { ar: "بيانات العميل وحالته المالية", en: "Customer record & balance" },
    odooModel: "res.partner / sale.order / account.move",
    method: "search_read (portal user context)",
    module: { ar: "جهات الاتصال · المبيعات · المحاسبة", en: "Contacts · Sales · Accounting" },
    note: {
      ar: "لا يُفعّل إلا بعد تسجيل دخول ولي الأمر في بوابة الموقع، وتُقيَّد النتائج بـ partner_id للمستخدم.",
      en: "Enabled only for a logged-in portal user and restricted to their own partner_id.",
    },
  },
  {
    tool: "course_progress",
    label: { ar: "تقدّم الطالب في الدورة", en: "Student course progress" },
    odooModel: "slide.channel.partner / slide.slide.partner",
    method: "read_group(completion)",
    module: { ar: "التعلم الإلكتروني (eLearning)", en: "eLearning" },
    note: {
      ar: "نسبة الإنجاز وآخر درس وشهادة الإتمام تُقرأ مباشرة من قنوات الدروس.",
      en: "Completion rate, last lesson and certificate are read from the learning channels.",
    },
  },
  {
    tool: "create_ticket",
    label: { ar: "فتح تذكرة دعم", en: "Open a support ticket" },
    odooModel: "helpdesk.ticket",
    method: "create({name, partner_id, description, team_id, priority})",
    module: { ar: "مكتب المساعدة (Helpdesk)", en: "Helpdesk" },
    note: {
      ar: "المساعد يلخّص المحادثة في وصف التذكرة ويرفق سجل الدردشة كرسالة في mail.thread.",
      en: "The assistant summarises the chat into the ticket description and logs the transcript on mail.thread.",
    },
  },
  {
    tool: "create_lead",
    label: { ar: "إنشاء فرصة بيعية", en: "Create a CRM lead" },
    odooModel: "crm.lead",
    method: "create({name, contact_name, phone, source_id})",
    module: { ar: "إدارة علاقات العملاء (CRM)", en: "CRM" },
    note: {
      ar: "كل استفسار تسجيل جديد يتحوّل لفرصة في خط المبيعات مع مصدر «المساعد الذكي».",
      en: "Every registration enquiry becomes a pipeline lead with source 'AI Assistant'.",
    },
  },
  {
    tool: "handover_to_agent",
    label: { ar: "تحويل المحادثة لموظف", en: "Hand over to a live agent" },
    odooModel: "im_livechat.channel / discuss.channel",
    method: "_open_livechat_discuss_channel()",
    module: { ar: "الدردشة المباشرة · Discuss", en: "Live Chat · Discuss" },
    note: {
      ar: "عند طلب العميل أو تعذّر الإجابة، يُسلَّم السياق كاملاً لموظف الاستقبال في نفس نافذة الدردشة.",
      en: "On request or low confidence, the full context is handed to a human agent in the same chat window.",
    },
  },
];

/** طبقات البناء داخل موديول أودو مخصّص. */
export type BuildLayer = {
  title: Bilingual;
  path: string;
  items: Bilingual[];
};

export const buildLayers: BuildLayer[] = [
  {
    title: { ar: "طبقة البيانات", en: "Data layer" },
    path: "models/kk_assistant.py",
    items: [
      { ar: "kk.assistant.conversation — محادثة مرتبطة بـ res.partner و website.visitor", en: "kk.assistant.conversation linked to res.partner and website.visitor" },
      { ar: "kk.assistant.message — دور، نص، أدوات مستخدمة، تكلفة الاستدعاء", en: "kk.assistant.message with role, text, tools used and call cost" },
      { ar: "kk.assistant.tool.log — سجل تدقيق لكل استدعاء أداة ونتيجته", en: "kk.assistant.tool.log auditing every tool call and result" },
    ],
  },
  {
    title: { ar: "طبقة الأدوات", en: "Tool layer" },
    path: "models/kk_assistant_tools.py",
    items: [
      { ar: "دوال بايثون معلَّمة بـ @assistant_tool تعيد JSON مختصراً", en: "Python methods decorated with @assistant_tool returning compact JSON" },
      { ar: "كل دالة تعمل بـ sudo محدود مع فلترة إجبارية على partner_id", en: "Each runs with scoped sudo and a mandatory partner_id filter" },
      { ar: "قائمة بيضاء للحقول المسموح إرجاعها لمنع تسريب البيانات", en: "Field allow-list to prevent data leakage" },
    ],
  },
  {
    title: { ar: "طبقة الواجهة", en: "Controller & UI layer" },
    path: "controllers/main.py · static/src/js",
    items: [
      { ar: "مسار /kk_assistant/chat عبر http.route(type='json', auth='public')", en: "/kk_assistant/chat via http.route(type='json', auth='public')" },
      { ar: "ودجت OWL تُحقن في قالب website.layout بجانب زر الدردشة المباشرة", en: "OWL widget injected into website.layout next to the live chat launcher" },
      { ar: "تسليم سلس إلى im_livechat عند طلب موظف بشري", en: "Seamless handover to im_livechat when a human is requested" },
    ],
  },
  {
    title: { ar: "طبقة الصلاحيات", en: "Security layer" },
    path: "security/ir.model.access.csv · rules.xml",
    items: [
      { ar: "قواعد سجلات: الزائر يرى محادثته فقط", en: "Record rules: a visitor sees only their own conversation" },
      { ar: "مجموعة kk_assistant.group_supervisor لمراجعة السجلات والتقارير", en: "kk_assistant.group_supervisor for reviewing logs and reports" },
      { ar: "حد استدعاءات لكل زائر لمنع الإساءة", en: "Per-visitor rate limit to prevent abuse" },
    ],
  },
];

/** تدفق العمل من رسالة الزائر حتى التذكرة. */
export const assistantFlow: { step: Bilingual; detail: Bilingual }[] = [
  {
    step: { ar: "1 · استقبال الرسالة", en: "1 · Message received" },
    detail: {
      ar: "الودجت ترسل النص وسياق الصفحة ومعرّف الزائر إلى مسار المساعد في الموقع.",
      en: "The widget posts the text, page context and visitor id to the assistant controller.",
    },
  },
  {
    step: { ar: "2 · بناء السياق", en: "2 · Context build" },
    detail: {
      ar: "الموديول يضيف بيانات الشركة والبرامج المنشورة، وبيانات العميل إن كان مسجّل الدخول.",
      en: "The module adds company data, published programs and, for logged-in users, their own record.",
    },
  },
  {
    step: { ar: "3 · اختيار الأداة", en: "3 · Tool selection" },
    detail: {
      ar: "النموذج يقرر أي أداة يستدعي، وتُنفَّذ داخل أودو بصلاحيات المستخدم لا بصلاحيات مطلقة.",
      en: "The model picks a tool, executed inside Odoo with the user's rights rather than superuser access.",
    },
  },
  {
    step: { ar: "4 · الرد والإجراء", en: "4 · Reply and action" },
    detail: {
      ar: "يُصاغ الرد بلغة العميل، ويُنشأ سجل فعلي (تذكرة أو فرصة) عند الحاجة مع رقم مرجعي.",
      en: "The reply is written in the customer's language and a real record (ticket or lead) is created with a reference.",
    },
  },
  {
    step: { ar: "5 · المتابعة والتقارير", en: "5 · Follow-up and reporting" },
    detail: {
      ar: "التذكرة تُتابع في مكتب المساعدة، والمحادثات تُحلَّل في تقرير أسئلة العملاء الأكثر تكراراً.",
      en: "Tickets follow the Helpdesk pipeline and conversations feed a report of most frequent questions.",
    },
  },
];
