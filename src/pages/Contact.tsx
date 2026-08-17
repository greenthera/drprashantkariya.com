import type { LinksFunction, MetaFunction } from "react-router";
import ContactForm from "../components/ContactForm";
import { canonicalLink, pageMeta } from "../lib/seo";

export const links: LinksFunction = () => [canonicalLink("/contact")];

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Contact & Book Appointment | Dr. Prashant Kariya, Pediatrician Surat",
    description:
      "Book an appointment with Dr. Prashant Kariya online via Docon, or reach Param NICU & Children Hospital and Param Children Hospital in Surat directly.",
    keywords:
      "book pediatrician appointment surat, contact dr prashant kariya, param nicu children hospital, param children hospital surat",
    path: "/contact",
  });

export default function Contact() {
  return (
    <>
      <ContactForm />
    </>
  );
}
