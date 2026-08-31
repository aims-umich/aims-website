import type { Metadata } from "next";
import { newsItems } from "@/data/news";
import { getNewsItemBySlug } from "@/lib/supabase/actions/news";
import { pageMetadata, toDescription } from "@/lib/seo";

interface NewsArticleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Mirror the page's own lookup: static news data first, then Supabase.
  const staticItem = newsItems.find((item) => item.slug === slug);
  const article = staticItem ?? (await getNewsItemBySlug(slug));

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: true },
    };
  }

  const excerpt: string = (article.excerpt ?? article.content ?? "").toString().trim();
  const description = excerpt
    ? toDescription(excerpt)
    : `${article.title} - news from the AIMS Lab at the University of Michigan.`;
  const image: string | undefined = article.imageUrl ?? article.image_url;

  return pageMetadata({
    title: article.title,
    description,
    path: `/news/${slug}`,
    image: image && image.startsWith("/") ? image : undefined,
  });
}

export default function NewsArticleLayout({ children }: NewsArticleLayoutProps) {
  return children;
}
