import { useNavScroll } from '@/hooks/useNavScroll'
import type { SectionId } from '@/hooks/useNavScroll'

const NAV_LINKS: { label: string; href: string; section: SectionId }[] = [
  { label: 'Work', href: '#work', section: 'work' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Writing', href: '#writing', section: 'writing' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export default function Nav() {
  const { scrolled, activeSection } = useNavScroll()

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[100]',
        'backdrop-blur-[14px]',
        'transition-[border-color,background] duration-[240ms] ease-out',
        scrolled
          ? 'border-b border-oat bg-[rgba(245,240,232,0.88)]'
          : 'border-b border-transparent bg-[rgba(245,240,232,0.78)]',
      ].join(' ')}
    >
      <div className="max-w-[1180px] mx-auto px-8 py-[18px] flex items-center justify-between">
        <a
          href="#top"
          className="font-nav font-black text-[20px] text-heading tracking-[-0.02em] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:rounded"
        >
          Joseph Searle<span className="text-terracotta">.</span>
        </a>
        <ul className="flex gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href, section }) => {
            const isActive = activeSection === section
            return (
              <li key={section}>
                <a
                  href={href}
                  className={[
                    'text-sm text-ink no-underline font-medium transition-[opacity,color] duration-200',
                    'relative py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:rounded',
                    isActive
                      ? 'opacity-100 text-terracotta after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[1.5px] after:bg-terracotta after:rounded-sm'
                      : 'opacity-[0.62] hover:opacity-100',
                  ].join(' ')}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
