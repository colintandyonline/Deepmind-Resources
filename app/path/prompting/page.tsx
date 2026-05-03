'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  FileCheck2,
  Layers3,
  MessageSquareText,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react'

const stack = [
  ['Task diagnosis', 'Define the outcome, user, risk level, source material, review owner, and workflow destination before the AI system receives instructions.', Compass],
  ['Instruction architecture', 'Build prompts with role, task, context, constraints, examples, format, tone, exclusion rules, and acceptance criteria.', MessageSquareText],
  ['Output control', 'Use format rules, evidence requirements, iteration loops, and quality gates so AI output is easier to review and reuse.', BadgeCheck],
  ['Workflow integration', 'Connect prompts to real work with inputs, tool boundaries, handoffs, privacy limits, human review, and final-use rules.', Workflow],
]

const route = [
  ['01', 'Frame the work', 'Identify what the prompt must achieve, what context matters, and what cannot be handed to AI without review.'],
  ['02', 'Control the instruction', 'Convert intent into a reusable prompt structure that reduces ambiguity and gives the model clear operating rules.'],
  ['03', 'Validate the response', 'Inspect claims, sources, assumptions, sensitive data, tone, format, and readiness before the answer moves forward.'],
  ['04', 'Turn it into a system', 'Save the working pattern as a team asset for repeatable workflows, sandbox tasks, and production-ready standards.'],
]

const areas = [
  ['Prompt foundations', 'Understand why vague instructions fail and how structured prompts create better, safer, more reviewable output.', BookOpenCheck],
  ['Reusable prompt systems', 'Build repeatable patterns for research, writing, support, operations, analysis, documentation, and knowledge work.', Layers3],
  ['Validation and evidence', 'Train users to check claims, missing evidence, hallucination risk, privacy exposure, and unsupported conclusions.', FileCheck2],
  ['Tool-aware prompting', 'Understand how prompt design changes across assistants, model APIs, coding systems, RAG tools, and agent workflows.', Radar],
  ['Business prompt operations', 'Create shared team standards for instructions, review boundaries, approved patterns, and safer workplace AI adoption.', BriefcaseBusiness],
  ['Agent-ready instructions', 'Prepare for tool calling and agent workflows by learning how prompts, tools, memory, handoffs, and review loops connect.', Zap],
]

const sandbox = [
  'Rewrite a weak workplace prompt into a controlled instruction.',
  'Build a reusable prompt pattern for a real team workflow.',
  'Audit an AI response for missing evidence and unsupported claims.',
  'Map a prompt into a workflow with inputs, review gates, and output rules.',
]

