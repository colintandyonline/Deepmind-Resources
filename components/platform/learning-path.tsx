'use client'

import { cn } from '@/lib/utils'
import {
  Brain,
  Zap,
  Layers,
  Network,
  Bot,
  Workflow,
  CheckCircle,
  Circle,
  Lock,
} from 'lucide-react'

export interface PathNode {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  status: 'completed' | 'current' | 'locked'
  xp: number
}

const defaultPath: PathNode[] = [
  {
    id: '1',
    title: 'AI Beginner',
    subtitle: 'Foundations of AI',
    icon: Brain,
    status: 'completed',
    xp: 500,
  },
  {
    id: '2',
    title: 'Prompt Engineer',
    subtitle: 'Master LLM Interactions',
    icon: Zap,
    status: 'completed',
    xp: 750,
  },
  {
    id: '3',
    title: 'Agent Builder',
    subtitle: 'Single Agent Systems',
    icon: Bot,
    status: 'current',
    xp: 1000,
  },
  {
    id: '4',
    title: 'Workflow Architect',
    subtitle: 'Complex Pipelines',
    icon: Workflow,
    status: 'locked',
    xp: 1250,
  },
  {
    id: '5',
    title: 'System Designer',
    subtitle: 'Architecture Patterns',
    icon: Layers,
    status: 'locked',
    xp: 1500,
  },
  {
    id: '6',
    title: 'Multi-Agent Orchestrator',
    subtitle: 'Distributed Intelligence',
    icon: Network,
    status: 'locked',
    xp: 2000,
  },
]

interface LearningPathProps {
  nodes?: PathNode[]
  className?: string
}

export function LearningPath({ nodes = defaultPath, className }: LearningPathProps) {
  const completedCount = nodes.filter((n) => n.status === 'completed').length
  const totalXp = nodes
    .filter((n) => n.status === 'completed')
    .reduce((acc, n) => acc + n.xp, 0)

  return (
    <div className={cn('glass-card rounded-xl p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-sand">Learning Path</h2>
          <p className="text-sm text-sand/50">
            {completedCount} of {nodes.length} milestones completed
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-signal-green/10">
          <Zap className="w-4 h-4 text-signal-green" />
          <span className="text-sm font-mono font-semibold text-signal-green">
            {totalXp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-1.5 bg-sand/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-signal-green rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(completedCount / nodes.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Vertical Path */}
      <div className="relative space-y-0">
        {nodes.map((node, index) => {
          const Icon = node.icon
          const isLast = index === nodes.length - 1
          const StatusIcon =
            node.status === 'completed'
              ? CheckCircle
              : node.status === 'current'
                ? Circle
                : Lock

          return (
            <div key={node.id} className="relative">
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute left-5 top-12 w-0.5 h-12',
                    node.status === 'completed' ? 'bg-signal-green' : 'bg-sand/10'
                  )}
                />
              )}

              {/* Node */}
              <div
                className={cn(
                  'relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300',
                  node.status === 'current' && 'bg-signal-green/5 border border-signal-green/20',
                  node.status === 'completed' && 'hover:bg-sand/5',
                  node.status === 'locked' && 'opacity-50'
                )}
              >
                {/* Icon Container */}
                <div
                  className={cn(
                    'relative flex items-center justify-center w-10 h-10 rounded-xl shrink-0',
                    node.status === 'completed' && 'bg-signal-green/20',
                    node.status === 'current' && 'bg-signal-green/30 animate-pulse-signal',
                    node.status === 'locked' && 'bg-sand/10'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5',
                      node.status === 'completed' && 'text-signal-green',
                      node.status === 'current' && 'text-signal-green',
                      node.status === 'locked' && 'text-sand/40'
                    )}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={cn(
                        'font-semibold truncate',
                        node.status === 'locked' ? 'text-sand/40' : 'text-sand'
                      )}
                    >
                      {node.title}
                    </h3>
                    <StatusIcon
                      className={cn(
                        'w-4 h-4 shrink-0',
                        node.status === 'completed' && 'text-signal-green',
                        node.status === 'current' && 'text-signal-green fill-signal-green/30',
                        node.status === 'locked' && 'text-sand/30'
                      )}
                    />
                  </div>
                  <p className="text-sm text-sand/50 truncate">{node.subtitle}</p>
                </div>

                {/* XP Badge */}
                <div
                  className={cn(
                    'text-xs font-mono px-2 py-1 rounded',
                    node.status === 'completed'
                      ? 'bg-signal-green/10 text-signal-green'
                      : 'bg-sand/5 text-sand/40'
                  )}
                >
                  +{node.xp} XP
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
