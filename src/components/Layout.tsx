import { Outlet } from "react-router";
import Navbar from "./Navbar";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import AnnouncementBanner from "./AnnouncementBanner";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <AnnouncementBanner />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <BackToTop />
      <Footer />
    </>
  );
}
