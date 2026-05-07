import Nav from '@/components/layout/Nav/Nav'
import Footer from '@/components/layout/Footer/Footer'
import Hero from '@/components/sections/Hero/Hero'
import Skills from '@/components/sections/Skills/Skills'
import Timeline from '@/components/sections/Timeline/Timeline'
import Projects from '@/components/sections/Projects/Projects'
import Writing from '@/components/sections/Writing/Writing'
import Contact from '@/components/sections/Contact/Contact'

export default function HomePage() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Timeline />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
