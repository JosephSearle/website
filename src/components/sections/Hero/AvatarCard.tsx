import { useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { SPRING } from '@/lib/motion'

const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 6, ease: 'easeInOut' as const, repeat: Infinity },
  },
}

export default function AvatarCard() {
  const shouldReduceMotion = useReducedMotion()
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      data-testid="avatar-flip-card"
      variants={shouldReduceMotion ? undefined : floatVariants}
      animate="animate"
      className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 rounded-[18px]"
      style={{ perspective: 1400 }}
      tabIndex={0}
      aria-label="About Joseph Searle — activate to reveal personal details"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ rotate: 1.5 }}
        animate={{
          rotateY: shouldReduceMotion ? 0 : flipped ? 180 : 0,
          scale: flipped ? 1.03 : 1,
          rotate: flipped ? 0 : 1.5,
        }}
        transition={{ duration: 0.7, ease: SPRING }}
      >
        {/* Front face */}
        <div
          className="relative bg-surface border border-oat rounded-[18px] p-[18px]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          {/* Availability pill */}
          <div className="absolute top-[-10px] right-[18px] bg-bg border border-oat px-3 py-1.5 rounded-full text-xs font-medium text-heading flex items-center gap-2 shadow-sm">
            <span
              className="relative inline-block w-[9px] h-[9px] rounded-full bg-terracotta"
              aria-hidden="true"
            />
            Open to work
          </div>

          {/* Avatar photo placeholder */}
          <div
            className="aspect-[4/5] rounded-[10px] relative overflow-hidden flex items-center justify-center"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(196,101,42,0.25), transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(122,140,110,0.3), transparent 60%), linear-gradient(135deg, #d4b896 0%, #a8856a 50%, #6b4f3a 100%)',
            }}
          >
            <span
              className="font-display text-[96px] font-light text-[rgba(255,250,243,0.85)] tracking-[-0.04em] z-[1]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              JS
            </span>
          </div>

          <div className="flex justify-between items-center mt-3.5 px-1">
            <span
              className="font-display font-medium text-base text-heading"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Joseph Searle
            </span>
            <span className="font-mono text-[11px] text-[rgba(26,15,10,0.55)] uppercase tracking-[0.12em]">
              SW4 · London
            </span>
          </div>
        </div>

        {/* Back face */}
        <div
          data-testid="avatar-back"
          className="absolute inset-0 bg-espresso border border-[rgba(212,197,169,0.18)] rounded-[18px] p-7 flex flex-col text-[rgba(245,240,232,0.92)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(0)',
            WebkitTransform: 'rotateY(180deg) translateZ(0)',
          }}
        >
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-terracotta mb-3.5 flex items-center gap-2 before:content-[''] before:w-4 before:h-px before:bg-terracotta">
            A bit about me
          </span>
          <h3
            className="font-display text-[22px] font-medium text-[#F5F0E8] tracking-[-0.015em] leading-[1.15] mb-4"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            When I'm not <em className="italic text-terracotta font-normal">shipping things.</em>
          </h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[13.5px] leading-[1.45] text-[rgba(245,240,232,0.78)]">
            {[
              'Long walks on Clapham Common with a flat white in hand.',
              'Currently reading anything Kazuo Ishiguro.',
              'Half-decent at five-a-side, fully committed to a Sunday roast.',
              'Keep a sourdough starter named Geoff.',
              'Talk to me about jazz piano, climbing, or the perfect espresso shot.',
            ].map((item) => (
              <li key={item} className="flex gap-2.5 items-start">
                <span className="w-[5px] h-[5px] rounded-full bg-sage mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-3.5 border-t border-[rgba(212,197,169,0.18)] font-mono text-[11px] tracking-[0.06em] text-[rgba(245,240,232,0.5)] flex justify-between">
            <span>SW4 · London</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
