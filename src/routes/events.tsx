import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/pages";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "الفعاليات | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "فعاليات وأنشطة وورش أطفال قادمة في أكاديمية كريستينا كيدز: احتفالات مجتمعية ومختبرات مواهب وأيام لغة مرح.",
      },
      { property: "og:title", content: "الفعاليات | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content:
          "استكشف الأنشطة والفعاليات القادمة وسجل اهتمامك بسهولة عبر الأكاديمية في القطيف.",
      },
    ],
  }),
  component: () => <EventsPage />,
});
