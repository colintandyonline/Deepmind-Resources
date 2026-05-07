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
  draft?: string
  originalInput?: string
  improvedPrompt?: string
  cycleLocked?: string
  signedOff?: string
  check?: string
  checkScore?: string
  missedQuestions?: string
  source?: string
  whyBetter?: string
  practiceInstruction?: string
  safetyNote?: string
  originalOutputTitle?: string
  improvedOutputTitle?: string
  originalOutput?: string
  improvedOutput?: string
  differenceHighlights?: string
  learningTakeaway?: string
}

type LessonPageProps = {
  params: Promise<LessonPageParams>
  searchParams?: Promise<LessonPageSearchParams>
}

type LessonProgressRow = {
  status: string | null
  progress_percentage: number | null
  completed_at: string | null
}

type AcademyRewardKey = 'first_lesson_signed_off' | 'prompt_practice_signed_off' | 'module_one_started'

type AcademyRewardDefinition = {
  reward_key: AcademyRewardKey
  title: string
  description: string
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

type OutputComparison = {
  originalOutputTitle: string
  improvedOutputTitle: string
  originalOutput: string
  improvedOutput: string
  differenceHighlights: string[]
  learningTakeaway: string
}

type PracticeFeedback = {
  score: number
  tier: string
  learnerInput: string
  strengths: string[]
  advice: string[]
  missedLabels: string[]
  strongerExample: string
  originalInput?: string
  improvedPrompt?: string
  cycleLocked?: boolean
  signedOff?: boolean
  source?: 'openai' | 'deterministic'
  whyBetter?: string
  practiceInstruction?: string
  safetyNote?: string
  originalOutputTitle?: string
  improvedOutputTitle?: string
  originalOutput?: string
  improvedOutput?: string
  differenceHighlights?: string
  learningTakeaway?: string
}

type UnderstandingOption = {
  value: string
  label: string
  correct: boolean
  feedback: string
}

type UnderstandingQuestion = {
  id: string
  prompt: string
  options: UnderstandingOption[]
}

type UnderstandingFeedback = {
  score: number
  passed: boolean
  missedQuestions: string[]
}

type TopicProfile = {
  task: string
  audience: string
  context: string
  format: string
  safetyOrReview: string
  constraints: string
}

function getLessonDisplayTitle(lesson: Lesson) {
  if (lesson.slug === 'ai-skill-levels-beginner-user-builder-manager') {
    return 'AI skill stages: beginner, daily user, builder, manager'
  }

  return lesson.title
}
const searchParamDivider = '~~~'
const academyProgressPathId = 'ai-fundamentals'

const academyRewardDefinitions: AcademyRewardDefinition[] = [
  {
    reward_key: 'first_lesson_signed_off',
    title: 'First lesson signed off',
    description: 'Awarded when a learner signs off their first Academy lesson.',
  },
  {
    reward_key: 'prompt_practice_signed_off',
    title: 'Prompt practice signed off',
    description: 'Awarded when a learner signs off an improved lesson practice prompt.',
  },
  {
    reward_key: 'module_one_started',
    title: 'Module one started',
    description: 'Awarded when a learner begins recording progress in the first AI Fundamentals module.',
  },
]

function getLearningProgressLessonKey(moduleSlug: string, lessonSlug: string, versionNumber: number) {
  return `${academyProgressPathId}|${moduleSlug}|${lessonSlug}|v${versionNumber}`
}

function isNextRedirectError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    String((error as { digest?: unknown }).digest).startsWith('NEXT_REDIRECT')
  )
}


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
      'DeepMind Resources teaches AI as a current skill: AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain.',
    teaching: [
      'AI tools change. A tool might handle files differently, add memory, change search behaviour, improve images, or alter how it follows instructions. That means AI skills need to stay current too.',
      'A static AI course can go stale because it teaches one version of how a tool worked at the time. The lesson may still sound useful, but the workflow may no longer be the safest or clearest way to use the tool.',
      'DeepMind Resources is built around a simple loop: AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain. The point is not to chase every headline. The point is to notice meaningful changes and turn them into practical training.',
      'First, the platform checks what changed. Then it decides whether the change affects what a learner should do, check, or avoid. If it matters, the lesson or practice task can be refreshed.',
      'The learner then practises the updated skill. That practice matters because AI skill is not proved by reading alone. It is proved by writing clearer instructions, checking outputs, spotting risks, and improving the result.',
      'Refreshers are not punishment. They are how the learner stays current. If a completed lesson changes later, the platform can point the learner back to the exact skill that needs a quick recheck instead of making them start again.',
    ],
    whyItMatters:
      'AI changes quickly, so learners need a training system that explains what changed, why it matters, and what to practise next.',
    workedExampleTitle: 'Three simple ways an AI update can affect a task',
    workedExample: [
      'Task: Summarising a document. If the AI tool changes how it reads uploaded files, I would check whether the answer still uses the document and does not guess from general knowledge.',
      'Task: Writing a customer email. If the AI tool changes tone or memory settings, I would check that the reply still follows company rules and does not invent promises.',
      'Task: Creating a blog outline. If the AI tool changes search or source handling, I would check that the outline uses reliable information and does not include unsupported claims.',
    ],
    practicePrompt:
      'Choose one AI task you might use, such as writing an email, summarising notes, checking a document, creating a blog outline, or creating an image brief. Write a short instruction that explains what the AI task is, what might change if the tool is updated, and what you would check before trusting the result.',
    strongerExample:
      'Task: Summarising meeting notes. If the AI tool changes how it handles files or long notes, I would check that the summary still uses the notes I provided, does not invent decisions, and clearly marks anything that was not stated.',
    commonMistakeFix:
      'Do not assume an AI task is still safe just because it worked before. When a tool changes, check the affected task, refresh the instruction, and review the output before trusting it.',
    recap: [
      'AI tools change, so AI training needs to stay current.',
      'DeepMind Resources turns meaningful updates into refreshed lessons and practice tasks.',
      'The core loop is AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain.',
      'Progress records show what the learner has proved and help target future refreshers.',
      'Refreshers are not punishment; they keep the learner current.',
    ],
  },
  'ai-skill-levels-beginner-user-builder-manager': {
    mainIdea:
      'AI skill levels are not fixed job titles. They are stages of responsibility: beginner, daily AI user, builder, and manager.',
    teaching: [
      'AI skill is not one single ladder that everyone climbs in the same way. Different people need different training depending on what they are responsible for.',
      'A beginner needs safe foundations: what AI is, what it can and cannot do, why output needs checking, and how to avoid trusting polished answers too quickly.',
      'A daily AI user needs repeatable habits: writing clear instructions, giving useful context, setting output limits, and reviewing the answer before using it.',
      'A builder needs systems thinking. Builders care about workflows, retrieval, tools, permissions, automation, testing, and what happens when AI output is connected to real actions.',
      'A manager needs staff-readiness thinking. Managers do not need to build every workflow themselves, but they do need to know what staff should learn, what rules matter, and where human review is required.',
      'These levels are not labels you are stuck with. You might start as a beginner, become a confident daily user, and later move toward builder or manager skills. The useful question is: what do you need for your next responsibility?',
    ],
    whyItMatters:
      'Role-aware learning stops beginners from being overwhelmed and stops higher-responsibility users from being undertrained for risk, privacy, review, or workflow decisions.',
    workedExampleTitle: 'Four people, four training needs',
    workedExample: [
      'Beginner: learns that AI output is not automatically true and that important answers need checking.',
      'Daily AI user: writes structured prompts for emails, summaries, outlines, and document checks, then reviews the result before using it.',
      'Builder: designs workflows that may use tools, files, retrieval, automation, or approval steps.',
      'Manager: sets safe-use rules, assigns training, checks staff progress, and understands whether a team is ready to use AI responsibly.',
    ],
    practicePrompt:
      'Choose your current AI level: beginner, daily AI user, builder, or manager. Then write the next level you want to move toward, what you need to learn first, why it matters, and what advanced topic you do not need to worry about yet.',
    strongerExample:
      'I am currently a beginner and want to become a daily AI user. First, I need to learn how to write clear prompts for summaries and emails, then check whether the answer is accurate before using it. I do not need to worry about agents or automation yet because I still need strong prompting and review habits first.',
    commonMistakeFix:
      'Do not jump into agents, automation, or advanced tool comparisons before you can give clear instructions and check AI output safely. Learn the level that matches your next responsibility.',
    recap: [
      'AI skill levels are stages of responsibility, not fixed labels.',
      'Beginners need safe foundations before advanced workflows.',
      'Daily AI users need structured prompts and review habits.',
      'Builders need workflow, tool, retrieval, and automation thinking.',
      'Managers need staff training, rules, progress, and risk awareness.',
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

type SupabaseServerClient = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>
type SupabaseError = {
  code?: string
  message?: string
}

function isMissingConflictConstraint(error: SupabaseError) {
  return (
    error.code === '42P10' ||
    error.message?.toLowerCase().includes('no unique or exclusion constraint') === true
  )
}

function getErrorMessage(error: SupabaseError) {
  return error.message ?? 'Unknown Supabase error'
}

async function saveAcademySkillTrace({
  supabase,
  userId,
  context,
  lessonVersionId,
  score,
  source,
  metadata,
}: {
  supabase: SupabaseServerClient
  userId: string
  context: LessonContext
  lessonVersionId: string
  score: number | null
  source: string
  metadata: Record<string, unknown>
}) {
  const payload = {
    user_id: userId,
    module_slug: context.module.slug,
    lesson_slug: context.lesson.slug,
    lesson_version_id: lessonVersionId,
    evidence_type: 'lesson_practice',
    status: 'completed',
    score,
    source,
    metadata,
  }

  const { error } = await supabase.from('academy_skill_traces').upsert(payload, {
    onConflict: 'user_id,module_slug,lesson_slug,lesson_version_id,evidence_type',
  })

  if (!error) {
    return
  }

  if (!isMissingConflictConstraint(error)) {
    console.error('[Academy skill trace] Could not save skill trace', {
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      error: getErrorMessage(error),
    })
    throw new Error(`Could not save Academy skill trace: ${getErrorMessage(error)}`)
  }

  const { data: existingRows, error: existingError } = await supabase
    .from('academy_skill_traces')
    .select('id')
    .eq('user_id', userId)
    .eq('module_slug', context.module.slug)
    .eq('lesson_slug', context.lesson.slug)
    .eq('lesson_version_id', lessonVersionId)
    .eq('evidence_type', 'lesson_practice')
    .limit(1)

  if (existingError) {
    console.error('[Academy skill trace] Could not check existing skill trace', {
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      error: getErrorMessage(existingError),
    })
    throw new Error(`Could not check Academy skill trace: ${getErrorMessage(existingError)}`)
  }

  const existingId = ((existingRows ?? []) as { id: string }[])[0]?.id
  const fallbackResult = existingId
    ? await supabase.from('academy_skill_traces').update(payload).eq('id', existingId)
    : await supabase.from('academy_skill_traces').insert(payload)

  if (fallbackResult.error) {
    console.error('[Academy skill trace] Could not save fallback skill trace', {
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      error: getErrorMessage(fallbackResult.error),
    })
    throw new Error(`Could not save Academy skill trace: ${getErrorMessage(fallbackResult.error)}`)
  }
}

async function recordAcademyProgressEvent({
  supabase,
  userId,
  context,
  lessonVersionId,
}: {
  supabase: SupabaseServerClient
  userId: string
  context: LessonContext
  lessonVersionId: string
}) {
  const { error } = await supabase.from('academy_progress_events').insert({
    user_id: userId,
    module_slug: context.module.slug,
    lesson_slug: context.lesson.slug,
    lesson_version_id: lessonVersionId,
    event_type: 'lesson_completed',
    source: 'lesson_completion',
  })

  if (error) {
    console.error('[Academy progress event] Could not record lesson completion event', {
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      error: getErrorMessage(error),
    })
    throw new Error(`Could not record Academy progress event: ${getErrorMessage(error)}`)
  }
}

async function ensureAcademyRewardDefinitions(supabase: SupabaseServerClient) {
  const { error } = await supabase.from('academy_reward_definitions').upsert(academyRewardDefinitions, {
    onConflict: 'reward_key',
  })

  if (error) {
    console.error('[Academy rewards] Could not ensure reward definitions', {
      error: getErrorMessage(error),
    })
  }
}

async function awardAcademyUserReward({
  supabase,
  userId,
  context,
  lessonVersionId,
  rewardKey,
  metadata,
}: {
  supabase: SupabaseServerClient
  userId: string
  context: LessonContext
  lessonVersionId: string
  rewardKey: AcademyRewardKey
  metadata: Record<string, unknown>
}) {
  const { data: existingRows, error: existingError } = await supabase
    .from('academy_user_rewards')
    .select('id')
    .eq('user_id', userId)
    .eq('reward_key', rewardKey)
    .limit(1)

  if (existingError) {
    console.error('[Academy rewards] Could not check existing user reward', {
      rewardKey,
      error: getErrorMessage(existingError),
    })
    throw new Error(`Could not check Academy user reward: ${getErrorMessage(existingError)}`)
  }

  if (((existingRows ?? []) as { id: string }[]).length > 0) {
    return
  }

  const { error } = await supabase.from('academy_user_rewards').insert({
    user_id: userId,
    reward_key: rewardKey,
    module_slug: context.module.slug,
    lesson_slug: context.lesson.slug,
    lesson_version_id: lessonVersionId,
    metadata,
  })

  if (error) {
    console.error('[Academy rewards] Could not award user reward', {
      rewardKey,
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      error: getErrorMessage(error),
    })
    throw new Error(`Could not award Academy user reward: ${getErrorMessage(error)}`)
  }
}

async function awardAcademyUserRewards({
  supabase,
  userId,
  context,
  lessonVersionId,
  rewardKeys,
  metadata,
}: {
  supabase: SupabaseServerClient
  userId: string
  context: LessonContext
  lessonVersionId: string
  rewardKeys: AcademyRewardKey[]
  metadata: Record<string, unknown>
}) {
  if (rewardKeys.length === 0) {
    return
  }

  await ensureAcademyRewardDefinitions(supabase)

  const rewardRows = rewardKeys.map((rewardKey) => ({
    user_id: userId,
    reward_key: rewardKey,
    module_slug: context.module.slug,
    lesson_slug: context.lesson.slug,
    lesson_version_id: lessonVersionId,
    metadata,
  }))

  const { error } = await supabase.from('academy_user_rewards').upsert(rewardRows, {
    onConflict: 'user_id,reward_key',
    ignoreDuplicates: true,
  })

  if (!error) {
    return
  }

  if (!isMissingConflictConstraint(error)) {
    console.error('[Academy rewards] Could not award user rewards', {
      rewardKeys,
      error: getErrorMessage(error),
    })
    throw new Error(`Could not award Academy user rewards: ${getErrorMessage(error)}`)
  }

  for (const rewardKey of rewardKeys) {
    await awardAcademyUserReward({
      supabase,
      userId,
      context,
      lessonVersionId,
      rewardKey,
      metadata,
    })
  }
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
      `${getLessonDisplayTitle(lesson)} belongs to ${module.title}. The skill is practical: understand the idea, use it in a task, and know what to check before relying on the result.`,
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

function getFormText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key)

  return typeof value === 'string' ? limitText(value, maxLength) : ''
}

function getFormNumber(formData: FormData, key: string) {
  const value = formData.get(key)
  const parsed = typeof value === 'string' ? Number(value) : Number.NaN

  return Number.isFinite(parsed) ? parsed : null
}

function getFormList(formData: FormData, key: string, maxLength: number) {
  return getFormText(formData, key, maxLength).split(searchParamDivider).filter(Boolean)
}

function inferTopicProfile(rawInput: string): TopicProfile {
  const text = rawInput.toLowerCase()
  const taskSummary = limitText(rawInput, 150)

  if (includesAny(text, ['wordpress', 'blog article', 'blog post', 'article', 'post in wordpress', 'wp post'])) {
    return {
      task: 'Create a plain-English, step-by-step guide for writing and publishing a blog article in WordPress',
      audience: includesAny(text, ['beginner', 'first time', 'new'])
        ? 'a beginner WordPress user'
        : 'a WordPress user who wants a clear publishing workflow',
      context:
        'for creating a useful article from an idea through draft, structure, editing, SEO basics, images, categories, preview, and publishing checks',
      format: includesAny(text, ['bullet', 'bullets', 'checklist'])
        ? 'bullet points under clear workflow headings'
        : 'clear numbered sections with short practical steps',
      safetyOrReview:
        'include checking factual claims, links, spelling, formatting, image rights, SEO title, meta description, preview, and mobile readability before publishing',
      constraints:
        'avoid unsupported claims, keyword stuffing, copied content, unclear sources, and publishing without previewing or proofreading',
    }
  }

  if (includesAny(text, ['lightbulb', 'light bulb', 'bulb', 'lamp', 'ceiling light'])) {
    return {
      task: 'Create a plain-English, step-by-step safety checklist for changing a lightbulb',
      audience: includesAny(text, ['beginner', 'first time', 'new'])
        ? 'a beginner who has not changed a lightbulb before'
        : 'a home user who wants to change a lightbulb safely',
      context:
        'in a normal home setting where the light may be ceiling-mounted, the fitting may be hot, and the user may need a stable step ladder',
      format: includesAny(text, ['bullet', 'bullets'])
        ? 'bullet points under clear safety headings'
        : 'short sections with clear bullet points',
      safetyOrReview:
        'include switching the power off, letting the bulb cool, using a stable ladder, checking the replacement bulb rating, and stopping if the fitting looks damaged or unsafe',
      constraints:
        'avoid electrical guesswork, do not encourage touching exposed wiring, and recommend a qualified electrician if anything looks damaged, loose, burned, or uncertain',
    }
  }
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
      ? `Create a clear, safe, practical instruction for this task: ${taskSummary}`
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


function buildDeterministicOutputComparison(
  learnerInput: string,
  betterPrompt: string,
): OutputComparison {
  const profile = inferTopicProfile(learnerInput)
  const text = learnerInput.toLowerCase()

  if (includesAny(text, ['wordpress', 'blog article', 'blog post', 'article', 'post in wordpress', 'wp post'])) {
    return {
      originalOutputTitle: 'Likely result from your first prompt',
      improvedOutputTitle: 'Likely result from the stronger prompt',
      originalOutput:
        'To create a blog article in WordPress, write your article, add it to a new post, choose a title, add images if needed, then publish it when finished.',
      improvedOutput:
        'Step-by-step WordPress blog article workflow:\n\n1. Plan the article:\n- Define the topic, reader, purpose, and main takeaway.\n- List the key points the article must cover.\n\n2. Draft the article:\n- Create a clear introduction, useful subheadings, practical sections, and a conclusion.\n- Keep paragraphs short and easy to scan.\n\n3. Add it in WordPress:\n- Go to Posts, create a new post, add the title, paste or write the article, and format headings correctly.\n- Add internal links, categories, tags, and a featured image if suitable.\n\n4. Review before publishing:\n- Check facts, links, spelling, image rights, SEO title, meta description, mobile layout, and preview.\n- Do not publish unsupported claims or copied content.\n\n5. Publish and recheck:\n- Publish only when the preview looks correct.\n- Open the live post and confirm formatting, links, images, and readability.',
      originalWeaknesses: [
        'The answer is too broad for someone learning the workflow.',
        'It misses planning, structure, SEO, links, categories, preview, and review steps.',
        'It does not explain what to check before publishing.',
        'The learner would still need to work out most of the WordPress process alone.',
      ],
      improvedStrengths: [
        'The answer follows the full workflow from planning to publishing.',
        'It gives clearer WordPress-specific actions.',
        'It includes review checks before the article goes live.',
        'It makes publishing safer by warning against unsupported claims and copied content.',
      ],
      differenceHighlights: [
        'The stronger output is specific to WordPress instead of giving a vague writing instruction.',
        'It separates planning, drafting, formatting, review, publishing, and live checks.',
        'It includes SEO, image rights, links, categories, and preview checks.',
        'It gives the learner a usable workflow rather than a loose summary.',
      ],
      learningTakeaway:
        'A stronger prompt produces a better training answer because it names the platform, learner level, workflow stages, output format, and review checks.',
    }
  }

  if (includesAny(text, ['lightbulb', 'light bulb', 'bulb', 'lamp', 'ceiling light'])) {
    return {
      originalOutputTitle: 'Likely result from your first prompt',
      improvedOutputTitle: 'Likely result from the stronger prompt',
      originalOutput:
        '1. Turn off the light. 2. Remove the old bulb. 3. Put in the new bulb. 4. Turn the light back on. Be careful and use a ladder if needed.',
      improvedOutput:
        'Safety checklist for changing a lightbulb:\n\nBefore you start:\n- Switch the light off and let the bulb cool.\n- Use a stable step ladder if the bulb is above comfortable reach.\n- Check the replacement bulb matches the fitting and wattage guidance.\n\nChanging the bulb:\n- Hold the fitting steady if safe to do so.\n- Remove the old bulb gently without forcing it.\n- Fit the replacement bulb securely, but do not overtighten.\n\nStop and get help if:\n- The fitting is cracked, loose, burned, wet, sparking, or exposing wiring.\n- You are unsure which bulb is suitable.\n\nFinal check:\n- Step down safely before switching the light back on.',
      differenceHighlights: [
        'The stronger output includes safety checks before the task starts.',
        'It gives clearer step-by-step structure for a home user.',
        'It explains when to stop instead of pushing ahead.',
        'It avoids unsafe electrical guesswork.',
      ],
      learningTakeaway:
        'A stronger prompt does not just ask for instructions. It defines the audience, situation, format, safety limits, and review points so the output becomes more useful and safer.',
    }
  }

  if (includesAny(text, ['tyre', 'tire', 'wheel', 'puncture', 'flat tyre', 'flat tire'])) {
    return {
      originalOutputTitle: 'Likely result from your first prompt',
      improvedOutputTitle: 'Likely result from the stronger prompt',
      originalOutput:
        'Park the car, get the spare wheel, use the jack, remove the nuts, change the tyre, tighten everything, and drive away carefully.',
      improvedOutput:
        'Safety checklist for changing a car tyre:\n\nBefore attempting the change:\n- Stop only in a safe, visible place away from traffic.\n- Use hazard lights and the handbrake.\n- Do not attempt the change on a motorway hard shoulder or unstable ground.\n- Call roadside assistance if the location, weather, traffic, tools, or your confidence make the task unsafe.\n\nChanging the tyre:\n- Check the vehicle manual for the correct jack point.\n- Loosen wheel nuts before lifting the car.\n- Raise the vehicle only on firm, level ground.\n- Fit the spare wheel and tighten nuts gradually in a cross pattern.\n\nBefore driving:\n- Check the wheel is secure.\n- Drive slowly if using a temporary spare.\n- Get the wheel checked professionally as soon as possible.',
      differenceHighlights: [
        'The stronger output includes when not to attempt the task.',
        'It adds roadside, traffic, weather, and ground safety context.',
        'It avoids assuming the learner already knows the jack point.',
        'It includes final checks before driving.',
      ],
      learningTakeaway:
        'The improved prompt produces a safer and more complete answer because it gives the AI context, risk boundaries, audience level, and output structure.',
    }
  }

  return {
    originalOutputTitle: 'Likely result from your first prompt',
    improvedOutputTitle: 'Likely result from the stronger prompt',
    originalOutput:
      `A likely answer would complete the task in a broad way, but it may miss the audience, context, safety checks, source limits, or review step because the original instruction did not make those requirements clear.`,
    improvedOutput:
      `A stronger answer would follow this improved instruction:\n\n${betterPrompt}\n\nThe result should be clearer, better structured, more audience-aware, and easier to check before use.`,
    differenceHighlights: [
      'The stronger version gives the AI a clearer task.',
      'It defines who the output is for.',
      'It adds context and constraints.',
      'It includes a review or safety step before the output is trusted.',
    ],
    learningTakeaway:
      'The visible difference comes from better instruction design: task, audience, context, format, boundaries, and review expectations.',
  }
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
    source: 'deterministic',
    whyBetter:
      'This version is stronger because it keeps your original task but adds clearer context, output shape, boundaries, and review expectations.',
    practiceInstruction:
      'Use the better version in the practice box, check it again, and compare the feedback with your first attempt.',
    safetyNote:
      'For real-world tasks, check any important claims, safety steps, or assumptions before using the output.',
    outputComparison: buildDeterministicOutputComparison(
      learnerInput,
      buildPersonalisedExample(learnerInput),
    ),
  }
}


function getAppBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function normaliseTier(value: unknown): PracticeFeedback['tier'] {
  if (value === 'Strong' || value === 'Developing' || value === 'Needs work') {
    return value
  }

  return 'Needs work'
}


function normaliseOutputComparison(value: unknown): OutputComparison | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const comparison = value as {
    originalOutputTitle?: unknown
    improvedOutputTitle?: unknown
    originalOutput?: unknown
    improvedOutput?: unknown
    differenceHighlights?: unknown
    learningTakeaway?: unknown
  }

  if (
    typeof comparison.originalOutputTitle !== 'string' ||
    typeof comparison.improvedOutputTitle !== 'string' ||
    typeof comparison.originalOutput !== 'string' ||
    typeof comparison.improvedOutput !== 'string' ||
    typeof comparison.learningTakeaway !== 'string' ||
    !isStringArray(comparison.differenceHighlights)
  ) {
    return undefined
  }

  return {
    originalOutputTitle: comparison.originalOutputTitle,
    improvedOutputTitle: comparison.improvedOutputTitle,
    originalOutput: comparison.originalOutput,
    improvedOutput: comparison.improvedOutput,
    differenceHighlights: comparison.differenceHighlights,
    learningTakeaway: comparison.learningTakeaway,
  }
}

