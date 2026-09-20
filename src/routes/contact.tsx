import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "تواصل مع أكاديمية كريستينا كيدز في القطيف: العنوان، ساعات العمل، ورابط واتساب للاستفسار عن البرامج والمقاعد المتاحة.",
      },
      { property: "og:title", content: "تواصل معنا | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content:
          "نساعدك في اختيار البداية المناسبة لطفلك: العنوان وساعات العمل ورابط واتساب للتواصل المباشر.",
      },
    ],
  }),
  component: () => <ContactPage />,
});
