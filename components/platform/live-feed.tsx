'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Activity, Zap, BookOpen, Code, Award, RefreshCw } from 'lucide-react'

interface IntelligenceItem {
  id: string
  type: 'verified' | 'masterBrain' | 'toolSignal' | 'lessonUpdate' | 'sandboxTask'
  title: string
  description: string
  tag: string
  impact: string
  age: string
  isNew?: boolean
}

interface QueueMetric {
  label: string
  value: string
  description: string
}

const feedIcons = {
  verified: Activity,
  masterBrain: Award,
  toolSignal: Zap,
  lessonUpdate: BookOpen,
  sandboxTask: Code,
}

const queueMetrics: QueueMetric[] = [
  {
    label: 'Verified Updates',
    value: '12',
    description: 'source-checked signals',
  },
  {
    label: 'Master Brain Queue',
    value: '7',
    description: 'claims awaiting scoring',
  },
  {
    label: 'Tool Signals',
    value: '18',
    description: 'capability changes watched',
  },
  {
    label: 'Lesson Updates Pending',
    value: '4',
    description: 'academy refresh candidates',
  },
]

const intelligenceItems: IntelligenceItem[] = [
  {
    id: 'verified-model-update',
    type: 'verified',
    title: 'Model release note detected',
    description:
      'Scout Agent has queued official platform notes for validation before lesson impact mapping.',
    tag: 'Verified Update',
    impact: 'Affects model comparison',
    age: '2m ago',
  },
  {
    id: 'tool-capability-change',
    type: 'toolSignal',
    title: 'Tool capability change flagged',
    description:
      'Tool Agent has marked a coding-assistant update for practical testing against real tasks.',
    tag: 'Tool Signal',
    impact: 'Affects tool selection',
    age: '9m ago',
  },
  {
    id: 'master-brain-entry',
    type: 'masterBrain',
    title: 'Master Brain entry pending',
    description:
      'A source summary, confidence score, and linked claims are waiting for Validator Agent review.',
    tag: 'Master Brain Queue',
    impact: 'Needs source check',
    age: '17m ago',
  },
  {
    id: 'lesson-refresh-needed',
    type: 'lessonUpdate',
    title: 'Lesson update recommended',
    description:
      'Prompt Engineering material may need a worked example refresh after a platform behaviour change.',
    tag: 'Lesson Update Pending',
    impact: 'Affects Academy',
    age: '31m ago',
  },
  {
    id: 'sandbox-task-candidate',
    type: 'sandboxTask',
    title: 'Sandbox task candidate created',
    description:
      'A model-comparison exercise has been proposed so learners can test the change hands-on.',
    tag: 'Sandbox Task',
    impact: 'Affects Agentic Sandbox',
    age: '46m ago',
  },
]

interface LiveFeedProps {
  className?: string
}

export function LiveFeed({ className }: LiveFeedProps) {
  const [items, setItems] = useState<IntelligenceItem[]>(intelligenceItems)
  const [isConnected, setIsConnected] = useState(true)

  const refreshQueue = () => {
    setItems((currentItems) => {
      const [firstItem, ...remainingItems] = currentItems
      const refreshedFirstItem: IntelligenceItem = {
        ...firstItem,
        age: 'just now',
        isNew: true,
      }

      return [refreshedFirstItem, ...remainingItems].map((item, index) => ({
        ...item,
        isNew: index === 0,
      }))
    })
  }

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 px-5 py-4 border-b border-sand/10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-signal-green/10">
            <Activity className="w-5 h-5 text-signal-green" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-signal-green rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-sand">Live AI Intelligence</h2>
            <p className="text-xs text-sand/50 font-mono">
              VERIFIED UPDATES → PRACTICAL SKILL ACTIONS
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={cn(
            'flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all',
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
          {isConnected ? 'TRACKING' : 'PAUSED'}
        </button>
      </div>

      {/* Queue Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 px-5 py-4 border-b border-sand/10 bg-sand/[0.02]">
        {queueMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-sand/10 bg-white/60 px-3 py-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-medium text-sand/55">{metric.label}</span>
              <span className="text-lg font-bold font-mono text-signal-green">
                {metric.value}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-sand/40">{metric.description}</p>
          </div>
        ))}
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
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-signal-green/10 text-signal-green rounded uppercase tracking-wide">
                    {item.tag}
                  </span>
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-signal-green/20 text-signal-green rounded">
                      NEW
                    </span>
                  )}
                </div>
                <h3
                  className={cn(
                    'font-medium text-sm mb-1',
                    item.isNew ? 'text-signal-green' : 'text-sand'
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-sand/50 leading-relaxed">{item.description}</p>
                <p className="mt-2 text-xs font-medium text-sand/45">{item.impact}</p>
              </div>

              {/* Timestamp */}
              <span className="text-xs text-sand/30 font-mono shrink-0">
                {item.age}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-sand/10 bg-sand/[0.02]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-sand/40 font-mono">
            AI update → verified meaning → practical lesson → sandbox task
          </span>
          <button
            onClick={refreshQueue}
            disabled={!isConnected}
            className="flex w-fit items-center gap-1.5 text-xs text-signal-green/70 hover:text-signal-green transition-colors disabled:cursor-not-allowed disabled:text-sand/30"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh queue
          </button>
        </div>
      </div>
    </div>
  )
}
