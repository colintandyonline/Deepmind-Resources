import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  FileQuestion,
  GraduationCap,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

type LessonPageParams = {
  moduleSlug: string
  lessonSlug: string
}

type LessonPageSearchParams = {
  score?: string
  tier?: string
  strengths?: string
  advice?: string
  missed?: string
  example?: string
  input?: string
}

type LessonPageProps = {
  params: Promise<LessonPageParams>
  searchParams?: Promise<LessonPageSearchParams>
}

type LessonProgressRow = {
  status: string | null
  progress_percentage: number | null
  completed_at: string | null
  last_seen_at: string | null
}

type Module = (typeof aiFundamentalsLearningPath.modules)[number]
type Lesson = Module['lessons'][number]

type FlatLessonItem = {
  module: Module
  lesson: Lesson
}

type LessonContext = {
  module: Module
  lesson: Lesson
  lessonIndex: number
  flatIndex: number
  previousItem: FlatLessonItem | null
  nextItem: FlatLessonItem | null
}

type LessonTeachingContent = {
  mainIdea: string
  teaching: string[]
  whyItMatters: string
  workedExampleTitle: string
  workedExample: string[]
  practicePrompt: string
  strongerExample: string
  commonMistakeFix: string
  recap: string[]
}

type PracticeCheck = {
  label: string
  passed: boolean
  strength: string
  advice: string
}

type PracticeFeedback = {
  score: number
  tier: string
  learnerInput: string
  strengths: string[]
  advice: string[]
  missedLabels: string[]
  strongerExample: string
}

type TopicProfile = {
  task: string
  audience: string
  context: string
  format: string
  safetyOrReview: string
  constraints: string
}

const searchParamDivider = '~~~'

