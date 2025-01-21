import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export interface Checklist {
  slug: string
  title: string
  description: string
  category: string
  icon?: string
  content: string
}

const checklistsDirectory = join(process.cwd(), 'checklists')

export function getAllChecklists(): Checklist[] {
  const fileNames = readdirSync(checklistsDirectory)
  const allChecklistsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = join(checklistsDirectory, fileName)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      ...data,
      content,
    } as Checklist
  })

  return allChecklistsData
}

export function getChecklistBySlug(slug: string): Checklist {
  const fullPath = join(checklistsDirectory, `${slug}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    ...data,
    content,
  } as Checklist
}