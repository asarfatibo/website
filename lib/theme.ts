export const ACCENTS = ["blue", "green", "purple", "pink"] as const;
export type Accent = (typeof ACCENTS)[number];

export const accentBg: Record<Accent, string> = {
  blue: "bg-blue-light/30",
  green: "bg-green-light/30",
  purple: "bg-purple-light/30",
  pink: "bg-pink-light/40",
};

export const accentBar: Record<Accent, string> = {
  blue: "bg-blue",
  green: "bg-green",
  purple: "bg-purple",
  pink: "bg-pink",
};

export const accentTag: Record<Accent, string> = {
  blue: "bg-blue text-white",
  green: "bg-green text-white",
  purple: "bg-purple text-white",
  pink: "bg-pink text-ink",
};
