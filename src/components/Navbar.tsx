import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLink from "./SectionLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const sectionLinks = [
    { name: "About", id: "about" },
    { name: "Expertise", id: "expertise" },
    { name: "Clinics", id: "clinics" },
    { name: "Books", id: "publication" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100] bg-[#FAF9F6]/92 backdrop-blur-xl border-b border-[#E0E8E2]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#4353CF] rounded-lg flex items-center justify-center group-hover:bg-[#2E3A9E] transition-colors duration-300">
              <Plus size={18} strokeWidth={2.5} className="text-[#F2B33D]" />
            </div>
            <div>
              <p className="font-display text-[17px] font-semibold text-[#2E3A9E] leading-none">
                Dr. Prashant <span className="italic">Kariya</span>
              </p>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#6670A0] mt-0.5">
                Pediatric Excellence
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-9">
            {sectionLinks.map((link) => (
              <SectionLink
                key={link.name}
                id={link.id}
                className="text-[13px] font-medium text-[#4F5A8A] hover:text-[#4353CF] transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </SectionLink>
            ))}
            <Link
              to="/courses"
              className="text-[13px] font-medium text-[#4F5A8A] hover:text-[#4353CF] transition-colors duration-200 tracking-wide"
            >
              Courses
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:block bg-[#4353CF] text-[#F5E6C8] px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-200"
            >
              Book Appointment
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#4F5A8A] hover:bg-[#EAEDFB] rounded-lg transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-[#FAF9F6] pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 pt-4">
              {sectionLinks.map((link) => (
                <SectionLink
                  key={link.name}
                  id={link.id}
                  onNavigate={() => setIsOpen(false)}
                  className="font-display text-4xl font-semibold italic text-[#2E3A9E] py-4 border-b border-[#E0E8E2] hover:text-[#4353CF] transition-colors"
                >
                  {link.name}
                </SectionLink>
              ))}
              <Link
                to="/courses"
                onClick={() => setIsOpen(false)}
                className="font-display text-4xl font-semibold italic text-[#2E3A9E] py-4 border-b border-[#E0E8E2] hover:text-[#4353CF] transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-5 bg-[#4353CF] text-[#F5E6C8] p-4 rounded-xl text-center font-semibold text-base hover:bg-[#2E3A9E] transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
