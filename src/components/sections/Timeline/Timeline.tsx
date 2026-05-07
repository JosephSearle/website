import { motion } from 'framer-motion'
import { timeline } from '@/data/timeline'
import TimelineItem from './TimelineItem'
import { SPRING } from '@/lib/motion'

export default function Timeline() {
  return (
    <section
      className="py-[90px]"
      style={{
        background:
          'linear-gradient(180deg, transparent, rgba(237,230,214,0.4) 30%, rgba(237,230,214,0.4) 70%, transparent)',
      }}
    >
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: SPRING }}
        >
          <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-terracotta font-medium inline-flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-terracotta">
            Curriculum
          </span>
          <h2
            className="font-display font-medium text-heading tracking-[-0.02em] leading-[1.05] mt-3.5"
            style={{
              fontSize: 'clamp(34px, 4.4vw, 52px)',
              fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            }}
          >
            Where I've spent{' '}
            <em
              className="italic text-terracotta font-normal"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              my hours.
            </em>
          </h2>
        </motion.div>

        <div className="mt-14">
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
