import { prisma } from "@/lib/db";
import ComunidadContent from "./ComunidadContent";

const FALLBACK_POSTS = [
  { id: "1", author: "Camila R.", text: "Hoy cumplí 30 días con Alma Serena y siento que mi relación conmigo misma ha cambiado profundamente. La gratitud ya no es un ejercicio, es una forma de ver la vida.", tag: "30 días", createdAt: new Date("2026-03-15") },
  { id: "2", author: "Sofía M.", text: "El reto de desconectarme 30 minutos del mundo digital fue transformador. Descubrí que el silencio no es vacío, es espacio para escucharme.", tag: "Reto semanal", createdAt: new Date("2026-03-28") },
  { id: "3", author: "Valentina P.", text: "Escribir una carta a mi yo futuro fue el ejercicio más liberador que he hecho. Me prometí seguir eligiéndome, todos los días.", tag: "Reflexión", createdAt: new Date("2026-04-05") },
  { id: "4", author: "Isabel G.", text: "Cada noche escribo tres cosas bonitas de mi día. Es curioso cómo empiezas a buscar activamente lo bueno. Mi mente ya no se enfoca en lo que falta, sino en lo que abunda.", tag: "Diario de gratitud", createdAt: new Date("2026-04-12") },
  { id: "5", author: "Mariana L.", text: "Hoy medité 10 minutos sin distracciones. Al principio sentí inquietud, pero luego llegó una paz profunda. Mi mente está aprendiendo a descansar.", tag: "Meditación", createdAt: new Date("2026-04-18") },
];

async function getForumPosts() {
  try {
    const dbPosts = await prisma.forumPost.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    if (dbPosts && (dbPosts as any[]).length > 0) return dbPosts as any[];
  } catch { /* offline */ }
  return null;
}

export default async function CommunityPage() {
  const dbPosts = await getForumPosts();
  const posts = dbPosts || FALLBACK_POSTS;
  const offline = !dbPosts;

  return <ComunidadContent posts={posts} offline={offline} />;
}
