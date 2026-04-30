export default function Footer() {
  return (
    <footer className="bg-[#063322] px-6 md:px-10 pt-16 md:pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Top: name + links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-white/10 pb-12 md:pb-16 mb-10">

          <div>
            <h2
              className="font-display font-bold italic text-[#F5E6C8] leading-none tracking-tight mb-4"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            >
              P. Kariya<span className="text-[#C4973A]">.</span>
            </h2>
            <p className="text-[#6B9A84] font-medium uppercase tracking-[0.3em] text-[9px]">
              Surat • Gujarat • India
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-20 w-full lg:w-auto">
            <div className="space-y-4">
              <p className="text-[#C4973A] font-semibold uppercase tracking-[0.22em] text-[10px]">
                Practice
              </p>
              <nav className="flex flex-col gap-3">
                <a href="#expertise" className="text-[#A8C5BB] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Expertise</a>
                <a href="#clinics"   className="text-[#A8C5BB] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Clinics</a>
                <a href="#publication" className="text-[#A8C5BB] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Books</a>
              </nav>
            </div>

            <div className="space-y-4">
              <p className="text-[#C4973A] font-semibold uppercase tracking-[0.22em] text-[10px]">
                Emergency
              </p>
              <p className="font-display text-xl md:text-2xl font-bold italic text-[#F5E6C8] leading-none">
                (0261)<br className="sm:hidden" /> 2492411
              </p>
              <p className="text-[10px] font-medium text-[#6B9A84] uppercase tracking-[0.22em]">
                Param Hospital
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-medium text-[#4A6E5A] uppercase tracking-[0.25em] text-center sm:text-left">
          <p>© 2026 Dr. Prashant Kariya</p>
          <p className="hidden sm:block">Medical Excellence</p>
        </div>
      </div>
    </footer>
  );
}
