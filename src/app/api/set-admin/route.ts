import { auth, clerkClient } from "@clerk/nextjs/server";

async function setAdmin(userId: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "admin" },
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const { userId } = await req.json();
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });
  if (userId !== session.userId) return Response.json({ error: "Solo puedes configurar tu propio usuario" }, { status: 403 });
  await setAdmin(userId);
  return Response.json({ success: true });
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Not authenticated" }, { status: 401 });
  await setAdmin(session.userId);
  const origin = new URL(request.url).origin;
  return Response.redirect(`${origin}/admin/estadisticas`);
}
