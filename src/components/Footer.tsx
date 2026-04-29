export default function Footer() {
  return (
    <footer className="py-12 md:py-24 px-4 md:px-6 bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Section: Stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 md:gap-20 border-b border-slate-100 pb-12 md:pb-20 mb-10">
          
          {/* Logo/Name Area */}
          <div className="w-full lg:w-auto">
            {/* Fluid Typography: 15vw on mobile, 8xl on desktop */}
            <h2 className="text-[15vw] lg:text-8xl font-[900] text-slate-900 leading-[0.8] md:leading-[0.7] tracking-tighter uppercase mb-6 md:mb-8 italic">
              P. Kariya<span className="text-blue-600">.</span>
            </h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">
              Surat • Gujarat • India
            </p>
          </div>

          {/* Links and Contact Area */}
          <div className="grid grid-cols-2 gap-10 md:gap-24 w-full lg:w-auto">
            {/* Sitemap */}
            <div className="space-y-4 md:space-y-6">
              <p className="text-blue-600 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                Practice
              </p>
              <nav className="flex flex-col gap-3 md:gap-4 text-slate-900 font-[900] uppercase text-[10px] md:text-xs tracking-tighter">
                <a href="#expertise" className="hover:text-blue-600 transition-colors">Expertise</a>
                <a href="#clinics" className="hover:text-blue-600 transition-colors">Clinics</a>
                <a href="#books" className="hover:text-blue-600 transition-colors">Books</a>
              </nav>
            </div>

            {/* Emergency Info: Aligned right on mobile, left on desktop */}
            <div className="space-y-4 md:space-y-6 text-right lg:text-left">
              <p className="text-blue-600 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                Emergency
              </p>
              <p className="text-lg md:text-2xl font-[900] text-slate-900 tracking-tighter uppercase leading-none">
                (0261) <br className="sm:hidden" /> 2492411
              </p>
              <p className="text-[9px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                Param Hospital
              </p>
            </div>
          </div>
        </div>

        {/* Legal/Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] md:tracking-[0.4em] text-center sm:text-left">
           <p>© 2026 DR. PRASHANT KARIYA</p>
           <p className="hidden sm:block">MEDICAL EXCELLENCE</p>
        </div>
      </div>
    </footer>
  );
}