import type { LinksFunction, MetaFunction } from "react-router";
import PublicationsGrid from "../components/PublicationsGrid";
import { canonicalLink, pageMeta } from "../lib/seo";

export const links: LinksFunction = () => [canonicalLink("/publications")];

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Published Research — Dr. Prashant Kariya | Pediatric & Adolescent Health",
    description:
      "Peer-reviewed articles, clinical studies, and academic contributions by Dr. Prashant Kariya across pediatric and adolescent health.",
    keywords:
      "dr prashant kariya publications, pediatric research india, peer reviewed pediatric articles, adolescent health research",
    path: "/publications",
  });

export default function Publications() {
  return <PublicationsGrid />;
}
