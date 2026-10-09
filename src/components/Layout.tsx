import { Link, Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import AnnouncementBanner from "./AnnouncementBanner";

const pageNames: Record<string, string> = {
  "/contact": "Contact", "/courses": "Courses", "/publications": "Publications",
  "/parental-guidelines": "Parental Guidelines", "/media-coverage": "Media Coverage",
};

export default function Layout() {
  const { pathname } = useLocation();
  const pageName = pageNames[pathname.replace(/\/$/, "")];
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <AnnouncementBanner />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {pageName && (
          <nav aria-label="Breadcrumb" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-5 text-sm text-[#4F5A8A]">
            <ol className="flex gap-2 flex-wrap">
              <li><Link to="/" className="underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{pageName}</li>
            </ol>
          </nav>
        )}
        <Outlet />
      </main>

      <BackToTop />
      <Footer />
    </>
  );
}
