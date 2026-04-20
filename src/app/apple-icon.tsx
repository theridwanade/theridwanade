import { ImageResponse } from "next/og";

import { brandColors } from "./seo-image";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top left, rgba(143, 183, 255, 0.26), transparent 35%), linear-gradient(135deg, #07111f 0%, #0b1628 100%)",
        color: brandColors.foreground,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 142,
          height: 142,
          borderRadius: 50,
          border: `1px solid ${brandColors.border}`,
          background: "rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        R
      </div>
    </div>,
    size,
  );
}
