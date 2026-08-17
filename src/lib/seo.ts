import type { MetaDescriptor } from "react-router";

const SITE_URL = "https://drprashantkariya.com";
// Reused as a generic share-preview image on pages that don't have a more
// specific one of their own — real photo, not a generic icon, since a face
// reads better than a logo in social link previews for a medical practice.
const DEFAULT_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

// Shared page-level SEO: unique title/description/keywords plus the
// Open Graph + Twitter Card tags derived from them, so every route only has
// to state its own content once instead of repeating the ~10 tag boilerplate.
export function pageMeta(options: {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  /** Relative (e.g. "/assets/x.webp") or absolute URL; made absolute if relative. */
  image?: string;
}): MetaDescriptor[] {
  const { title, description, keywords, path, image } = options;
  const url = `${SITE_URL}${path}`;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;

  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
  ];
  if (keywords) tags.push({ name: "keywords", content: keywords });
  tags.push(
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: absoluteImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteImage }
  );
  return tags;
}

export function canonicalLink(path: string) {
  return { rel: "canonical", href: `${SITE_URL}${path}` };
}
