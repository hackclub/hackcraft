import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hackcraft.hackclub.com";

  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/guide`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guide/mixin`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/gallery`,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
