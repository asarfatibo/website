import Image from "next/image";
import type { EventCard } from "@/lib/events";
import { DOWNLOAD_LINK } from "@/lib/constants";
import { accentTag } from "@/lib/theme";

export function EventsGrid({ events }: { events: readonly EventCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {events.map((event) => (
        <li key={event.title}>
          <a
            href={DOWNLOAD_LINK}
            className="group block overflow-hidden rounded-card bg-white/70 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={event.image}
                alt={`Event ${event.title} à ${event.place}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className={`inline-block rounded-cta px-2.5 py-0.5 text-xs font-bold ${accentTag[event.themeColor]}`}>
                {event.theme}
              </span>
              <h3 className="mt-2 text-lg leading-snug">{event.title}</h3>
              <p className="mt-1 text-sm text-ink/60">
                {event.date} · {event.place}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