const specificTeachingBySlug: Record<string, LessonTeachingContent> = {
  'what-you-will-learn-in-ai-fundamentals': {
    mainIdea:
      'AI skill starts with controlled use: clear tasks, useful context, safe boundaries, and review before trust.',
    teaching: [
      'AI Fundamentals is not a warm-up page before the “real” course. It is where the core habits are built. If you skip these habits, advanced prompting, tool choice, agents, and automation become guesswork.',
      'The first habit is task clarity. AI performs better when the job is specific. “Help me with work” gives the model almost nothing to work with. “Turn these meeting notes into five action items with owners and open questions” gives the model a clear job.',
      'The second habit is context. AI does not automatically know your audience, purpose, constraints, company rules, or risk level. You have to provide the context that matters.',
      'The third habit is review. AI output can be polished and still wrong. A capable learner knows which parts need checking before the result is used.',
    ],
    whyItMatters:
      'Most weak AI use comes from treating the model like a magic answer box. Strong AI use treats the model like a powerful assistant inside a controlled workflow.',
    workedExampleTitle: 'The same learner, two different approaches',
    workedExample: [
      'Weak approach: “Write something about AI for my team.” The task is vague, the audience is unclear, and there is no review standard.',
      'Stronger approach: “Draft a short internal note for non-technical staff explaining why AI answers need checking. Use a calm tone, include one example, and finish with three review rules.”',
      'The stronger version works better because it defines the task, audience, tone, content, and success criteria. That is the foundation this course keeps building.',
    ],
    practicePrompt:
      'Write a short AI task instruction. Include what you want the AI to do, who the output is for, what context matters, and how the answer should be checked.',
    strongerExample:
      'Draft a 120-word explanation for non-technical staff about why AI output needs review. Use plain English, include one workplace example, avoid hype, and finish with a checklist of three things to verify before sharing.',
    commonMistakeFix:
      'Do not start with a vague request and hope the tool guesses correctly. Start by defining task, audience, context, limits, and review step.',
    recap: [
      'AI skill is not just knowing terms; it is using AI in a controlled way.',
      'A good AI task includes task, context, output shape, and review expectations.',
      'The learner stays responsible for checking important output before using it.',
    ],
  },
  'how-deepmind-resources-teaches-ai': {
    mainIdea:
      'The Academy teaches AI as a living skill: learn the concept, practise it, prove it, then refresh it when tools change.',
    teaching: [
      'AI training goes stale when it treats lessons as fixed forever. Tools change. Models change. File handling changes. Search, memory, coding, and automation features change.',
      'That is why this learning path connects lessons to practice. Reading gives you understanding, but practice shows whether you can apply the idea.',
      'The important pattern is simple: learn the concept, apply it to a realistic task, check the result, and save evidence of progress.',
      'When AI changes affect a lesson, the platform can later point learners back to a refresher. That is how training remains useful instead of becoming an archive of old advice.',
    ],
    whyItMatters:
      'If your AI skill is based on outdated workflows, you can make confident mistakes. A version-aware course protects against that.',
    workedExampleTitle: 'A tool changes how file answers work',
    workedExample: [
      'Imagine you learned a workflow for asking questions about uploaded files. Later, the tool changes how it searches those files.',
      'A static course leaves the old workflow untouched. A living course can flag that lesson for review and add a new practice task.',
      'The point is not to chase every update. The point is to update training when behaviour changes what users should do.',
    ],
    practicePrompt:
      'Write a short example of an AI workflow that might need retraining after a tool update. Include what changed and what the learner should recheck.',
    strongerExample:
      'If an AI tool changes how it searches uploaded policy documents, staff should recheck any workflow that relies on policy answers. The refresher should test whether answers cite the right section, avoid unsupported claims, and include a human review step before use.',
    commonMistakeFix:
      'Do not assume an old AI workflow remains safe forever. Recheck workflows when the tool behaviour changes.',
    recap: [
      'AI lessons should connect to practice, not just explanation.',
      'Progress should be based on skill evidence, not page views.',
      'Important tool changes can create refresher training.',
    ],
  },
  'ai-skill-levels-beginner-user-builder-manager': {
    mainIdea:
      'AI competency depends on role. A beginner, daily user, builder, and manager need different levels of training.',
    teaching: [
      'AI skill is not one single ladder that everyone climbs in the same way. A beginner needs safe foundations. A practical user needs repeatable prompting and review habits. A builder needs systems thinking. A manager needs risk awareness and staff-readiness signals.',
      'A receptionist using AI to draft customer replies does not need the same training as a developer building a retrieval workflow. A manager approving team use needs different training again.',
      'Good AI training starts by asking what the person is responsible for. The more impact their AI use has, the more review, privacy, and workflow control they need.',
    ],
    whyItMatters:
      'Role-aware training prevents people from being overwhelmed by the wrong material or undertrained for high-risk responsibilities.',
    workedExampleTitle: 'Four people, four training needs',
    workedExample: [
      'A beginner needs to understand that AI output is not automatically true.',
      'A daily user needs to know how to write a structured prompt and check the answer.',
      'A builder needs to design tools, retrieval, permissions, and failure handling.',
      'A manager needs to assign training, set safe-use rules, and understand whether staff can apply AI responsibly.',
    ],
    practicePrompt:
      'Choose one role: beginner, daily AI user, builder, or manager. Write what that person needs to learn first and why.',
    strongerExample:
      'A customer support team member should first learn safe drafting, privacy boundaries, and output review. They do not need agent architecture yet. Their first skill is writing controlled replies that do not expose data, overpromise, or skip human review.',
    commonMistakeFix:
      'Do not give everyone the same AI training. Match the training depth to the role, task, and risk.',
    recap: [
      'Different AI roles need different skills.',
      'Higher-impact work needs stronger review and control.',
      'Training should match what the learner is expected to do.',
    ],
  },
  'baseline-check-what-do-you-already-understand': {
    mainIdea:
      'A baseline check is a starting measurement. It shows what you understand now and what needs attention next.',
    teaching: [
      'A baseline is not a pass-or-fail exam. It is a map of your starting point.',
      'The best way to use a baseline is to answer honestly. Guessing to look advanced does not help. The course can only guide you well if the starting signal is realistic.',
      'The baseline checks concepts, tool awareness, prompt habits, privacy, and output trust because those are the foundations of safe AI use.',
    ],
    whyItMatters:
      'Without a baseline, progress becomes vague. With a baseline, you can see whether your judgement and confidence are improving.',
    workedExampleTitle: 'A low score can still be useful',
    workedExample: [
      'A learner may understand privacy risks but struggle with tool categories. That does not mean they failed; it tells them where to focus next.',
      'Another learner may feel confident with prompts but miss questions about hallucination. That is a useful warning: polished answers may be getting trusted too quickly.',
    ],
    practicePrompt:
      'Write one AI topic you already understand, one topic you are unsure about, and one skill you want to improve first.',
    strongerExample:
      'I understand that AI can draft text, but I am unsure how to check whether factual claims are reliable. My first skill goal is learning how to spot unsupported claims and add a review step before using AI output.',
    commonMistakeFix:
      'Do not treat uncertainty as failure. Use it as the route marker for what to learn next.',
    recap: [
      'A baseline records where you are starting.',
      'Honest uncertainty is useful training data.',
      'Progress should become visible as you practise.',
    ],
  },
  'what-artificial-intelligence-means-in-practical-terms': {
    mainIdea:
      'Artificial intelligence is software that performs tasks using patterns, data, models, rules, or learned behaviour.',
    teaching: [
      'In practical terms, AI is not one thing. A chatbot, coding assistant, image generator, research tool, and automation workflow can all use AI, but they do different jobs.',
      'The useful question is not just “is this AI?” The useful question is “what task is this system performing, what information is it using, and how should the result be checked?”',
      'That shift matters because different AI tasks carry different risks. Drafting a first version of an email is not the same as making a legal decision or triggering an automated payment.',
    ],
    whyItMatters:
      'Clear definitions prevent vague thinking. Vague thinking leads to bad tool choices and unsafe trust.',
    workedExampleTitle: 'AI as task support',
    workedExample: [
      'Autocomplete predicts text. A chatbot generates a response. A research assistant may search and summarise sources. An automation tool may move data between systems.',
      'All of these can involve AI, but they do not require the same controls.',
      'A practical learner identifies the task first, then decides how much review is needed.',
    ],
    practicePrompt:
      'Describe one AI tool or feature you use. Name the task it performs, the input it needs, and the review step required before using the output.',
    strongerExample:
      'A chatbot can draft a customer email from order notes. The input is the customer issue, order status, tone requirement, and company policy. The review step is checking the facts, removing unsupported promises, and confirming the reply follows policy.',
    commonMistakeFix:
      'Do not use “AI” as a vague label. Name the task: draft, classify, retrieve, compare, generate, summarise, or automate.',
    recap: [
      'AI is a broad category of task-performing systems.',
      'Different AI tasks need different review standards.',
      'The safest habit is to identify the task before trusting the output.',
    ],
  },
  'what-large-language-models-are': {
    mainIdea:
      'A large language model generates likely language from patterns and context. It can be useful without being automatically truthful.',
    teaching: [
      'Large language models are trained to produce language that fits the prompt and surrounding context. That makes them useful for drafting, explaining, summarising, rewriting, coding, planning, and structuring information.',
      'But the model is not automatically checking truth. It may answer from patterns, incomplete context, or a wrong assumption.',
      'This is why fluent writing must be separated from verified information. An answer can look professional and still need checking.',
    ],
    whyItMatters:
      'When you understand what a language model is, you stop treating it as a guaranteed fact source.',
    workedExampleTitle: 'Fluent output needs review',
    workedExample: [
      'If you provide a policy document and ask for a summary, the model can transform that supplied context into a useful draft.',
      'If you ask about a policy it has not seen, it may still produce a confident answer.',
      'Both answers may sound good. Only the first is grounded in the supplied source.',
    ],
    practicePrompt:
      'Write an instruction for a language model that includes a task, context, output format, and a reminder to flag uncertainty.',
    strongerExample:
      'Summarise the pasted policy for new staff in five bullet points. Use only the supplied text. If a detail is missing, write “not stated in the source” instead of guessing.',
    commonMistakeFix:
      'Do not treat fluent output as verified truth. Ask what source or context supports it.',
    recap: [
      'Language models generate useful text from patterns and context.',
      'Fluent does not mean verified.',
      'Important claims still need checking.',
    ],
  },
  'why-ai-sounds-confident-even-when-wrong': {
    mainIdea:
      'AI often sounds confident because it is good at producing polished language, not because every claim has been verified.',
    teaching: [
      'A model can use confident wording, neat formatting, and detailed explanations even when the answer is incomplete or unsupported.',
      'Confidence is a tone signal. It is not an accuracy signal.',
      'A careful learner looks for evidence, uncertainty, assumptions, and whether the answer is grounded in the information provided.',
    ],
    whyItMatters:
      'Many AI mistakes are accepted because the answer sounds professional.',
    workedExampleTitle: 'A risky confident claim',
    workedExample: [
      'An AI answer says, “This process is fully compliant.” That sounds reassuring, but it is a high-impact claim.',
      'A safer answer would say what was checked, what remains uncertain, and who should review it.',
      'The issue is not whether the answer sounds helpful. The issue is whether it is safe to rely on.',
    ],
    practicePrompt:
      'Write a review instruction that tells AI to flag unsupported claims, assumptions, and anything that needs a human check.',
    strongerExample:
      'Review this answer and mark each factual claim as supported, unsupported, or needing a source. Do not treat confident wording as evidence. List any assumptions and recommend what a human should verify before use.',
    commonMistakeFix:
      'Do not trust polish. Check support.',
    recap: [
      'Confident tone is not proof.',
      'Important claims need evidence.',
      'Safe AI use includes a review step.',
    ],
  },
  'prediction-reasoning-retrieval-and-automation': {
    mainIdea:
      'Prediction, reasoning-style output, retrieval, and automation are different parts of AI workflows.',
    teaching: [
      'Prediction means the model generates likely output from patterns and context. Reasoning-style output means the model works through a task or plan. Retrieval means the system pulls information from files, search, or a knowledge base. Automation means software takes an action.',
      'These can appear together, but they are not the same. Drafting an answer is not the same as retrieving a source. Suggesting an action is not the same as performing it.',
      'A safe workflow separates these steps so each one can be checked properly.',
    ],
    whyItMatters:
      'Confusing these concepts leads to poor tool choice and unsafe automation.',
    workedExampleTitle: 'A support workflow split into steps',
    workedExample: [
      'A support assistant may draft a reply, retrieve the refund policy, reason about whether the case fits the policy, and prepare a refund request.',
      'The reply can be drafted quickly. The policy needs source checking. The refund request needs permission and review.',
      'Good workflow design keeps those controls separate.',
    ],
    practicePrompt:
      'Describe an AI workflow and label which steps are generation, retrieval, reasoning, or automation.',
    strongerExample:
      'For a customer refund workflow: generate a draft reply, retrieve the refund policy, compare the case against the policy, then ask a human to approve any refund action before it is submitted.',
    commonMistakeFix:
      'Do not let an AI action run just because the explanation sounded reasonable. Separate advice from action.',
    recap: [
      'Generation, retrieval, reasoning, and automation are different.',
      'Automation needs stronger controls.',
      'Good workflows separate steps for review.',
    ],
  },
  'prompts-context-and-instructions': {
    mainIdea:
      'A prompt is an instruction package: task, context, constraints, output format, and review rules.',
    teaching: [
      'A weak prompt makes the model guess. A strong prompt gives it the information needed to produce useful output.',
      'The goal is not to write long prompts. The goal is to include the right information.',
      'A good instruction explains what you want, who it is for, what background matters, what format you need, and what the model should avoid.',
    ],
    whyItMatters:
      'Better instructions reduce vague output, bad assumptions, and unnecessary rewrites.',
    workedExampleTitle: 'Weak prompt to strong prompt',
    workedExample: [
      'Weak: “Write an email.”',
      'Stronger: “Draft a polite email to a customer whose delivery is delayed. Keep it under 120 words, apologise once, do not offer compensation, and include a line saying I will confirm the new delivery date.”',
      'The stronger prompt defines task, audience, tone, limit, and business rule.',
    ],
    practicePrompt:
      'Write a prompt for a real or sample task. Include task, context, format, constraints, and review expectations.',
    strongerExample:
      'Turn these meeting notes into a table with action item, owner, deadline, and open question. Use only the notes provided. If an owner or deadline is missing, write “not stated” instead of guessing.',
    commonMistakeFix:
      'Do not add more words without adding useful context. Add the missing task details, limits, and review criteria.',
    recap: [
      'Prompts work best when they brief the model clearly.',
      'Context and constraints matter.',
      'Review expectations should be part of the instruction.',
    ],
  },
}

