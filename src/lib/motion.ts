import type { Variants } from 'framer-motion'

export const SPRING: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const SPRING_BOUNCE: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SPRING },
  },
}
