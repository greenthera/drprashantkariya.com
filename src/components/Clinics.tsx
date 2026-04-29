import { MapPin, Phone, ArrowRight } from "lucide-react";

export default function Clinics() {
  const locations = [
    {
      name: "Param NICU & Children Hospital",
      tag: "Level III NICU Specialist",
      address: "801-803, Param Doctor House, Lal Darwaja, Surat",
      phone: "(0261) 2492411",
      bg: "bg-blue-50"
    },
    {
      name: "Param Children Hospital",
      tag: "General Pediatrics",
      address: "305-306, Seven Square, Majura Gate, Surat",
      phone: "+91 97270 08881",
      bg: "bg-slate-50"
    }
  ];

  return (
    <section id="clinics" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header: Stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[900] tracking-tighter uppercase italic text-slate-900 leading-none">
            Our <span className="text-blue-600">Centers.</span>
          </h2>
          <p className="text-slate-400 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] max-w-[200px]">
            Providing critical care across two prime locations in Surat.
          </p>
        </div>

        {/* Grid: 1 column on mobile/tablet, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {locations.map((loc, i) => (
            <div 
              key={i} 
              className={`${loc.bg} rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[400px] md:min-h-[450px] border border-transparent hover:border-blue-200 transition-all group`}
            >
              <div>
                <span className="bg-white px-4 md:px-5 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm inline-block">
                  {loc.tag}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-[900] text-slate-900 mt-8 md:mt-10 mb-4 md:mb-6 uppercase tracking-tighter leading-tight">
                  {loc.name}
                </h3>
                
                <div className="flex items-start gap-3 text-slate-500 max-w-sm mb-8">
                  <MapPin size={18} className="text-blue-600 shrink-0 mt-1 md:w-5 md:h-5" />
                  <p className="font-bold text-base md:text-lg leading-relaxed uppercase tracking-tighter">
                    {loc.address}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Stacks phone and button on very small screens */}
              <div className="flex flex-row justify-between items-center gap-4 pt-8 md:pt-10 border-t border-black/5">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl items-center justify-center shadow-sm">
                    <Phone size={18} className="text-blue-600 md:w-5 md:h-5" />
                  </div>
                  <p className="text-xl md:text-2xl font-[900] text-slate-900 tracking-tighter">
                    {loc.phone}
                  </p>
                </div>
                
                <button className="bg-slate-900 text-white p-4 md:p-5 rounded-xl md:rounded-2xl group-hover:bg-blue-600 transition-colors shrink-0">
                  <ArrowRight size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}