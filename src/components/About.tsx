import { CheckCircle2, Star } from "lucide-react";
import { getYearsOfPractice } from "../lib/practice";
import { useInView } from "../hooks/useInView";
import DoctorAnimation from "./DoctorAnimation";

// Shared style for a scroll-triggered fade/slide-up reveal, applied via the
// useInView hook below in place of framer-motion's whileInView.
function revealStyle(visible: boolean, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.5s ${delay}s, transform 0.5s ${delay}s`,
  };
}

export default function About() {
  const yearsOfPractice = getYearsOfPractice();

  const [contentRef, contentVisible] = useInView<HTMLDivElement>();
  const [credentialsRef, credentialsVisible] = useInView<HTMLDivElement>();
  const [journeyRef, journeyVisible] = useInView<HTMLDivElement>();
  const [missionRef, missionVisible] = useInView<HTMLDivElement>();

  const credentials = [
    {
      name: "MBBS",
      title: "B.J. Medical College, Ahmedabad",
    },
    {
      name: "MD (Pediatrics)",
      title: "NHL Medical College, Ahmedabad",
    },
    {
      name: "FIAP",
      title: "Fellow of the Indian Academy of Pediatrics",
    },
    {
      name: "PGDHHM",
      title: "Post Graduate Diploma in Healthcare & Hospital Management",
    },
    {
      name: "PGCAP",
      title: "Post Graduate Certificate in Academic Practice, D Y Patil Medical College, Pune",
    },
    {
      name: "Certificate in Clinical Management of HIV in Children",
      title: "University of Washington",
    },
    {
      name: "Certificate in Global Adolescent Health",
      title: "University of Melbourne",
    },
  ];

  const journeyMilestones = [
    {
      tag: "Clinical",
      role: "Director, Param NICU & Children Hospital",
      detail: "Specialized care for newborns and children, mentoring the next generation of pediatricians.",
    },
    {
      tag: "Academic",
      role: "Professor & Head, Dept. of Pediatrics",
      detail: "Kiran Medical College, Surat — educating and shaping future medical students.",
    },
    {
      tag: "Leadership",
      role: "Indian Academy of Pediatrics & Rotary International",
      detail: "Leadership positions spearheading initiatives in child health and wellness.",
    },
    {
      tag: "Public Health",
      role: "Preventive Healthcare Advocate",
      detail: "CPR awareness, breastfeeding promotion, vaccination, and preventive healthcare.",
    },
  ];

  const missions = [
    "Deliver compassionate, evidence-based pediatric and newborn care.",
    "Empower parents through education, guidance, and preventive healthcare.",
    "Advance pediatric practice through teaching, research, and innovation.",
    "Promote healthier communities through public health initiatives and awareness programs.",
    "Harness technology and artificial intelligence to improve healthcare delivery, medical education, and patient outcomes.",
    "Inspire the next generation of healthcare professionals through mentorship and lifelong learning.",
  ];

  return (
    <section id="about" className="py-20 md:py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── RIGHT: Image ── */}
        <div className="order-1 lg:order-2 relative animate-[about-image-in_0.95s_ease-out_0.1s_backwards]">
          <style>{`
            @keyframes about-image-in {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
          {/* Animation */}
          <div className="h-80 sm:h-96 md:h-125 lg:h-140">
            <DoctorAnimation />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div ref={contentRef} style={revealStyle(contentVisible)} className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              Pediatrician & Adolescent Health Expert
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
            Dr. Prashant Kariya
          </h2>

          <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed mb-8 lg:max-w-xl font-light">
            <b className="font-semibold text-[#2E3A9E]">Dr. Prashant Kariya</b> is a pediatrician, neonatologist, educator, author, and public health advocate
            dedicated to improving the health and well-being of children. With over two decades of clinical,
            academic, and community experience, he combines evidence-based medicine with compassionate care.
            His work extends beyond the clinic through parenting education, medical training, research, and
            innovative healthcare initiatives, helping children receive the healthiest possible start in life.
          </p>

          {/* Emerald stat card */}
          <div className="col-span-2 bg-[#4353CF] text-white p-8 md:p-10 rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F2B33D]/10 rounded-full group-hover:scale-125 transition-transform duration-600 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/4 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="font-display text-6xl md:text-7xl font-bold italic text-[#F2B33D] leading-none">
                {yearsOfPractice}+
              </p>
              <p className="uppercase text-[10px] md:text-[11px] tracking-[0.3em] font-medium text-white/60 mt-3">
                Years of Clinical Mastery
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-16 md:pt-20">
        <div
          ref={credentialsRef}
          style={revealStyle(credentialsVisible)}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              CREDENTIALS
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
            Qualifications
          </h2>

          <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed mb-8 lg:max-w-xl font-light">
            Academic training and certifications spanning pediatric medicine, healthcare management, and global public health.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {credentials.map((item, i) => (
              <div
                key={i}
                style={revealStyle(credentialsVisible, i * 0.09)}
                className="flex items-center gap-3 p-4 bg-[#FAF9F6] rounded-xl border border-[#E0E8E2] hover:border-[#D6DBF5] hover:bg-[#EAEDFB]/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Star fill="currentColor" size={17} className="text-[#4353CF] shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[12px] font-semibold text-[#2E3A9E] uppercase tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-[12px] text-[#2E3A9E] uppercase tracking-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Journey */}
      <div className="max-w-[1400px] mx-auto pt-16 md:pt-20">
        <div ref={journeyRef} style={revealStyle(journeyVisible)}>
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              CAREER
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
            Professional Journey
          </h2>

          <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed mb-14 lg:max-w-3xl font-light">
            Dr. Prashant Kariya has devoted his career to advancing pediatric and newborn healthcare
            through clinical excellence, medical education, and community service. His passion for
            education, innovation, and public health continues to shape better outcomes for children
            and families across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeyMilestones.map((m, i) => (
              <div
                key={i}
                style={revealStyle(journeyVisible, i * 0.09)}
                className="border-t-[3px] border-[#F2B33D] pt-5"
              >
                <p className="italic text-[#C9972E] text-sm font-medium mb-2">{m.tag}</p>
                <p className="text-[#2E3A9E] font-semibold text-[15px] leading-snug">{m.role}</p>
                <p className="text-[#4F5A8A] text-[13px] leading-relaxed mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-[1400px] mx-auto pt-16 md:pt-20">
        <div ref={missionRef} style={revealStyle(missionVisible)}>
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              PURPOSE
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-10"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
            Mission
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mi, i) => (
              <div
                key={i}
                style={revealStyle(missionVisible, i * 0.07)}
                className="bg-[#4353CF] rounded-2xl p-7 relative overflow-hidden min-h-[140px]"
              >
                <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
                <span className="relative z-10 inline-flex w-7 h-7 rounded-full bg-[#F2B33D]/20 text-[#F2B33D] items-center justify-center mb-4">
                  <CheckCircle2 size={15} />
                </span>
                <p className="relative z-10 text-white/90 text-[14.5px] leading-relaxed">{mi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
