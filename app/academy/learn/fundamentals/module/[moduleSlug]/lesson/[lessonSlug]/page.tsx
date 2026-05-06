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

type LessonPageProps = {
  params: Promise<LessonPageParams>
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
  plainEnglish: string[]
  whyItMatters: string
  steps: string[]
  workedExampleTitle: string
  workedExample: string[]
  selfCheck: string[]
  action: string
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

const specificTeachingBySlug: Record<string, LessonTeachingContent> = {
  'what-you-will-learn-in-ai-fundamentals': {
    plainEnglish: [
      'AI Fundamentals is the starting point for using AI well. Before you learn advanced prompting, tool selection, agents, automation, or business workflows, you need a reliable mental model for what AI can do, what it cannot do, and where human judgement still matters.',
      'This path teaches AI as a practical skill, not as a collection of buzzwords. You will learn how to understand AI output, spot weak claims, protect sensitive information, choose the right tool category, and practise safely before using AI in real work.',
      'The important shift is this: you are not here to become impressed by AI. You are here to become capable with it. Capability means knowing when to use AI, when to check it, when to avoid it, and how to turn a vague task into a controlled workflow.',
    ],
    whyItMatters:
      'Most people start with AI by asking random questions and trusting whatever sounds polished. That creates shallow habits. A strong foundation helps you build repeatable skill instead of guessing your way through every new tool.',
    steps: [
      'First, build a practical definition of AI so you are not fooled by hype or vague marketing claims.',
      'Next, learn how language models produce useful but unverified output.',
      'Then, practise giving AI enough context, constraints, and review instructions to make the output safer and more useful.',
      'Finally, connect lessons to sandbox tasks so your progress is based on practical evidence, not just page views.',
    ],
    workedExampleTitle: 'Two learners use AI very differently',
    workedExample: [
      'Learner A opens an AI tool and asks, “Help me with work.” The answer might be fluent, but the task is unclear, the context is missing, and there is no review standard.',
      'Learner B says, “Draft a plain-English customer reply for a delayed order. Use a calm tone, do not promise compensation, and list what I should verify before sending.” That prompt gives the model a task, context, boundaries, and a review step.',
      'The second learner is not just “better at prompts”. They are using AI with a controlled workflow. That is the kind of practical skill this course is designed to build.',
    ],
    selfCheck: [
      'Can you explain why AI Fundamentals comes before advanced prompting or agents?',
      'Can you name one risk of using AI without checking the output?',
      'Can you describe the difference between reading a lesson and proving a skill?',
    ],
    action:
      'Treat this lesson as your orientation. You are starting a structured path that moves from understanding to practice to evidence.',
  },
  'how-deepmind-resources-teaches-ai': {
    plainEnglish: [
      'DeepMind Resources teaches AI as a living skill system. That matters because AI tools, models, interfaces, and best practices change quickly. A normal static lesson can become outdated when a tool changes how it handles files, memory, search, code, or automation.',
      'The learning model is simple: understand the concept, practise it safely, record evidence of the skill, then refresh the skill when the AI landscape changes. This is why lessons connect to sandbox tasks and why progress needs to be version-aware.',
      'A lesson is not just a page to read. It is a step in a larger training loop. The goal is to help you build judgement, repeatable workflows, and practical confidence.',
    ],
    whyItMatters:
      'If AI training does not update, learners build habits around old tool behaviour. A living training system keeps the learner focused on current, verified, practical use.',
    steps: [
      'Learn the concept in plain English.',
      'See how the concept appears in a real AI task.',
      'Notice the common mistake that causes weak or risky output.',
      'Practise the skill in a sandbox task where there are success criteria.',
      'Use saved progress to know what you have done and what may need a refresher later.',
    ],
    workedExampleTitle: 'A model update changes a workflow',
    workedExample: [
      'Imagine a learner completed a lesson about using files inside an AI tool. Later, the tool changes how file search works. The old lesson may still be partly useful, but the exact workflow may no longer be reliable.',
      'In a static course, nothing happens. In a living learning system, the affected lesson can be reviewed, updated, and connected to a new sandbox task.',
      'That is why the Academy is not only about consuming content. It is about keeping your skill current as tools change.',
    ],
    selfCheck: [
      'Can you explain why a completed AI lesson may need a refresher later?',
      'Can you explain how a sandbox task proves more than reading alone?',
      'Can you describe the platform loop from update to lesson to practice?',
    ],
    action:
      'Use this course as a skill route. Read actively, practise deliberately, and expect important AI changes to create future refreshers.',
  },
  'ai-skill-levels-beginner-user-builder-manager': {
    plainEnglish: [
      'Not everyone needs the same depth of AI training. A beginner needs core concepts and safety habits. A practical user needs prompting, tool choice, and output review. A builder needs workflows, retrieval, tools, agents, and debugging. A manager needs enough understanding to assign training, set rules, and judge risk.',
      'The mistake is treating AI skill as one thing. In reality, AI competency depends on role and responsibility. A non-technical staff member using AI for email support needs different training from a developer building a tool-calling workflow.',
      'This lesson helps you locate yourself on the path so the next steps feel useful instead of overwhelming.',
    ],
    whyItMatters:
      'Role-aware training prevents beginners from being pushed into advanced tools too early and prevents managers from judging AI adoption only by enthusiasm or tool access.',
    steps: [
      'Beginner: learn what AI is, what it is not, and how to avoid unsafe trust.',
      'Practical user: learn structured prompts, common workflows, tool categories, and review habits.',
      'Builder: learn systems, APIs, tool calling, retrieval, agents, and workflow controls.',
      'Manager: learn risk, training assignment, staff readiness, tool suitability, and evidence of skill.',
    ],
    workedExampleTitle: 'Four people need different AI training',
    workedExample: [
      'A receptionist may need safe drafting and summarising habits. A marketing assistant may need prompt structure and output review. A developer may need to design an agent with strict tool permissions. A manager may need a training plan and a way to see who is ready for which workflow.',
      'All four people are learning AI, but they are not learning the same thing at the same depth.',
      'DeepMind Resources separates those levels so learners can move forward without being buried in the wrong material.',
    ],
    selfCheck: [
      'Which level describes you today?',
      'Which level do you want to reach next?',
      'What would count as real evidence that you improved?',
    ],
    action:
      'Choose your starting level honestly. The goal is not to sound advanced; it is to build the next useful layer of skill.',
  },
  'baseline-check-what-do-you-already-understand': {
    plainEnglish: [
      'A baseline check is not a school exam. It is a starting measurement. It helps you see what you already understand and which areas need more attention before the course gets more practical.',
      'The useful mindset is honesty. If you guess correctly but cannot explain why, that is still a signal. If you get something wrong, that is not failure; it tells the system where the next lesson should help.',
      'The baseline covers concepts, tool awareness, prompt habits, privacy, and output trust because those are the foundations for safe AI use.',
    ],
    whyItMatters:
      'Without a baseline, progress becomes vague. With a baseline, you can see whether your confidence, judgement, and practical skill improve over time.',
    steps: [
      'Answer based on what you understand now, not what you think you should know.',
      'Notice which questions feel uncertain.',
      'Use uncertainty as a map for what to study next.',
      'Repeat or review later when the course asks for a refresher.',
    ],
    workedExampleTitle: 'A weak score can still be useful',
    workedExample: [
      'A learner scores low on tool categories but high on privacy awareness. That tells them they do not need to restart everything; they need more practice choosing the right tool type for a task.',
      'Another learner feels confident with prompts but misses questions about hallucination. That is a warning sign: they may be producing polished outputs without enough review.',
      'The baseline turns those differences into direction.',
    ],
    selfCheck: [
      'Which AI topic already feels familiar?',
      'Which topic feels uncertain?',
      'What is one skill you want to measure again after this path?',
    ],
    action:
      'Complete the baseline as a starting signal. Do not treat it as a judgement of your ability.',
  },
  'what-artificial-intelligence-means-in-practical-terms': {
    plainEnglish: [
      'Artificial intelligence is software designed to perform tasks that normally require pattern recognition, prediction, language understanding, decision support, or adaptive behaviour. In practical work, AI is not one single tool. It is a broad category of systems that help with different kinds of tasks.',
      'A chatbot, an image generator, a coding assistant, a search-grounded research tool, and an automation workflow can all be described as AI, but they do not work the same way or carry the same risks.',
      'The practical question is not “Is this AI?” The better question is “What task is this system performing, what information is it using, and how should the output be checked?”',
    ],
    whyItMatters:
      'Clear definitions help you avoid treating every AI product as interchangeable. That protects you from choosing the wrong tool for the job.',
    steps: [
      'Identify the task the AI system is meant to help with.',
      'Identify what kind of input it needs.',
      'Identify what kind of output it produces.',
      'Decide whether the output needs human review, source checking, or approval before use.',
    ],
    workedExampleTitle: 'AI is a category, not a single behaviour',
    workedExample: [
      'Autocomplete predicts the next word. A chatbot generates a response from context. A research assistant may search sources and summarise them. An automation tool may move information between systems.',
      'Calling all of these “AI” is technically acceptable, but not specific enough for safe use.',
      'A practical learner names the job: drafting, searching, classifying, extracting, generating, checking, or automating.',
    ],
    selfCheck: [
      'Can you name the task an AI system is performing?',
      'Can you explain why a chatbot and an automation workflow are not the same thing?',
      'Can you describe what kind of review the output needs?',
    ],
    action:
      'When you see an AI tool, classify the task first. That habit makes tool choice and output review much easier.',
  },
  'what-large-language-models-are': {
    plainEnglish: [
      'A large language model is a system trained to generate language by using patterns learned from large amounts of text and other training data. It can produce fluent answers, summaries, plans, code, tables, and explanations because it has learned relationships between words, concepts, and formats.',
      'The important limitation is that fluent language is not the same as verified truth. A model can produce a confident answer even when it has not checked a source, misunderstood the task, or filled in missing information.',
      'This is why language models are useful for drafting, explaining, transforming, structuring, and brainstorming, but their output still needs review when accuracy matters.',
    ],
    whyItMatters:
      'Understanding language models helps you use them without treating them as fact machines.',
    steps: [
      'Give the model the task and context it needs.',
      'Ask for the output format you want.',
      'Tell it what uncertainty or assumptions to flag.',
      'Check important claims before using the result.',
    ],
    workedExampleTitle: 'Fluent does not mean verified',
    workedExample: [
      'A language model can summarise a policy document well when the document is provided. But if you ask it about a policy it has not seen, it may produce a plausible answer from general patterns.',
      'Both answers may sound professional. Only one is grounded in the supplied source.',
      'The practical skill is knowing when the model is transforming provided context and when it may be inventing missing detail.',
    ],
    selfCheck: [
      'Can you explain why a language model can sound confident when it is wrong?',
      'Can you name a task where a language model is useful?',
      'Can you name a task where its answer must be checked?',
    ],
    action:
      'Use language models as powerful drafting and reasoning assistants, but keep verification as part of the workflow.',
  },
  'why-ai-sounds-confident-even-when-wrong': {
    plainEnglish: [
      'AI tools often sound confident because they are optimised to produce fluent, helpful-looking responses. Polished structure, professional tone, and detailed wording can make an answer feel reliable even when the facts are unsupported.',
      'This is one of the most important beginner lessons: confidence is a style signal, not an accuracy signal. The model may not know which claims need evidence unless you ask for sources, provide trusted material, or build a review step into the workflow.',
      'A reliable AI user separates tone from truth. They look for source support, uncertainty, assumptions, and whether the answer matches the actual task.',
    ],
    whyItMatters:
      'Many AI mistakes are accepted because the answer sounds polished. Learning to distrust polish protects your work.',
    steps: [
      'Underline claims that would matter if wrong.',
      'Ask whether each claim is supported by provided context or a reliable source.',
      'Look for missing caveats or overconfident wording.',
      'Rewrite the answer with uncertainty labels where needed.',
    ],
    workedExampleTitle: 'A confident answer can still be unsafe',
    workedExample: [
      'Suppose an AI answer says, “This software is fully compliant with your industry rules.” That sounds reassuring, but it is a high-risk claim.',
      'A safer answer would say what evidence was checked, what is unknown, and what needs legal or compliance review.',
      'The issue is not whether the AI sounded helpful. The issue is whether the claim was safe to rely on.',
    ],
    selfCheck: [
      'Can you identify a claim that needs evidence?',
      'Can you explain why confident tone is not proof?',
      'Can you rewrite an overconfident answer more safely?',
    ],
    action:
      'Before trusting an AI answer, separate what sounds good from what is actually supported.',
  },
  'prediction-reasoning-retrieval-and-automation': {
    plainEnglish: [
      'Modern AI work often mixes four ideas: prediction, reasoning-style output, retrieval, and automation. They sound similar in marketing copy, but they are different in practice.',
      'Prediction is the model generating likely text or output from patterns and context. Reasoning-style output is the model working through a task or plan. Retrieval is the system pulling in external information from files, search, or a knowledge base. Automation is when software takes an action or moves data through a workflow.',
      'A safe workflow depends on knowing which one you are using. Asking a model to answer from memory is not the same as retrieving a source. Getting a suggested action is not the same as allowing an automated action.',
    ],
    whyItMatters:
      'Confusing these concepts leads to weak workflows, bad tool choices, and unsafe trust.',
    steps: [
      'Ask whether the task needs generated language, source-backed information, or a real action.',
      'Use retrieval when the answer must depend on specific documents or current sources.',
      'Use automation only when the action is safe, permissioned, and reviewable.',
      'Keep human approval in place for high-impact actions.',
    ],
    workedExampleTitle: 'A support workflow uses all four ideas',
    workedExample: [
      'An AI support assistant may predict a helpful reply, reason through the customer issue, retrieve the order policy, and prepare an action such as creating a refund request.',
      'Those are not the same step. Drafting the reply is lower risk than issuing the refund.',
      'Good AI workflow design separates these steps so each one can be checked properly.',
    ],
    selfCheck: [
      'Can you tell whether a task needs retrieval or just drafting?',
      'Can you explain why automation requires stronger controls?',
      'Can you classify an AI feature by what it actually does?',
    ],
    action:
      'When reviewing an AI workflow, label each step: generate, reason, retrieve, or act.',
  },
  'prompts-context-and-instructions': {
    plainEnglish: [
      'A prompt is not just a question. It is an instruction package. Strong prompts give the model enough information to understand the task, the audience, the constraints, the desired format, and the review standard.',
      'Weak prompts often fail because the model has to guess too much. If you do not provide context, it may invent context. If you do not define the output format, it may choose one that is not useful. If you do not set limits, it may include assumptions you did not want.',
      'The goal is not to write long prompts. The goal is to provide the right information for the job.',
    ],
    whyItMatters:
      'Better instructions create better output and reduce the amount of cleanup needed afterwards.',
    steps: [
      'State the task clearly.',
      'Add the relevant background or source material.',
      'Name the audience and purpose.',
      'Set constraints, tone, and format.',
      'Tell the model what to flag or avoid.',
    ],
    workedExampleTitle: 'A vague prompt becomes a useful instruction',
    workedExample: [
      'Weak prompt: “Write an email.”',
      'Better prompt: “Draft a polite email to a customer whose delivery is delayed. Keep it under 120 words, do not offer compensation, apologise once, and include a line saying I will confirm the new delivery date.”',
      'The second prompt gives task, audience, tone, limits, and business rules.',
    ],
    selfCheck: [
      'Does your prompt include a clear task?',
      'Does it include the context the model needs?',
      'Does it explain what a good answer should look like?',
    ],
    action:
      'Before asking AI for output, write the instruction like you are briefing a capable assistant who does not know your situation yet.',
  },
  'models-apps-and-platforms': {
    plainEnglish: [
      'A model, an app, and a platform are related but not the same. The model is the underlying AI capability. The app is the user-facing product experience. The platform is the wider system around the model, including tools, files, memory, permissions, APIs, billing, and integrations.',
      'This distinction matters because a feature you like may come from the app, not the model. A model may be powerful, but the product around it may limit what you can do. A platform may add useful workflow features that are not part of the raw model.',
      'When choosing AI tools, you need to evaluate the whole product, not only the model name.',
    ],
    whyItMatters:
      'Confusing models, apps, and platforms causes poor tool comparisons and unrealistic expectations.',
    steps: [
      'Identify the underlying model or model family where possible.',
      'Identify the app interface and what it adds.',
      'Identify platform features such as files, tools, memory, team controls, or APIs.',
      'Choose based on the workflow, not just the model label.',
    ],
    workedExampleTitle: 'The same model can feel different in different products',
    workedExample: [
      'A model used inside a chat app may support conversation, file uploads, memory, and browsing-like features. The same model through an API may require a developer to build those features separately.',
      'The capability is not only the model. It is the model plus the product environment.',
      'That is why tool intelligence needs scenario-based comparison.',
    ],
    selfCheck: [
      'Can you identify what belongs to the model?',
      'Can you identify what belongs to the app interface?',
      'Can you identify what belongs to the wider platform?',
    ],
    action:
      'When comparing tools, write down whether you are judging the model, the app, or the full platform.',
  },
  'files-memory-retrieval-and-search': {
    plainEnglish: [
      'Files, memory, retrieval, and search are different ways an AI system may use information beyond the immediate prompt. Uploaded files give the system material to inspect. Memory stores user preferences or facts over time. Retrieval pulls relevant chunks from a knowledge base. Search looks for external or current information.',
      'The danger is assuming these all mean “the AI knows the truth.” They do not. A file can be misread. Memory can be incomplete. Retrieval can pull the wrong chunk. Search can find weak sources.',
      'A good learner asks where the information came from and whether it supports the answer.',
    ],
    whyItMatters:
      'Source awareness is one of the foundations of safe AI use.',
    steps: [
      'Ask what information source the answer depends on.',
      'Check whether that source was actually provided or retrieved.',
      'Look for missing citations or unsupported claims.',
      'Use stronger source checks for business, legal, financial, or safety-sensitive work.',
    ],
    workedExampleTitle: 'Memory is not the same as retrieval',
    workedExample: [
      'If an AI tool remembers that you prefer short answers, that is memory. If it pulls a policy paragraph from your company handbook, that is retrieval.',
      'Those should not be treated the same. A preference can guide style; a retrieved policy can support an answer if the right source was found.',
      'The review step is checking whether the answer is grounded in the right information.',
    ],
    selfCheck: [
      'Can you tell whether an answer used a file, memory, retrieval, or search?',
      'Can you explain why each source type can still fail?',
      'Can you name a review step for source-backed answers?',
    ],
    action:
      'Do not ask only “what did the AI say?” Ask “what information did it use?”',
  },
  'why-model-updates-change-behaviour': {
    plainEnglish: [
      'AI tools change because models, apps, interfaces, policies, and platform features are updated. A workflow that worked last month may behave differently after a model update, a file-handling change, a new safety rule, or a pricing-plan change.',
      'This does not mean AI is unusable. It means AI training needs refresh logic. Learners should expect important workflows to be reviewed when the underlying tool changes.',
      'Version-aware learning prevents old habits from silently becoming risky.',
    ],
    whyItMatters:
      'AI changes quickly. Skill stays useful only when important changes are noticed, translated, and practised.',
    steps: [
      'Notice when a tool, model, API, or workflow has changed.',
      'Ask whether the change affects a lesson, prompt, sandbox task, or business workflow.',
      'Update the training material if practical behaviour has changed.',
      'Recommend refreshers for learners who completed the old version.',
    ],
    workedExampleTitle: 'An old workflow becomes unreliable',
    workedExample: [
      'A team learns a file-summary workflow. Later, the tool changes how uploaded files are processed. The old instructions may still look correct but produce different results.',
      'A living Academy flags that the lesson needs review and may create a new sandbox task.',
      'That keeps user progress connected to current capability, not old screenshots or assumptions.',
    ],
    selfCheck: [
      'Can you name a reason an AI workflow might change?',
      'Can you explain why old tutorials can become unsafe?',
      'Can you describe what a refresher is for?',
    ],
    action:
      'Treat AI learning as current training. Recheck important workflows when tools change.',
  },
  'what-ai-is-good-at': {
    plainEnglish: [
      'AI is especially useful for first drafts, summaries, brainstorming, classification, rewriting, pattern spotting, translation-style transformation, and turning messy input into a clearer structure. These tasks are valuable because they save time without automatically handing over final judgement.',
      'The safest beginner habit is to use AI where the output can be reviewed easily. Drafting a meeting summary is lower risk than approving a contract. Brainstorming ideas is lower risk than making a medical, legal, or financial decision.',
      'AI is strongest when it helps you move from blank page to useful draft, from messy notes to structure, or from many options to a clearer starting point.',
    ],
    whyItMatters:
      'Knowing AI strengths helps you pick useful low-risk tasks instead of forcing AI into work it should not control.',
    steps: [
      'Choose tasks where a human can review the result.',
      'Use AI to draft, organise, compare, or explain.',
      'Keep final judgement with a human for important work.',
      'Add source checks when factual accuracy matters.',
    ],
    workedExampleTitle: 'A good beginner workflow',
    workedExample: [
      'A manager pastes non-sensitive meeting notes and asks AI to produce action items, owners, and open questions.',
      'That is a strong use case because the input is provided, the output is easy to review, and the manager can correct mistakes before sharing.',
      'The AI speeds up structure; the human keeps responsibility.',
    ],
    selfCheck: [
      'Can you name three low-risk AI tasks?',
      'Can you explain why review still matters?',
      'Can you decide whether a task is suitable for a beginner AI workflow?',
    ],
    action:
      'Start with tasks where AI creates a draft or structure and you remain the final reviewer.',
  },
}

function getFallbackTeachingContent(context: LessonContext): LessonTeachingContent {
  const { module, lesson } = context

  return {
    plainEnglish: [
      `${lesson.title} is part of ${module.title}. The purpose of this lesson is to help you turn one AI concept into a practical working habit rather than leaving it as theory.`,
      lesson.outcome,
      'A useful AI lesson should change how you behave with a tool. After this lesson, you should be able to recognise the situation, apply the idea, avoid the common mistake, and decide what needs checking before the output is used.',
    ],
    whyItMatters:
      'AI skill is built through judgement. A learner who can explain the concept, apply it to a task, and review the result is far safer and more capable than someone who only knows the terminology.',
    steps: [
      'Read the core idea and put it into your own words.',
      'Connect the idea to a real task or workflow.',
      'Notice the common mistake and how it would weaken the result.',
      'Decide what evidence, context, or human review is needed before using the output.',
    ],
    workedExampleTitle: 'Apply the lesson to a real task',
    workedExample: [
      lesson.practicalExample,
      'The practical move is to slow down just enough to identify the task, the risk, the expected output, and the review step.',
      'That habit is what turns AI from a novelty into a controlled working method.',
    ],
    selfCheck: [
      'Can you explain the lesson in plain English?',
      'Can you apply it to a real AI task?',
      'Can you identify the mistake this lesson is warning you about?',
    ],
    action: lesson.completionRequirement,
  }
}

function getTeachingContent(context: LessonContext) {
  return specificTeachingBySlug[context.lesson.slug] ?? getFallbackTeachingContent(context)
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
  eyebrow,
  title,
  children,
  icon,
}: {
  eyebrow: string
  title: string
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10 sm:p-6">
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
    </section>
  )
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

export default async function AIFundamentalsLessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params
  const context = getLessonContext(moduleSlug, lessonSlug)

  if (!context) {
    notFound()
  }

  const { module, lesson, lessonIndex, flatIndex, previousItem, nextItem } = context
  const teaching = getTeachingContent(context)
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

          <div className="relative z-10 grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-center">
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
                  Module {module.moduleNumber}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {lesson.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {lesson.outcome}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-blue-700 bg-blue-600 p-5 text-white shadow-2xl shadow-blue-900/25">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                Your lesson
              </p>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <IconTile solid>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
                    )}
                  </IconTile>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                      Progress
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      {isCompleted ? 'Completed' : 'Ready to learn'}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-blue-50">
                  {isCompleted
                    ? 'This lesson has already been saved as complete.'
                    : 'Read the teaching, work through the example, then mark the lesson complete.'}
                </p>
              </div>

              <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-100">
                  Coming next
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">
                  {nextItem ? nextItem.lesson.title : 'Return to course overview'}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <Target className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Learn
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Understand the concept in plain English before using it in a workflow.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <Code2 className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Apply
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Connect the lesson to a practical AI task, not just a definition.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-900/5">
            <IconTile>
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
              Check
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Spot the mistake this lesson is designed to prevent.
            </p>
          </article>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-5">
            <LessonSection
              eyebrow="Lesson teaching"
              title="Understand the idea"
              icon={<BookOpenCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <div className="space-y-4">
                {teaching.plainEnglish.map((paragraph) => (
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
              eyebrow="How to use it"
              title="Apply the lesson"
              icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
            >
              <ol className="space-y-3">
                {teaching.steps.map((step, index) => (
                  <li key={step} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm font-semibold leading-6 text-slate-700">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </LessonSection>

            <LessonSection
              eyebrow="Worked example"
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
              eyebrow="Common mistake"
              title="Avoid the usual trap"
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <p className="text-base leading-8 text-slate-600">{lesson.commonMistake}</p>

              <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                  Practical fix
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Slow the task down. Name the goal, the context, the output you need, and the review step before trusting the result.
                </p>
              </div>
            </LessonSection>

            <LessonSection
              eyebrow="Recap"
              title="Check your understanding"
              icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />}
            >
              <div className="grid gap-3">
                {teaching.selfCheck.map((item) => (
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

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <div className="flex items-center gap-3">
                <IconTile>
                  <Route className="h-5 w-5" aria-hidden="true" />
                </IconTile>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                    Lesson route
                  </p>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">Position in course</h2>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Current module
                  </p>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-950">{module.title}</p>
                </div>

                {previousItem ? (
                  <Link
                    href={getLessonHref(previousItem)}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                      Previous lesson
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
                    Next lesson
                  </p>
                  <p className="mt-2 text-sm font-black leading-6 text-slate-950">
                    {nextItem ? nextItem.lesson.title : 'Return to course overview'}
                  </p>
                </Link>
              </div>
            </section>

            <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/10">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                Focus areas
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
                Lesson action
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                {isCompleted ? 'Continue learning' : 'Mark this lesson complete'}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{teaching.action}</p>

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
              <FileQuestion className="h-5 w-5" aria-hidden="true" />
            </IconTile>
            <div>
              <p className="text-sm font-black text-slate-950">Finish the lesson, then keep the route moving.</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Each lesson should leave you with one clearer skill, one practical example, and one mistake to avoid.
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

