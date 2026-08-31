import type { Metadata } from "next";

/**
 * Central SEO configuration for the AIMS Lab website.
 * The canonical production origin is the `www` host: the apex domain
 * (aims-umich.com) permanently redirects to https://www.aims-umich.com.
 */
export const siteConfig = {
  name: "AIMS Lab",
  legalName: "Artificial Intelligence and Multiphysics Simulations (AIMS) Lab",
  url: "https://www.aims-umich.com",
  university: "University of Michigan",
  director: "Majdi I. Radaideh",
  description:
    "The AIMS Lab at the University of Michigan, led by Prof. Majdi Radaideh, combines physics-based modeling with modern machine learning to advance optimization, control, and safety of complex systems such as nuclear reactors.",
  ogImage: "/group_photo.jpg",
} as const;

type PageMetaInput = {
  /** Bare page title, e.g. "Research". The site-name suffix is added automatically. */
  title: string;
  description: string;
  /** Root-relative path, e.g. "/research". Used for the canonical URL. */
  path: string;
  /** Optional root-relative OG image path. Defaults to the lab group photo. */
  image?: string;
};

/**
 * Build a consistent Metadata object for a page: unique title + description,
 * a self-referencing canonical URL, and matching Open Graph / Twitter cards.
 *
 * The title is emitted as `absolute` so it is deterministic regardless of how
 * deeply the route is nested (Next.js `title.template` only reaches one level).
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  const fullTitle = `${title} | ${siteConfig.name}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: ogImage, alt: `${siteConfig.name} - ${siteConfig.university}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Collapse whitespace and trim a body of text to a meta-description-friendly
 * length, cutting on a word boundary and appending an ellipsis when shortened.
 */
export function toDescription(text: string, max = 240): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}...`;
}

/**
 * JSON-LD describing the lab as an organization and the site itself, so search
 * engines can disambiguate "AIMS Lab" as a University of Michigan research group.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ResearchOrganization", "EducationalOrganization"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        alternateName: [
          "AIMS Lab",
          "AIMS Research Lab",
          "AIMS Lab University of Michigan",
          "AIMS Lab UMich",
          "Artificial Intelligence and Multiphysics Simulations Lab",
        ],
        url: siteConfig.url,
        logo: `${siteConfig.url}/aims.png`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        description: siteConfig.description,
        foundingDate: "2022",
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "University of Michigan",
          url: "https://umich.edu",
        },
        memberOf: {
          "@type": "Organization",
          name: "Department of Nuclear Engineering and Radiological Sciences, University of Michigan",
          url: "https://ners.engin.umich.edu/",
        },
        founder: {
          "@type": "Person",
          name: "Majdi I. Radaideh",
          jobTitle:
            "Assistant Professor of Nuclear Engineering and Radiological Sciences",
          url: "https://experts.umich.edu/10012-majdi-radaideh",
          sameAs: [
            "https://www.linkedin.com/in/majdi-i-radaideh-81489ab1/",
            "https://ners.engin.umich.edu/majdi-radaideh-mentoring/",
          ],
        },
        knowsAbout: [
          "Scientific Machine Learning",
          "Nuclear Engineering",
          "Multiphysics Simulation",
          "Reinforcement Learning for Control",
          "Large Language Models for Engineering",
          "Nuclear Reactor Design and Safety",
          "Optimization",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ann Arbor",
          addressRegion: "MI",
          addressCountry: "US",
        },
        sameAs: [
          "https://github.com/aims-umich",
          "https://ners.engin.umich.edu/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.legalName,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}
