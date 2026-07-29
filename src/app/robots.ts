import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/projects", "/stickers"],
    },
    sitemap: "https://hackcraft.hackclub.com/sitemap.xml",
  };
}
