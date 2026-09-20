import { createFileRoute } from "@tanstack/react-router";
import { JoinPage } from "@/components/join";

export const Route = createFileRoute("/join")({
  validateSearch: (search: Record<string, unknown>) => ({
    program: typeof search["program"] === "string" ? (search["program"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "التسجيل ومساعد اختيار البرنامج | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "أدخل عمر طفلك واهتماماته للحصول على توصية ببرنامج مناسب في أكاديمية كريستينا كيدز بالقطيف، ثم أكمل نموذج التسجيل لحجز المقعد.",
      },
      { property: "og:title", content: "التسجيل ومساعد اختيار البرنامج | كريستينا كيدز" },
      {
        property: "og:description",
        content: "توصية ذكية بالبرنامج المناسب لطفلك ونموذج تسجيل سريع في أكاديمية كريستينا كيدز.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "التسجيل ومساعد اختيار البرنامج | كريستينا كيدز" },
      {
        name: "twitter:description",
        content: "توصية ذكية بالبرنامج المناسب لطفلك ونموذج تسجيل سريع في أكاديمية كريستينا كيدز.",
      },
    ],
  }),
  component: JoinRoute,
});

function JoinRoute() {
  const { program } = Route.useSearch();
  return <JoinPage initialProgram={program} />;
}
