export const brandColors = {
  background: "#07111f",
  panel: "#0f1b2d",
  border: "rgba(255, 255, 255, 0.12)",
  accent: "#8fb7ff",
  accentSoft: "rgba(143, 183, 255, 0.18)",
  foreground: "#f6f8fc",
  muted: "rgba(246, 248, 252, 0.72)",
};

export function BrandPreview({
  eyebrow,
  title,
  description,
  width,
  height,
}: {
  eyebrow: string;
  title: string;
  description: string;
  width: number;
  height: number;
}) {
  const compact = width <= 512 || height <= 512;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(143, 183, 255, 0.28), transparent 35%), linear-gradient(135deg, #07111f 0%, #0b1628 48%, #111d33 100%)",
        color: brandColors.foreground,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px solid ${brandColors.border}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 320,
          height: 320,
          borderRadius: 9999,
          background: brandColors.accentSoft,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -80,
          bottom: -100,
          width: 260,
          height: 260,
          borderRadius: 9999,
          background: "rgba(255, 255, 255, 0.05)",
          filter: "blur(18px)",
        }}
      />

      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: compact ? 36 : 64,
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "auto",
            borderRadius: 9999,
            border: `1px solid ${brandColors.border}`,
            background: "rgba(255, 255, 255, 0.05)",
            padding: "10px 16px",
            fontSize: compact ? 16 : 18,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: width > 700 ? 720 : 540,
          }}
        >
          <div
            style={{
              fontSize: compact ? 48 : width >= 1000 ? 72 : 64,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.06em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: compact ? 22 : 30,
              lineHeight: 1.35,
              color: brandColors.muted,
              maxWidth: 680,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: brandColors.muted,
            fontSize: compact ? 18 : 22,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: brandColors.accent,
              boxShadow: "0 0 0 6px rgba(143, 183, 255, 0.14)",
            }}
          />
          theridwanade.me
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: compact ? 160 : 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: compact ? 20 : 36,
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: 36,
            border: `1px solid ${brandColors.border}`,
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: compact ? 10 : 16,
            boxShadow: "0 28px 60px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div
            style={{
              width: compact ? 88 : 128,
              height: compact ? 88 : 128,
              borderRadius: 9999,
              border: `1px solid ${brandColors.border}`,
              background:
                "linear-gradient(135deg, rgba(143, 183, 255, 0.24), rgba(255, 255, 255, 0.08))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: compact ? 44 : 62,
              fontWeight: 800,
              letterSpacing: "-0.08em",
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: compact ? 18 : 24,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Ridwan
          </div>
        </div>
      </div>
    </div>
  );
}
