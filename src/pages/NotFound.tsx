import { Link } from "react-router";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative bg-[#FAF9F6] overflow-hidden pt-24 md:pt-32 pb-24 px-6 md:px-10 min-h-[80vh] flex items-center">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: "radial-gradient(circle, #C7CCEE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-40 -left-40 w-120 h-120 rounded-full bg-[#EAEDFB] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#EAEDFB]/60 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full text-center">
        <div className="flex justify-center mb-8">
          <span className="w-16 h-16 rounded-2xl bg-[#4353CF] flex items-center justify-center shadow-lg shadow-[#2E3A9E]/20">
            <Compass size={28} className="text-[#F2B33D]" />
          </span>
        </div>

        <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-4">
          Error 404
        </span>

        <h1
          className="font-display font-bold italic text-[#2E3A9E] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
        >
          Page Not <span className="text-[#4353CF]">Found.</span>
        </h1>

        <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed font-light max-w-md mx-auto mb-10">
          The page you're looking for may have been moved or no longer exists.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 bg-[#4353CF] text-[#F5E6C8] px-6 py-3 rounded-lg text-[13px] font-semibold hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-200"
        >
            Back to Home <ArrowRight size={15} />
          </Link>
          <Link
            to="/contact"
            className="border border-[#4353CF] text-[#4353CF] px-6 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-[0.15em] hover:bg-[#4353CF] hover:text-[#F5E6C8] transition-all duration-250"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
