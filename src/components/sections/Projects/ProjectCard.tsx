import { motion, type Variants } from 'framer-motion'
import type { Project } from '@/types'
import { SPRING } from '@/lib/motion'

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08 4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08 4.24-4.24" />
  </svg>
)

const BoxIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22.08V12" />
  </svg>
)

const DocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
)

const ICONS = { 'mcp-loom': SunIcon, graphshelf: BoxIcon, 'retrieval-notes': DocIcon }

const item: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { ease: SPRING, duration: 0.7 } },
}

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = ICONS[project.id as keyof typeof ICONS] ?? SunIcon
  const isSage = project.iconVariant === 'sage'

  return (
    <motion.a
      variants={item}
      href={project.url}
      className="block bg-surface border border-oat rounded-[14px] p-7 relative overflow-hidden cursor-pointer no-underline group transition-[transform,box-shadow] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(61,43,31,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
    >
      {/* Terracotta top bar — wipes in on hover */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-terracotta scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />

      <div
        className={[
          'w-11 h-11 rounded-[10px] flex items-center justify-center mb-[22px]',
          isSage
            ? 'bg-[rgba(122,140,110,0.18)] text-sage'
            : 'bg-[rgba(196,101,42,0.12)] text-terracotta',
        ].join(' ')}
      >
        <Icon />
      </div>

      <h3
        className="font-display font-medium text-heading tracking-[-0.015em] text-[24px] m-0 mb-2.5"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {project.title}
      </h3>
      <p className="text-[rgba(26,15,10,0.72)] text-[15px] leading-[1.55] mb-5">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2 py-[3px] border border-oat text-[rgba(26,15,10,0.7)] rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
