import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "Alma Serena";
  try {
    const post = await prisma.post.findUnique({ where: { slug }, select: { title: true } });
    if (post?.title) title = post.title;
  } catch {}

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
      <div style={{ fontSize: 48, fontWeight: "bold", textAlign: "center", lineHeight: 1.2, marginBottom: 30 }}>
        {title.length > 50 ? title.slice(0, 47) + "..." : title}
      </div>
      <div style={{ fontSize: 22, opacity: 0.7, letterSpacing: 4 }}>ALMA SERENA</div>
      <div style={{ position: "absolute", bottom: 40, fontSize: 18, opacity: 0.5, letterSpacing: 2 }}>almaserenaoficial.com</div>
    </div>,
    size,
  );
}
