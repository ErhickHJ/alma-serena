export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/perfil"] },
    sitemap: "https://almaserenaoficial.com/sitemap.xml",
  };
}
