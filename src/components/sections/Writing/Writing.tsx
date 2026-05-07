import { motion } from 'framer-motion'
import BlogRow from './BlogRow'
import { SPRING } from '@/lib/motion'
import { useSanityPosts } from '@/hooks/useSanityPosts'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

export default function Writing() {
  const posts = useSanityPosts()

  return (
    <section className="py-[90px]" id="writing">
      <div className="max-w-[1180px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: SPRING }}
        >
          <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-terracotta font-medium inline-flex items-center gap-2.5 before:content-[''] before:w-6 before:h-px before:bg-terracotta">
            Writing
          </span>
          <h2
            className="font-display font-medium text-heading tracking-[-0.02em] leading-[1.05] mt-3.5"
            style={{
              fontSize: 'clamp(34px, 4.4vw, 52px)',
              fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            }}
          >
            Notes from{' '}
            <em
              className="italic text-terracotta font-normal"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              the workshop.
            </em>
          </h2>
          <p className="max-w-[580px] text-[rgba(26,15,10,0.7)] mt-3.5 text-[17px]">
            I write when I've learned something the hard way, or when I think a piece of received
            wisdom is wrong. About one a month.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 border-t border-oat"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {posts.map((post) => (
            <BlogRow key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
