import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { aiFundamentalsLearningPath } from '@/lib/academy/fundamentals'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type AcademyFeedbackRequest = {
  moduleSlug?: unknown
  lessonSlug?: unknown
  learnerInput?: unknown
}

type AcademyAIFeedback = {
  score: number
  tier: 'Strong' | 'Developing' | 'Needs work'
  learnerInputSummary: string
  whatWorked: string[]
  improveNext: string[]
  missingAreas: string[]
  betterPrompt: string
  whyBetter: string
  practiceInstruction: string
  safetyNote: string
  rubric: {
    taskClarity: boolean
    audience: boolean
    context: boolean
    outputShape: boolean
    boundaries: boolean
    reviewStep: boolean
  }
}

type Module = (typeof aiFundamentalsLearningPath.modules)[number]
type Lesson = Module['lessons'][number]

type LessonContext = {
  module: Module
  lesson: Lesson
}

const feedbackSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'score',
    'tier',
    'learnerInputSummary',
    'whatWorked',
    'improveNext',
    'missingAreas',
    'betterPrompt',
    'whyBetter',
    'practiceInstruction',
    'safetyNote',
    'rubric',
  ],
  properties: {
    score: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
    tier: {
      type: 'string',
      enum: ['Strong', 'Developing', 'Needs work'],
    },
    learnerInputSummary: {
      type: 'string',
      minLength: 8,
      maxLength: 360,
    },
    whatWorked: {
      type: 'array',
      minItems: 1,
      maxItems: 4,
      items: {
        type: 'string',
        minLength: 8,
        maxLength: 220,
      },
    },
    improveNext: {
      type: 'array',
      minItems: 1,
      maxItems: 4,
      items: {
        type: 'string',
        minLength: 8,
        maxLength: 260,
      },
    },
    missingAreas: {
      type: 'array',
      minItems: 0,
      maxItems: 8,
      items: {
        type: 'string',
        enum: [
          'Task clarity',
          'Audience',
          'Context',
          'Output shape',
          'Boundaries',
          'Review step',
          'Safety',
          'Source grounding',
        ],
      },
    },
    betterPrompt: {
      type: 'string',
      minLength: 40,
      maxLength: 900,
    },
    whyBetter: {
      type: 'string',
      minLength: 20,
      maxLength: 360,
    },
    practiceInstruction: {
      type: 'string',
      minLength: 20,
      maxLength: 280,
    },
    safetyNote: {
      type: 'string',
      minLength: 10,
      maxLength: 260,
    },
    rubric: {
      type: 'object',
      additionalProperties: false,
      required: [
        'taskClarity',
        'audience',
        'context',
        'outputShape',
        'boundaries',
        'reviewStep',
      ],
      properties: {
        taskClarity: {
          type: 'boolean',
        },
        audience: {
          type: 'boolean',
        },
        context: {
          type: 'boolean',
        },
        outputShape: {
          type: 'boolean',
        },
        boundaries: {
          type: 'boolean',
        },
        reviewStep: {
          type: 'boolean',
        },
      },
    },
  },
} as const

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
          // Route handlers may not always need to update cookies.
        }
      },
    },
  })
}

function getLessonContext(moduleSlug: string, lessonSlug: string): LessonContext | null {
  const module = aiFundamentalsLearningPath.modules.find((item) => item.slug === moduleSlug)

  if (!module) {
    return null
  }

  const lesson = module.lessons.find((item) => item.slug === lessonSlug)

  if (!lesson) {
    return null
  }

  return {
    module,
    lesson,
  }
}

async function readJson(request: Request): Promise<AcademyFeedbackRequest | null> {
  try {
    return (await request.json()) as AcademyFeedbackRequest
  } catch {
    return null
  }
}

function isValidText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function cleanLearnerInput(input: string) {
  return input.replace(/\s+/g, ' ').trim()
}

function getOutputText(responseJson: unknown) {
  if (!responseJson || typeof responseJson !== 'object') {
    return ''
  }

  const outputText = (responseJson as { output_text?: unknown }).output_text

  if (typeof outputText === 'string') {
    return outputText
  }

  const output = (responseJson as { output?: unknown }).output

  if (!Array.isArray(output)) {
    return ''
  }

  for (const outputItem of output) {
    if (!outputItem || typeof outputItem !== 'object') {
      continue
    }

    const content = (outputItem as { content?: unknown }).content

    if (!Array.isArray(content)) {
      continue
    }

    for (const contentItem of content) {
      if (!contentItem || typeof contentItem !== 'object') {
        continue
      }

      const text = (contentItem as { text?: unknown }).text

      if (typeof text === 'string') {
        return text
      }
    }
  }

  return ''
}

function parseFeedback(text: string): AcademyAIFeedback | null {
  try {
    return JSON.parse(text) as AcademyAIFeedback
  } catch {
    return null
  }
}

function buildAcademyInstructions() {
  return [
    'You are the DeepMind Resources Academy feedback engine.',
    'Your job is to evaluate a learner practice input and improve it as a training exercise.',
    'Do not answer the learner task itself. Do not complete the task they are asking AI to do.',
    'Evaluate the quality of the learner input as an instruction for AI.',
    'The improved prompt must be directly related to the learner input. Never swap to a generic unrelated example.',
    'Focus on: task clarity, audience, context, output shape, boundaries, safety, source grounding, and review step.',
    'If the learner asks for something risky, unsafe, illegal, or high-impact, keep the feedback educational and make the better prompt safer by adding boundaries, warnings, and human review.',
    'Use plain English. Be specific, practical, and learner-facing.',
    'Return only the structured JSON requested by the schema.',
  ].join('\n')
}

