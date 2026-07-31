import { useLocation, useNavigate } from "react-router-dom";

type SectionLinkProps = {
  id: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
};

// Scrolls smoothly to a section on the home page, navigating there first if
// currently on a different route. Uses plain scrollIntoView (not a real URL
// hash) since HashRouter already uses "#" for routing.
export default function SectionLink({ id, className, onNavigate, children }: SectionLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    onNavigate?.();

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  }

  return (
    <a href={`#${id}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
