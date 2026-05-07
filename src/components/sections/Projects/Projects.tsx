import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { SPRING } from '@/lib/motion'
import { useSanityProjects } from '@/hooks/useSanityProjects'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function Projects() {
  const projects = useSanityProjects()

  return (
    <section className="py-[110px] pb-[90px]" id="work">
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: SPRING }}
        >
          <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-terracotta font-medium inline-flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-terracotta">
            Selected work
          </span>
          <h2
            className="font-display font-medium text-heading tracking-[-0.02em] leading-[1.05] mt-3.5"
            style={{
              fontSize: 'clamp(34px, 4.4vw, 52px)',
              fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            }}
          >
            A few things{' '}
            <em
              className="italic text-terracotta font-normal"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              I'm proud of.
            </em>
          </h2>
          <p className="max-w-[580px] text-[rgba(26,15,10,0.7)] mt-3.5 text-[17px]">
            Open-source bits and side projects, mostly. The day-job work I'm proudest of usually
            lives behind an SSO login.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-3 gap-6 max-[880px]:grid-cols-1 max-[880px]:gap-[18px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
