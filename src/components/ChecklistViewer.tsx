'use client'

import { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Props {
  content: string
}

interface CheckItem {
  text: string
  checked: boolean
}

interface Section {
  title: string
  items: CheckItem[]
}

const parseContent = (content: string): Section[] => {
  const lines = content.split('\n')
  const sections: Section[] = []
  let currentSection: Section | null = null

  lines.forEach((line) => {
    const sectionMatch = line.match(/^## (.+)/)
    const itemMatch = line.match(/\[\] (.+)/)

    if (sectionMatch) {
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = {
        title: sectionMatch[1],
        items: [],
      }
    } else if (itemMatch && currentSection) {
      currentSection.items.push({
        text: itemMatch[1],
        checked: false,
      })
    }
  })

  if (currentSection) {
    sections.push(currentSection)
  }

  return sections
}

export function ChecklistViewer({ content }: Props) {
  const [mounted, setMounted] = useState(false)
  const [sections, setSections] = useState<Section[]>(() => parseContent(content))

  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${content}`)
    if (saved) {
      setSections(JSON.parse(saved))
    }
    setMounted(true)
  }, [content])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(`checklist-${content}`, JSON.stringify(sections))
    }
  }, [sections, content, mounted])

  const handleToggle = (sectionIndex: number, itemIndex: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        items: [...newSections[sectionIndex].items],
      }
      newSections[sectionIndex].items[itemIndex] = {
        ...newSections[sectionIndex].items[itemIndex],
        checked: !newSections[sectionIndex].items[itemIndex].checked,
      }
      return newSections
    })
  }

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
        <section key={section.title} className="space-y-4">
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <button
                key={item.text}
                onClick={() => handleToggle(sectionIndex, itemIndex)}
                className={clsx(
                  'w-full flex items-start gap-3 p-3 border rounded-lg transition-colors',
                  'hover:border-primary/20',
                  mounted && item.checked && 'bg-green-50 border-green-200'
                )}
              >
                <div
                  className={clsx(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0',
                    mounted && item.checked ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  )}
                >
                  {mounted && item.checked && <CheckIcon className="w-4 h-4 text-white" />}
                </div>
                <span className={clsx('text-left', mounted && item.checked && 'text-green-700')}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
} 