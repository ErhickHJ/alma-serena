import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await req.json();
  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "admin" },
  });

  return Response.json({ success: true });
}
