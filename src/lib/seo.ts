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

// Site-wide JSON-LD (schema.org) — matches the practice details already
// visible in Footer.tsx (addresses, phones, socials) and AnnouncementBanner.tsx
// (Kiran Hospital affiliation), rendered once in root.tsx's <head>.
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      name: "Dr. Prashant Kariya",
      url: `${SITE_URL}/`,
      image: DEFAULT_IMAGE,
      medicalSpecialty: "Pediatric",
      sameAs: [
        "https://x.com/drprashantkariy",
        "https://instagram.com/parentingtips_drprashantkariya",
        "https://in.linkedin.com/in/prashant-kariya-908a2b56",
        "https://www.youtube.com/@PrashantKariya",
      ],
      worksFor: [
        { "@id": `${SITE_URL}/#clinic-nicu` },
        { "@id": `${SITE_URL}/#clinic-children` },
        { "@id": `${SITE_URL}/#clinic-kiran` },
      ],
    },
    {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic-nicu`,
      name: "Param NICU & Children Hospital",
      address: {
        "@type": "PostalAddress",
        streetAddress: "801-803, Param Doctor House, Lal Darwaja",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "395003",
        addressCountry: "IN",
      },
      telephone: "+91-261-2492411",
      url: `${SITE_URL}/`,
    },
    {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic-children`,
      name: "Param Children Hospital",
      address: {
        "@type": "PostalAddress",
        streetAddress: "305-306, Seven Square, Majura Gate",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "395002",
        addressCountry: "IN",
      },
      telephone: "+91-9727008881",
      url: `${SITE_URL}/`,
    },
    {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic-kiran`,
      name: "Kiran Multi Super Speciality Hospital and Research Centre",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vastadevdi Road, Katargam, Nr. Sumul Dairy",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      telephone: "+91-261-7161111",
      url: `${SITE_URL}/`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Dr. Prashant Kariya",
      url: `${SITE_URL}/`,
    },
  ],
};