function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = getSupabaseKey()

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server components cannot always write cookies during render.
        }
      },
    },
  })
}

function getFlatLessons() {
  return aiFundamentalsLearningPath.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      module,
      lesson,
    })),
  )
}

function getLessonContext(moduleSlug: string, lessonSlug: string): LessonContext | null {
  const module = aiFundamentalsLearningPath.modules.find((item) => item.slug === moduleSlug)

  if (!module) {
    return null
  }

  const lessonIndex = module.lessons.findIndex((item) => item.slug === lessonSlug)

  if (lessonIndex === -1) {
    return null
  }

  const lesson = module.lessons[lessonIndex]
  const flatLessons = getFlatLessons()
  const flatIndex = flatLessons.findIndex(
    (item) => item.module.slug === module.slug && item.lesson.slug === lesson.slug,
  )

  return {
    module,
    lesson,
    lessonIndex,
    flatIndex,
    previousItem: flatIndex > 0 ? flatLessons[flatIndex - 1] : null,
    nextItem: flatIndex >= 0 && flatIndex < flatLessons.length - 1 ? flatLessons[flatIndex + 1] : null,
  }
}

function getLessonHref(item: FlatLessonItem) {
  return `/academy/learn/fundamentals/module/${item.module.slug}/lesson/${item.lesson.slug}`
}

