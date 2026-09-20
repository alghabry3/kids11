import { createFileRoute } from "@tanstack/react-router";
import { CourseDetailPage } from "@/components/detail-pages";

export const Route = createFileRoute("/learning/english-kids")({
  head: () => ({
    meta: [
      { title: "English for Kids | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "تجربة دورة تفاعلية للأطفال على نمط التعلم الإلكتروني: وحدات ودروس بأنواعها، تتبع التقدم، وشهادة إتمام عند إكمال المسار.",
      },
      { property: "og:title", content: "English for Kids | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content: "وحدات ودروس تفاعلية وتقدم يُتابع خطوة بخطوة مع شهادة إتمام — محتوى تجريبي قابل للاستبدال.",
      },
    ],
  }),
  component: () => <CourseDetailPage />,
});
