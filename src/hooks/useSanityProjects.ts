import { useState, useEffect } from 'react'
import type { Project } from '@/types'
import { projects as staticProjects } from '@/data/projects'
import { sanityClient } from '@/lib/sanity/client'
import { allProjectsQuery } from '@/lib/sanity/queries'

export function useSanityProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(staticProjects)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    sanityClient
      .fetch<Project[]>(allProjectsQuery)
      .then(setProjects)
      .catch(() => {})
  }, [])

  return projects
}
