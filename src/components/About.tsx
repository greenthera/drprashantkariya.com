import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import doctorImage from "../assets/doctorImage.png"
import { getYearsOfPractice } from "../lib/practice";

export default function About() {
  const yearsOfPractice = getYearsOfPractice();

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

        {/* LEFT: Images */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <div className="rounded-2xl overflow-hidden group shadow-sm">
            <img
              src={doctorImage}
              className="w-full h-full max-h-180 object-top object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Medical Professional"
            />
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              Excellence in Care
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
            Pediatrician &amp; <br />
            <span className="italic">Adolescent Health Expert.</span>
          </h2>

          <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed mb-8 max-w-xl font-light">
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
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              CREDENTIALS
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
            Qualifications
          </h2>

          <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed mb-8 max-w-xl font-light">
            Academic training and certifications spanning pediatric medicine, healthcare management, and global public health.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {credentials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="flex items-center gap-3 p-4 bg-[#FAF9F6] rounded-xl border border-[#E0E8E2] hover:border-[#D6DBF5] hover:bg-[#EAEDFB]/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <CheckCircle2 size={17} className="text-[#4353CF] shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[12px] font-semibold text-[#2E3A9E] uppercase tracking-tight">
                  {item.name}
                </p>
                <p className="text-[12px] text-[#2E3A9E] uppercase tracking-tight">
                  {item.title}
                </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Professional Journey */}
      <div className="max-w-[1400px] mx-auto pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              CAREER
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
            Professional Journey
          </h2>

          <p className="text-[#4F5A8A] text-base md:text-[17px] leading-relaxed mb-14 max-w-3xl font-light">
            Dr. Prashant Kariya has devoted his career to advancing pediatric and newborn healthcare
            through clinical excellence, medical education, and community service. His passion for
            education, innovation, and public health continues to shape better outcomes for children
            and families across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeyMilestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="border-t-[3px] border-[#F2B33D] pt-5"
              >
                <p className="italic text-[#C9972E] text-sm font-medium mb-2">{m.tag}</p>
                <p className="text-[#2E3A9E] font-semibold text-[15px] leading-snug">{m.role}</p>
                <p className="text-[#4F5A8A] text-[13px] leading-relaxed mt-2">{m.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission */}
      <div className="max-w-[1400px] mx-auto pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#EAEDFB] border border-[#D6DBF5] px-4 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
            <span className="text-[#4353CF] font-medium uppercase tracking-[0.22em] text-[10px]">
              PURPOSE
            </span>
          </div>

          <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight leading-[0.88] mb-10"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
            Mission
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="bg-[#4353CF] rounded-2xl p-7 relative overflow-hidden min-h-[140px]"
              >
                <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
                <span className="relative z-10 inline-flex w-7 h-7 rounded-full bg-[#F2B33D]/20 text-[#F2B33D] items-center justify-center mb-4">
                  <CheckCircle2 size={15} />
                </span>
                <p className="relative z-10 text-white/90 text-[14.5px] leading-relaxed">{mi}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
