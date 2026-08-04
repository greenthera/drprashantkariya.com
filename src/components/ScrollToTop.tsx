import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A hash in the URL means a HashLink is navigating to a specific
    // section (e.g. /#clinics) - let it scroll there instead of forcing
    // the window back to the top.
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]); // Fires every time the URL path or hash changes

  return null;
}