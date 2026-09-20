import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أكاديمية كريستينا كيدز | اكتشاف مواهب الطفل" },
      {
        name: "description",
        content:
          "أكاديمية تعليمية في القطيف لاكتشاف مواهب الطفل وتنمية مهاراته عبر برامج التعلم النشط ودورات اللغة الإنجليزية والدعم الدراسي.",
      },
      { property: "og:title", content: "أكاديمية كريستينا كيدز | اكتشاف مواهب الطفل" },
      {
        property: "og:description",
        content:
          "برامج تعليمية وتجارب عملية تساعد الطفل على فهم قدراته وبناء لغته والتعبير عن أفكاره بثقة في القطيف.",
      },
    ],
  }),
  component: () => <HomePage />,
});
