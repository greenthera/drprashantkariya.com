import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", to: "/#about" },
    { name: "Expertise", to: "/#expertise" },
    { name: "Clinics", to: "/#clinics" },
    { name: "Books", to: "/#publication" },
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

          <HashLink smooth to="/#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#0A4B38] rounded-lg flex items-center justify-center group-hover:bg-[#063322] transition-colors duration-300">
              <Plus size={18} strokeWidth={2.5} className="text-[#C4973A]" />
            </div>
            <div>
              <p className="font-display text-[17px] font-semibold text-[#063322] leading-none">
                Dr. Prashant <span className="italic">Kariya</span>
              </p>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#6B7B6A] mt-0.5">
                Pediatric Excellence
              </p>
            </div>
          </HashLink>

          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <HashLink
                key={link.name}
                smooth
                to={link.to}
                className="text-[13px] font-medium text-[#4A5E54] hover:text-[#0A4B38] transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </HashLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:block bg-[#0A4B38] text-[#F5E6C8] px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#063322] hover:shadow-lg hover:shadow-[#063322]/20 hover:-translate-y-px transition-all duration-200"
            >
              Book Appointment
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#4A5E54] hover:bg-[#E8F4EE] rounded-lg transition-colors"
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
              {navLinks.map((link) => (
                <HashLink
                  key={link.name}
                  smooth
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-4xl font-semibold italic text-[#063322] py-4 border-b border-[#E0E8E2] hover:text-[#0A4B38] transition-colors"
                >
                  {link.name}
                </HashLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-5 bg-[#0A4B38] text-[#F5E6C8] p-4 rounded-xl text-center font-semibold text-base hover:bg-[#063322] transition-colors"
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
