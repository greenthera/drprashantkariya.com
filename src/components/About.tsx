export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-white text-black rounded-[2.5rem] md:rounded-[4rem] mx-2 md:mx-4 my-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* --- LEFT SIDE: IMAGE GRID --- */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 order-2 lg:order-1">
          {/* Top Images: Fixed heights that scale */}
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
            className="rounded-[2rem] md:rounded-[2.5rem] h-48 md:h-64 w-full object-cover shadow-xl" 
            alt="Medical Professional" 
          />
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514" 
            className="rounded-[2rem] md:rounded-[2.5rem] h-48 md:h-64 w-full object-cover shadow-xl" 
            alt="Neonatal Care" 
          />
          
          {/* Blue Highlight Box: Full width of the grid */}
          <div className="col-span-2 bg-blue-600 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-center relative overflow-hidden group">
             {/* Decorative Circle for premium feel */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
             
             <p className="text-5xl md:text-6xl font-[900] mb-2 tracking-tighter">15+</p>
             <p className="uppercase text-[10px] md:text-xs tracking-[0.3em] font-black opacity-90">
               Years of Clinical Mastery
             </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="order-1 lg:order-2">
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-full mb-4">
            <span className="text-blue-600 font-black uppercase tracking-widest text-[9px] md:text-xs block">
              Excellence in Care
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tighter mt-4 mb-6 md:mb-8 leading-[0.95] md:leading-none uppercase">
            Pediatric & Neonatal <br className="hidden md:block"/> 
            <span className="text-blue-600 italic">Specialist.</span>
          </h2>
          
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 font-medium max-w-xl">
            Dr. Prashant Kariya is a highly experienced pediatrician and neonatologist, specializing in high-risk newborn intensive care and holistic child development.
          </p>

          {/* Feature Grid: 1 col on small phones, 2 cols on everything else */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              "MBBS – B.J. Medical", 
              "MD Pediatrics", 
              "Param NICU Founder", 
              "15+ Years Exp"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 font-black text-[10px] md:text-xs uppercase tracking-tight bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                <div className="shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[8px]">
                  ✓
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}