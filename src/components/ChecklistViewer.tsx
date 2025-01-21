'use client'

import { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Props {
  content: string
  title: string
  description: string
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

const getCompletionStatus = (items: CheckItem[]) => {
  const total = items.length
  const completed = items.filter(item => item.checked).length
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return {
    completed,
    total,
    percentage,
    color: percentage >= 75 ? 'text-green-600 bg-green-50' 
      : percentage >= 30 ? 'text-yellow-600 bg-yellow-50'
      : 'text-red-600 bg-red-50'
  }
}

const getTotalCompletionStatus = (sections: Section[]) => {
  const allItems = sections.flatMap(section => section.items)
  return getCompletionStatus(allItems)
}

export function ChecklistViewer({ content, title, description }: Props) {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, sectionIndex: number, itemIndex: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle(sectionIndex, itemIndex)
    }
  }

  return (
    <div className="space-y-8" role="main">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div 
            className={clsx(
              'inline-flex items-center px-6 py-3 rounded-full text-xl font-semibold',
              getTotalCompletionStatus(sections).color
            )}
            role="status"
            aria-label={`Toplam ${getTotalCompletionStatus(sections).completed} / ${getTotalCompletionStatus(sections).total} madde tamamlandı (${Math.round(getTotalCompletionStatus(sections).percentage)}%)`}
          >
            %{Math.round(getTotalCompletionStatus(sections).percentage)}
          </div>
        </div>
        {description && (
          <p className="text-secondary">{description}</p>
        )}
      </div>
      {sections.map((section, sectionIndex) => (
        <section 
          key={section.title} 
          className="space-y-4"
          aria-labelledby={`section-${sectionIndex}`}
        >
          <div className="flex items-center gap-4">
            <h2 id={`section-${sectionIndex}`} className="text-2xl font-semibold">
              {section.title}
            </h2>
            {section.items.length > 0 && (
              <div 
                className={clsx(
                  'inline-flex items-center px-4 py-2 rounded-full text-base font-medium',
                  getCompletionStatus(section.items).color
                )}
                role="status"
                aria-label={`${getCompletionStatus(section.items).completed} of ${getCompletionStatus(section.items).total} items completed`}
              >
                {getCompletionStatus(section.items).completed}/{getCompletionStatus(section.items).total}
              </div>
            )}
          </div>
          <div 
            className="space-y-2"
            role="list"
            aria-label={`${section.title} kontrol listesi`}
          >
            {section.items.map((item, itemIndex) => (
              <button
                key={item.text}
                onClick={() => handleToggle(sectionIndex, itemIndex)}
                onKeyDown={(e) => handleKeyDown(e, sectionIndex, itemIndex)}
                className={clsx(
                  'w-full flex items-start gap-3 p-3 border rounded-lg transition-colors',
                  'hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  mounted && item.checked && 'bg-green-50 border-green-200'
                )}
                role="listitem"
                aria-checked={item.checked}
                aria-label={`${item.text}${item.checked ? ' (tamamlandı)' : ' (tamamlanmadı)'}`}
                tabIndex={0}
              >
                <span 
                  className={clsx(
                    'flex-shrink-0 w-5 h-5 border rounded-md flex items-center justify-center',
                    item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  )}
                  aria-hidden="true"
                >
                  {item.checked && <CheckIcon className="w-4 h-4 text-white" />}
                </span>
                <span className={clsx(
                  'flex-grow text-left',
                  item.checked && 'text-gray-500'
                )}>
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