function getLessonVersionId(lesson: Lesson) {
  return `${lesson.id}-v${lesson.versionNumber}`
}

function getBlockLabel(block: string) {
  return block
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function getFallbackTeachingContent(context: LessonContext): LessonTeachingContent {
  const { module, lesson } = context

  return {
    mainIdea: lesson.outcome,
    teaching: [
      `${lesson.title} belongs to ${module.title}. The skill is practical: understand the idea, use it in a task, and know what to check before relying on the result.`,
      lesson.outcome,
      'As you read, focus on behaviour. What would you do differently when writing a prompt, choosing a tool, checking an answer, or deciding whether AI is safe for the task?',
    ],
    whyItMatters:
      'AI skill is built through judgement. A useful learner can explain the concept, apply it to a task, and avoid the mistake that would make the output weak or risky.',
    workedExampleTitle: 'Apply the lesson to a realistic AI task',
    workedExample: [
      lesson.practicalExample,
      'The practical move is to define the task, add context, set the expected output, and decide how the result will be reviewed.',
      'That turns the idea from a definition into a working habit.',
    ],
    practicePrompt:
      'Write a short AI instruction or workflow note that applies this lesson. Include the task, context, expected output, and review step.',
    strongerExample:
      'Use AI to draft a first version of the output, but provide the source material, define the audience, state the constraints, and require unsupported claims to be flagged before the answer is used.',
    commonMistakeFix: lesson.commonMistake,
    recap: [
      'Explain the concept in plain English.',
      'Apply it to a realistic task.',
      'Name the review step that keeps the output safe or useful.',
    ],
  }
}

function getTeachingContent(context: LessonContext) {
  return specificTeachingBySlug[context.lesson.slug] ?? getFallbackTeachingContent(context)
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word))
}

function cleanInput(input: string) {
  return input.replace(/\s+/g, ' ').trim()
}

function limitText(input: string, maxLength: number) {
  const cleaned = cleanInput(input)

  if (cleaned.length <= maxLength) {
    return cleaned
  }

  return `${cleaned.slice(0, maxLength - 1).trim()}…`
}

