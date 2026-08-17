import { useMemo, useState } from "react";
import {
  Search,
  X,
  FileText,
  ExternalLink,
  Heart,
  Syringe,
  Brain,
  TrendingUp,
  UserRound,
  Thermometer,
  Apple,
  Baby,
  HeartPulse,
  Activity,
  Stethoscope,
  Droplet,
  Zap,
  Wind,
  Filter,
  type LucideIcon,
} from "lucide-react";
import guidelinesData from "../data/parental-guidelines.json";
import iapLogo from "../assets/iap-logo.webp";

type Guideline = { category: string; title: string; url: string };

const REF_PARAM = "ref=drprashantkariya.com";

function withRef(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}${REF_PARAM}`;
}

// Cycled per category — same rotation used for Hero's floating badges, so
// this page reads as the same visual system as the rest of the site.
const ACCENTS = ["#4353CF", "#2F9E6E", "#F0784A", "#8B7CF0", "#F2B33D"];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "How To Take Care of My Child": Heart,
  "Preventing Diseases by Immunization": Syringe,
  "Behavioral and Developmental Issues": Brain,
  "Is My Child Growing Well?": TrendingUp,
  "Understanding My Adolescent Child": UserRound,
  Infections: Thermometer,
  Nutrition: Apple,
  "Newborn Infants": Baby,
  "Cardiovascular Disorders": HeartPulse,
  "Endocrinologic Disorders": Activity,
  "Gastro-Intestinal Disorders": Stethoscope,
  "Hematological Disorders": Droplet,
  "Nervous System Disorders": Zap,
  "Respiratory Disorders": Wind,
  "Renal Disorders": Filter,
  Miscellaneous: FileText,
};

export default function ParentalGuidelineGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredItems: Guideline[] = query
    ? guidelinesData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
    : guidelinesData;

  const categories = useMemo(() => {
    const map = new Map<string, Guideline[]>();
    for (const item of filteredItems) {
      const list = map.get(item.category);
      if (list) list.push(item);
      else map.set(item.category, [item]);
    }
    return [...map.entries()];
  }, [filteredItems]);

  return (
    <div className="relative bg-[#FAF9F6] overflow-hidden pt-24 md:pt-32 pb-20 px-6 md:px-10">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: "radial-gradient(circle, #C7CCEE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full bg-[#EAEDFB] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              For Parents
            </span>
            <h1
              className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Parental <span className="italic">Guidelines.</span>
            </h1>
          </div>
          <p className="text-[#4F5A8A] text-sm md:max-w-70 leading-relaxed font-light">
            IAP-authored guides on child health, nutrition, and development —
            organized by topic for quick reference.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10">
          <div className="relative w-full sm:max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8993CC] pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or topic…"
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
            {filteredItems.length} {filteredItems.length === 1 ? "Guideline" : "Guidelines"}
          </p>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[#E0E8E2] rounded-2xl bg-white/60">
            <p className="text-[#2E3A9E] font-display italic text-xl mb-2">No guidelines found</p>
            <p className="text-[#6670A0] text-sm font-light">Try a different title or topic name.</p>
          </div>
        )}

        <div className="flex flex-col gap-14">
          {categories.map(([category, items], catIndex) => {
            const accent = ACCENTS[catIndex % ACCENTS.length];
            const Icon = CATEGORY_ICONS[category] ?? FileText;
            return (
              <div key={category}>
                <div className="flex items-center gap-3.5 mb-5">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}1A` }}
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-bold italic text-[#2E3A9E] leading-tight">
                    {category}
                  </h2>
                  <span className="text-[#6670A0] text-[11px] font-semibold uppercase tracking-[0.15em] bg-white border border-[#E0E8E2] px-2.5 py-1 rounded-full shrink-0">
                    {items.length}
                  </span>
                  <div className="flex-1 h-px bg-[#E0E8E2]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((item) => (
                    <div
                      key={item.url}
                      className="flex flex-col p-5 bg-white rounded-2xl border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: `${accent}1A` }}
                      >
                        <FileText size={20} style={{ color: accent }} />
                      </span>
                      <h3 className="text-[#2E3A9E] text-[15px] font-semibold leading-snug mb-5 flex-1">
                        {item.title}
                      </h3>
                      <a
                        href={withRef(item.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#4353CF] text-[#F5E6C8] px-4 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-250"
                      >
                        <ExternalLink size={12} /> View PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Source attribution */}
        <div className="mt-16 bg-[#EDEBFB] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5 md:gap-6">
          <span className="h-16 px-4 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <img src={iapLogo} alt="Indian Academy of Pediatrics logo" className="h-9 w-auto object-contain" />
          </span>
          <div>
            <h3 className="font-display font-bold text-[#232323] text-base md:text-lg mb-1.5">
              Indian Academy of Pediatrics (IAP)
            </h3>
            <p className="text-[#4F5A8A] text-sm md:text-[15px] leading-relaxed font-light">
              These guidelines are authored and published by the Indian Academy of Pediatrics,
              the national professional association of pediatricians in India, and are shared
              here for parents' quick reference.{" "}
              <a
                href={withRef("https://iapindia.org/index.php")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4353CF] font-semibold hover:underline"
              >
                View the original source at iapindia.org →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
