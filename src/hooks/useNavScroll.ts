import { useEffect, useState } from 'react'

const SECTION_IDS = ['work', 'about', 'writing', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)

      const y = window.scrollY + 120
      let current: SectionId | null = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, activeSection }
}
