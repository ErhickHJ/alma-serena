import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/admin";
import { logAdminAction } from "@/lib/audit";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const client = await clerkClient();
  const user = await client.users.getUser(session.userId);
  const adminEmail = user.emailAddresses?.[0]?.emailAddress;
  if (!isAdminEmail(adminEmail)) {
    return Response.json({ error: "No autorizado. Solo el administrador puede promover usuarios." }, { status: 403 });
  }

  const { userId: targetUserId } = await req.json();
  if (!targetUserId || typeof targetUserId !== "string") {
    return Response.json({ error: "userId required" }, { status: 400 });
  }

  if (targetUserId === session.userId) {
    return Response.json({ error: "No puedes modificarte a ti mismo." }, { status: 400 });
  }

  await client.users.updateUserMetadata(targetUserId, {
    publicMetadata: { role: "admin" },
  });

  await logAdminAction({ userId: session.userId, email: adminEmail || "", action: "set_admin", details: `Promoted ${targetUserId} to admin`, ip: req.headers.get("x-forwarded-for") || "" });

  return Response.json({ success: true });
}
