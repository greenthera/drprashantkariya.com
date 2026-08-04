import { useLocation, useNavigate } from "react-router";

type SectionLinkProps = {
  id: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
};

// Scrolls smoothly to a section on the home page, navigating there first if
// currently on a different route. The href is a real "/#id" URL so
// middle-click/open-in-new-tab and no-JS fallback still land on the right
// section natively; the click handler intercepts normal clicks to animate
// the scroll instead of jumping instantly.
//
// Cross-page navigation passes the target via the hash (not router `state`)
// on purpose: `navigate("/", { state })` to the index route triggers React
// Router's `?index` disambiguation query param to leak into the URL when
// state is present (a data-router quirk, reproduced in isolation — state-less
// navigation to the same path stays clean). Home.tsx reads `location.hash`
// once mounted instead.
export default function SectionLink({ id, className, onNavigate, children }: SectionLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    onNavigate?.();

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  }

  return (
    <a href={`/#${id}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
