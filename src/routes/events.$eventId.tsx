import { createFileRoute } from "@tanstack/react-router";
import { EventDetailPage } from "@/components/detail-pages";
import { academyEvents } from "@/data/odoo";
import { t } from "@/data/site";

export const Route = createFileRoute("/events/$eventId")({
  head: ({ params }) => {
    const ev = academyEvents.find((e) => e.id === params.eventId);
    const title = ev ? `${t(ev.title, "ar")} | أكاديمية كريستينا كيدز` : "تفاصيل الفعالية | أكاديمية كريستينا كيدز";
    const description = ev
      ? `تفاصيل فعالية ${t(ev.title, "ar")} في أكاديمية كريستينا كيدز: البرنامج الزمني والمقاعد والتذاكر.`
      : "تفاصيل فعاليات وأنشطة الأكاديمية القادمة.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: EventDetailRoute,
});

function EventDetailRoute() {
  const { eventId } = Route.useParams();
  return <EventDetailPage eventId={eventId} />;
}