function getOutputComparisonFromSearchParams(
  searchParams: LessonPageSearchParams,
): OutputComparison | undefined {
  if (!searchParams.originalOutput || !searchParams.improvedOutput) {
    return undefined
  }

  return {
    originalOutputTitle: searchParams.originalOutputTitle ?? 'Likely result from your first prompt',
    improvedOutputTitle: searchParams.improvedOutputTitle ?? 'Likely result from the stronger prompt',
    originalOutput: searchParams.originalOutput,
    improvedOutput: searchParams.improvedOutput,
    differenceHighlights: splitSearchList(searchParams.differenceHighlights),
    learningTakeaway:
      searchParams.learningTakeaway ??
      'The stronger prompt changes the output because it gives clearer task, context, format, boundary, and review signals.',
  }
}

async function getAIPromptFeedback({
  moduleSlug,
  lessonSlug,
  learnerInput,
}: {
  moduleSlug: string
  lessonSlug: string
  learnerInput: string
}): Promise<PracticeFeedback | null> {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    const response = await fetch(`${getAppBaseUrl()}/api/academy/ai-feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: JSON.stringify({
        moduleSlug,
        lessonSlug,
        learnerInput,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as {
      ok?: unknown
      feedback?: {
        score?: unknown
        tier?: unknown
        learnerInputSummary?: unknown
        whatWorked?: unknown
        improveNext?: unknown
        missingAreas?: unknown
        betterPrompt?: unknown
        whyBetter?: unknown
        practiceInstruction?: unknown
        safetyNote?: unknown
        outputComparison?: unknown
      }
    }

    if (data.ok !== true || !data.feedback) {
      return null
    }

    const feedback = data.feedback

    if (
      typeof feedback.score !== 'number' ||
      typeof feedback.learnerInputSummary !== 'string' ||
      typeof feedback.betterPrompt !== 'string' ||
      !isStringArray(feedback.whatWorked) ||
      !isStringArray(feedback.improveNext) ||
      !isStringArray(feedback.missingAreas)
    ) {
      return null
    }

    const outputComparison = normaliseOutputComparison(feedback.outputComparison)

    return {
      score: Math.max(0, Math.min(100, Math.round(feedback.score))),
      tier: normaliseTier(feedback.tier),
      learnerInput: limitText(learnerInput, 700),
      strengths: feedback.whatWorked.slice(0, 4),
      advice: feedback.improveNext.slice(0, 4),
      missedLabels: feedback.missingAreas.slice(0, 8),
      strongerExample: feedback.betterPrompt,
      source: 'openai',
      whyBetter: typeof feedback.whyBetter === 'string' ? feedback.whyBetter : '',
      practiceInstruction:
        typeof feedback.practiceInstruction === 'string'
          ? feedback.practiceInstruction
          : 'Use the better version in the practice box, check it again, and compare the feedback.',
      safetyNote: typeof feedback.safetyNote === 'string' ? feedback.safetyNote : '',
      outputComparison,
    }
  } catch {
    return null
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

  const signedOff = searchParams.signedOff === 'true'
  const improvedPrompt = searchParams.improvedPrompt ?? searchParams.example ?? ''
  const originalInput = searchParams.originalInput ?? searchParams.input ?? ''

  return {
    score: signedOff ? 100 : score,
    tier: signedOff ? 'Strong' : searchParams.tier,
    learnerInput: signedOff && improvedPrompt ? improvedPrompt : searchParams.input ?? '',
    strengths: signedOff
      ? [
          'Signed off. This is the improved prompt from the first practice cycle.',
          'The original task, improved prompt, comparison, safety note, and why-better explanation are locked together.',
        ]
      : splitSearchList(searchParams.strengths),
    advice: signedOff
      ? ['No new rewrite is needed for this cycle. Start again to practise with a new original prompt.']
      : splitSearchList(searchParams.advice),
    missedLabels: signedOff ? [] : splitSearchList(searchParams.missed),
    strongerExample: searchParams.example ?? '',
    originalInput,
    improvedPrompt,
    cycleLocked: searchParams.cycleLocked === 'true',
    signedOff,
    source: searchParams.source === 'openai' ? 'openai' : 'deterministic',
    whyBetter: searchParams.whyBetter ?? '',
    practiceInstruction: searchParams.practiceInstruction ?? '',
    safetyNote: searchParams.safetyNote ?? '',
    outputComparison: getOutputComparisonFromSearchParams(searchParams),
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
    return 'Strong structure. Use the better version in the practice box, check it again, then review the new comparison.'
  }

  if (tier === 'Developing') {
    return 'Good start. Fix the missing areas, use the better version, and notice how the task becomes easier for the AI to follow.'
  }

  return 'Your input needs more structure before it becomes a reliable AI instruction. Use the better version below as your next attempt.'
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

  const cycleLocked = formData.get('cycleLocked') === 'true'
  const lockedOriginalInput = formData.get('originalInput')
  const lockedImprovedPrompt = formData.get('improvedPrompt')

  if (
    cycleLocked &&
    typeof lockedOriginalInput === 'string' &&
    typeof lockedImprovedPrompt === 'string' &&
    lockedImprovedPrompt.trim()
  ) {
    const query = new URLSearchParams()
    const copyField = (name: string) => {
      const value = formData.get(name)

      if (typeof value === 'string') {
        query.set(name, value)
      }
    }

    query.set('score', '100')
    query.set('tier', 'Strong')
    query.set('input', limitText(lockedImprovedPrompt, 700))
    query.set('draft', lockedImprovedPrompt)
    query.set('example', lockedImprovedPrompt)
    query.set('originalInput', lockedOriginalInput)
    query.set('improvedPrompt', lockedImprovedPrompt)
    query.set('cycleLocked', 'true')
    query.set('signedOff', 'true')
    query.set('missed', '')
    copyField('source')
    copyField('whyBetter')
    copyField('practiceInstruction')
    copyField('safetyNote')
    copyField('originalOutputTitle')
    copyField('improvedOutputTitle')
    copyField('originalOutput')
    copyField('improvedOutput')
    copyField('differenceHighlights')
    copyField('learningTakeaway')

    redirect(`/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}?${query.toString()}#practice`)
  }

  const aiEvaluation = await getAIPromptFeedback({
    moduleSlug: context.module.slug,
    lessonSlug: context.lesson.slug,
    learnerInput,
  })
  const evaluation = aiEvaluation ?? evaluatePracticeSubmission(learnerInput)
  const query = new URLSearchParams()

  query.set('score', String(evaluation.score))
  query.set('tier', evaluation.tier)
  query.set('input', evaluation.learnerInput)
  query.set('strengths', evaluation.strengths.join(searchParamDivider))
  query.set('advice', evaluation.advice.join(searchParamDivider))
  query.set('missed', evaluation.missedLabels.join(searchParamDivider))
  query.set('example', evaluation.strongerExample)
  query.set('originalInput', evaluation.learnerInput)
  query.set('improvedPrompt', evaluation.strongerExample)
  query.set('source', evaluation.source ?? 'deterministic')
  query.set('whyBetter', evaluation.whyBetter ?? '')
  query.set('practiceInstruction', evaluation.practiceInstruction ?? '')
  query.set('safetyNote', evaluation.safetyNote ?? '')

  if (evaluation.outputComparison) {
    query.set('originalOutputTitle', evaluation.outputComparison.originalOutputTitle)
    query.set('improvedOutputTitle', evaluation.outputComparison.improvedOutputTitle)
    query.set('originalOutput', evaluation.outputComparison.originalOutput)
    query.set('improvedOutput', evaluation.outputComparison.improvedOutput)
    query.set(
      'differenceHighlights',
      evaluation.outputComparison.differenceHighlights.join(searchParamDivider),
    )
    query.set('learningTakeaway', evaluation.outputComparison.learningTakeaway)
  }

  redirect(`/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}?${query.toString()}#practice`)
}


