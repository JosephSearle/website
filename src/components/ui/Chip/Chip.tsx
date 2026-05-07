import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  primary?: boolean
}

export default function Chip({ children, primary = false }: ChipProps) {
  return (
    <span
      className={[
        'inline-block px-4 py-[9px] rounded-full border text-sm font-medium text-heading transition-all duration-200',
        primary
          ? 'chip-primary bg-terracotta border-terracotta text-white hover:bg-terracotta-deep hover:border-terracotta-deep'
          : 'bg-transparent border-oat hover:border-heading',
      ].join(' ')}
    >
      {children}
    </span>
  )
}