function inferTopicProfile(rawInput: string): TopicProfile {
  const text = rawInput.toLowerCase()
  const taskSummary = limitText(rawInput, 150)

  if (includesAny(text, ['tyre', 'tire', 'wheel', 'puncture', 'flat tyre', 'flat tire'])) {
    return {
      task: 'Create a plain-English, step-by-step safety checklist for changing a car tyre',
      audience: includesAny(text, ['beginner', 'new driver', 'learner'])
        ? 'a beginner driver'
        : 'a driver who may not have changed a tyre before',
      context: includesAny(text, ['roadside', 'motorway', 'highway'])
        ? 'at the roadside, where traffic and location safety matter'
        : 'in a realistic roadside or driveway situation where the ground, traffic, tools, and weather may affect safety',
      format: includesAny(text, ['bullet', 'bullets'])
        ? 'bullet points under clear headings'
        : 'clear sections with short bullet points',
      safetyOrReview:
        'include when not to attempt the change, when to call roadside assistance, and final checks before driving',
      constraints:
        'avoid risky shortcuts, do not assume the reader knows where the jack point is, and keep the language plain',
    }
  }

  if (includesAny(text, ['customer', 'client', 'support', 'complaint', 'refund', 'delivery'])) {
    return {
      task: 'Draft a customer support response',
      audience: includesAny(text, ['customer']) ? 'the customer' : 'a customer or client',
      context:
        'based on the customer issue, company policy, what is known, and what still needs checking',
      format: includesAny(text, ['email']) ? 'a short email' : 'a clear customer message',
      safetyOrReview:
        'check order details, avoid unsupported promises, and flag anything that needs approval',
      constraints: 'use a calm tone, keep it concise, and do not invent policy or compensation details',
    }
  }

  if (includesAny(text, ['meeting', 'notes', 'minutes', 'action items', 'actions'])) {
    return {
      task: 'Turn meeting notes into a useful follow-up summary',
      audience: 'the meeting attendees or project team',
      context: 'using only the supplied meeting notes and any known project constraints',
      format: 'a table with action item, owner, deadline, and open question',
      safetyOrReview: 'mark missing owners or dates as not stated instead of guessing',
      constraints: 'keep the output concise and separate confirmed actions from assumptions',
    }
  }

  if (includesAny(text, ['policy', 'procedure', 'compliance', 'handbook', 'guidance'])) {
    return {
      task: 'Summarise a policy or procedure',
      audience: 'staff who need to follow the policy',
      context: 'using only the supplied source text',
      format: 'plain-English bullet points with a short checklist',
      safetyOrReview: 'flag anything not stated in the source and recommend human review for high-risk points',
      constraints: 'do not invent rules, legal obligations, or approvals',
    }
  }

  if (includesAny(text, ['code', 'bug', 'function', 'component', 'typescript', 'javascript', 'error'])) {
    return {
      task: 'Review or improve a code-related task',
      audience: 'a developer working on the project',
      context: 'using the exact error, file, expected behaviour, and current constraints',
      format: 'a short diagnosis followed by a safe fix plan',
      safetyOrReview: 'explain what should be tested before the change is trusted',
      constraints: 'do not refactor unrelated code or guess missing project context',
    }
  }

  return {
    task: taskSummary
      ? `Improve this AI instruction: ${taskSummary}`
      : 'Create a clearer AI instruction for the task',
    audience: includesAny(text, ['staff', 'team'])
      ? 'the relevant staff or team'
      : 'the intended reader or user',
    context: 'the situation, source material, background, or constraints the AI needs before answering',
    format: includesAny(text, ['bullet', 'table', 'checklist'])
      ? 'the requested structured format'
      : 'a clear format such as bullets, a table, a checklist, or a short answer',
    safetyOrReview: 'state what should be checked before the output is trusted or used',
    constraints: 'avoid assumptions, unsupported claims, and vague output',
  }
}

function buildPersonalisedExample(rawInput: string) {
  const profile = inferTopicProfile(rawInput)

  return `${profile.task} for ${profile.audience}. Set the context: ${profile.context}. Format the answer as ${profile.format}. Add a safety and review rule: ${profile.safetyOrReview}. Constraints: ${profile.constraints}.`
}

function getPracticeChecks(input: string): PracticeCheck[] {
  const trimmed = cleanInput(input)
  const text = trimmed.toLowerCase()

  return [
    {
      label: 'Task clarity',
      passed:
        trimmed.length >= 45 &&
        includesAny(text, [
          'draft',
          'write',
          'summarise',
          'summarize',
          'compare',
          'review',
          'classify',
          'explain',
          'turn',
          'create',
          'list',
          'plan',
        ]),
      strength: 'Your input gives the AI a recognisable task to perform.',
      advice:
        'Make the task unmistakable. Start with a strong verb such as create, draft, review, compare, list, summarise, or explain.',
    },
    {
      label: 'Audience',
      passed: includesAny(text, [
        'beginner',
        'driver',
        'customer',
        'client',
        'staff',
        'team',
        'manager',
        'learner',
        'student',
        'reader',
        'user',
        'non-technical',
        'non technical',
      ]),
      strength: 'You named or implied who the output is for.',
      advice:
        'Add the audience. Say who will use the answer, for example a beginner driver, non-technical staff member, customer, manager, or learner.',
    },
    {
      label: 'Context',
      passed: includesAny(text, [
        'context',
        'source',
        'document',
        'policy',
        'notes',
        'roadside',
        'driveway',
        'traffic',
        'workplace',
        'company',
        'order',
        'meeting',
        'background',
        'scenario',
        'situation',
      ]),
      strength: 'You gave context so the answer does not have to rely only on guesswork.',
      advice:
        'Add the situation. Include where the task happens, what source material matters, or what background the AI needs.',
    },
    {
      label: 'Output shape',
      passed: includesAny(text, [
        'bullet',
        'bullets',
        'table',
        'checklist',
        'steps',
        'step-by-step',
        'step by step',
        'plain english',
        'short',
        'words',
        'headings',
        'sections',
        'format',
      ]),
      strength: 'You gave the output a useful shape or quality standard.',
      advice:
        'Define the output shape. Ask for bullets, sections, a checklist, a table, a word limit, or a plain-English structure.',
    },
    {
      label: 'Boundaries',
      passed: includesAny(text, [
        'do not',
        "don't",
        'avoid',
        'must',
        'should',
        'include',
        'only',
        'safe',
        'safely',
        'safety',
        'important',
        'most important',
        'risk',
      ]),
      strength: 'You gave the AI at least one boundary or priority.',
      advice:
        'Add boundaries. Say what must be included, what should be avoided, or which risks matter most.',
    },
    {
      label: 'Review step',
      passed: includesAny(text, [
        'check',
        'review',
        'verify',
        'confirm',
        'source',
        'evidence',
        'unsupported',
        'assumption',
        'warning',
        'call',
        'stop',
        'final checks',
        'before using',
        'before sharing',
      ]),
      strength: 'You included a review, warning, or verification habit.',
      advice:
        'Add a review step. Say what the learner should check, when to stop, what needs verification, or when a human should review the output.',
    },
  ]
}

