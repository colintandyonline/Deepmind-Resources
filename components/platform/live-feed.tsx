'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Activity, Zap, BookOpen, Code, Award, RefreshCw } from 'lucide-react'

interface FeedItem {
  id: string
  type: 'update' | 'achievement' | 'lesson' | 'code'
  title: string
  description: string
  timestamp: Date
  isNew?: boolean
}

const feedIcons = {
  update: Activity,
  achievement: Award,
  lesson: BookOpen,
  code: Code,
}

// Mock feed data generator
function generateMockFeedItem(): FeedItem {
  const types: FeedItem['type'][] = ['update', 'achievement', 'lesson', 'code']
  const type = types[Math.floor(Math.random() * types.length)]

  const templates = {
    update: [
      { title: 'New Module Available', description: 'Advanced RAG Patterns now unlocked' },
      { title: 'System Update', description: 'Sandbox environment upgraded to v2.4' },
      { title: 'Content Refresh', description: 'LangChain documentation updated' },
    ],
    achievement: [
      { title: 'Milestone Reached', description: 'First agent deployed successfully' },
      { title: 'Streak Bonus', description: '7-day learning streak achieved' },
      { title: 'XP Earned', description: 'Completed prompt optimization challenge' },
    ],
    lesson: [
      { title: 'Recommended', description: 'Tool Calling Fundamentals - Start now' },
      { title: 'Continue Learning', description: 'Memory Systems - 45% complete' },
      { title: 'New Content', description: 'Multi-Modal Agents deep dive' },
    ],
    code: [
      { title: 'Sandbox Ready', description: 'Your agent code passed all tests' },
      { title: 'Code Review', description: 'Optimization suggestions available' },
      { title: 'Template Added', description: 'ReAct pattern template imported' },
    ],
  }

  const template = templates[type][Math.floor(Math.random() * templates[type].length)]

  return {
    id: Math.random().toString(36).substring(7),
    type,
    ...template,
    timestamp: new Date(),
    isNew: true,
  }
}

interface LiveFeedProps {
  className?: string
}

export function LiveFeed({ className }: LiveFeedProps) {
  const [items, setItems] = useState<FeedItem[]>([])
  const [isConnected, setIsConnected] = useState(true)

  // Initialize with some items
  useEffect(() => {
    const initial = Array.from({ length: 5 }, () => ({
      ...generateMockFeedItem(),
      isNew: false,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
    }))
    setItems(initial)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        setItems((prev) => {
          const newItem = generateMockFeedItem()
          const updated = [newItem, ...prev.slice(0, 9)]
          // Remove "new" flag from previous items
          return updated.map((item, i) => ({
            ...item,
            isNew: i === 0,
          }))
        })
      }
    }, 8000) // New item every 8 seconds

    return () => clearInterval(interval)
  }, [isConnected])

  // Clear "new" flag after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setItems((prev) => prev.map((item) => ({ ...item, isNew: false })))
    }, 2000)

    return () => clearTimeout(timeout)
  }, [items])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-sand/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="w-5 h-5 text-signal-green" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-signal-green rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-sand">System Calibration</h2>
            <p className="text-xs text-sand/50 font-mono">LIVE KNOWLEDGE FEED</p>
          </div>
        </div>
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all',
            isConnected
              ? 'bg-signal-green/10 text-signal-green'
              : 'bg-sand/10 text-sand/50'
          )}
        >
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              isConnected ? 'bg-signal-green animate-pulse' : 'bg-sand/30'
            )}
          />
          {isConnected ? 'CONNECTED' : 'PAUSED'}
        </button>
      </div>

      {/* Feed Items */}
      <div className="divide-y divide-sand/5 max-h-[400px] overflow-y-auto">
        {items.map((item) => {
          const Icon = feedIcons[item.type]

          return (
            <div
              key={item.id}
              className={cn(
                'flex items-start gap-3 px-5 py-4 transition-all duration-500',
                item.isNew && 'bg-signal-green/5 animate-pulse-signal'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
                  item.isNew ? 'bg-signal-green/20' : 'bg-sand/5'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4',
                    item.isNew ? 'text-signal-green' : 'text-sand/60'
                  )}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                    className={cn(
                      'font-medium text-sm truncate',
                      item.isNew ? 'text-signal-green' : 'text-sand'
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-signal-green/20 text-signal-green rounded">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-sand/50 truncate">{item.description}</p>
              </div>

              {/* Timestamp */}
              <span className="text-xs text-sand/30 font-mono shrink-0">
                {formatTime(item.timestamp)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-sand/10 bg-sand/[0.02]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-sand/40 font-mono">
            {items.length} updates in queue
          </span>
          <button className="flex items-center gap-1.5 text-xs text-signal-green/70 hover:text-signal-green transition-colors">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
