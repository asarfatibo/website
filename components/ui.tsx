import { DOWNLOAD_LINK } from "@/lib/constants";

export function DownloadButton({
  label,
  light = false,
  size = "lg",
}: {
  label: string;
  light?: boolean;
  size?: "lg" | "md";
}) {
  const color = light
    ? "bg-white text-blue"
    : "bg-blue text-white";
  const pad = size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3";
  return (
    <a
      href={DOWNLOAD_LINK}
      className={`inline-block rounded-cta font-bold transition-transform hover:scale-[1.03] ${color} ${pad}`}
    >
      {label}
    </a>
  );
}

export function Stars({ label }: { label: string }) {
  return (
    <span aria-label={label} role="img" className="text-pink">
      {"★★★★★"}
    </span>
  );
}
