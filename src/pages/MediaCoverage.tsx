import type { LinksFunction, MetaFunction } from "react-router";
import MediaCoverageGrid from "../components/MediaCoverageGrid";
import { canonicalLink, pageMeta } from "../lib/seo";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Media Coverage — Press Features | Dr. Prashant Kariya",
    description:
      "Newspaper features and interviews with Dr. Prashant Kariya, Pediatrician in Surat, covering child health, parenting, and adolescent care across Divya Bhaskar, Dainik Bhaskar, Rajasthan Patrika, and Sandesh.",
    keywords:
      "Dr Prashant Kariya media coverage, pediatrician press, newspaper feature, Divya Bhaskar, Dainik Bhaskar, Rajasthan Patrika, Sandesh, child health interview, Surat pediatrician",
    path: "/media-coverage",
  });

export const links: LinksFunction = () => [canonicalLink("/media-coverage")];

export default function MediaCoverage() {
  return <MediaCoverageGrid />;
}
