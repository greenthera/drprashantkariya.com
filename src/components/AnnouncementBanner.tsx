import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, ExternalLink } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/qjx7RygXmThCTg2s6";
const HOSPITAL_NAME = "Kiran Multi Super Speciality Hospital and Research Centre";

export default function AnnouncementBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative z-110 h-10 bg-[#2E3A9E] flex items-center px-4">
        <div className="max-w-[1400px] w-full mx-auto flex items-center justify-center gap-2 overflow-hidden">
          <p className="text-[11px] sm:text-xs text-white/90 truncate">
            <span className="font-semibold text-white">Dr. Prashant Kariya</span>
            <span className="hidden sm:inline">
              {" "}— Senior Consultant, Pediatrician at Kiran Multi Super Speciality Hospital
            </span>
            <span className="sm:hidden"> — now at Kiran Hospital</span>
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 text-[#F2B33D] font-semibold text-[11px] sm:text-xs uppercase tracking-wide hover:text-[#F5C264] transition-colors underline underline-offset-2"
          >
            Read More
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-white border border-[#E0E8E2] rounded-2xl p-7 md:p-9 max-w-lg w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#E0E8E2] flex items-center justify-center text-[#2E3A9E] hover:bg-[#EAEDFB] transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="font-display font-bold italic text-[#2E3A9E] text-xl md:text-2xl leading-tight mb-4 pr-8">
                Now Available at {HOSPITAL_NAME}
              </h3>

              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light mb-5">
                We are pleased to announce the full time availability of
                Dr. Prashant Kariya, Senior Consultant &ndash; Pediatrician at{" "}
                {HOSPITAL_NAME}, from 01/10/2026 onwards.
              </p>

              <div className="bg-[#FAF9F6] border border-[#E0E8E2] rounded-xl p-5 flex flex-col gap-2.5 mb-6">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#6670A0] shrink-0">OPD No.</span>
                  <span className="text-[#2E3A9E] font-semibold text-right">06</span>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#6670A0] shrink-0">OPD Location</span>
                  <span className="text-[#2E3A9E] font-semibold text-right">
                    2nd Floor, Department of Pediatrics and Gynecology
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#6670A0] shrink-0">OPD Timings</span>
                  <span className="text-[#2E3A9E] font-semibold text-right">
                    10:00 AM &ndash; 1:30 PM &amp; 2:30 PM &ndash; 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-sm pt-2.5 border-t border-[#E0E8E2]">
                  <span className="text-[#6670A0] shrink-0 flex items-center gap-1.5">
                    <Phone size={13} className="text-[#4353CF]" /> Appointments
                  </span>
                  <span className="text-right">
                    <a href="tel:02617161111" className="text-[#4353CF] font-semibold hover:underline">
                      0261-7161111
                    </a>
                    {" / "}
                    <a href="tel:02617161191" className="text-[#4353CF] font-semibold hover:underline">
                      7161191
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[#4F5A8A] text-xs leading-relaxed font-light mb-6">
                <MapPin size={14} className="text-[#4353CF] shrink-0 mt-0.5" />
                <span>
                  {HOSPITAL_NAME}, Vastadevdi Road, Katargam, Nr. Sumul Dairy, Surat.
                </span>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#4353CF] text-[#F5E6C8] px-5 py-3 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250"
              >
                Open Location <ExternalLink size={13} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
