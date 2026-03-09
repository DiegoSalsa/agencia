import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PuroCode — Desarrollo Web Premium";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* Gradient accent circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
            Agencia de Desarrollo Web
          </span>
        </div>

        {/* Logo + Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {"</>"}
          </div>
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              letterSpacing: -2,
            }}
          >
            PuroCode
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Soluciones digitales premium para escalar marcas modernas
        </p>

        {/* Service pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          {["Landing Pages", "Web Corporativa", "E-commerce", "SaaS"].map(
            (service) => (
              <div
                key={service}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(99,102,241,0.25)",
                  background: "rgba(99,102,241,0.08)",
                  color: "rgba(165,180,252,0.9)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {service}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 16 }}>
            purocode.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
