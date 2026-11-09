import { ImageResponse } from "next/og";
import { ogFonts, palette } from "./_og/assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS (square; the system rounds the corners). */
// Read at module load (build time) so the image is prerendered rather than generated per request.
const fonts = await ogFonts();

export default function AppleIcon() {
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
          color: palette.paper,
          fontFamily: "Instrument Serif",
          fontSize: 150,
          lineHeight: 1,
          paddingBottom: 10,
        }}
      >
        S
      </div>
    ),
    { ...size, fonts },
  );
}
