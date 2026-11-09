import { ImageResponse } from "next/og";
import { hero } from "@/content/about";
import { site } from "@/content/site";
import { ogFonts, palette, portraitDataUrl } from "./_og/assets";

export const alt = `${site.name}, data analyst. ${hero.headline.lines.join(" ")} ${hero.headline.emphasis}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Portrait width once scaled to the frame height (source 1345×1170). */
const PHOTO_W = Math.round(502 * (1345 / 1170));

/** Link-preview card: the hero in miniature, same type, palette and portrait. */
// Read at module load (build time) so the card is prerendered rather than generated per request.
const [fonts, portrait] = await Promise.all([ogFonts(), portraitDataUrl()]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: palette.paper, padding: 64, gap: 56 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Manrope", fontWeight: 500, fontSize: 24, color: palette.muted }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: palette.forest }} />
            {hero.eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Serif", fontSize: 84, lineHeight: 1.02, color: palette.ink, letterSpacing: "-0.01em" }}>
            {hero.headline.lines.slice(0, -1).map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div style={{ display: "flex", gap: 20 }}>
              <span>{hero.headline.lines.at(-1)}</span>
              <span style={{ fontStyle: "italic", color: palette.forest }}>{hero.headline.emphasis}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: `2px solid ${palette.line}`, paddingTop: 22 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 30, color: palette.ink }}>{site.name}</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 500, fontSize: 22, color: palette.muted }}>
              Data Analyst · MS Data Analytics, Clark University
            </div>
          </div>
        </div>
        {/* Portrait sized to cover a 400×502 frame (photo is 1345×1170), centred on the face at 48% across. */}
        <div style={{ width: 400, height: 502, display: "flex", overflow: "hidden", position: "relative" }}>
          <img
            src={portrait}
            alt=""
            width={PHOTO_W}
            height={502}
            style={{ position: "absolute", top: 0, left: 200 - PHOTO_W * 0.48 }}
          />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
