import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

export async function POST(req: Request) {
  const session = await auth();
  if (!session.userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const user = await (await clerkClient()).users.getUser(session.userId);
  if (!isAdmin(user?.publicMetadata as { role?: unknown } | undefined)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });

  try {
    const post = await prisma.forumPost.delete({ where: { id: postId } });
    await logAdminAction({
      userId: session.userId,
      email: user.emailAddresses[0]?.emailAddress || "",
      action: "delete_forum_post",
      details: `Deleted forum post by ${post.author}: "${post.text.slice(0, 80)}"`,
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
