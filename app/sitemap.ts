import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "@/lib/seo";

// Regenerate at most once per day; the lab's content changes infrequently.
export const revalidate = 86400;

const BASE = siteConfig.url;

/** Static routes with hand-tuned priority. The home page is the primary entry point. */
const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/research", priority: 0.9, changeFrequency: "monthly" },
  { path: "/research/reactors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/research/controls", priority: 0.7, changeFrequency: "monthly" },
  { path: "/research/computing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/research/software-datasets", priority: 0.7, changeFrequency: "monthly" },
  { path: "/members", priority: 0.8, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/culture", priority: 0.6, changeFrequency: "yearly" },
  { path: "/teaching", priority: 0.6, changeFrequency: "yearly" },
  { path: "/gallery", priority: 0.4, changeFrequency: "monthly" },
];

/** Pull member and news slugs from Supabase for the detail-page URLs. */
async function getDynamicEntries(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const [members, news] = await Promise.all([
      supabase.from("members").select("slug"),
      supabase.from("news").select("slug, date"),
    ]);

    const memberEntries: MetadataRoute.Sitemap = (members.data ?? [])
      .filter((m): m is { slug: string } => Boolean(m?.slug))
      .map((m) => ({
        url: `${BASE}/members/${m.slug}`,
        changeFrequency: "yearly",
        priority: 0.5,
      }));

    const newsEntries: MetadataRoute.Sitemap = (news.data ?? [])
      .filter((n): n is { slug: string; date: string | null } => Boolean(n?.slug))
      .map((n) => ({
        url: `${BASE}/news/${n.slug}`,
        lastModified: n.date ? new Date(n.date) : undefined,
        changeFrequency: "yearly",
        priority: 0.5,
      }));

    return [...memberEntries, ...newsEntries];
  } catch {
    // A sitemap without detail pages is still far better than none.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route.path === "/" ? `${BASE}` : `${BASE}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...(await getDynamicEntries())];
}
