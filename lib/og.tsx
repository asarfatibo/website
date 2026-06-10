import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
  Brand share image (1200×630), generated at build. Cream background, Quaria
  display, multi-accent strip (diversity signal — rounded rectangles, never
  custom bubble shapes per brand rules), blue bubbleOut pill.
*/
export async function brandOgImage(title: string, subtitle: string) {
  const quaria = await readFile(join(process.cwd(), "app", "fonts", "QuariaDisplay-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FEF8EF",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["#3E96FF", "#026F53", "#7B58DB", "#F296BD"].map((c) => (
            <div key={c} style={{ width: 56, height: 16, borderRadius: 8, backgroundColor: c }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "Quaria", fontSize: 72, lineHeight: 1.1, color: "#000000", maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ fontSize: 32, color: "rgba(0,0,0,0.65)", maxWidth: 960 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#3E96FF",
              color: "#FFFFFF",
              fontFamily: "Quaria",
              fontSize: 36,
              padding: "16px 40px",
              borderRadius: 999,
            }}
          >
            bubbleOut
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Quaria", data: quaria, weight: 800, style: "normal" }],
    },
  );
}
