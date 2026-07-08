import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const text = await req.text();
  const params = new URLSearchParams(text);

  const name = params.get("name") || "";
  const email = params.get("email") || params.get("name") || "";
  const amount = Math.round(parseFloat(params.get("total")?.replace("$", "") || "0") * 100);

  if (!name) {
    return Response.json({ error: "Faltan datos" }, { status: 400 });
  }

  await prisma.order.create({
    data: { name, email, amount, status: "pending" },
  });

  return Response.json({ success: true });
}
