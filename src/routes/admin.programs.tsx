import { createFileRoute } from "@tanstack/react-router";
import { AdminProgramsPage } from "@/components/admin";

export const Route = createFileRoute("/admin/programs")({
  head: () => ({
    meta: [
      { title: "إدارة البرامج والأسعار | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content: "شاشة إدارة البرامج في أكاديمية كريستينا كيدز: إضافة وتعديل وحذف البرامج وباقاتها وأسعارها.",
      },
      { property: "og:title", content: "إدارة البرامج والأسعار | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content: "أضف برامج جديدة، عدّل الباقات والأسعار، واحذف ما لم يعد متاحاً — بنفس منطق منتجات أودو 19.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProgramsPage,
});