function evaluatePracticeSubmission(input: string): PracticeFeedback {
  const learnerInput = limitText(input, 700)
  const checks = getPracticeChecks(learnerInput)
  const passedChecks = checks.filter((check) => check.passed)
  const missedChecks = checks.filter((check) => !check.passed)
  const score = Math.round((passedChecks.length / checks.length) * 100)
  const tier = score >= 84 ? 'Strong' : score >= 60 ? 'Developing' : 'Needs work'

  return {
    score,
    tier,
    learnerInput,
    strengths:
      passedChecks.length > 0
        ? passedChecks.map((check) => check.strength).slice(0, 4)
        : ['You made a start. Now make the task more specific so it can be assessed properly.'],
    advice:
      missedChecks.length > 0
        ? missedChecks.map((check) => check.advice).slice(0, 4)
        : [
            'Strong structure. Copy the better version below, then try tightening the review rule for the specific risk level of this task.',
          ],
    missedLabels: missedChecks.map((check) => check.label),
    strongerExample: buildPersonalisedExample(learnerInput),
  }
}

function splitSearchList(value: string | undefined) {
  if (!value) {
    return []
  }

  return value.split(searchParamDivider).filter(Boolean)
}

function getPracticeFeedback(searchParams: LessonPageSearchParams | undefined): PracticeFeedback | null {
  if (!searchParams?.score || !searchParams.tier) {
    return null
  }

  const score = Number(searchParams.score)

  if (Number.isNaN(score)) {
    return null
  }

  return {
    score,
    tier: searchParams.tier,
    learnerInput: searchParams.input ?? '',
    strengths: splitSearchList(searchParams.strengths),
    advice: splitSearchList(searchParams.advice),
    missedLabels: splitSearchList(searchParams.missed),
    strongerExample: searchParams.example ?? '',
  }
}


function getTierPanelClass(tier: string) {
  if (tier === 'Strong') {
    return 'border-emerald-200 bg-emerald-50/70'
  }

  if (tier === 'Developing') {
    return 'border-amber-200 bg-amber-50/75'
  }

  return 'border-rose-200 bg-rose-50/75'
}

function getTierScoreClass(tier: string) {
  if (tier === 'Strong') {
    return 'bg-emerald-600 text-white'
  }

  if (tier === 'Developing') {
    return 'bg-amber-500 text-white'
  }

  return 'bg-rose-600 text-white'
}

function getTierGuidance(tier: string) {
  if (tier === 'Strong') {
    return 'Strong structure. Copy the better version, test it in an AI tool, then compare the result with your first attempt.'
  }

  if (tier === 'Developing') {
    return 'Good start. Fix the missing areas, copy the better version, and notice how the task becomes easier for the AI to follow.'
  }

  return 'This needs more structure before it becomes a reliable AI instruction. Use the better version below as your next attempt.'
}
async function reviewPracticeInput(formData: FormData) {
  'use server'

  const moduleSlug = formData.get('moduleSlug')
  const lessonSlug = formData.get('lessonSlug')
  const learnerInput = formData.get('learnerInput')

  if (typeof moduleSlug !== 'string' || typeof lessonSlug !== 'string') {
    throw new Error('Missing lesson route data.')
  }

  if (typeof learnerInput !== 'string') {
    throw new Error('Missing practice input.')
  }

  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    throw new Error('Lesson could not be found.')
  }

  const evaluation = evaluatePracticeSubmission(learnerInput)
  const query = new URLSearchParams()

  query.set('score', String(evaluation.score))
  query.set('tier', evaluation.tier)
  query.set('input', evaluation.learnerInput)
  query.set('strengths', evaluation.strengths.join(searchParamDivider))
  query.set('advice', evaluation.advice.join(searchParamDivider))
  query.set('missed', evaluation.missedLabels.join(searchParamDivider))
  query.set('example', evaluation.strongerExample)

  redirect(`/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}?${query.toString()}#practice`)
}

