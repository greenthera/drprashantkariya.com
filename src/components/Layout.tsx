import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BackToTop from "./BackToTop";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <BackToTop />
      <Footer />
    </>
  );
}
