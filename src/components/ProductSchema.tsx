export default function ProductSchema({ product }: { product: { name: string; price: number; image?: string; desc?: string; id: string; category: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image ? `${typeof window !== "undefined" ? window.location.origin : ""}${product.image}` : undefined,
    description: product.desc,
    sku: product.id,
    brand: { "@type": "Brand", name: "Alma Serena" },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Alma Serena" },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
