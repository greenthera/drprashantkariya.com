import { ExternalLink } from "lucide-react";

export default function Publications() {
  const books = [
    {
      title: "Not Just A Daughter",
      desc: "A reflection on parenting and understanding the modern daughter.",
      color: "bg-gradient-to-br from-blue-700 to-blue-900",
      link: "https://amzn.in/d/4xOaL5B"
    },
    {
      title: "Not Just A Son",
      desc: "Empathy, discipline, and awareness in raising the next generation.",
      color: "bg-gradient-to-br from-slate-800 to-black",
      link: "https://amzn.in/d/bZR0MMH"
    }
  ];

  return (
    <section id="publication" className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 rounded-[2.5rem] md:rounded-[5rem] mx-2 md:mx-4 shadow-2xl overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Scaling */}
        <div className="mb-12 md:mb-20 text-center">
          <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">Author & Speaker</span>
          <h2 className="text-4xl md:text-6xl font-[900] text-white tracking-tighter uppercase mt-4 italic">
            The <span className="text-blue-500">Archive</span>
          </h2>
        </div>

        {/* Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {books.map((book, i) => (
            <div 
              key={i} 
              className="bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 lg:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 group hover:bg-white/[0.08] transition-all"
            >
              {/* Responsive Book Cover */}
              <div className={`${book.color} w-32 h-44 md:w-40 md:h-56 rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] shrink-0 flex items-center justify-center p-4 md:p-6 text-center text-white font-[900] text-xs md:text-sm italic group-hover:scale-105 transition-transform duration-500 border border-white/10`}>
                {book.title}
              </div>

              <div className="flex flex-col justify-center text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-[900] text-white uppercase tracking-tighter mb-3 md:mb-4 leading-none">
                  {book.title}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-xs mx-auto md:mx-0">
                  {book.desc}
                </p>
                <a 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-3 text-blue-400 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:text-white transition-colors"
                >
                  Buy on Amazon <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}