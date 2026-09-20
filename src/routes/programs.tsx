import { createFileRoute } from "@tanstack/react-router";
import { ProgramsPage } from "@/components/pages";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "البرامج والأسعار | أكاديمية كريستينا كيدز" },
      {
        name: "description",
        content:
          "استكشف برامج الأكاديمية وأسعار العام الأكاديمي 2026–2027: الاستضافة، تأسيس الإنجليزية، الدعم الدراسي، ودورات اللغة لجميع الأعمار.",
      },
      { property: "og:title", content: "البرامج والأسعار | أكاديمية كريستينا كيدز" },
      {
        property: "og:description",
        content:
          "أسعار واضحة لبرامج الاستضافة والدعم الدراسي ودورات اللغة الإنجليزية، مصنفة حسب العمر والمدة.",
      },
    ],
  }),
  component: () => <ProgramsPage />,
});
