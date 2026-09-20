import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن الأكاديمية | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "أكاديمية كريستينا كيدز في القطيف: مساحة تعليمية تنطلق من فضول الطفل، تكتشف المواهب وتبني المهارات عبر التعلم النشط والبيئة الداعمة.",
      },
      { property: "og:title", content: "عن الأكاديمية | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content:
          "نبدأ من الطفل لا من القالب: أكاديمية تعليمية في القطيف تكتشف المواهب وتبني المهارات بشراكة مع ولي الأمر.",
      },
    ],
  }),
  component: () => <AboutPage />,
});
