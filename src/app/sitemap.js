export default function sitemap() {
  const baseUrl = "https://visitbanjarmasin.id";
  
  // Define all core routes
  const routes = [
    { url: "", priority: 1.0, changeFrequency: "weekly" },
    { url: "/wisata", priority: 0.9, changeFrequency: "monthly" },
    { url: "/kuliner", priority: 0.9, changeFrequency: "monthly" },
    { url: "/budaya", priority: 0.8, changeFrequency: "monthly" },
    { url: "/sejarah", priority: 0.8, changeFrequency: "monthly" },
    { url: "/panduan", priority: 0.9, changeFrequency: "monthly" },
    { url: "/smart-city", priority: 0.8, changeFrequency: "monthly" },
    { url: "/profil-kota", priority: 0.7, changeFrequency: "monthly" },
    { url: "/profil", priority: 0.7, changeFrequency: "monthly" },
  ];

  // Map to Next.js Sitemap format with full alternates
  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        "id-ID": `${baseUrl}${route.url}`,
        "en-US": `${baseUrl}/en${route.url}`,
        "ms-MY": `${baseUrl}/ms${route.url}`,
        "zh-CN": `${baseUrl}/zh${route.url}`,
        "x-default": `${baseUrl}${route.url}`,
      },
    },
  }));
}
