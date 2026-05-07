import { motion, type Variants } from 'framer-motion'
import type { Post } from '@/types'
import { SPRING } from '@/lib/motion'

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { ease: SPRING, duration: 0.6 } },
}

export default function BlogRow({ post }: { post: Post }) {
  return (
    <motion.a
      variants={rowVariant}
      href={`/blog/${post.slug}`}
      className="grid grid-cols-[110px_130px_1fr_28px] gap-7 py-7 border-b border-oat items-start no-underline text-inherit transition-[padding-left,background] duration-[240ms] ease-out group hover:pl-3 hover:bg-[rgba(237,230,214,0.4)] max-[720px]:grid-cols-[90px_1fr_20px] max-[720px]:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-inset"
    >
      <div className="font-mono text-[12px] text-[rgba(26,15,10,0.55)] pt-1.5 tracking-[0.04em]">
        {post.date}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-sage pt-[7px] font-medium max-[720px]:hidden">
        {post.category}
      </div>
      <div>
        <h3
          className="font-display font-medium text-heading tracking-[-0.015em] text-[24px] m-0 mb-1.5 leading-[1.2] transition-colors duration-200 group-hover:text-terracotta max-[720px]:text-[20px]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {post.title}
        </h3>
        <p className="text-[rgba(26,15,10,0.65)] text-[15px] m-0 leading-[1.5]">{post.excerpt}</p>
      </div>
      <span className="text-[20px] text-[rgba(26,15,10,0.4)] pt-2 opacity-0 -translate-x-1.5 transition-[opacity,transform,color] duration-[240ms] group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-terracotta max-[720px]:opacity-100">
        →
      </span>
    </motion.a>
  )
}
