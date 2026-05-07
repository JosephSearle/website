import { motion } from 'framer-motion'
import Button from '@/components/ui/Button/Button'
import PulseDot from '@/components/ui/PulseDot/PulseDot'
import AvatarCard from './AvatarCard'
import { fadeUp, SPRING } from '@/lib/motion'

export default function Hero() {
  return (
    <section className="pt-[140px] pb-[110px] relative overflow-hidden" id="top">
      {/* Radial background glow */}
      <div
        className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,101,42,0.08), transparent 60%)',
        }}
      />

      <div className="max-w-[1180px] mx-auto px-8">
        <div className="grid grid-cols-[1.5fr_1fr] gap-[80px] items-center max-[880px]:grid-cols-1 max-[880px]:gap-12">
          {/* Left: copy */}
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-[7px] bg-surface border border-oat rounded-full text-[13px] text-heading font-medium mb-7">
              <PulseDot aria-label="Open to new roles" />
              Open to new roles · London
            </div>

            <h1
              className="font-display font-normal text-heading leading-[1.0] tracking-[-0.025em] mb-8"
              style={{
                fontSize: 'clamp(48px, 7vw, 88px)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 30",
              }}
            >
              I build{' '}
              <em
                className="italic text-terracotta"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
              >
                agentic AI systems
              </em>{' '}
              that actually ship.
            </h1>

            <p className="text-[19px] leading-[1.6] text-[rgba(26,15,10,0.78)] max-w-[540px] mb-9">
              I'm an AI engineer in <strong className="text-ink font-semibold">London</strong>,
              working at the seam between large language models, distributed infrastructure, and the
              messy reality of production. I design retrieval pipelines, orchestrate agents with
              LangGraph and MCP, and care a great deal about the boring parts — observability,
              latency, cost.
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <Button href="#contact" variant="primary">
                Let's talk <span aria-hidden="true">→</span>
              </Button>
              <Button href="#work" variant="ghost">
                See my work
              </Button>
            </div>
          </motion.div>

          {/* Right: avatar card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12, duration: 0.8, ease: SPRING }}
          >
            <AvatarCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
