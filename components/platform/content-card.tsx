'use client'

import { cn } from '@/lib/utils'
import { Clock, CheckCircle, Play, Lock } from 'lucide-react'

export interface LessonModule {
  id: string
  title: string
  description: string
  duration: string
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  progress?: number
  category: string
}

interface ContentCardProps {
  module: LessonModule
  onClick?: () => void
}

const statusConfig = {
  locked: {
    icon: Lock,
    label: 'Locked',
    className: 'text-sand/30',
    bgClass: 'bg-sand/5',
  },
  available: {
    icon: Play,
    label: 'Start',
    className: 'text-signal-green',
    bgClass: 'bg-signal-green/10',
  },
  in_progress: {
    icon: Play,
    label: 'Continue',
    className: 'text-signal-green',
    bgClass: 'bg-signal-green/20',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    className: 'text-signal-green',
    bgClass: 'bg-signal-green/10',
  },
}

export function ContentCard({ module, onClick }: ContentCardProps) {
  const config = statusConfig[module.status]
  const StatusIcon = config.icon

  return (
    <button
      onClick={onClick}
      disabled={module.status === 'locked'}
      className={cn(
        'glass-card w-full text-left rounded-xl p-5 transition-all duration-300',
        'hover:border-signal-green/30 hover:shadow-lg hover:shadow-signal-green/5',
        'focus:outline-none focus:ring-2 focus:ring-signal-green/30',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-sand/10',
        'group'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center rounded-full bg-[#123BFF] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
          {module.category}
        </span>
        <div
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium',
            config.bgClass,
            config.className
          )}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-sand mb-2 group-hover:text-signal-green transition-colors">
        {module.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-sand/60 mb-4 line-clamp-2">{module.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-sand/50">
          <Clock className="w-4 h-4" />
          <span>{module.duration}</span>
        </div>

        {/* Progress Bar (for in_progress) */}
        {module.status === 'in_progress' && module.progress !== undefined && (
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-sand/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-signal-green rounded-full transition-all duration-500"
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-signal-green">{module.progress}%</span>
          </div>
        )}
      </div>
    </button>
  )
}

interface ContentCardGridProps {
  modules: LessonModule[]
  onModuleClick?: (module: LessonModule) => void
}

export function ContentCardGrid({ modules, onModuleClick }: ContentCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((module) => (
        <ContentCard
          key={module.id}
          module={module}
          onClick={() => onModuleClick?.(module)}
        />
      ))}
    </div>
  )
}
