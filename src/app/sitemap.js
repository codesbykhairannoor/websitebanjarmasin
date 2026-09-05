import fs from 'fs';
import path from 'path';

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
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ];

  // Try to load Blogs Dataset
  let blogRoutes = [];
  try {
    const blogsPath = path.join(process.cwd(), 'src/data/blogs.json');
    if (fs.existsSync(blogsPath)) {
      const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
      blogRoutes = blogs.map(b => ({
        url: `/blog/${b.slug}`,
        priority: 0.7,
        changeFrequency: "weekly"
      }));
    }
  } catch (e) {
    console.error("Failed to load blogs dataset for sitemap:", e);
  }

  // Try to load PSEO Dataset
  let pseoDataset = [];
  try {
    const datasetPath = path.join(process.cwd(), 'src/data/pseo-dataset.json');
    if (fs.existsSync(datasetPath)) {
      pseoDataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    }
  } catch (e) {
    console.error("Failed to load pSEO dataset for sitemap:", e);
  }

  // Generate PSEO routes
  const pseoRoutes = pseoDataset.map(record => ({
    url: `/explore/${record.slug}`,
    priority: 0.6,
    changeFrequency: "monthly"
  }));

  const allRoutes = [...routes, ...blogRoutes, ...pseoRoutes];

  // Map to Next.js Sitemap format with full alternates
  return allRoutes.map((route) => ({
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
