import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import { fadeUp } from '@/lib/motion'

export default function Contact() {
  return (
    <section
      className="py-[110px] relative overflow-hidden"
      id="contact"
      style={{ background: 'var(--color-espresso)', color: 'rgba(245,240,232,0.92)' }}
    >
      <div
        className="absolute top-[-300px] left-[-200px] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,101,42,0.18), transparent 60%)',
        }}
      />

      <div className="max-w-[1180px] mx-auto px-8 relative z-[1]">
        <div className="grid grid-cols-[1fr_1.2fr] gap-[80px] items-start max-[880px]:grid-cols-1 max-[880px]:gap-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-terracotta font-medium inline-flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-terracotta">
              Say hello
            </span>
            <h2
              className="font-display font-medium tracking-[-0.02em] leading-[1.05] mt-3.5 text-[#F5F0E8]"
              style={{
                fontSize: 'clamp(34px, 4.4vw, 52px)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 50",
              }}
            >
              Coffee,{' '}
              <em
                className="italic text-terracotta font-normal"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
              >
                or a code review.
              </em>
            </h2>
            <p className="text-[rgba(245,240,232,0.7)] mt-[18px] text-[17px] max-w-[380px]">
              If you're hiring, building something interesting, or just want to argue about agent
              frameworks, the inbox is open. I read everything; I reply within a couple of days.
            </p>
            <div className="mt-9 flex flex-col gap-3.5">
              {[
                { label: 'Email', value: 'josephwilliamsearle@gmail.com' },
                { label: 'Based in', value: 'Clapham, London' },
                { label: 'Hours', value: 'GMT, mostly' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="font-mono text-[13px] text-[rgba(245,240,232,0.65)] flex gap-3 items-center"
                >
                  <span className="text-sage w-[70px]">{label}</span>
                  {value}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
