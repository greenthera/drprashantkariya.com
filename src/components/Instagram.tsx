import { ExternalLink } from "lucide-react";

const WIDGET_ID = import.meta.env.VITE_LIGHTWIDGET_ID as string | undefined;
const IG_URL = "https://www.instagram.com/parentingtips_drprashantkariya/";
const IG_HANDLE = "parentingtips_drprashantkariya";

function IGIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Instagram() {
  return (
    <section className="py-10 md:py-20 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-[#0A4B38] rounded-xl flex items-center justify-center shadow-md shadow-[#063322]/15 shrink-0">
              <IGIcon size={18} className="text-[#C4973A]" />
            </div>
            <div>
              <p className="font-display font-semibold italic text-[#063322] text-lg leading-tight">
                @{IG_HANDLE}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6B7B6A] mt-0.5">
                Latest from Instagram
              </p>
            </div>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0A4B38] text-[#F5E6C8] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#063322] hover:shadow-lg hover:shadow-[#063322]/20 hover:-translate-y-px transition-all duration-250 shrink-0"
          >
            Follow <ExternalLink size={11} />
          </a>
        </div>

        {/* Widget */}
        {WIDGET_ID ? (
          <div className="rounded-2xl overflow-hidden border border-[#E0E8E2]">
            <iframe
              src={`//lightwidget.com/widgets/${WIDGET_ID}.html`}
              allowTransparency={true}
              className="lightwidget-widget w-full border-0"
              style={{ display: "block", overflow: "hidden" }}
            />
          </div>
        ) : (
          /* Fallback until widget ID is set */
          <div className="bg-[#FAF9F6] rounded-2xl p-3 md:p-4 min-h-[500px] lg:h-[580px] grid grid-cols-2 md:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-4 border border-[#E0E8E2]">
            <div className="col-span-2 row-span-1 lg:row-span-2 rounded-xl overflow-hidden h-72 md:h-96 lg:h-auto group">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Pediatric Care" />
            </div>
            <div className="hidden sm:block rounded-xl overflow-hidden bg-[#E8F4EE] group">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="NICU Setup" />
            </div>
            <div className="hidden sm:block rounded-xl overflow-hidden bg-[#E8F4EE] group">
              <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Medical Equipment" />
            </div>
            <div className="col-span-2 bg-[#063322] rounded-xl p-7 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[200px] lg:min-h-0">
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-[#C4973A]/15 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0A4B38]/60 rounded-full pointer-events-none" />
              <div className="font-display text-6xl text-[#C4973A]/30 leading-none mb-2 relative z-10 select-none">"</div>
              <p className="font-display text-lg md:text-xl font-semibold italic text-white leading-snug relative z-10 max-w-xs -mt-4">
                Children don't need perfect parents. They need present ones.
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10 pt-5 border-t border-white/8 mt-4">
                <span className="text-[#A8C5BB] text-[11px] font-medium tracking-wide">@{IG_HANDLE}</span>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer"
                  className="bg-[#C4973A] text-white px-5 py-2 rounded-lg text-[11px] font-semibold hover:bg-[#B8893A] transition-colors w-full sm:w-auto text-center tracking-wide">
                  Follow
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
