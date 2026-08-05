import { useEffect, useRef, useState } from "react";
import { ArrowRight, Diamond, Users, TrendingUp, CircleDot, Target, Heart, Activity, Sparkles, GraduationCap, X } from "lucide-react";
import doctorImage from "../assets/doctorImage.webp";
import doctorAvatar450 from "../assets/doctorImage-avatar-450.webp";
import doctorAvatar700 from "../assets/doctorImage-avatar-700.webp";
import doctorAvatar965 from "../assets/doctorImage-avatar-965.webp";
import { getYearsOfPractice } from "../lib/practice";
import { Link } from "react-router";

const STATS = [
  { icon: Diamond, color: "#F2B33D", value: "4.9", label: "Google Rating", duration: 5, delay: 0.7 },
  { icon: Users, color: "#4353CF", value: "20,000+", label: "Families Served", duration: 5.5, delay: 1.4 },
  { icon: TrendingUp, color: "#2F9E6E", value: `${getYearsOfPractice()}+`, label: "Years Experience", duration: 6, delay: 2.1 },
  { icon: CircleDot, color: "#F0784A", value: "Trusted", label: "by Thousands of Parents", duration: 6.5, delay: 2.8 },
];

// Duration/delay pairs mirror DoctorAnimation.tsx's da-float-b1..b4 CSS
// keyframes (5s/0.7s, 5.5s/1.4s, 6s/2.1s, 6.5s/2.8s) so both floating
// animations read as the same motion language across sections.
const BADGES = [
  { icon: Heart, color: "#F0784A", title: "Compassion", subtitle: "Care with Heart", pos: "top-6 -left-4 sm:-top-0 sm:left-5", duration: 5, delay: 0.7, showOnMobile: false },
  { icon: Users, color: "#2F9E6E", title: "20,000+", subtitle: "Families Served", pos: "top-[15%] -right-4 sm:-top-2 sm:-right-0 md:-right-8", duration: 5.5, delay: 1.4, showOnMobile: false },
  { icon: Activity, color: "#4353CF", title: "Level III NICU", subtitle: "Expertise", pos: "top-[70%] -left-4 sm:-left-14", duration: 6, delay: 2.1, showOnMobile: false },
  { icon: Sparkles, color: "#8B7CF0", title: "AI in", subtitle: "Healthcare", pos: "top-[48%] -right-4 sm:-right-14", duration: 6.5, delay: 2.8, showOnMobile: false },
  { icon: GraduationCap, color: "#F2B33D", title: "Medical", subtitle: "Educator", pos: "bottom-2 -right-2 sm:-right-6", duration: 7, delay: 3.5, showOnMobile: false },
];

