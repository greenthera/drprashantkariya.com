import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useCourses } from "../hooks/useCourses";

const GRAPHY_COURSES_URL = "https://drprashantkariya.graphy.com/courses";
const SKELETON_ROWS = [0, 1, 2, 3];

export default function CourseList() {
  const state = useCourses();

  return (
    <div className="bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
            Learn With Us
          </span>
          <h1
            className="font-display font-bold text-[#063322] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          >
            Our <span className="italic">Courses</span>
          </h1>
        </motion.div>

        <div aria-live="polite">
          {state.status === "loading" && (
            <div className="space-y-14 md:space-y-20 mb-16" aria-busy="true">
              <span className="sr-only">Loading courses…</span>
              {SKELETON_ROWS.map((i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-pulse"
                >
                  <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-[#E0E8E2]" />
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="h-6 w-2/3 rounded bg-[#E0E8E2] mx-auto md:mx-0" />
                    <div className="h-4 w-full rounded bg-[#E0E8E2]" />
                    <div className="h-4 w-5/6 rounded bg-[#E0E8E2] mx-auto md:mx-0" />
                    <div className="h-10 w-40 rounded-xl bg-[#E0E8E2] mx-auto md:mx-0" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {state.status === "error" && (
            <p className="text-center text-[#4A5E54] text-sm font-light mb-16">
              Unable to load courses right now. Please check back shortly.
            </p>
          )}

          {state.status === "success" && state.courses.length === 0 && (
            <p className="text-center text-[#4A5E54] text-sm font-light mb-16">
              No courses are available right now. Please check back shortly.
            </p>
          )}

          {state.status === "success" && state.courses.length > 0 && (
            <div className="flex flex-col gap-16 md:gap-20 mb-16">
              {state.courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65 }}
                  className={`flex flex-col items-center gap-8 md:gap-12 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-[#E0E8E2] shadow-[0_8px_30px_rgba(6,51,34,0.1)]">
                    <img
                      src={course.coverUrl}
                      alt={course.title}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#063322] mb-3 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-[#4A5E54] text-sm leading-relaxed font-light mb-6">
                      {course.description}
                    </p>
                    <a
                      href={course.courseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#0A4B38] text-[#F5E6C8] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#063322] hover:shadow-lg hover:shadow-[#063322]/20 hover:-translate-y-px transition-all duration-250"
                    >
                      Start Course <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <a
            href={GRAPHY_COURSES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#0A4B38] text-[#0A4B38] px-6 py-3 rounded-xl text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[#0A4B38] hover:text-[#F5E6C8] transition-all duration-250"
          >
            View All Courses <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
