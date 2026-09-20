import { createFileRoute } from "@tanstack/react-router";
import { ProgramDetailPage } from "@/components/detail-pages";
import { programs } from "@/data/site";
import { t } from "@/data/site";

export const Route = createFileRoute("/programs/$programId")({
  head: ({ params }) => {
    const program = programs.find((p) => p.id === params.programId);
    const title = program
      ? `${t(program.title, "ar")} | أكاديمية كريستينا كيدز`
      : "تفاصيل البرنامج | أكاديمية كريستينا كيدز";
    const description = program
      ? `تفاصيل برنامج ${t(program.title, "ar")} في أكاديمية كريستينا كيدز بالقطيف: الباقات والأسعار وما يشمله البرنامج.`
      : "تفاصيل برامج الأكاديمية وباقاتها وأسعارها.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProgramDetailRoute,
});

function ProgramDetailRoute() {
  const { programId } = Route.useParams();
  return <ProgramDetailPage programId={programId} />;
}