function getUnderstandingQuestions(context: LessonContext): UnderstandingQuestion[] {
  const teaching = getTeachingContent(context)

  return [
    {
      id: 'understanding-q1',
      prompt: 'Which answer best describes the main skill this lesson is building?',
      options: [
        {
          value: 'a',
          label: 'Moving quickly through AI output so the task feels faster.',
          correct: false,
          feedback: 'This misses the point. Speed only helps when the output is controlled and checked.',
        },
        {
          value: 'b',
          label: teaching.mainIdea,
          correct: true,
          feedback: 'Correct. The lesson is about the practical habit, not just reading the page.',
        },
        {
          value: 'c',
          label: 'Learning enough AI words to recognise the topic later.',
          correct: false,
          feedback: 'Terminology helps, but the course is focused on working behaviour and judgement.',
        },
      ],
    },
    {
      id: 'understanding-q2',
      prompt: 'Before you trust or use AI output, what should happen?',
      options: [
        {
          value: 'a',
          label: 'Use the output if it sounds confident and well formatted.',
          correct: false,
          feedback: 'Confident style is not evidence. Polished output can still be wrong.',
        },
        {
          value: 'b',
          label: 'Check the important claims, missing context, assumptions, and risk before using it.',
          correct: true,
          feedback: 'Correct. Review behaviour is what makes AI use safer and more professional.',
        },
        {
          value: 'c',
          label: 'Ask the AI to make the answer longer so it looks more complete.',
          correct: false,
          feedback: 'More detail can make weak output look stronger without making it more reliable.',
        },
      ],
    },
    {
      id: 'understanding-q3',
      prompt: 'What makes a learner input stronger after using the practice checker?',
      options: [
        {
          value: 'a',
          label: 'It becomes longer, even if the task is still vague.',
          correct: false,
          feedback: 'Length is not the goal. Useful structure is the goal.',
        },
        {
          value: 'b',
          label: 'It gives a clear task, audience, context, output shape, boundaries, and review step.',
          correct: true,
          feedback: 'Correct. This is the structure that helps AI produce a better and safer result.',
        },
        {
          value: 'c',
          label: 'It removes constraints so the AI can be more creative.',
          correct: false,
          feedback: 'For training tasks, constraints usually improve control and reliability.',
        },
      ],
    },
  ]
}

