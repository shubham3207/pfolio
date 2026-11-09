import { ImageResponse } from "next/og";
import { ogFonts, palette } from "./_og/assets";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser-tab icon: an Instrument Serif "S" on forest green, matching the site's display face. */
// Read at module load (build time) so the image is prerendered rather than generated per request.
const fonts = await ogFonts();

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.forest,
          borderRadius: 14,
          color: palette.paper,
          fontFamily: "Instrument Serif",
          fontSize: 54,
          lineHeight: 1,
          paddingBottom: 4,
        }}
      >
        S
      </div>
    ),
    { ...size, fonts },
  );
}
