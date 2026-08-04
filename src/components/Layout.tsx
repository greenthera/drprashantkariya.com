import { Outlet } from "react-router";
import Navbar from "./Navbar";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <BackToTop />
      <Footer />
    </>
  );
}
