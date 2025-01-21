'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import type { Checklist } from '@/lib/markdown'

export default function Home() {
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchChecklists() {
      try {
        const response = await fetch('/api/checklists')
        const data = await response.json()
        setChecklists(data)
      } catch (error) {
        console.error('Failed to fetch checklists:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChecklists()
  }, [])

  const filteredChecklists = useMemo(() => {
    if (!searchQuery.trim()) return checklists
    
    const query = searchQuery.toLowerCase()
    return checklists.filter((list) => 
      list.title.toLowerCase().includes(query) || 
      list.description.toLowerCase().includes(query)
    )
  }, [checklists, searchQuery])

  const categories = [...new Set(filteredChecklists.map(list => list.category))]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Kendin Denetle</h1>
        <p className="text-secondary">Hayatınızdaki önemli şeyler için kontrol listeleri</p>
      </header>

      <div className="px-4">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
        />
      </div>

      <div className="space-y-8 px-4">
        {categories.map((category) => {
          const categoryChecklists = filteredChecklists.filter((list) => list.category === category)
          if (categoryChecklists.length === 0) return null

          return (
            <section key={category} className="space-y-4">
              <h2 className="text-2xl font-semibold">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {categoryChecklists.map((checklist) => (
                  <Link
                    key={checklist.slug}
                    href={`/checklist/${checklist.slug}`}
                    className="group p-4 border rounded-lg hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <i className={`fas ${checklist.icon || 'fa-clipboard-check'} text-lg text-primary/60 group-hover:text-primary transition-colors`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {checklist.title}
                        </h3>
                        <p className="text-sm text-secondary mt-1">
                          {checklist.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}