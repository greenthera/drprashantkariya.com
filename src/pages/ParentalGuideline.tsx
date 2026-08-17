import type { LinksFunction, MetaFunction } from "react-router";
import ParentalGuidelineGrid from "../components/ParentalGuidelineGrid";
import { canonicalLink, pageMeta } from "../lib/seo";
import iapLogo from "../assets/iap-logo.webp";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Parental Guidelines — Child Health & Development | Dr. Prashant Kariya",
    description:
      "IAP-authored parental guidelines on child nutrition, immunization, growth, behavior, and adolescent health — organized by topic, curated by Dr. Prashant Kariya, Pediatrician in Surat.",
    keywords:
      "parental guidelines, IAP guidelines, child health guidelines, pediatric guidelines for parents, child nutrition, child immunization, child development, parenting tips, Dr Prashant Kariya",
    path: "/parental-guidelines",
    image: iapLogo,
  });

export const links: LinksFunction = () => [canonicalLink("/parental-guidelines")];

export default function ParentalGuideline() {
  return <ParentalGuidelineGrid />;
}