async function completeLesson(formData: FormData) {
  'use server'

  const moduleSlug = formData.get('moduleSlug')
  const lessonSlug = formData.get('lessonSlug')

  if (typeof moduleSlug !== 'string' || typeof lessonSlug !== 'string') {
    throw new Error('Missing lesson route data.')
  }

  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    throw new Error('Lesson could not be found.')
  }

  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    redirect('/auth/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const now = new Date().toISOString()
  const nextHref = context.nextItem ? getLessonHref(context.nextItem) : '/academy/learn/fundamentals'

  const { data: existingRows, error: readError } = await supabase
    .from('user_lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .eq('lesson_id', context.lesson.id)
    .limit(1)

  if (readError) {
    throw new Error(`Could not read lesson progress: ${readError.message}`)
  }

  if (existingRows && existingRows.length > 0) {
    const { error: updateError } = await supabase
      .from('user_lesson_progress')
      .update({
        lesson_version_id: getLessonVersionId(context.lesson),
        status: 'completed',
        progress_percentage: 100,
        completed_at: now,
        last_seen_at: now,
      })
      .eq('user_id', user.id)
      .eq('lesson_id', context.lesson.id)

    if (updateError) {
      throw new Error(`Could not update lesson progress: ${updateError.message}`)
    }
  } else {
    const { error: insertError } = await supabase.from('user_lesson_progress').insert({
      user_id: user.id,
      lesson_id: context.lesson.id,
      lesson_version_id: getLessonVersionId(context.lesson),
      status: 'completed',
      progress_percentage: 100,
      started_at: now,
      completed_at: now,
      last_seen_at: now,
    })

    if (insertError) {
      throw new Error(`Could not save lesson progress: ${insertError.message}`)
    }
  }

  redirect(nextHref)
}

function IconTile({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
        solid
          ? 'bg-white text-blue-700'
          : 'bg-gradient-to-br from-blue-600 to-[#0A63FF] text-white shadow-blue-900/20'
      }`}
    >
      {children}
    </span>
  )
}

function LessonSection({
  number,
  eyebrow,
  title,
  children,
  icon,
}: {
  number: string
  eyebrow: string
  title: string
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <IconTile>{icon}</IconTile>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                {eyebrow}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
            </div>
          </div>

          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function generateStaticParams() {
  return aiFundamentalsLearningPath.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleSlug: module.slug,
      lessonSlug: lesson.slug,
    })),
  )
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params
  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    notFound()
  }

  return {
    title: `${context.lesson.title} | AI Fundamentals Lesson | DeepMind Resources Academy`,
    description: context.lesson.outcome,
    alternates: {
      canonical: `https://deepmindresources.pro/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}`,
    },
    openGraph: {
      title: `${context.lesson.title} | AI Fundamentals Lesson`,
      description: context.lesson.outcome,
      url: `https://deepmindresources.pro/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}`,
      siteName: 'DeepMind Resources',
      type: 'website',
    },
  }
}

