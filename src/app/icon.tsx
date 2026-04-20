import { ImageResponse } from "next/og";

import { brandColors } from "./seo-image";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top left, rgba(143, 183, 255, 0.3), transparent 35%), linear-gradient(135deg, #07111f 0%, #0b1628 100%)",
        color: brandColors.foreground,
        fontFamily: "Inter, Arial, sans-serif",
        borderRadius: 80,
      }}
    >
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: 120,
          border: `1px solid ${brandColors.border}`,
          background: "rgba(255, 255, 255, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 9999,
            border: `1px solid ${brandColors.border}`,
            background:
              "linear-gradient(135deg, rgba(143, 183, 255, 0.28), rgba(255, 255, 255, 0.1))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.08em",
          }}
        >
          R
        </div>
      </div>
    </div>,
    size,
  );
}
