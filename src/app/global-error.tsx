"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420, padding: "0 24px" }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 16,
            }}
          >
            Error
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
            Ocurrió un error crítico
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#a1a1aa",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Lo sentimos, algo no funcionó correctamente. Por favor recarga la
            página.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#6d28d9",
              color: "white",
              border: "none",
              borderRadius: 9999,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Recargar página
          </button>
          {error.digest && (
            <p style={{ marginTop: 24, fontSize: 12, color: "#52525b" }}>
              Código: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
