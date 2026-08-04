import { ExternalLink } from "lucide-react";

const IG_URL = "https://www.instagram.com/parentingtips_drprashantkariya/";
const IG_HANDLE = "parentingtips_drprashantkariya";
const IG_EMBED_URL = `${IG_URL}embed`;

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
            <div className="w-11 h-11 bg-[#4353CF] rounded-xl flex items-center justify-center shadow-md shadow-[#2E3A9E]/15 shrink-0">
              <IGIcon size={18} className="text-[#F2B33D]" />
            </div>
            <div>
              <p className="font-display font-semibold italic text-[#2E3A9E] text-lg leading-tight">
                @{IG_HANDLE}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6670A0] mt-0.5">
                Latest from Instagram
              </p>
            </div>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#4353CF] text-[#F5E6C8] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250 shrink-0"
          >
            Follow <ExternalLink size={11} />
          </a>
        </div>

        {/* Live Instagram profile embed — big, centered, eye-catching */}
        <div className="relative w-full max-w-5xl mx-auto mb-8">
          <div className="absolute -inset-6 bg-linear-to-br from-[#4353CF]/10 via-[#F2B33D]/10 to-[#4353CF]/10 rounded-4xl blur-2xl pointer-events-none" />
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-2 border-dashed border-[#D6DBF5] pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#F2B33D]/15 pointer-events-none" />
          <iframe
            src={IG_EMBED_URL}
            title={`@${IG_HANDLE} Instagram feed`}
            scrolling="no"
            className="relative w-full h-101 sm:h-163 lg:h-189 border border-[#E0E8E2] rounded-2xl shadow-xl shadow-[#2E3A9E]/8 block overflow-hidden"
          />
        </div>

        {/* Quote / follow card — compact banner below */}
        <div className="bg-[#2E3A9E] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-[#F2B33D]/15 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#4353CF]/60 rounded-full pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <span className="font-display text-4xl text-[#F2B33D]/40 leading-none select-none shrink-0">"</span>
            <p className="font-display text-lg md:text-xl font-semibold italic text-white leading-snug max-w-xl">
              Children don't need perfect parents. They need present ones.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10 shrink-0 w-full md:w-auto">
            <span className="text-[#ABB3E0] text-[11px] font-medium tracking-wide hidden sm:block">@{IG_HANDLE}</span>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F2B33D] text-white px-5 py-2.5 rounded-lg text-[11px] font-semibold hover:bg-[#C28F31] transition-colors w-full md:w-auto text-center tracking-wide shrink-0"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