function buildAcademyInput({
  context,
  learnerInput,
}: {
  context: LessonContext
  learnerInput: string
}) {
  return JSON.stringify(
    {
      academy: 'DeepMind Resources Academy',
      course: aiFundamentalsLearningPath.title,
      module: {
        slug: context.module.slug,
        title: context.module.title,
        purpose: context.module.purpose,
      },
      lesson: {
        slug: context.lesson.slug,
        title: context.lesson.title,
        outcome: context.lesson.outcome,
        practicalExample: context.lesson.practicalExample,
        commonMistake: context.lesson.commonMistake,
      },
      learnerInput,
      expectedFeedbackBehaviour: {
        whatWorked:
          'Explain what is genuinely useful in the learner input, with direct reference to their wording.',
        improveNext:
          'Explain what is missing or weak, and why it matters for AI output quality.',
        betterPrompt:
          'Rewrite the learner input into a stronger prompt for the same task, preserving their topic and intent.',
        practiceInstruction:
          'Tell the learner what to do next with the better prompt.',
      },
    },
    null,
    2,
  )
}

function validateFeedback(feedback: AcademyAIFeedback | null) {
  if (!feedback) {
    return null
  }

  if (
    typeof feedback.score !== 'number' ||
    !Number.isInteger(feedback.score) ||
    feedback.score < 0 ||
    feedback.score > 100
  ) {
    return null
  }

  if (!['Strong', 'Developing', 'Needs work'].includes(feedback.tier)) {
    return null
  }

  if (
    typeof feedback.learnerInputSummary !== 'string' ||
    typeof feedback.betterPrompt !== 'string' ||
    typeof feedback.whyBetter !== 'string' ||
    typeof feedback.practiceInstruction !== 'string' ||
    typeof feedback.safetyNote !== 'string'
  ) {
    return null
  }

  if (
    !Array.isArray(feedback.whatWorked) ||
    !Array.isArray(feedback.improveNext) ||
    !Array.isArray(feedback.missingAreas)
  ) {
    return null
  }

  if (!feedback.rubric || typeof feedback.rubric !== 'object') {
    return null
  }

  return feedback
}

export async function POST(request: Request) {
  const body = await readJson(request)

  if (!body) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_json',
        message: 'The request body must be valid JSON.',
      },
      { status: 400 },
    )
  }

  if (!isValidText(body.moduleSlug) || !isValidText(body.lessonSlug)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_lesson_route',
        message: 'The moduleSlug and lessonSlug fields are required.',
      },
      { status: 400 },
    )
  }

  if (!isValidText(body.learnerInput)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'missing_learner_input',
        message: 'The learnerInput field is required.',
      },
      { status: 400 },
    )
  }

  const learnerInput = cleanLearnerInput(body.learnerInput)

  if (learnerInput.length < 30) {
    return NextResponse.json(
      {
        ok: false,
        error: 'learner_input_too_short',
        message: 'The learner input needs a little more detail before AI feedback can evaluate it.',
      },
      { status: 400 },
    )
  }

  if (learnerInput.length > 2500) {
    return NextResponse.json(
      {
        ok: false,
        error: 'learner_input_too_long',
        message: 'The learner input is too long for this lesson feedback check.',
      },
      { status: 400 },
    )
  }

  const context = getLessonContext(body.moduleSlug.trim(), body.lessonSlug.trim())

  if (!context) {
    return NextResponse.json(
      {
        ok: false,
        error: 'lesson_not_found',
        message: 'The requested Academy lesson could not be found.',
      },
      { status: 404 },
    )
  }

  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: 'supabase_not_configured',
        message: 'Academy authentication is not configured for this environment.',
      },
      { status: 500 },
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        error: 'not_authenticated',
        message: 'Sign in is required before Academy AI feedback can run.',
      },
      { status: 401 },
    )
  }

  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'openai_not_configured',
        message: 'OPENAI_API_KEY is not configured for this environment.',
      },
      { status: 500 },
    )
  }

  const model = process.env.OPENAI_ACADEMY_FEEDBACK_MODEL ?? 'gpt-4o-mini'

  const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: buildAcademyInstructions(),
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: buildAcademyInput({ context, learnerInput }),
            },
          ],
        },
      ],
      max_output_tokens: 1400,
      temperature: 0.2,
      text: {
        format: {
          type: 'json_schema',
          name: 'academy_prompt_feedback',
          strict: true,
          schema: feedbackSchema,
        },
      },
    }),
  })

  const requestId = openaiResponse.headers.get('x-request-id')

  if (!openaiResponse.ok) {
    let errorText = ''

    try {
      errorText = await openaiResponse.text()
    } catch {
      errorText = ''
    }

    return NextResponse.json(
      {
        ok: false,
        error: 'openai_feedback_failed',
        message: 'AI feedback could not be generated for this attempt.',
        requestId,
        detail: errorText.slice(0, 500),
      },
      { status: 502 },
    )
  }

  const openaiJson = (await openaiResponse.json()) as unknown
  const responseText = getOutputText(openaiJson)
  const feedback = validateFeedback(parseFeedback(responseText))

  if (!feedback) {
    return NextResponse.json(
      {
        ok: false,
        error: 'invalid_ai_feedback',
        message: 'AI feedback returned an unexpected format.',
        requestId,
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    source: 'openai',
    model,
    requestId,
    lesson: {
      moduleSlug: context.module.slug,
      lessonSlug: context.lesson.slug,
      title: context.lesson.title,
    },
    feedback,
  })
}
