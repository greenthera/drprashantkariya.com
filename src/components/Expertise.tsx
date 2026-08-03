import { motion } from "framer-motion";
import {
  Baby,
  Activity,
  Stethoscope,
  Syringe,
  ChartColumnIncreasing,
  UserRound,
  MessageCircleHeart,
} from "lucide-react";

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 md:py-24 px-4 sm:px-6 md:px-10 bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
        >
          <div>
            <span className="text-[#F2B33D] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Our Specializations
            </span>
            <h2 className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              Specialized <span className="italic">Services</span>
            </h2>
          </div>
          <p className="text-[#4F5A8A] text-sm md:max-w-xs leading-relaxed font-light">
            Advanced care across seven critical paediatric disciplines.
          </p>
        </motion.div>

        {/* Bento Grid: Highly Responsive Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">

          {/* 1. Newborn Care — Tall dark featured card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:row-span-2 bg-[#4353CF] text-white rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group shadow-md shadow-[#4353CF]/10"
          >
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full border border-[#F2B33D]/10 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full border border-[#F2B33D]/8 pointer-events-none" />
            
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] sm:text-[8rem] md:text-[9rem] leading-none font-bold text-white/5 select-none pointer-events-none translate-x-2 translate-y-4">
              01
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#F2B33D]/15 rounded-xl flex items-center justify-center mb-7 group-hover:bg-[#F2B33D]/25 transition-colors duration-300">
                <Baby size={22} className="text-[#F2B33D]" />
              </div>
              <h3 className="font-display font-bold italic text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                Newborn Care
              </h3>
              <p className="text-white/75 text-sm leading-relaxed font-light">
                Comprehensive care for newborns from birth through the first month of life, including feeding
                support, jaundice management, newborn screening, weight monitoring, breastfeeding
                guidance, infection prevention, and routine health assessments to ensure a healthy start.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2B33D]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2B33D]">
                Primary Expertise
              </span>
            </div>
          </motion.div>

          {/* 2. NICU — Wide horizontal card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col sm:flex-row items-start gap-6"
          >
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] md:text-[8rem] leading-none font-bold text-[#2E3A9E]/4 select-none pointer-events-none translate-x-1 translate-y-2">
              02
            </div>
            <div className="w-12 h-12 bg-[#EAEDFB] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 mt-1 relative z-10">
              <Activity size={22} className="text-[#4353CF]" />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
                NICU (Neonatal Intensive Care Unit)
              </h3>
              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light max-w-md">
                Advanced, evidence-based intensive care for premature, low birth weight, and critically ill
                newborns. Services include neonatal ventilation, CPAP support, surfactant therapy, infection
                management, nutritional care, and family-centered developmental care.
              </p>
            </div>
          </motion.div>

          {/* 3. Child Health */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] leading-none font-bold text-[#2E3A9E]/4 select-none pointer-events-none translate-x-1 translate-y-2">
              03
            </div>
            <div className="relative z-10">
              <div className="w-11 h-11 bg-[#EAEDFB] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Stethoscope size={20} className="text-[#4353CF]" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
                Child Health
              </h3>
              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light">
                Complete healthcare services for infants, children, and adolescents, including diagnosis and
                treatment of common and complex illnesses, nutritional guidance, preventive care, chronic
                disease management, and routine wellness examinations.
              </p>
            </div>
          </motion.div>

          {/* 4. Vaccination */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] leading-none font-bold text-[#2E3A9E]/4 select-none pointer-events-none translate-x-1 translate-y-2">
              04
            </div>
            <div className="relative z-10">
              <div className="w-11 h-11 bg-[#EAEDFB] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Syringe size={20} className="text-[#4353CF]" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
                Vaccination
              </h3>
              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light">
                Comprehensive immunization services following the latest National Immunization Schedule
                and Indian Academy of Pediatrics (IAP) recommendations. Personalized vaccine
                counselling, catch-up schedules, travel vaccinations, and digital vaccination records are also
                provided.
              </p>
            </div>
          </motion.div>

          {/* 5. Growth & Development — Wide horizontal card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="md:col-span-2 lg:col-span-2 bg-white lg:bg-[#EAEDFB] rounded-2xl p-6 sm:p-8 border border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col sm:flex-row items-start gap-6"
          >
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] md:text-[8rem] leading-none font-bold text-[#4353CF]/8 select-none pointer-events-none translate-x-1 translate-y-2">
              05
            </div>
            <div className="w-12 h-12 bg-[#EAEDFB] lg:bg-[#4353CF] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 mt-1 shadow-md shadow-[#2E3A9E]/15 relative z-10">
              <ChartColumnIncreasing size={22} className="text-[#4353CF] lg:text-[#F2B33D]" />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
                Growth & Development
              </h3>
              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light max-w-md">
                Regular monitoring of physical growth, developmental milestones, nutrition, behavior, and
                learning abilities. Early identification and referral for developmental delays, autism spectrum
                disorders, ADHD, speech concerns, and other developmental challenges.
              </p>
            </div>
          </motion.div>

          {/* 6. Adolescent Health */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] leading-none font-bold text-[#2E3A9E]/4 select-none pointer-events-none translate-x-1 translate-y-2">
              06
            </div>
            <div className="relative z-10">
              <div className="w-11 h-11 bg-[#EAEDFB] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <UserRound size={20} className="text-[#4353CF]" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
                Adolescent Health
              </h3>
              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light">
                Confidential, age-appropriate healthcare for teenagers focusing on physical growth, puberty,
                nutrition, emotional well-being, menstrual health, lifestyle disorders, digital wellness, mental
                health, and preventive care to support a healthy transition into adulthood.
              </p>
            </div>
          </motion.div>

          {/* 7. Counselling Consultations — Spans nicely on bottom rows */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.33 }}
            className="md:col-span-1 lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Number Fixed to Bottom Right */}
            <div className="absolute bottom-0 right-0 font-display text-[7rem] md:text-[8rem] leading-none font-bold text-[#2E3A9E]/4 select-none pointer-events-none translate-x-1 translate-y-2">
              07
            </div>
            <div className="relative z-10">
              <div className="w-11 h-11 bg-[#EAEDFB] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <MessageCircleHeart size={20} className="text-[#4353CF]" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
                Counselling Consultations
              </h3>
              <p className="text-[#4F5A8A] text-sm leading-relaxed font-light max-w-5xl">
                Personalized consultations designed to support families beyond medical treatment. Services
                include newborn and parenting counselling, breastfeeding support, nutrition advice, sleep
                and behavior guidance, developmental counselling, adolescent counselling, screen-time
                management, academic concerns, and preventive health planning—helping families make
                informed decisions with confidence.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}