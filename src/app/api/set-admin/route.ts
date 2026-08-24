import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/admin";

async function setAdmin(targetUserId: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(targetUserId, {
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
  const { userId: targetUserId } = await req.json();
  if (!targetUserId) return Response.json({ error: "userId required" }, { status: 400 });
  await setAdmin(targetUserId);
  return Response.json({ success: true });
}
