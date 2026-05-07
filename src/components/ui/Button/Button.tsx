import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
  variant?: Variant
  children: ReactNode
}

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: Variant
  children: ReactNode
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const BASE =
  'inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium font-sans no-underline cursor-pointer border-0 transition-[transform,background,color,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2'

const VARIANTS: Record<Variant, string> = {
  primary: 'btn-primary bg-terracotta text-white hover:bg-terracotta-deep hover:-translate-y-px',
  ghost: 'btn-ghost bg-transparent text-heading border border-oat hover:border-heading',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [BASE, VARIANTS[variant], className].join(' ')

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  )
}