function Cta({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold shadow-sm transition ${light ? 'bg-white text-[#123BFF] hover:bg-[#EAF7FF]' : 'bg-[#123BFF] text-white hover:bg-[#0A63FF]'}`}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  )
}

export default function PromptEngineeringPage() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const storageKey = 'dmr_prompting_popup_closed'
    if (window.sessionStorage.getItem(storageKey) === 'true') return

    const openPopup = () => setShowPopup(true)
    const timer = window.setTimeout(openPopup, 20000)

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0 && (window.scrollY / total) * 100 >= 20) openPopup()
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const closePopup = () => {
    window.sessionStorage.setItem('dmr_prompting_popup_closed', 'true')
    setShowPopup(false)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-sand">
      {showPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sand/30 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="prompt-popup-title">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-sand/10 bg-white shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#123BFF]" />
            <button type="button" onClick={closePopup} className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sand/10 bg-white text-sand/60 shadow-sm transition hover:border-[#123BFF]/30 hover:text-[#123BFF]" aria-label="Close prompt engineering prompt">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#123BFF] p-6 text-white sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm"><Sparkles className="h-4 w-4" />Prompt systems</span>
                <h2 id="prompt-popup-title" className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Turn weak AI requests into controlled workflow instructions.</h2>
                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">Build reusable prompt systems, validation habits, and workflow-ready AI output standards.</p>
                <div className="mt-6 grid gap-3">{['Structured instructions', 'Reusable workflow prompts', 'Validation before production use'].map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" /><p className="text-sm font-semibold leading-6 text-white/90">{item}</p></div>)}</div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">Choose your next step</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-sand">Build prompt control, then prove it in the Sandbox.</h3>
                <p className="mt-3 text-sm leading-7 text-sand/65">Use the pathway to learn the architecture, then apply it through verified sandbox tasks and business-ready workflow practice.</p>
                <div className="mt-6 grid gap-3"><Cta href="/auth/signup">Create your workspace</Cta><Cta href="/sandbox">Try sandbox practice</Cta><Cta href="/business-ai-training">Train your team</Cta></div>
                <p className="mt-5 text-xs leading-6 text-sand/45">Close this and keep exploring if you are not ready to start yet.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(circle at top right, rgba(69, 201, 255, 0.24), transparent 34rem), radial-gradient(circle at top left, rgba(18, 59, 255, 0.14), transparent 30rem), linear-gradient(180deg, #F4FBFF 0%, #EAF7FF 46%, #F4FBFF 100%)' }} aria-hidden="true" />

      <div className="relative z-10 px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-7xl">
        <section className="grid gap-8 rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-10">
          <div><span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm"><Zap className="h-4 w-4" />Prompt Engineering Pathway</span><h1 className="mt-6 max-w-5xl text-4xl font-bold tracking-tight text-sand sm:text-5xl lg:text-6xl">Prompt Engineering: engineered instructions for production-ready AI work.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">Prompt engineering is not a list of clever phrases. It is the control layer between human intent and AI output: structured instructions, workflow context, validation rules, and repeatable patterns that teams can trust.</p><p className="mt-4 max-w-3xl text-base leading-8 text-sand/70 sm:text-lg">DeepMind Resources turns prompting into measurable AI competency. Learn how to diagnose the task, design the instruction, inspect the output, and move useful patterns into verified sandbox practice.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Cta href="/auth/signup">Create workspace</Cta><Cta href="/sandbox">Practise in the Sandbox</Cta><Cta href="/academy">Back to Academy</Cta></div></div>
          <div className="rounded-[2rem] border border-sand/10 bg-[#EAF7FF] p-5 shadow-sm sm:p-6 lg:p-7"><div className="rounded-[1.5rem] bg-[#123BFF] p-6 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Prompt control stack</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Diagnose the task. Control the instruction. Validate the output.</h2><div className="mt-6 grid gap-3">{['Task diagnosis before generation', 'Structured instruction architecture', 'Reusable workflow prompt patterns', 'Output validation before production use'].map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" /><p className="text-sm font-semibold leading-6 text-white/90">{item}</p></div>)}</div></div></div>
        </section>

        <section className="py-6"><div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10"><span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm"><MessageSquareText className="h-4 w-4" />Prompt architecture</span><h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">Build prompts as operating instructions, not guesses.</h2><p className="mt-4 max-w-3xl text-base leading-8 text-sand/65">A serious prompt carries intent, context, constraints, output format, quality criteria, and review expectations. That structure is what makes AI output usable inside real workflows.</p><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{stack.map(([title, body, Icon]) => <article key={String(title)} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm"><Icon className="h-6 w-6" /></span><h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{title}</h3><p className="mt-3 text-sm leading-7 text-sand/65">{body}</p></article>)}</div></div></section>

        <section className="py-6"><div className="rounded-[2rem] border border-sand/10 bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"><div><span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm"><Route className="h-4 w-4" />Execution route</span><h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">From vague request to controlled AI workflow.</h2><p className="mt-4 text-base leading-8 text-white/80">Prompt engineering becomes powerful when it is treated as a repeatable path. The route moves from task diagnosis to instruction design, then into validation and reusable workflow assets.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col"><Cta href="/path/fundamentals" light>Revisit AI Fundamentals</Cta><Cta href="/path/agents" light>Continue toward agents</Cta></div></div><div className="grid gap-4">{route.map(([label, title, body]) => <article key={title} className="rounded-3xl bg-white p-5 text-sand shadow-sm"><div className="flex gap-4"><span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7FF] text-sm font-bold text-[#123BFF]">{label}</span><div><h3 className="text-lg font-bold text-sand">{title}</h3><p className="mt-3 text-sm leading-7 text-sand/65">{body}</p></div></div></article>)}</div></div></div></section>

        <section className="py-6"><div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm"><BookOpenCheck className="h-4 w-4" />What the pathway builds</span><h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">Prompt engineering for real work, real tools, and real review.</h2></div><Cta href="/syllabus">View full syllabus</Cta></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{areas.map(([title, body, Icon]) => <article key={String(title)} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7FF] text-[#123BFF] shadow-sm"><Icon className="h-6 w-6" /></span><h3 className="mt-5 text-lg font-bold tracking-tight text-sand">{title}</h3><p className="mt-3 text-sm leading-7 text-sand/65">{body}</p></article>)}</div></div></section>

        <section className="py-6"><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="rounded-[2rem] border border-sand/10 bg-white/90 p-6 shadow-sm sm:p-8 lg:p-10"><span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm"><Sparkles className="h-4 w-4" />Verified sandbox practice</span><h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">Prove the prompt before it reaches the workflow.</h2><p className="mt-4 text-base leading-8 text-sand/65">The Sandbox is where prompt engineering becomes measurable. Users test instructions against realistic tasks, inspect the output, refine the prompt, and learn what should be reviewed before business use.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Cta href="/sandbox">Open the Sandbox</Cta><Cta href="/platform">See the platform loop</Cta></div></div><div className="grid gap-4 sm:grid-cols-2">{sandbox.map((task) => <article key={task} className="rounded-3xl border border-sand/10 bg-white p-5 shadow-sm"><CheckCircle2 className="h-6 w-6 text-[#123BFF]" /><p className="mt-4 text-sm font-semibold leading-7 text-sand/75">{task}</p></article>)}</div></div></section>

        <section className="py-6"><div className="rounded-[2rem] bg-[#123BFF] p-6 text-white shadow-sm sm:p-8 lg:p-10"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#123BFF] shadow-sm"><ShieldCheck className="h-4 w-4" />Build the control layer</span><h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">Start with prompt control, then move into tool intelligence and agent-ready workflows.</h2><p className="mt-4 max-w-3xl text-base leading-8 text-white/80">Turn AI from a casual assistant into a controlled workflow partner with repeatable instructions, review gates, and measurable skill gain.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Cta href="/auth/signup" light>Create workspace</Cta><Cta href="/path/agents" light>Continue to Agent Architecture</Cta></div></div></div></section>
      </div></div>
    </main>
  )
}
