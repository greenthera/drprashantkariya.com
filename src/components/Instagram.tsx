export default function Instagram() {
  return (
    <section className="py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] p-3 md:p-4 min-h-[500px] lg:h-[600px] grid grid-cols-2 md:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-4">
        
        {/* Main Feature Image: Full width on mobile, half on desktop */}
        <div className="col-span-2 row-span-1 lg:row-span-2 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden h-[300px] md:h-[400px] lg:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            alt="Pediatric Care"
          />
        </div>

        {/* Small Image 1: Hidden on smallest mobile, visible from tablet up */}
        <div className="hidden sm:block rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100">
           <img 
            src="https://images.unsplash.com/photo-1551076805-e1869033e561" 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
            alt="NICU Setup"
           />
        </div>

        {/* Small Image 2: Hidden on smallest mobile, visible from tablet up */}
        <div className="hidden sm:block rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100">
           <img 
            src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7" 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
            alt="Medical Equipment"
           />
        </div>

        {/* Quote Card: Full width on mobile, spans 2 cols on desktop */}
        <div className="col-span-2 bg-blue-600 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden group min-h-[250px] lg:min-h-0">
          {/* Decorative background element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />

          <p className="text-2xl md:text-3xl font-[900] italic tracking-tighter leading-tight relative z-10">
            “Children don’t need perfect parents. They need present ones.”
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 uppercase tracking-[0.2em] font-black text-[8px] md:text-[10px] relative z-10 pt-6">
            <span className="opacity-80">@drprashantkariya</span>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20 w-full sm:w-auto">
              Follow
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}