export default function Hero() {
  const years = getYearsOfPractice();
  const [photoOpen, setPhotoOpen] = useState(false);

  // One-time scroll-triggered reveal for the Mission card, replacing
  // framer-motion's whileInView — plain IntersectionObserver, disconnects
  // after the first intersection since it should only ever run once.
  const missionRef = useRef<HTMLDivElement>(null);
  const [missionVisible, setMissionVisible] = useState(false);

  useEffect(() => {
    const el = missionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMissionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative bg-[#FAF9F6] overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: "radial-gradient(circle, #C7CCEE 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-40 -left-40 w-120 h-120 rounded-full bg-[#EAEDFB] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#EAEDFB]/60 pointer-events-none" />

      {/* Main grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center pt-28 pb-10 md:pt-30 md:pb-12 lg:pt-30 lg:pb-14">

        {/* ── LEFT ── */}
        <div className="order-2 lg:order-1 flex flex-col">
          <div className="flex items-center gap-2.5 mb-6 bg-white border border-[#D6DBF5] w-fit px-4 py-2.5 rounded-full shadow-sm">
            <span className="relative w-4 h-4 shrink-0">
              <span className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-[#4353CF]" />
              <span className="absolute left-1.5 top-0.5 w-2.5 h-2.5 rounded-full bg-[#F2B33D]" />
            </span>
            <span className="text-[#2E3A9E] font-medium text-[13px]">
              Pediatrician · Neonatologist · Medical Educator
            </span>
          </div>

          <h1
            className="font-display font-bold text-[#232323] leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
          >
            Nurturing <span className="italic text-[#4353CF]">Children.</span><br />
            Empowering <span className="italic text-[#4353CF]">Parents.</span><br />
            Transforming <span className="italic text-[#4353CF]">Pediatric Care.</span>
          </h1>

          {/* Gold rule */}
          <div className="w-14 h-px bg-[#F2B33D] mb-6" />

          <div className="mb-6">
            <h2 className="font-display font-bold text-[#232323] text-2xl mb-1">Dr. Prashant Kariya</h2>
            <p className="text-[#6670A0] text-sm mb-2">MD Pediatrics | FIAP | PGDHHM</p>
            <p className="text-[#4353CF] font-medium text-sm leading-relaxed">
              Pediatrician · Neonatologist · Medical Educator · Author
            </p>
            <p className="text-[#4353CF] font-medium text-sm">AI in Healthcare Enthusiast</p>
          </div>

          <p className="text-[#4F5A8A] text-base md:text-[17px] mb-8 leading-relaxed lg:max-w-lg font-light">
            Compassionate pediatric care backed by over{" "}
            <span className="font-semibold text-[#2E3A9E]">{years}+ years</span> of experience, trusted by
            more than <span className="font-semibold text-[#2E3A9E]">20,000+ families</span>. Combining
            clinical excellence, education, and innovation to help every child thrive.
          </p>

          <div className="mb-10">
            <Link
              to="/contact"
              className="flex items-center gap-1.5 w-fit bg-[#4353CF] text-[#F5E6C8] px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#2E3A9E] hover:shadow-lg hover:shadow-[#2E3A9E]/20 hover:-translate-y-px transition-all duration-200"
            >
              Meet Dr. Prashant Kariya <ArrowRight size={15} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#E0E8E2]">
            {STATS.map((s) => (
              <div
                style={{ animation: `state ${s.duration}s ease-in-out infinite`, animationDelay: `${s.delay}s` }}
                className="flex items-center gap-2.5"
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${s.color}1A` }}
                >
                  <s.icon size={15} style={{ color: s.color }} />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#232323] leading-tight">{s.value}</p>
                  <p className="text-[10px] font-medium text-[#6670A0] leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
            {/* Native CSS keyframe float — same technique as DoctorAnimation.tsx's
                da-float, which is smoother than a JS-driven framer-motion loop. */}
            <style>{`
              @keyframes state {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
              }
            `}</style>
          </div>

        </div>

        {/* ── RIGHT: Image ── */}
        <div className="order-1 lg:order-2 relative flex flex-col items-center">
          <div className="relative w-full max-w-90 sm:max-w-100 lg:max-w-140 aspect-square my-8 sm:my-12">
            {/* Native CSS keyframe float — same technique as DoctorAnimation.tsx's
                da-float, which is smoother than a JS-driven framer-motion loop. */}
            <style>{`
              @keyframes hero-badge-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-14px); }
              }
              @keyframes hero-badge-icon-flip {
                from { transform: rotateY(0deg); }
                to { transform: rotateY(360deg); }
              }
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>

            {/* Dashed ring */}
            <div
              style={{ animation: "spin 35s linear infinite" }}
              className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-dashed border-[#C7CCEE] pointer-events-none"
            />

            {/* Photo */}
            <button
              type="button"
              onClick={() => setPhotoOpen(true)}
              aria-label="View full photo of Dr. Prashant Kariya"
              className="absolute inset-0 rounded-full overflow-hidden shadow-md cursor-pointer"
            >
              <img
                src={doctorAvatar700}
                srcSet={`${doctorAvatar450} 450w, ${doctorAvatar700} 700w, ${doctorAvatar965} 965w`}
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 360px"
                fetchPriority="high"
                className="w-full h-full object-top object-cover"
                alt="Dr. Prashant Kariya"
              />
            </button>

            {/* Floating badges — sm and up only; mobile gets a static grid below the photo instead */}
            {BADGES.map((b, i) => (
              <div
                key={i}
                style={{ animation: `hero-badge-float ${b.duration}s ease-in-out infinite`, animationDelay: `${b.delay}s` }}
                className={`hidden sm:flex absolute ${b.pos} items-center gap-2.5 bg-white rounded-xl shadow-lg px-3.5 py-2.5 whitespace-nowrap group perspective-[400px]`}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${b.color}1A` }}
                >
                  <b.icon className="group-hover:animate-[hero-badge-icon-flip_4s_linear_infinite]" size={15} style={{ color: b.color }} />
                </span>
                <div>
                  <p className="text-[12.5px] font-bold text-[#232323] leading-tight">{b.title}</p>
                  <p className="text-[10.5px] text-[#6670A0] leading-tight">{b.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: badges shown as a static grid below the photo instead of floating */}
          <div className="sm:hidden grid grid-cols-2 gap-3 w-full max-w-90 mt-6">
            {BADGES.map((b, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 bg-white border border-[#E0E8E2] rounded-xl shadow-sm px-3.5 py-3 perspective-[400px]${i === BADGES.length - 1 && BADGES.length % 2 === 1
                  ? " col-span-2 mx-auto w-[calc(50%-0.375rem)]"
                  : ""
                  }`}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${b.color}1A` }}
                >
                  <b.icon className="animate-[hero-badge-icon-flip_4s_linear_infinite]" size={15} style={{ color: b.color }} />
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold text-[#232323] leading-tight truncate">{b.title}</p>
                  <p className="text-[10.5px] text-[#6670A0] leading-tight truncate">{b.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission card — full width */}
      <div
        ref={missionRef}
        style={{
          opacity: missionVisible ? 1 : 0,
          transform: missionVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-20 lg:pb-24"
      >
        <div className="bg-[#EDEBFB] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-4 md:gap-5">
          <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 text-[#4353CF]">
            <Target size={18} />
          </span>
          <div>
            <h3 className="font-display font-bold text-[#232323] text-base md:text-lg mb-1.5">Our Mission</h3>
            <p className="text-[#4F5A8A] text-sm md:text-[15px] leading-relaxed font-light">
              To nurture healthier children, empower parents with trusted knowledge, and advance
              pediatric care through compassion, education, innovation, and community service.
            </p>
          </div>
        </div>
      </div>

      {/* Full photo lightbox */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-8 sm:p-6 animate-[lightbox-backdrop-in_0.2s_ease-out]"
          onClick={() => setPhotoOpen(false)}
        >
          <style>{`
            @keyframes lightbox-backdrop-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes lightbox-card-in {
              from { opacity: 0; transform: translateY(16px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          <div
            className="relative inline-block max-w-full animate-[lightbox-card-in_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
              <button
                onClick={() => setPhotoOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#2E3A9E] shadow-lg hover:bg-[#EAEDFB] transition-colors"
              >
                <X size={18} />
              </button>
              <img
                src={doctorImage}
                alt="Dr. Prashant Kariya"
                className="block max-w-full max-h-[60vh] sm:max-h-[85vh] md:max-h-[92vh] object-contain rounded-2xl shadow-2xl"
              />
          </div>
        </div>
      )}
    </section>
  );
}
