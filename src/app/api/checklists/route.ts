import { NextResponse } from 'next/server'
import { getAllChecklists } from '@/lib/markdown'

export async function GET() {
  try {
    const checklists = getAllChecklists()
    return NextResponse.json(checklists)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch checklists' }, { status: 500 })
  }
}
