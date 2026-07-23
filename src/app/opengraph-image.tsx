import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #d8c8a8 0%, #c9a98c 50%, #9ab89f 100%)",
        fontFamily: "Georgia, serif",
        color: "#3d3728",
        padding: 60,
      }}
    >
      <div style={{ fontSize: 64, fontWeight: "bold", marginBottom: 20 }}>☽</div>
      <div style={{ fontSize: 56, fontWeight: "bold", marginBottom: 16 }}>Alma Serena</div>
      <div style={{ fontSize: 26, opacity: 0.7, textAlign: "center", maxWidth: 800 }}>
        Bienestar, comunidad y crecimiento personal
      </div>
      <div style={{ position: "absolute", bottom: 40, fontSize: 18, opacity: 0.5, letterSpacing: 2 }}>almaserenaoficial.com</div>
    </div>,
    size,
  );
}
