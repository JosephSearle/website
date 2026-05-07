const FOOTER_LINKS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Download CV', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-espresso-deep text-[rgba(245,240,232,0.55)] py-8 border-t border-[rgba(212,197,169,0.08)] relative z-[2]">
      <div className="max-w-[1180px] mx-auto px-8 flex justify-between items-center text-[13px] flex-wrap gap-4">
        <span className="font-display text-[rgba(245,240,232,0.85)] font-medium">
          Joseph Searle<span className="text-terracotta">.</span>
        </span>
        <nav aria-label="Footer links">
          <ul className="flex gap-7 list-none m-0 p-0">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-[rgba(245,240,232,0.55)] no-underline transition-colors duration-[180ms] hover:text-terracotta"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="font-mono text-[12px]">© 2026</span>
      </div>
    </footer>
  )
}
