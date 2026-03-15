import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PuroCode — Desarrollo Web Premium";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Fetch the logo SVG and convert to base64
  let logoDataUrl = "";
  try {
    const logoResponse = await fetch(new URL("../../public/img/logo.svg", import.meta.url));
    const logoBuffer = await logoResponse.arrayBuffer();
    logoDataUrl = `data:image/svg+xml;base64,${Buffer.from(logoBuffer).toString("base64")}`;
  } catch (error) {
    console.error("Failed to load logo:", error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logoDataUrl && (
          <img
            src={logoDataUrl}
            alt="PuroCode"
            style={{
              width: 300,
              height: 300,
            }}
          />
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
