import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/admin";

async function setAdmin(userId: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "admin" },
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const client = await clerkClient();
  const user = await client.users.getUser(session.userId);
  if (!isAdminEmail(user.emailAddresses?.[0]?.emailAddress)) {
    return Response.json({ error: "No autorizado. Solo el administrador puede promover usuarios." }, { status: 403 });
  }
  const { userId } = await req.json();
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });
  await setAdmin(userId);
  return Response.json({ success: true });
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const client = await clerkClient();
  const user = await client.users.getUser(session.userId);
  if (!isAdminEmail(user.emailAddresses?.[0]?.emailAddress)) {
    return Response.json({ error: "No autorizado" }, { status: 403 });
  }
  await setAdmin(session.userId);
  const origin = new URL(request.url).origin;
  return Response.redirect(`${origin}/admin/estadisticas`);
}
