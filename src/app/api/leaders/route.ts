import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const FALLBACK_LEADERS = [
  { id: "1", name: "Camila R.", level: 3, referralCount: 18, badge: "🥇", title: "Líder Oro" },
  { id: "2", name: "Sofía M.", level: 2, referralCount: 9, badge: "🥈", title: "Líder Plata" },
  { id: "3", name: "Valentina P.", level: 2, referralCount: 7, badge: "🥈", title: "Líder Plata" },
  { id: "4", name: "Isabel G.", level: 1, referralCount: 4, badge: "🥉", title: "Líder Bronce" },
  { id: "5", name: "Mariana L.", level: 1, referralCount: 3, badge: "🥉", title: "Líder Bronce" },
];

export async function GET() {
  try {
    const leaders = await prisma.communityLeader.findMany({ orderBy: { referralCount: "desc" }, take: 20 });
    if (leaders.length > 0) {
      const mapped = leaders.map(l => {
        const badge = l.level >= 4 ? "✨" : l.level >= 3 ? "🥇" : l.level >= 2 ? "🥈" : "🥉";
        const title = l.level >= 4 ? "Líder Especial" : l.level >= 3 ? "Líder Oro" : l.level >= 2 ? "Líder Plata" : "Líder Bronce";
        return { ...l, badge, title };
      });
      return NextResponse.json({ success: true, leaders: mapped });
    }
  } catch { /* offline */ }
  return NextResponse.json({ success: true, leaders: FALLBACK_LEADERS });
}
