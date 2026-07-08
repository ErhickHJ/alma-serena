export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/perfil"] },
    sitemap: "https://alma-serena-iota.vercel.app/sitemap.xml",
  };
}
