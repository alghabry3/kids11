import { createFileRoute } from "@tanstack/react-router";
import { LearningPage } from "@/components/pages";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "التعلم الإلكتروني | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "تجربة تعلم تفاعلية للأطفال: دروس قصيرة، أنشطة، وتتبع التقدم خطوة بخطوة، مع متابعة ولي الأمر للإنجاز.",
      },
      { property: "og:title", content: "التعلم الإلكتروني | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content:
          "مسار تعليمي تفاعلي يجمع الدروس والأنشطة وتتبع التقدم في مكان واحد، مناسب للأطفال وأولياء الأمور.",
      },
    ],
  }),
  component: () => <LearningPage />,
});
