import { createFileRoute } from "@tanstack/react-router";
import { AssistantPage } from "@/components/assistant";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "المساعد الذكي | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "مساعد ذكي تفاعلي لأكاديمية كريستينا كيدز يجيب عن البرامج والأسعار والفعاليات، يفتح تذاكر الدعم، ويوضّح طريقة بنائه داخل موقع أودو 19.",
      },
      { property: "og:title", content: "المساعد الذكي | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content: "نموذج عامل لمساعد ذكي مرتبط بمكتب المساعدة والدردشة المباشرة وبيانات العملاء في أودو 19.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});
