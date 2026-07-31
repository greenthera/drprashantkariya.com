import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useCourses } from "../hooks/useCourses";
import { GRAPHY_BASE_URL, MAX_COURSES, type Course } from "../lib/courses";

const GRAPHY_COURSES_URL = `${GRAPHY_BASE_URL}/courses`;

function ordinal(i: number): string {
  return String(i + 1).padStart(2, "0");
}

function FeaturedCard({ course }: { course: Course }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="bg-[#4353CF] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden group flex flex-col sm:flex-row items-center gap-8 md:gap-10"
    >
      <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full border border-[#C4973A]/10 pointer-events-none" />
      <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full border border-[#C4973A]/8 pointer-events-none" />
      <div className="absolute bottom-0 right-0 font-display text-[9rem] leading-none font-bold text-white/4 select-none pointer-events-none translate-x-2 translate-y-4">
        {ordinal(0)}
      </div>

      <div className="w-full sm:w-2/5 shrink-0 relative z-10 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <img
          src={course.coverUrl}
          alt={course.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="relative z-10 text-center sm:text-left">
        <span className="text-[#C4973A] font-semibold uppercase tracking-[0.2em] text-[10px] block mb-3">
          Latest Course
        </span>
        <h3 className="font-display font-bold italic text-white leading-tight mb-4"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
          {course.title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed font-light mb-7 max-w-md">
          {course.description}
        </p>
        <a
          href={course.courseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#C4973A] text-[#2E3A9E] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#DDB35C] hover:-translate-y-px transition-all duration-250"
        >
          Start Course <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

function SupportingCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className="flex-1 min-w-[260px] bg-white rounded-2xl p-6 border border-[#E0E8E2] hover:border-[#D6DBF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-2 font-display text-[6rem] leading-none font-bold text-[#2E3A9E]/4 select-none pointer-events-none -translate-y-2">
        {ordinal(index + 1)}
      </div>

      <div className="relative z-10 rounded-xl overflow-hidden mb-5">
        <img
          src={course.coverUrl}
          alt={course.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="relative z-10">
        <h3 className="font-display text-xl font-bold italic text-[#2E3A9E] mb-2 leading-tight">
          {course.title}
        </h3>
        <p className="text-[#4F5A8A] text-sm leading-relaxed font-light mb-5">
          {course.description}
        </p>
        <a
          href={course.courseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#4353CF] text-[#F5E6C8] px-4 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.15em] hover:bg-[#2E3A9E] transition-all duration-250"
        >
          Start Course <ExternalLink size={11} />
        </a>
      </div>
    </motion.div>
  );
}

function BentoSkeleton() {
  return (
    <div className="space-y-5 animate-pulse" aria-busy="true">
      <span className="sr-only">Loading courses…</span>
      <div className="rounded-2xl bg-[#E0E8E2] h-64 md:h-72" />
      <div className="flex flex-col md:flex-row gap-5">
        {Array.from({ length: MAX_COURSES - 1 }, (_, i) => i).map((i) => (
          <div key={i} className="flex-1 min-w-[260px] rounded-2xl bg-[#E0E8E2] h-72" />
        ))}
      </div>
    </div>
  );
}

export default function CourseList() {
  const state = useCourses();

  return (
    <div className="bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
        >
          <div>
            <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
              Learn With Us
            </span>
            <h1
              className="font-display font-bold text-[#2E3A9E] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            >
              Our <span className="italic">Courses</span>
            </h1>
          </div>
          <p className="text-[#4F5A8A] text-sm max-w-60 leading-relaxed font-light">
            Practical courses on parenting, safety, and clinical skill-building.
          </p>
        </motion.div>

        <div aria-live="polite">
          {state.status === "loading" && <BentoSkeleton />}

          {state.status === "error" && (
            <p className="text-center text-[#4F5A8A] text-sm font-light mb-16">
              Unable to load courses right now. Please check back shortly.
            </p>
          )}

          {state.status === "success" && state.courses.length === 0 && (
            <p className="text-center text-[#4F5A8A] text-sm font-light mb-16">
              No courses are available right now. Please check back shortly.
            </p>
          )}

          {state.status === "success" && state.courses.length > 0 && (
            <div className="flex flex-col gap-5">
              <FeaturedCard course={state.courses[0]} />
              {state.courses.length > 1 && (
                <div className="flex flex-col md:flex-row gap-5">
                  {state.courses.slice(1).map((course, i) => (
                    <SupportingCard key={course.id} course={course} index={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-16">
          <a
            href={GRAPHY_COURSES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#4353CF] text-[#4353CF] px-6 py-3 rounded-xl text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[#4353CF] hover:text-[#F5E6C8] transition-all duration-250"
          >
            View All Courses <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