function evaluateUnderstandingCheck(formData: FormData, context: LessonContext): UnderstandingFeedback {
  const questions = getUnderstandingQuestions(context)
  const missedQuestions: string[] = []
  let correctAnswers = 0

  questions.forEach((question) => {
    const answer = formData.get(question.id)
    const selectedOption = question.options.find((option) => option.value === answer)

    if (selectedOption?.correct) {
      correctAnswers += 1
    } else {
      missedQuestions.push(question.prompt)
    }
  })

  return {
    score: Math.round((correctAnswers / questions.length) * 100),
    passed: correctAnswers === questions.length,
    missedQuestions,
  }
}


async function useBetterPrompt(formData: FormData) {
  'use server'

  const moduleSlug = formData.get('moduleSlug')
  const lessonSlug = formData.get('lessonSlug')
  const betterPrompt = formData.get('betterPrompt')

  if (
    typeof moduleSlug !== 'string' ||
    typeof lessonSlug !== 'string' ||
    typeof betterPrompt !== 'string'
  ) {
    throw new Error('Missing prompt reuse data.')
  }

  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    throw new Error('Lesson could not be found.')
  }

  const query = new URLSearchParams()
  const copyField = (name: string) => {
    const value = formData.get(name)

    if (typeof value === 'string') {
      query.set(name, value)
    }
  }

  const feedbackFields = [
    'score',
    'tier',
    'input',
    'strengths',
    'advice',
    'missed',
    'example',
    'source',
    'whyBetter',
    'practiceInstruction',
    'safetyNote',
    'originalOutputTitle',
    'improvedOutputTitle',
    'originalOutput',
    'improvedOutput',
    'differenceHighlights',
    'learningTakeaway',
  ]
  feedbackFields.forEach(copyField)

  query.set('draft', betterPrompt)
  const originalInput = formData.get('originalInput')
  const fallbackInput = formData.get('input')
  query.set(
    'originalInput',
    typeof originalInput === 'string'
      ? originalInput
      : typeof fallbackInput === 'string'
        ? fallbackInput
        : '',
  )
  query.set('improvedPrompt', betterPrompt)
  query.set('example', betterPrompt)
  query.set('cycleLocked', 'true')
  query.set('reuse', 'true')

  redirect(`/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}?${query.toString()}#practice`)
}

