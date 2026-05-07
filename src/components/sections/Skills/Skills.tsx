import { motion, type Variants } from 'framer-motion'
import Chip from '@/components/ui/Chip/Chip'
import { SPRING } from '@/lib/motion'

const PRIMARY_SKILLS = ['Agentic AI Development', 'Model Context Protocol', 'LangGraph', 'RAG']

const SECONDARY_SKILLS = [
  'LangChain',
  'LLMOps',
  'Go',
  'TypeScript',
  'Python',
  'NestJS',
  'Milvus',
  'Event-Driven Programming',
  'Kubernetes',
  'CI/CD',
  'Harness',
  'RedHat',
  'RedHat AI',
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SPRING } },
}

export default function Skills() {
  return (
    <section className="py-[90px]" id="about">
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: SPRING }}
        >
          <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-terracotta font-medium inline-flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-terracotta">
            The toolkit
          </span>
          <h2
            className="font-display font-medium text-heading tracking-[-0.02em] leading-[1.05] mt-3.5 mb-0"
            style={{
              fontSize: 'clamp(34px, 4.4vw, 52px)',
              fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            }}
          >
            Things I reach for,{' '}
            <em
              className="italic text-terracotta font-normal"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              most days.
            </em>
          </h2>
          <p className="max-w-[580px] text-[rgba(26,15,10,0.7)] mt-3.5 text-[17px]">
            A working stack — not a wishlist. Filled chips are my deep-end specialisms; the rest is
            everything I've shipped to production at some point.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap gap-2.5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {PRIMARY_SKILLS.map((skill) => (
            <motion.span key={skill} variants={item}>
              <Chip primary>{skill}</Chip>
            </motion.span>
          ))}
          {SECONDARY_SKILLS.map((skill) => (
            <motion.span key={skill} variants={item}>
              <Chip>{skill}</Chip>
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="mt-7 text-[13px] text-[rgba(26,15,10,0.55)] flex items-center gap-2 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-terracotta inline-block" /> Primary
          specialism
        </motion.p>
      </div>
    </section>
  )
}