export default async function AIFundamentalsLessonPage({ params, searchParams }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    notFound()
  }

  const { module, lesson, lessonIndex, flatIndex, previousItem, nextItem } = context
  const teaching = getTeachingContent(context)
  const practiceFeedback = getPracticeFeedback(resolvedSearchParams)
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    redirect('/auth/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: progressRows } = await supabase
    .from('user_lesson_progress')
    .select('status, progress_percentage, completed_at, last_seen_at')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .limit(1)

  const progress = ((progressRows ?? []) as LessonProgressRow[])[0] ?? null
  const isCompleted = progress?.status === 'completed' || Boolean(progress?.completed_at)
  const nextHref = nextItem ? getLessonHref(nextItem) : '/academy/learn/fundamentals'

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.title,
      description: lesson.outcome,
      position: flatIndex + 1,
      isPartOf: {
        '@type': 'Course',
        name: module.title,
        url: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
      },
      provider: {
        '@type': 'Organization',
        name: 'DeepMind Resources',
        url: 'https://deepmindresources.pro',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Dashboard',
          item: 'https://deepmindresources.pro/dashboard',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI Fundamentals',
          item: 'https://deepmindresources.pro/academy/learn/fundamentals',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: module.title,
          item: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: lesson.title,
          item: `https://deepmindresources.pro/academy/learn/fundamentals/module/${module.slug}/lesson/${lesson.slug}`,
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-[#eef7ff] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.addEventListener('click',async function(event){var target=event.target;var trigger=target&&target.closest?target.closest('[data-copy-better-prompt]'):null;if(!trigger){return;}var text=trigger.getAttribute('data-copy-better-prompt')||'';var original=trigger.getAttribute('data-copy-label')||trigger.textContent;try{await navigator.clipboard.writeText(text);trigger.textContent='Copied — paste this into your AI tool';setTimeout(function(){trigger.textContent=original;},2200);}catch(error){trigger.textContent='Copy unavailable — select the text below';setTimeout(function(){trigger.textContent=original;},2200);}});",
        }}
      />

      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/academy/learn/fundamentals" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-900/20">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                DeepMind Resources Academy
              </span>
              <span className="block truncate text-base font-black tracking-tight text-slate-950 sm:text-lg">
                AI Fundamentals
              </span>
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-2">
            <Link
              href={`/academy/learn/fundamentals/module/${module.slug}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:text-sm"
            >
              Module
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:text-sm"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/10">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-24 right-56 h-64 w-64 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative z-10 grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-center">
            <div className="min-w-0">
              <Link
                href={`/academy/learn/fundamentals/module/${module.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700 transition hover:border-blue-200 hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to module
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Lesson {lessonIndex + 1} of {module.lessons.length}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                  Module {module.moduleNumber}: {module.title}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {lesson.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {teaching.mainIdea}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-blue-700 bg-blue-600 p-5 text-white shadow-2xl shadow-blue-900/25">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                Lesson flow
              </p>

              <div className="mt-4 space-y-3">
                {['Learn the idea', 'See it used', 'Try your own input', 'Check and improve'].map(
                  (step, index) => (
                    <div key={step} className="rounded-2xl border border-white/15 bg-white/10 p-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-black text-blue-700">
                          {index + 1}
                        </span>
                        <p className="text-sm font-black text-white">{step}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                  Progress
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {isCompleted ? 'Completed' : 'Ready'}
                </p>
                <p className="mt-2 text-sm leading-6 text-blue-50">
                  {isCompleted
                    ? 'This lesson has already been saved as complete.'
                    : 'Finish the practice section before marking this lesson complete.'}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-5">
            <LessonSection
              number="1"
              eyebrow="Learn"
              title="Understand the idea"
              icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <div className="space-y-4">
                {teaching.teaching.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Why this matters
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{teaching.whyItMatters}</p>
              </div>
            </LessonSection>

            <LessonSection
              number="2"
              eyebrow="Example"
              title={teaching.workedExampleTitle}
              icon={<Code2 className="h-5 w-5" aria-hidden="true" />}
            >
              <div className="space-y-4">
                {teaching.workedExample.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </LessonSection>

            <LessonSection
              number="3"
              eyebrow="Practice"
              title="Try your own input"
              icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
            >
              <div id="practice" className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-black leading-6 text-slate-950">{teaching.practicePrompt}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The checker looks for task clarity, audience, context, output shape, boundaries, and a review step. It then rewrites the example around your actual task.
                </p>
              </div>

              <form action={reviewPracticeInput} className="mt-5 space-y-4">
                <input type="hidden" name="moduleSlug" value={module.slug} />
                <input type="hidden" name="lessonSlug" value={lesson.slug} />
                <textarea
                  name="learnerInput"
                  required
                  minLength={40}
                  rows={7}
                  defaultValue={practiceFeedback?.learnerInput ?? ''}
                  className="w-full rounded-3xl border border-blue-100 bg-white p-4 text-sm leading-7 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  placeholder="Write your practice input here. Include the task, who it is for, the situation, the output format, and what should be checked."
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
                >
                  Check my input
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>

              {practiceFeedback ? (
                <div className={`mt-5 rounded-3xl border p-4 shadow-sm ${getTierPanelClass(practiceFeedback.tier)}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
                        Practice result
                      </p>
                      <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                        {practiceFeedback.tier}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-700">
                        {getTierGuidance(practiceFeedback.tier)}
                      </p>
                    </div>
                    <span className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl text-xl font-black ${getTierScoreClass(practiceFeedback.tier)}`}>
                      {practiceFeedback.score}%
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                      Your input reviewed
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{practiceFeedback.learnerInput}</p>
                  </div>

                  {practiceFeedback.missedLabels.length > 0 ? (
                    <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-rose-700">
                        Areas to improve
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {practiceFeedback.missedLabels.map((label) => (
                          <span
                            key={label}
                            className="inline-flex rounded-full border border-rose-100 bg-white px-3 py-1.5 text-xs font-black text-rose-700"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700">
                        What worked
                      </p>
                      <ul className="mt-3 space-y-2">
                        {practiceFeedback.strengths.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">
                        Improve next
                      </p>
                      <ul className="mt-3 space-y-2">
                        {practiceFeedback.advice.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <FileQuestion className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700">
                          Better version of your input
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                          Copy this version, paste it into your AI tool, and compare the result with your first attempt.
                        </p>
                      </div>
                      <button
                        type="button"
                        data-copy-better-prompt={practiceFeedback.strongerExample}
                        data-copy-label="Copy better prompt"
                        className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-indigo-900/20 transition hover:bg-indigo-700"
                      >
                        Copy better prompt
                      </button>
                    </div>

                    <div className="mt-4 rounded-2xl border border-indigo-100 bg-white p-4">
                      <p className="text-sm leading-7 text-slate-800">{practiceFeedback.strongerExample}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </LessonSection>

            <LessonSection
              number="4"
              eyebrow="Fix"
              title="Avoid the common mistake"
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <p className="text-base leading-8 text-slate-600">{lesson.commonMistake}</p>

              <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Practical fix
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{teaching.commonMistakeFix}</p>
              </div>
            </LessonSection>

            <LessonSection
              number="5"
              eyebrow="Recap"
              title="Check your understanding"
              icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <div className="grid gap-3">
                {teaching.recap.map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </LessonSection>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <div className="flex items-center gap-3">
                <IconTile>
                  <Route className="h-5 w-5" aria-hidden="true" />
                </IconTile>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                    Route
                  </p>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">Keep moving</h2>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href={`/academy/learn/fundamentals/module/${module.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Module
                  </p>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-950">{module.title}</p>
                </Link>

                {previousItem ? (
                  <Link
                    href={getLessonHref(previousItem)}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                      Previous
                    </p>
                    <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                      {previousItem.lesson.title}
                    </p>
                  </Link>
                ) : null}

                <Link
                  href={nextHref}
                  className="block rounded-2xl border border-blue-100 bg-blue-50 p-4 transition hover:border-blue-200 hover:bg-white"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Next
                  </p>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                    {nextItem ? nextItem.lesson.title : 'Course overview'}
                  </p>
                </Link>
              </div>
            </section>

            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Skill focus
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lesson.blocks.map((block) => (
                  <span
                    key={block}
                    className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700"
                  >
                    {getBlockLabel(block)}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Complete
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                {isCompleted ? 'Lesson complete' : 'Finish this lesson'}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mark the lesson complete after you have read the teaching, tried the practice input, and reviewed the feedback.
              </p>

              <form action={completeLesson} className="mt-5">
                <input type="hidden" name="moduleSlug" value={module.slug} />
                <input type="hidden" name="lessonSlug" value={lesson.slug} />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
                >
                  {isCompleted ? 'Continue to next lesson' : 'Complete lesson'}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </section>
          </aside>
        </section>

        <footer className="mt-6 flex flex-col gap-3 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <IconTile>
              <Target className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <div>
              <p className="text-sm font-black text-slate-950">One lesson, one practical habit.</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                The goal is not to rush. Understand the idea, test your input, improve it, then move forward.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/academy/learn/fundamentals/module/${module.slug}`}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Module overview
            </Link>
            <Link
              href={nextHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
            >
              {nextItem ? 'Next lesson' : 'Course overview'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}