async function checkUnderstanding(formData: FormData) {
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

  const result = evaluateUnderstandingCheck(formData, context)
  const query = new URLSearchParams()

  query.set('check', result.passed ? 'passed' : 'needs_review')
  query.set('checkScore', String(result.score))
  query.set('missedQuestions', result.missedQuestions.join(searchParamDivider))

  redirect(`/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}?${query.toString()}#understanding`)
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

  const understandingPassed = formData.get('understandingPassed')

  if (understandingPassed !== 'true') {
    const query = new URLSearchParams()

    query.set('check', 'needs_review')
    query.set('checkScore', '0')
    query.set('missedQuestions', 'Complete the understanding check first')

    redirect(`/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}?${query.toString()}#understanding`)
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
  const moduleHref = `/academy/learn/fundamentals/module/${context.module.slug}`
  const lessonVersionId = `v${context.lesson.versionNumber}`
  const lessonProgressKey = getLearningProgressLessonKey(
    context.module.slug,
    context.lesson.slug,
    context.lesson.versionNumber,
  )

  const { error: progressError } = await supabase.from('learning_progress').upsert(
    {
      user_id: user.id,
      module_id: lessonProgressKey,
      module_title: `${context.module.title} | ${getLessonDisplayTitle(context.lesson)}`,
      status: 'completed',
      progress_percentage: 100,
      started_at: now,
      completed_at: now,
    },
    {
      onConflict: 'user_id,module_id',
    },
  )

  if (progressError) {
    console.error('[Academy progress] Could not save lesson progress', {
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      error: progressError.message,
    })
    throw new Error(`Could not save lesson progress: ${progressError.message}`)
  }

  const practiceScore = getFormNumber(formData, 'score')
  const practiceSignedOff = formData.get('practiceSignedOff') === 'true'
  const practiceSource = getFormText(formData, 'source', 40) || 'deterministic'
  const originalInput = getFormText(formData, 'originalInput', 700)
  const learnerInput = getFormText(formData, 'input', 700)
  const improvedPrompt = getFormText(formData, 'improvedPrompt', 900)
  const skillTraceMetadata = {
    path_id: academyProgressPathId,
    module_title: context.module.title,
    lesson_title: getLessonDisplayTitle(context.lesson),
    lesson_progress_key: lessonProgressKey,
    lesson_version_number: context.lesson.versionNumber,
    signed_off_at: now,
    practice: {
      signed_off: practiceSignedOff,
      tier: getFormText(formData, 'tier', 80),
      learner_input: learnerInput,
      original_input: originalInput || learnerInput,
      improved_prompt: improvedPrompt,
      strengths: getFormList(formData, 'strengths', 1200),
      advice: getFormList(formData, 'advice', 1200),
      missed: getFormList(formData, 'missed', 1200),
      why_better: getFormText(formData, 'whyBetter', 1200),
      practice_instruction: getFormText(formData, 'practiceInstruction', 500),
      safety_note: getFormText(formData, 'safetyNote', 500),
      original_output_title: getFormText(formData, 'originalOutputTitle', 200),
      improved_output_title: getFormText(formData, 'improvedOutputTitle', 200),
      original_output: getFormText(formData, 'originalOutput', 1200),
      improved_output: getFormText(formData, 'improvedOutput', 1200),
      difference_highlights: getFormList(formData, 'differenceHighlights', 1200),
      learning_takeaway: getFormText(formData, 'learningTakeaway', 500),
    },
    understanding: {
      signed_off: true,
    },
  }

  await saveAcademySkillTrace({
    supabase,
    userId: user.id,
    context,
    lessonVersionId,
    score: practiceScore,
    source: practiceSource,
    metadata: skillTraceMetadata,
  })

  await recordAcademyProgressEvent({
    supabase,
    userId: user.id,
    context,
    lessonVersionId,
  })

  const rewardKeys: AcademyRewardKey[] = ['first_lesson_signed_off']

  if (practiceSignedOff) {
    rewardKeys.push('prompt_practice_signed_off')
  }

  if (context.module.moduleNumber === 1) {
    rewardKeys.push('module_one_started')
  }

  await awardAcademyUserRewards({
    supabase,
    userId: user.id,
    context,
    lessonVersionId,
    rewardKeys,
    metadata: {
      path_id: academyProgressPathId,
      module_title: context.module.title,
      lesson_title: getLessonDisplayTitle(context.lesson),
      awarded_from: 'lesson_completion',
      signed_off_at: now,
    },
  })

  redirect(moduleHref)
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
    title: `${getLessonDisplayTitle(context.lesson)} | AI Fundamentals Lesson | DeepMind Resources Academy`,
    description: context.lesson.outcome,
    alternates: {
      canonical: `https://deepmindresources.pro/academy/learn/fundamentals/module/${context.module.slug}/lesson/${context.lesson.slug}`,
    },
    openGraph: {
      title: `${getLessonDisplayTitle(context.lesson)} | AI Fundamentals Lesson`,
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
  const practiceCycleLocked = practiceFeedback?.cycleLocked === true
  const understandingQuestions = getUnderstandingQuestions(context)
  const understandingAttempted =
    resolvedSearchParams?.check === 'passed' || resolvedSearchParams?.check === 'needs_review'
  const rawUnderstandingScore = Number(resolvedSearchParams?.checkScore ?? '0')
  const understandingScore = Number.isNaN(rawUnderstandingScore) ? 0 : rawUnderstandingScore
  const missedUnderstandingQuestions = splitSearchList(resolvedSearchParams?.missedQuestions)
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

  const { data: progressRows, error: progressError } = await supabase
    .from('learning_progress')
    .select('status, progress_percentage, completed_at')
    .eq('user_id', user.id)
    .eq('module_id', getLearningProgressLessonKey(module.slug, lesson.slug, lesson.versionNumber))
    .limit(1)

  if (progressError) {
    console.error('[Academy progress] Could not read lesson progress', {
      moduleSlug: module.slug,
      lessonSlug: lesson.slug,
      error: progressError.message,
    })
    throw new Error(`Could not read lesson progress: ${progressError.message}`)
  }

  const progress = ((progressRows ?? []) as LessonProgressRow[])[0] ?? null
  const isCompleted = progress?.status === 'completed' || Boolean(progress?.completed_at)
  const understandingPassed = isCompleted || resolvedSearchParams?.check === 'passed'
  const lessonHref = `/academy/learn/fundamentals/module/${module.slug}/lesson/${lesson.slug}`
  const nextHref = nextItem ? getLessonHref(nextItem) : '/academy/learn/fundamentals'
  const lessonFlowPanelClass = isCompleted
    ? 'border-emerald-700 bg-emerald-600 shadow-emerald-900/25'
    : 'border-blue-700 bg-blue-600 shadow-blue-900/25'
  const lessonFlowSubtleTextClass = isCompleted ? 'text-emerald-100' : 'text-blue-100'
  const lessonFlowBodyTextClass = isCompleted ? 'text-emerald-50' : 'text-blue-50'
  const completionCardClass = isCompleted
    ? 'border-emerald-200 bg-emerald-50 shadow-emerald-900/10'
    : 'border-blue-100 bg-white shadow-blue-900/10'
  const completionEyebrowClass = isCompleted ? 'text-emerald-600' : 'text-blue-600'
  const completionButtonClass = isCompleted
    ? 'bg-emerald-600 text-white shadow-emerald-900/20 hover:bg-emerald-700'
    : 'bg-blue-600 text-white shadow-blue-900/20 hover:bg-blue-700'

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

      <script
        dangerouslySetInnerHTML={{
          __html:
            "if(window.location.search){window.history.replaceState({},document.title,window.location.pathname+window.location.hash);}",
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.addEventListener('click',function(event){var target=event.target;var trigger=target&&target.closest?target.closest('[data-copy-better-prompt]'):null;if(!trigger){return;}event.preventDefault();event.stopImmediatePropagation();var text=trigger.getAttribute('data-copy-better-prompt')||'';var original=trigger.getAttribute('data-copy-label')||'Use this prompt';var textarea=document.querySelector('textarea[name=\"learnerInput\"]');if(textarea){textarea.value=text;textarea.dispatchEvent(new Event('input',{bubbles:true}));textarea.focus();textarea.scrollIntoView({behavior:'smooth',block:'center'});trigger.textContent='Prompt added — check it again';setTimeout(function(){trigger.textContent=original;},2200);}else{trigger.textContent='Practice box not found';setTimeout(function(){trigger.textContent=original;},2200);}},true);",
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
                {getLessonDisplayTitle(lesson)}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {teaching.mainIdea}
              </p>
            </div>

            <aside className={`rounded-[2rem] border p-5 text-white shadow-2xl ${lessonFlowPanelClass}`}>
              <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${lessonFlowSubtleTextClass}`}>
                Lesson flow
              </p>

              <div className="mt-4 space-y-3">
                {['Learn the idea', 'See it used', 'Try your own input', 'Check and improve'].map(
                  (step, index) => (
                    <div key={step} className="rounded-2xl border border-white/15 bg-white/10 p-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-black text-emerald-700">
                          {index + 1}
                        </span>
                        <p className="text-sm font-black text-white">{step}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <p className={`text-[10px] font-black uppercase tracking-[0.14em] ${lessonFlowSubtleTextClass}`}>
                  Progress
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {isCompleted ? 'Completed' : 'Ready'}
                </p>
                <p className={`mt-2 text-sm leading-6 ${lessonFlowBodyTextClass}`}>
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
                {practiceCycleLocked && practiceFeedback ? (
                  <>
                    <input type="hidden" name="cycleLocked" value="true" />
                    <input type="hidden" name="originalInput" value={practiceFeedback.originalInput ?? practiceFeedback.learnerInput} />
                    <input type="hidden" name="improvedPrompt" value={practiceFeedback.improvedPrompt ?? practiceFeedback.strongerExample} />
                    <input type="hidden" name="source" value={practiceFeedback.source ?? 'deterministic'} />
                    <input type="hidden" name="whyBetter" value={practiceFeedback.whyBetter ?? ''} />
                    <input type="hidden" name="practiceInstruction" value={practiceFeedback.practiceInstruction ?? ''} />
                    <input type="hidden" name="safetyNote" value={practiceFeedback.safetyNote ?? ''} />
                    <input type="hidden" name="originalOutputTitle" value={practiceFeedback.outputComparison?.originalOutputTitle ?? ''} />
                    <input type="hidden" name="improvedOutputTitle" value={practiceFeedback.outputComparison?.improvedOutputTitle ?? ''} />
                    <input type="hidden" name="originalOutput" value={practiceFeedback.outputComparison?.originalOutput ?? ''} />
                    <input type="hidden" name="improvedOutput" value={practiceFeedback.outputComparison?.improvedOutput ?? ''} />
                    <input
                      type="hidden"
                      name="differenceHighlights"
                      value={practiceFeedback.outputComparison?.differenceHighlights.join(searchParamDivider) ?? ''}
                    />
                    <input type="hidden" name="learningTakeaway" value={practiceFeedback.outputComparison?.learningTakeaway ?? ''} />
                  </>
                ) : null}
                <textarea
                      key={resolvedSearchParams?.draft ?? practiceFeedback?.learnerInput ?? 'empty-practice-input'}
                  name="learnerInput"
                  required
                  minLength={40}
                  rows={7}
                  defaultValue={resolvedSearchParams?.draft ?? practiceFeedback?.learnerInput ?? ''}
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
                        DeepMind Resources feedback
                      </p>
                      <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                        {practiceFeedback.signedOff ? 'Strong - signed off' : practiceFeedback.tier}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-700">
                        {practiceFeedback.signedOff
                          ? 'The improved prompt is signed off. This check reused the locked first-cycle feedback instead of creating another rewrite.'
                          : getTierGuidance(practiceFeedback.tier)}
                      </p>
                    </div>
                    <span className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl text-xl font-black ${getTierScoreClass(practiceFeedback.tier)}`}>
                      {practiceFeedback.score}%
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {practiceFeedback.signedOff ? 'Improved prompt reviewed' : 'Prompt reviewed'}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{practiceFeedback.learnerInput}</p>
                  </div>

                  {practiceFeedback.signedOff && practiceFeedback.originalInput ? (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                        Original prompt locked
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{practiceFeedback.originalInput}</p>
                    </div>
                  ) : null}

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
                          {practiceFeedback.practiceInstruction || 'Use this version to refill the practice box, check it again, and compare the feedback with your first attempt.'}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                                                <form action={useBetterPrompt} className="w-full sm:w-auto">
                          <input type="hidden" name="moduleSlug" value={module.slug} />
                          <input type="hidden" name="lessonSlug" value={lesson.slug} />
                          <input type="hidden" name="betterPrompt" value={practiceFeedback.strongerExample} />
                          <input type="hidden" name="score" value={String(practiceFeedback.score)} />
                          <input type="hidden" name="tier" value={practiceFeedback.tier} />
                          <input type="hidden" name="input" value={practiceFeedback.learnerInput} />
                          <input type="hidden" name="strengths" value={practiceFeedback.strengths.join(searchParamDivider)} />
                          <input type="hidden" name="advice" value={practiceFeedback.advice.join(searchParamDivider)} />
                          <input type="hidden" name="missed" value={practiceFeedback.missedLabels.join(searchParamDivider)} />
                          <input type="hidden" name="example" value={practiceFeedback.strongerExample} />
                          <input type="hidden" name="originalInput" value={practiceFeedback.originalInput ?? practiceFeedback.learnerInput} />
                          <input type="hidden" name="improvedPrompt" value={practiceFeedback.improvedPrompt ?? practiceFeedback.strongerExample} />
                          <input type="hidden" name="source" value={practiceFeedback.source ?? 'deterministic'} />
                          <input type="hidden" name="whyBetter" value={practiceFeedback.whyBetter ?? ''} />
                          <input type="hidden" name="practiceInstruction" value={practiceFeedback.practiceInstruction ?? ''} />
                          <input type="hidden" name="safetyNote" value={practiceFeedback.safetyNote ?? ''} />
                          <input type="hidden" name="originalOutputTitle" value={practiceFeedback.outputComparison?.originalOutputTitle ?? ''} />
                          <input type="hidden" name="improvedOutputTitle" value={practiceFeedback.outputComparison?.improvedOutputTitle ?? ''} />
                          <input type="hidden" name="originalOutput" value={practiceFeedback.outputComparison?.originalOutput ?? ''} />
                          <input type="hidden" name="improvedOutput" value={practiceFeedback.outputComparison?.improvedOutput ?? ''} />
                          <input
                            type="hidden"
                            name="differenceHighlights"
                            value={practiceFeedback.outputComparison?.differenceHighlights.join(searchParamDivider) ?? ''}
                          />
                          <input type="hidden" name="learningTakeaway" value={practiceFeedback.outputComparison?.learningTakeaway ?? ''} />
                          <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-indigo-900/20 transition hover:bg-indigo-700 sm:w-auto"
                          >
                            Use this prompt
                          </button>
                        </form>
                        <Link
                          href={lessonHref}
                          className="inline-flex items-center justify-center rounded-2xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-black text-indigo-700 transition hover:bg-indigo-100"
                        >
                          Start again
                        </Link>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-indigo-100 bg-white p-4">
                      <p className="text-sm leading-7 text-slate-800">{practiceFeedback.strongerExample}</p>
                    </div>

                    {practiceFeedback.whyBetter ? (
                      <div className="mt-3 rounded-2xl border border-indigo-100 bg-white p-4">
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700">
                          Why this is better
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{practiceFeedback.whyBetter}</p>
                      </div>
                    ) : null}

                    {practiceFeedback.safetyNote ? (
                      <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">
                          Safety note
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{practiceFeedback.safetyNote}</p>
                      </div>
                    ) : null}
                  
                    {practiceFeedback.outputComparison ? (
                      <div className="mt-4 rounded-3xl border border-indigo-200 bg-white p-4">
                        <input id="output-comparison-review" type="checkbox" className="peer sr-only" />

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700">
                              Visual learning review
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">
                              Compare the likely output from your first prompt with the output from the improved prompt.
                            </p>
                          </div>

                          <label
                            htmlFor="output-comparison-review"
                            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-indigo-900/20 transition hover:bg-indigo-700"
                          >
                            Review output comparison
                          </label>
                        </div>

                        <div className="fixed inset-0 z-[80] hidden overflow-y-auto bg-slate-950/55 p-3 backdrop-blur-sm peer-checked:block sm:p-4">
                          <div className="mx-auto my-4 max-w-6xl rounded-[2rem] border border-blue-100 bg-white p-4 shadow-2xl shadow-slate-950/30 sm:my-6 sm:p-6">
                            <div className="flex flex-col gap-4 border-b border-blue-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                                  DeepMind Resources review
                                </p>
                                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                                  Review the prompt impact.
                                </h3>
                                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                                  This Academy review shows how task clarity, audience, context, safety limits, and output shape change the answer a learner receives.
                                </p>
                              </div>

                              <label
                                htmlFor="output-comparison-review"
                                className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-4 sm:py-2.5"
                              >
                                Close review
                              </label>
                            </div>

                            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                              <article className="rounded-3xl border border-rose-200 bg-rose-50 p-4">
                                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-rose-700">
                                  Original prompt output
                                </p>
                                <h4 className="mt-2 text-lg font-black text-slate-950">
                                  {practiceFeedback.outputComparison.originalOutputTitle}
                                </h4>
                                <p className="mt-3 whitespace-pre-line rounded-2xl border border-rose-100 bg-white p-4 text-sm leading-7 text-slate-700">
                                  {practiceFeedback.outputComparison.originalOutput}
                                </p>

                                <div className="mt-4 rounded-2xl border border-rose-200 bg-white p-4">
                                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-rose-700">
                                    Why this output is weaker
                                  </p>
                                  <ul className="mt-3 grid gap-2">
                                    {[
                                      'The task is not fully framed for the reader.',
                                      'The context is too thin for a safe, useful answer.',
                                      'The output has limited structure or checking guidance.',
                                      'The learner would need to repair the result before using it.',
                                    ].map((item) => (
                                      <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-500" aria-hidden="true" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </article>

                              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
                                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700">
                                  Improved prompt output
                                </p>
                                <h4 className="mt-2 text-lg font-black text-slate-950">
                                  {practiceFeedback.outputComparison.improvedOutputTitle}
                                </h4>
                                <p className="mt-3 whitespace-pre-line rounded-2xl border border-emerald-100 bg-white p-4 text-sm leading-7 text-slate-700">
                                  {practiceFeedback.outputComparison.improvedOutput}
                                </p>

                                <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4">
                                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700">
                                    Why this output is stronger
                                  </p>
                                  <ul className="mt-3 grid gap-2">
                                    {[
                                      'The answer follows a clearer structure.',
                                      'The reader, situation, and risk level are easier to understand.',
                                      'Safety limits and stopping points are more visible.',
                                      'The output is easier to review before it is trusted.',
                                    ].map((item) => (
                                      <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </article>
                            </div>

                            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
                              <article className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
                                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                                  Difference highlights
                                </p>
                                <ul className="mt-3 grid gap-2">
                                  {practiceFeedback.outputComparison.differenceHighlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2 text-sm leading-6 text-slate-700">
                                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                                      {highlight}
                                    </li>
                                  ))}
                                </ul>
                              </article>

                              <article className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4">
                                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700">
                                  Learning takeaway
                                </p>
                                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                                  {practiceFeedback.outputComparison.learningTakeaway}
                                </p>
                              </article>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}</div>
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
              eyebrow="Prove"
              title="Check your understanding"
              icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <div id="understanding" className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-black leading-6 text-slate-950">
                  Sign off this lesson by answering three quick questions.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This is not a punishment gate. If something is missed, the lesson will point you back to the training and you can try again.
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {teaching.recap.map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>

              {understandingAttempted ? (
                <div
                  className={`mt-5 rounded-3xl border p-4 ${
                    understandingPassed
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-amber-200 bg-amber-50'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p
                        className={`text-[11px] font-black uppercase tracking-[0.16em] ${
                          understandingPassed ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        Understanding check
                      </p>
                      <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                        {understandingPassed ? 'Signed off' : 'Not quite yet'}
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                        {understandingPassed
                          ? 'Good. You have shown enough understanding to complete this lesson.'
                          : 'Nearly there. Review the missed point, then try the check again.'}
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl text-xl font-black text-white ${
                        understandingPassed ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                    >
                      {understandingScore}%
                    </span>
                  </div>

                  {!understandingPassed && missedUnderstandingQuestions.length > 0 ? (
                    <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">
                        Review before trying again
                      </p>
                      <ul className="mt-3 space-y-2">
                        {missedUnderstandingQuestions.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <FileQuestion className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {!understandingPassed ? (
                
              <details className="mt-5 rounded-[1.5rem] border border-blue-100 bg-white/80 p-4 shadow-sm understanding-check-toggle">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.22em] text-blue-700">
                  <span>Open the understanding check</span>
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="mt-4"><form action={checkUnderstanding} className="mt-5 space-y-4">
                  <input type="hidden" name="moduleSlug" value={module.slug} />
                  <input type="hidden" name="lessonSlug" value={lesson.slug} />

                  {understandingQuestions.map((question, index) => (
                    <fieldset key={question.id} className="rounded-3xl border border-blue-100 bg-white p-4">
                      <legend className="text-sm font-black leading-6 text-slate-950">
                        {index + 1}. {question.prompt}
                      </legend>

                      <div className="mt-3 grid gap-2">
                        {question.options.map((option) => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                          >
                            <input
                              required
                              type="radio"
                              name={question.id}
                              value={option.value}
                              className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-700"
                  >
                    Check my understanding
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
                </div>
              </details>
              ) : (
                <div className="mt-5 rounded-3xl border border-emerald-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold leading-6 text-slate-700">
                        Great — your understanding is signed off. Complete the lesson to return to the module overview, where your progress and next lesson are shown.
                      </p>
                      <Link
                        href={lessonHref}
                        className="mt-3 inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Start this lesson again
                      </Link>
                    </div>
                  </div>
                </div>
              )}
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
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-600">
                Skill focus
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lesson.blocks.map((block) => (
                  <span
                    key={block}
                    className="inline-flex rounded-full border border-blue-100 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700"
                  >
                    {getBlockLabel(block)}
                  </span>
                ))}
              </div>
            </section>

            <section className={`rounded-[2rem] border p-5 shadow-sm ${completionCardClass}`}>
              <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${completionEyebrowClass}`}>
                Complete
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                {isCompleted ? 'Lesson complete' : 'Finish this lesson'}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {understandingPassed
                  ? 'Your understanding is signed off. Completing now adds this lesson to your Academy progress and returns you to the module overview.'
                  : 'Complete the understanding check first. The lesson completion button unlocks once your understanding is signed off.'}
              </p>

              <form action={completeLesson} className="mt-5">
                <input type="hidden" name="moduleSlug" value={module.slug} />
                <input type="hidden" name="lessonSlug" value={lesson.slug} />
                <input type="hidden" name="understandingPassed" value={understandingPassed ? 'true' : 'false'} />
                {practiceFeedback ? (
                  <>
                    <input type="hidden" name="practiceSignedOff" value={practiceFeedback.signedOff ? 'true' : 'false'} />
                    <input type="hidden" name="score" value={String(practiceFeedback.score)} />
                    <input type="hidden" name="tier" value={practiceFeedback.tier} />
                    <input type="hidden" name="input" value={practiceFeedback.learnerInput} />
                    <input type="hidden" name="strengths" value={practiceFeedback.strengths.join(searchParamDivider)} />
                    <input type="hidden" name="advice" value={practiceFeedback.advice.join(searchParamDivider)} />
                    <input type="hidden" name="missed" value={practiceFeedback.missedLabels.join(searchParamDivider)} />
                    <input type="hidden" name="originalInput" value={practiceFeedback.originalInput ?? practiceFeedback.learnerInput} />
                    <input type="hidden" name="improvedPrompt" value={practiceFeedback.improvedPrompt ?? practiceFeedback.strongerExample} />
                    <input type="hidden" name="source" value={practiceFeedback.source ?? 'deterministic'} />
                    <input type="hidden" name="whyBetter" value={practiceFeedback.whyBetter ?? ''} />
                    <input type="hidden" name="practiceInstruction" value={practiceFeedback.practiceInstruction ?? ''} />
                    <input type="hidden" name="safetyNote" value={practiceFeedback.safetyNote ?? ''} />
                    <input type="hidden" name="originalOutputTitle" value={practiceFeedback.outputComparison?.originalOutputTitle ?? ''} />
                    <input type="hidden" name="improvedOutputTitle" value={practiceFeedback.outputComparison?.improvedOutputTitle ?? ''} />
                    <input type="hidden" name="originalOutput" value={practiceFeedback.outputComparison?.originalOutput ?? ''} />
                    <input type="hidden" name="improvedOutput" value={practiceFeedback.outputComparison?.improvedOutput ?? ''} />
                    <input
                      type="hidden"
                      name="differenceHighlights"
                      value={practiceFeedback.outputComparison?.differenceHighlights.join(searchParamDivider) ?? ''}
                    />
                    <input type="hidden" name="learningTakeaway" value={practiceFeedback.outputComparison?.learningTakeaway ?? ''} />
                  </>
                ) : null}
                <button
                  type="submit"
                  disabled={!understandingPassed}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition ${
                    understandingPassed
                      ? completionButtonClass
                      : 'cursor-not-allowed bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? 'Back to module' : understandingPassed ? 'Complete lesson' : 'Check understanding first'}
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










