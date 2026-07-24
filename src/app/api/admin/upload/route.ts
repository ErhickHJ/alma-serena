import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { clerkClient } = await import("@clerk/nextjs/server");
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Tipo de archivo no permitido. Usa JPG, PNG, WebP o GIF." }, { status: 400 });
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "El archivo es muy grande. Máximo 5MB." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  return NextResponse.json({ success: true, url: dataUrl, name: file.name, size: file.size });
}
