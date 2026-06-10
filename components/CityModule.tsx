"use client";

import { useEffect, useState, type ReactNode } from "react";

/*
  Client shell of the home city module: toggles between the two server-
  rendered variants (Montréal events / Paris pioneer). Default = Montréal
  (densest market); switches to Paris when the visitor is in a European
  timezone or has a saved choice. Only this toggle ships client JS — the
  variants themselves are server-rendered.
*/
const STORAGE_KEY = "bo-city";

export function CityModule({
  montreal,
  paris,
  labels,
}: {
  montreal: ReactNode;
  paris: ReactNode;
  labels: { montreal: string; paris: string; switchLabel: string };
}) {
  const [city, setCity] = useState<"montreal" | "paris">("montreal");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "montreal" || saved === "paris") {
      setCity(saved);
      return;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz.startsWith("Europe/")) setCity("paris");
  }, []);

  function pick(next: "montreal" | "paris") {
    setCity(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const pill = (active: boolean) =>
    `rounded-cta px-4 py-1.5 text-sm font-bold transition-colors ${
      active ? "bg-ink text-cream" : "hover:bg-ink/10"
    }`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div role="group" aria-label={labels.switchLabel} className="mb-8 inline-flex gap-1 rounded-cta border border-ink/15 p-1">
        <button type="button" aria-pressed={city === "montreal"} onClick={() => pick("montreal")} className={pill(city === "montreal")}>
          {labels.montreal}
        </button>
        <button type="button" aria-pressed={city === "paris"} onClick={() => pick("paris")} className={pill(city === "paris")}>
          {labels.paris}
        </button>
      </div>
      {city === "montreal" ? montreal : paris}
    </section>
  );
}
