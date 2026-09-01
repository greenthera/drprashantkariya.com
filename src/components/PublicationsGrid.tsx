import { ExternalLink, Search, X } from "lucide-react";
import { PublicationsData } from "../data/publications";
import { useState } from "react";
import { useImagesPreloaded } from "../hooks/useImagesPreloaded";

// Only a handful of icon graphics are actually reused across every
// publication card — preload those (not the live search-filtered list, which
// would re-trigger loading on every keystroke) so the grid never shows a
// title before its icon.
const uniqueImageSrcs = Array.from(new Set(PublicationsData.map((pub) => pub.image)));

export default function PublicationsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const { ready, loadedCount, total } = useImagesPreloaded(uniqueImageSrcs);

  const query = searchQuery.trim().toLowerCase();
  const filteredItems = query
    ? PublicationsData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.expert.toLowerCase().includes(query)
      )
    : PublicationsData;

  return (
    <div className="bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Research &amp; Academia
            </span>
            <h1
              className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Published <span className="italic">Research.</span>
            </h1>
          </div>
          <p className="text-[#4F5A8A] text-sm md:max-w-70 leading-relaxed font-light">
            Peer-reviewed articles, clinical studies, and academic contributions across pediatric
            and adolescent health.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10">
          <div className="relative w-full sm:max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8993CC] pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or publisher…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E0E8E2] pl-11 pr-10 py-3 rounded-xl text-[#2E3A9E] outline-none focus:border-[#4353CF] transition-all font-medium text-sm placeholder:text-[#B0BDB8] placeholder:font-normal"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8993CC] hover:text-[#4353CF] transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <p className="text-[#6670A0] text-xs font-medium uppercase tracking-[0.15em]">
            {filteredItems.length} {filteredItems.length === 1 ? "Result" : "Results"}
          </p>
        </div>

        {ready && filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[#E0E8E2] rounded-2xl">
            <p className="text-[#2E3A9E] font-display italic text-xl mb-2">No publications found</p>
            <p className="text-[#6670A0] text-sm font-light">Try a different title or publisher name.</p>
          </div>
        )}

        {ready ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((pub, i) => {
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col overflow-hidden"
                >
                  {/* "Image" — icon panel */}
                  <div className="relative bg-linear-to-br from-[#4353CF] to-[#2E3A9E] flex items-center justify-center overflow-hidden shrink-0">
                    <div className="relative z-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#F2B33D]/20 group-hover:scale-105 transition-all duration-300">
                      <img className="aspect-video" src={pub.image} alt={pub.title} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span title={pub.title} className="text-[16px] font-bold uppercase text-[#2E3A9E] line-clamp-3 mb-2.5">
                      {pub.title}
                    </span>
                    <h3 className="font-display text-[16px] text-[#4353CF] leading-snug mb-5 line-clamp-3 flex-1">
                      {pub.expert}
                    </h3>
                    <a
                      href={pub.buttonurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#4353CF] text-[#F5E6C8] px-4 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250 mt-auto"
                    >
                      Explore <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 py-32">
            <span className="w-10 h-10 rounded-full border-2 border-[#E0E8E2] border-t-[#4353CF] animate-spin" />
            <p className="font-display italic text-[#2E3A9E] text-sm">Loading publications…</p>
            <div className="w-56 h-1.5 rounded-full bg-[#E0E8E2] overflow-hidden">
              <div
                className="h-full bg-[#F2B33D] transition-all duration-200"
                style={{ width: `${total === 0 ? 0 : (loadedCount / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
