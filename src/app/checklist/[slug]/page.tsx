import { getChecklistBySlug } from '@/lib/markdown'
import { ChecklistViewer } from '@/components/ChecklistViewer'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Props {
  params: {
    slug: string
  }
}

export default function ChecklistPage({ params }: Props) {
  const checklist = getChecklistBySlug(params.slug)

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Geri Dön</span>
        </Link>
      </header>

      <ChecklistViewer 
        content={checklist.content} 
        title={checklist.title} 
        description={checklist.description}
      />
    </div>
  )
} 