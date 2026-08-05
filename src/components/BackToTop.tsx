import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
      className="
        fixed bottom-6 right-6
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-[#2E3A9E] text-white
        shadow-lg
        hover:bg-[#4353CF]
        transition-all duration-300
        z-[9999]
      "
    >
      <ArrowUp size={20} />
    </button>
  );
}
