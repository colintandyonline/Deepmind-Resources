'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  Play,
  Square,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  ChevronDown,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const defaultCode = `# DeepMindResources Agentic Sandbox
# Build and test your AI agents here

from langchain.agents import Tool, AgentExecutor
from langchain.llms import OpenAI

# Define your agent tools
def search_knowledge(query: str) -> str:
    """Search the knowledge base for relevant information."""
    return f"Results for: {query}"

def execute_code(code: str) -> str:
    """Execute Python code safely."""
    return f"Executed: {code}"

# Create tools
tools = [
    Tool(
        name="Knowledge Search",
        func=search_knowledge,
        description="Search for AI concepts"
    ),
    Tool(
        name="Code Executor", 
        func=execute_code,
        description="Run Python code"
    )
]

# Initialize agent
agent = AgentExecutor(
    tools=tools,
    llm=OpenAI(temperature=0),
    verbose=True
)

# Run your agent
result = agent.run("Explain transformer architecture")
print(result)`

interface CodeSandboxProps {
  className?: string
  initialCode?: string
}

export function CodeSandbox({ className, initialCode = defaultCode }: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code')

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    setOutput('')
    setActiveTab('output')

    // Simulate code execution with streaming output
    const lines = [
      '> Initializing DeepMindResources Sandbox...',
      '> Loading LangChain components...',
      '> Agent tools configured: Knowledge Search, Code Executor',
      '> Connecting to LLM backend...',
      '',
      '[Agent] Received query: "Explain transformer architecture"',
      '[Agent] Selecting tool: Knowledge Search',
      '[Tool] Searching knowledge base...',
      '',
      '=== Output ===',
      'Transformer architecture is a neural network design that uses',
      'self-attention mechanisms to process sequential data. Key components:',
      '',
      '1. Multi-Head Attention: Allows parallel attention computation',
      '2. Positional Encoding: Injects sequence order information', 
      '3. Feed-Forward Networks: Dense layers for transformation',
      '4. Layer Normalization: Stabilizes training',
      '',
      '[Agent] Task completed successfully.',
      '> Execution time: 1.23s',
    ]

    for (const line of lines) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setOutput((prev) => prev + line + '\n')
    }

    setIsRunning(false)
  }, [])

  const handleStop = () => {
    setIsRunning(false)
    setOutput((prev) => prev + '\n[System] Execution stopped by user.\n')
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
    setActiveTab('code')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'glass-card rounded-xl overflow-hidden flex flex-col',
        isExpanded ? 'fixed inset-4 z-50' : 'h-[500px]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sand/10 bg-obsidian/50">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-signal-green" />
          <span className="font-semibold text-sand">Agentic Sandbox</span>
          <span className="text-xs font-mono text-sand/40">Python 3.11</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Switcher (Mobile) */}
          <div className="flex md:hidden items-center bg-sand/5 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-md transition-all',
                activeTab === 'code'
                  ? 'bg-signal-green/20 text-signal-green'
                  : 'text-sand/50'
              )}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-md transition-all',
                activeTab === 'output'
                  ? 'bg-signal-green/20 text-signal-green'
                  : 'text-sand/50'
              )}
            >
              Output
            </button>
          </div>

          {/* Actions */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-sand/50 hover:text-sand hover:bg-sand/10"
            onClick={handleCopy}
          >
            {isCopied ? <Check className="w-4 h-4 text-signal-green" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-sand/50 hover:text-sand hover:bg-sand/10"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-sand/50 hover:text-sand hover:bg-sand/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Code Editor */}
        <div
          className={cn(
            'flex-1 flex flex-col border-b md:border-b-0 md:border-r border-sand/10 min-h-0',
            activeTab !== 'code' && 'hidden md:flex'
          )}
        >
          <div className="px-4 py-2 border-b border-sand/10 bg-sand/[0.02]">
            <span className="text-xs font-mono text-sand/40">main.py</span>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[200px] bg-transparent font-mono text-sm text-sand/90 resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
              placeholder="Write your agent code here..."
            />
          </div>
        </div>

        {/* Output Panel */}
        <div
          className={cn(
            'flex-1 flex flex-col bg-obsidian/30 min-h-0',
            activeTab !== 'output' && 'hidden md:flex'
          )}
        >
          <div className="px-4 py-2 border-b border-sand/10 bg-sand/[0.02]">
            <span className="text-xs font-mono text-sand/40">Output</span>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <pre className="font-mono text-sm text-sand/70 whitespace-pre-wrap leading-relaxed">
              {output || (
                <span className="text-sand/30">
                  {"// Run your code to see output here\n// Press the Play button to execute"}
                </span>
              )}
              {isRunning && <span className="inline-block w-2 h-4 bg-signal-green ml-1 animate-typing-cursor" />}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-sand/10 bg-obsidian/50">
        <div className="flex items-center gap-2 text-xs text-sand/40 font-mono">
          <span className="flex items-center gap-1">
            <span className={cn('w-2 h-2 rounded-full', isRunning ? 'bg-signal-green animate-pulse' : 'bg-sand/30')} />
            {isRunning ? 'Running...' : 'Ready'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button
              onClick={handleStop}
              size="sm"
              className="bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button
              onClick={handleRun}
              size="sm"
              className="bg-signal-green text-obsidian hover:bg-signal-green/90 font-semibold"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
