import { motion } from 'framer-motion'
import type { TimelineEntry } from '@/types'
import { SPRING, SPRING_BOUNCE } from '@/lib/motion'

interface Props {
  readonly entry: TimelineEntry
  readonly index: number
}

export default function TimelineItem({ entry, index }: Props) {
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      className="grid grid-cols-[180px_1fr] gap-10 py-8 border-t border-oat last:border-b max-[720px]:grid-cols-1 max-[720px]:gap-2"
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.12 }}
      transition={{ duration: 0.7, ease: SPRING }}
    >
      <motion.div
        className="font-mono text-[13px] text-[rgba(26,15,10,0.6)] tracking-[0.04em] pt-1 inline-block"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: SPRING_BOUNCE }}
      >
        {entry.dateRange}
      </motion.div>

      <div>
        <h3
          className="font-display font-medium text-heading tracking-[-0.015em] text-[26px] m-0 mb-1 max-[720px]:text-[22px]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {entry.role}
        </h3>
        <p className="text-[15px] text-terracotta font-medium mb-3">
          {entry.company}
          <span className="text-oat mx-2">·</span>
          <span className="text-[rgba(26,15,10,0.55)] font-normal">{entry.location}</span>
        </p>
        <p className="text-[rgba(26,15,10,0.75)] max-w-[640px] m-0">{entry.description}</p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-[rgba(26,15,10,0.6)] px-2 py-[3px] bg-[rgba(212,197,169,0.3)] rounded tracking-[0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
