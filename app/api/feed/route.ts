import { NextResponse } from 'next/server'

export interface FeedUpdate {
  id: string
  type: 'update' | 'achievement' | 'lesson' | 'code'
  title: string
  description: string
  timestamp: string
}

const mockUpdates: Omit<FeedUpdate, 'id' | 'timestamp'>[] = [
  { type: 'update', title: 'New Module Available', description: 'Advanced RAG Patterns now unlocked' },
  { type: 'update', title: 'System Update', description: 'Sandbox environment upgraded to v2.4' },
  { type: 'update', title: 'Content Refresh', description: 'LangChain documentation updated' },
  { type: 'achievement', title: 'Milestone Reached', description: 'First agent deployed successfully' },
  { type: 'achievement', title: 'Streak Bonus', description: '7-day learning streak achieved' },
  { type: 'achievement', title: 'XP Earned', description: 'Completed prompt optimization challenge' },
  { type: 'lesson', title: 'Recommended', description: 'Tool Calling Fundamentals - Start now' },
  { type: 'lesson', title: 'Continue Learning', description: 'Memory Systems - 45% complete' },
  { type: 'lesson', title: 'New Content', description: 'Multi-Modal Agents deep dive' },
  { type: 'code', title: 'Sandbox Ready', description: 'Your agent code passed all tests' },
  { type: 'code', title: 'Code Review', description: 'Optimization suggestions available' },
  { type: 'code', title: 'Template Added', description: 'ReAct pattern template imported' },
]

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Generate a random update
  const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)]

  const update: FeedUpdate = {
    id: Math.random().toString(36).substring(7),
    ...randomUpdate,
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(update)
}

export async function POST() {
  // This could be used to record events or acknowledge updates
  return NextResponse.json({ success: true })
}
