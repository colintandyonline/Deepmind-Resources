export type AcademyAccessTier = 'free_explorer' | 'individual_architect' | 'business_team' | 'enterprise_custom'

export type AcademyAudience =
  | 'beginner'
  | 'non_technical_learner'
  | 'business_staff'
  | 'manager'
  | 'individual_learner'
  | 'future_builder'

export type AcademySkillArea =
  | 'ai_fundamentals'
  | 'ai_safety'
  | 'output_validation'
  | 'tool_selection'
  | 'prompt_foundations'
  | 'workflow_design'
  | 'business_readiness'

export type AcademyProgressState =
  | 'not_started'
  | 'in_progress'
  | 'lesson_viewed'
  | 'knowledge_check_passed'
  | 'sandbox_pending'
  | 'sandbox_started'
  | 'sandbox_submitted'
  | 'sandbox_passed'
  | 'module_complete'
  | 'path_complete'
  | 'completed_before_update'
  | 'refresher_recommended'
  | 'skill_recheck_required'

export type AcademyBrainUpdateSensitivity = 'low' | 'medium' | 'high'

export type AcademyLessonBlockType =
  | 'orientation'
  | 'concept_explanation'
  | 'practical_example'
  | 'use_case_mapping'
  | 'common_mistake'
  | 'safety_or_validation_note'
  | 'business_relevance'
  | 'quick_recap'
  | 'knowledge_check'
  | 'sandbox_handoff'
  | 'next_step'

export type AcademyKnowledgeCheckType =
  | 'baseline_diagnostic'
  | 'classification'
  | 'concept_matching'
  | 'scenario_classification'
  | 'tool_matching'
  | 'workflow_design'
  | 'final_scenario_assessment'

export type AcademySandboxTaskRequirement = 'none' | 'optional' | 'required' | 'final_required'

export type AcademyLesson = {
  id: string
  slug: string
  title: string
  sortOrder: number
  skillAreas: AcademySkillArea[]
  audience: AcademyAudience[]
  outcome: string
  blocks: AcademyLessonBlockType[]
  practicalExample: string
  commonMistake: string
  completionRequirement: string
  versionNumber: number
  reviewStatus: 'planned' | 'draft' | 'published' | 'needs_review'
}

export type AcademyKnowledgeCheck = {
  id: string
  type: AcademyKnowledgeCheckType
  title: string
  purpose: string
  prompt: string
  passRule: string
  blocksProgressUntilPassed: boolean
}

export type AcademySandboxTask = {
  id: string
  slug: string
  title: string
  requirement: AcademySandboxTaskRequirement
  scenario: string
  instructions: string[]
  expectedOutput: string[]
  successCriteria: string[]
  commonMistake: string
  reviewChecklist: string[]
  skillAreas: AcademySkillArea[]
  difficulty: 'beginner' | 'intermediate'
  versionNumber: number
}

export type AcademyProgressEffect = {
  dashboardSignals: string[]
  progressEvents: AcademyProgressState[]
  unlocks: string[]
}

export type AcademyModule = {
  id: string
  slug: string
  moduleNumber: number
  title: string
  purpose: string
  studentOutcome: string[]
  lessons: AcademyLesson[]
  knowledgeCheck: AcademyKnowledgeCheck
  sandboxTask: AcademySandboxTask
  progressEffect: AcademyProgressEffect
  brainUpdateSensitivity: AcademyBrainUpdateSensitivity
  monetizationNote: string
  accessTier: AcademyAccessTier[]
}

export type AcademyFinalSkillCheck = {
  id: string
  slug: string
  title: string
  purpose: string
  scenario: string
  learnerMustDemonstrate: string[]
  assessmentType: string
  passingEvidence: string[]
  dashboardEffect: string[]
  award: string
  skillTraceEffect: string
  progressEvents: AcademyProgressState[]
}

export type AcademyLearningPath = {
  id: string
  slug: string
  title: string
  track: string
  status: 'planned' | 'active' | 'archived'
  versionNumber: number
  summary: string
  audience: AcademyAudience[]
  pathOutcome: string[]
  requiredCompletionEvidence: string[]
  modules: AcademyModule[]
  finalSkillCheck: AcademyFinalSkillCheck
  progressPrinciples: {
    progressStates: AcademyProgressState[]
    movementRules: string[]
  }
  dashboardRules: {
    currentPathSummary: string
    continueLearningPriority: string[]
    skillMapAreas: AcademySkillArea[]
  }
}

export const aiFundamentalsProgressStates: AcademyProgressState[] = [
  'not_started',
  'in_progress',
  'lesson_viewed',
  'knowledge_check_passed',
  'sandbox_pending',
  'sandbox_started',
  'sandbox_submitted',
  'sandbox_passed',
  'module_complete',
  'path_complete',
  'completed_before_update',
  'refresher_recommended',
  'skill_recheck_required',
]

export const aiFundamentalsLearningPath: AcademyLearningPath = {
  id: 'ai-fundamentals',
  slug: 'fundamentals',
  title: 'AI Fundamentals',
  track: 'Beginner Core',
  status: 'active',
  versionNumber: 1,
  summary:
    'The first complete beginner foundation path for DeepMind Resources. It teaches practical AI literacy, safe-use judgement, tool-category awareness, output validation, and repeatable beginner AI workflow habits.',
  audience: [
    'beginner',
    'non_technical_learner',
    'business_staff',
    'manager',
    'individual_learner',
    'future_builder',
  ],
  pathOutcome: [
    'Explain what AI means in practical terms.',
    'Understand that AI output is not automatically verified truth.',
    'Identify basic AI tool categories.',
    'Recognise where AI is useful and where it is risky.',
    'Avoid sharing sensitive data in unsafe contexts.',
    'Write a basic structured prompt.',
    'Check output before using it.',
    'Choose a tool category based on the task.',
    'Complete beginner-level sandbox validation tasks.',
  ],
  requiredCompletionEvidence: [
    'Complete all required module lessons.',
    'Pass module knowledge checks.',
    'Complete at least three sandbox tasks.',
    'Pass the final scenario assessment.',
    'Complete a confidence self-rating.',
    'Earn an AI Fundamentals skill evidence record.',
  ],
  modules: [
    {
      id: 'ai-fundamentals-module-1',
      slug: 'orientation-and-baseline',
      moduleNumber: 1,
      title: 'AI Orientation and Baseline',
      purpose:
        'Understand the learner starting level and introduce the DeepMind Resources learning model before deeper AI concepts begin.',
      studentOutcome: [
        'Know where they are starting.',
        'Understand what path they are on.',
        'Understand what practical skill means.',
        'Understand how lessons, sandbox tasks, progress records, and updates connect.',
      ],
      lessons: [
        {
          id: 'ai-fundamentals-module-1-lesson-1',
          slug: 'what-you-will-learn-in-ai-fundamentals',
          title: 'What you will learn in AI Fundamentals',
          sortOrder: 1,
          skillAreas: ['ai_fundamentals'],
          audience: ['beginner', 'individual_learner', 'business_staff'],
          outcome:
            'The learner understands the purpose of the path and why fundamentals matter before prompts, agents, automation, or tool choice.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Compare a learner who asks random AI questions with a learner who follows a structured path from concept to practice.',
          commonMistake:
            'Trying advanced AI workflows before understanding model limits, sensitive-data boundaries, or output review.',
          completionRequirement:
            'Learner reaches the end of the lesson and confirms the path purpose.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-1-lesson-2',
          slug: 'how-deepmind-resources-teaches-ai',
          title: 'How DeepMind Resources teaches AI',
          sortOrder: 2,
          skillAreas: ['ai_fundamentals'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner understands the platform loop: verified AI updates become lessons, sandbox tasks, progress records, and future refreshers.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'business_relevance',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'A model behaviour update changes a recommendation, which creates a refreshed lesson and a new sandbox task.',
          commonMistake:
            'Treating the Academy as a static course library rather than a living training system.',
          completionRequirement:
            'Learner can describe the link between lesson learning and sandbox evidence.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-1-lesson-3',
          slug: 'ai-skill-levels-beginner-user-builder-manager',
          title: 'AI skill levels: beginner, user, builder, manager',
          sortOrder: 3,
          skillAreas: ['ai_fundamentals', 'business_readiness'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager', 'future_builder'],
          outcome:
            'The learner understands the difference between basic AI literacy, practical AI use, workflow building, and management responsibility.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'business_relevance',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Map four learners to different routes: a beginner, a practical user, a technical builder, and a manager responsible for staff training.',
          commonMistake:
            'Assuming everyone needs the same AI training depth, regardless of role or responsibility.',
          completionRequirement:
            'Learner identifies their closest starting level.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-1-lesson-4',
          slug: 'baseline-check-what-do-you-already-understand',
          title: 'Baseline check: what do you already understand?',
          sortOrder: 4,
          skillAreas: ['ai_fundamentals'],
          audience: ['beginner', 'individual_learner', 'business_staff'],
          outcome:
            'The learner completes an initial baseline check so the platform can later show confidence, progress, and recommended next actions.',
          blocks: [
            'orientation',
            'knowledge_check',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'The learner answers simple questions about AI, tools, privacy, prompts, and output trust.',
          commonMistake:
            'Using the baseline as a pass/fail gate instead of a starting-level diagnostic.',
          completionRequirement:
            'Learner completes the baseline diagnostic.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
      ],
      knowledgeCheck: {
        id: 'ai-fundamentals-module-1-baseline-diagnostic',
        type: 'baseline_diagnostic',
        title: 'Baseline diagnostic quiz',
        purpose:
          'Identify confidence and prior understanding without blocking progress.',
        prompt:
          'Answer a short set of questions about AI concepts, prompt use, tool awareness, privacy, and output trust.',
        passRule:
          'Completion records the baseline. It does not block progress.',
        blocksProgressUntilPassed: false,
      },
      sandboxTask: {
        id: 'ai-fundamentals-module-1-learning-goal-map',
        slug: 'write-your-first-ai-learning-goal',
        title: 'Write your first AI learning goal',
        requirement: 'optional',
        scenario:
          'The learner defines one AI skill they want to gain and connects it to a practical outcome.',
        instructions: [
          'Write one AI learning goal.',
          'Explain why it matters.',
          'Map it to one practical action or workflow.',
          'Identify one risk or unknown to watch for.',
        ],
        expectedOutput: [
          'Learning goal.',
          'Practical outcome.',
          'Reason for learning.',
          'Risk or unknown.',
        ],
        successCriteria: [
          'Goal is specific.',
          'Outcome is practical.',
          'Risk or uncertainty is acknowledged.',
        ],
        commonMistake:
          'Writing a vague goal such as “learn AI” without a practical outcome.',
        reviewChecklist: [
          'Goal is clear.',
          'Outcome is connected to real use.',
          'Learner can explain why the skill matters.',
        ],
        skillAreas: ['ai_fundamentals'],
        difficulty: 'beginner',
        versionNumber: 1,
      },
      progressEffect: {
        dashboardSignals: [
          'Path started.',
          'Baseline complete.',
          'Recommended next module available.',
          'Initial confidence level recorded.',
        ],
        progressEvents: ['in_progress', 'lesson_viewed'],
        unlocks: ['Module 2: What AI Is and Is Not'],
      },
      brainUpdateSensitivity: 'low',
      monetizationNote:
        'This module should be free or mostly free because it explains the platform and supports conversion into paid individual or business plans.',
      accessTier: ['free_explorer', 'individual_architect', 'business_team', 'enterprise_custom'],
    },
    {
      id: 'ai-fundamentals-module-2',
      slug: 'what-ai-is-and-is-not',
      moduleNumber: 2,
      title: 'What AI Is and Is Not',
      purpose:
        'Remove hype and give the learner a practical mental model for what AI systems can and cannot be trusted to do.',
      studentOutcome: [
        'Explain that AI is not magic.',
        'Understand that AI output is not automatically verified.',
        'Recognise that different AI systems do different jobs.',
        'Understand why human judgement still matters.',
        'Understand that confident language does not prove correctness.',
      ],
      lessons: [
        {
          id: 'ai-fundamentals-module-2-lesson-1',
          slug: 'what-artificial-intelligence-means-in-practical-terms',
          title: 'What artificial intelligence means in practical terms',
          sortOrder: 1,
          skillAreas: ['ai_fundamentals'],
          audience: ['beginner', 'non_technical_learner', 'business_staff'],
          outcome:
            'The learner can explain AI as software that performs tasks using patterns, models, data, and instructions rather than magic or human understanding.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Compare autocomplete, image recognition, chatbot output, and automation to show that AI is a broad category, not one single thing.',
          commonMistake:
            'Using AI as a vague label for any smart-looking software without understanding the underlying task.',
          completionRequirement:
            'Learner can explain AI in plain English and give one practical example.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-2-lesson-2',
          slug: 'what-large-language-models-are',
          title: 'What large language models are',
          sortOrder: 2,
          skillAreas: ['ai_fundamentals'],
          audience: ['beginner', 'non_technical_learner', 'business_staff'],
          outcome:
            'The learner understands that language models generate likely text based on patterns and context, not guaranteed truth.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'safety_or_validation_note',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Show how a model can produce a fluent summary while still missing evidence or inventing unsupported detail.',
          commonMistake:
            'Assuming fluent language means the model has checked facts.',
          completionRequirement:
            'Learner can explain why a language model answer still needs review.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-2-lesson-3',
          slug: 'why-ai-sounds-confident-even-when-wrong',
          title: 'Why AI sounds confident even when wrong',
          sortOrder: 3,
          skillAreas: ['ai_fundamentals', 'output_validation', 'ai_safety'],
          audience: ['beginner', 'non_technical_learner', 'business_staff', 'manager'],
          outcome:
            'The learner can identify that confidence, polish, and detailed formatting are not proof of accuracy.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'safety_or_validation_note',
            'knowledge_check',
            'next_step',
          ],
          practicalExample:
            'Review a confident answer with unsupported claims and mark what needs source checking.',
          commonMistake:
            'Accepting confident AI output because it sounds professional.',
          completionRequirement:
            'Learner can mark a claim as supported, unsupported, or needing review.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-2-lesson-4',
          slug: 'prediction-reasoning-retrieval-and-automation',
          title: 'Prediction, reasoning, retrieval, and automation',
          sortOrder: 4,
          skillAreas: ['ai_fundamentals', 'tool_selection'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'future_builder'],
          outcome:
            'The learner understands that prediction-like text generation, reasoning-style responses, retrieval, and automation are different capabilities.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'practical_example',
            'quick_recap',
            'sandbox_handoff',
          ],
          practicalExample:
            'Classify four examples: a chatbot answer, a cited search answer, a workflow automation, and a tool-assisted task.',
          commonMistake:
            'Thinking a chatbot, a search system, and an automated workflow are interchangeable.',
          completionRequirement:
            'Learner can classify the four concepts in a practical example.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
      ],
      knowledgeCheck: {
        id: 'ai-fundamentals-module-2-claim-classification-check',
        type: 'classification',
        title: 'AI claim classification check',
        purpose:
          'Confirm the learner can separate supported AI claims from unsupported or unsafe claims.',
        prompt:
          'Classify sample AI claims as supported, unsupported, needs source checking, or unsafe to use without review.',
        passRule:
          'Learner must correctly classify most examples and explain at least one review step.',
        blocksProgressUntilPassed: true,
      },
      sandboxTask: {
        id: 'ai-fundamentals-module-2-confident-wrong-answer',
        slug: 'compare-confident-wrong-answer-with-verified-answer',
        title: 'Compare a confident wrong answer with a verified answer',
        requirement: 'required',
        scenario:
          'The learner compares two AI-style answers and identifies why one is not safe to use.',
        instructions: [
          'Read the confident unsupported answer.',
          'Read the verified answer with source support.',
          'Highlight claims that need evidence.',
          'Explain why the unsafe answer could mislead a user.',
          'Write the source or review step required before use.',
        ],
        expectedOutput: [
          'Unsupported claims list.',
          'Safety explanation.',
          'Required source or review step.',
          'Short corrected guidance.',
        ],
        successCriteria: [
          'Learner identifies unsupported claims.',
          'Learner explains why confidence is not proof.',
          'Learner names a sensible validation step.',
        ],
        commonMistake:
          'Only checking whether the answer sounds plausible instead of checking whether it is supported.',
        reviewChecklist: [
          'Unsupported claims identified.',
          'Verification step included.',
          'Unsafe use explained clearly.',
          'Corrected guidance avoids overclaiming.',
        ],
        skillAreas: ['ai_fundamentals', 'output_validation', 'ai_safety'],
        difficulty: 'beginner',
        versionNumber: 1,
      },
      progressEffect: {
        dashboardSignals: [
          'AI concept understanding improved.',
          'Validation skill introduced.',
          'First practical evidence available if sandbox task is passed.',
        ],
        progressEvents: [
          'lesson_viewed',
          'knowledge_check_passed',
          'sandbox_pending',
          'sandbox_submitted',
          'sandbox_passed',
        ],
        unlocks: ['Module 3: How Modern AI Tools Work'],
      },
      brainUpdateSensitivity: 'medium',
      monetizationNote:
        'This module should be free or partially free because it builds trust and teaches the most important beginner distinction: fluent AI output is not verified truth.',
      accessTier: ['free_explorer', 'individual_architect', 'business_team', 'enterprise_custom'],
    },
    {
      id: 'ai-fundamentals-module-3',
      slug: 'how-modern-ai-tools-work',
      moduleNumber: 3,
      title: 'How Modern AI Tools Work',
      purpose:
        'Explain the moving parts behind modern AI tools so learners understand context, prompts, models, apps, platforms, files, memory, retrieval, search, and updates.',
      studentOutcome: [
        'Understand why context changes output quality.',
        'Understand why the same prompt can behave differently across tools.',
        'Understand why AI apps are not the same as AI models.',
        'Understand why model and platform updates matter.',
        'Understand why retrieval and files are different from model memory.',
      ],
      lessons: [
        {
          id: 'ai-fundamentals-module-3-lesson-1',
          slug: 'prompts-context-and-instructions',
          title: 'Prompts, context, and instructions',
          sortOrder: 1,
          skillAreas: ['prompt_foundations', 'ai_fundamentals'],
          audience: ['beginner', 'individual_learner', 'business_staff'],
          outcome:
            'The learner understands that prompts work better when they include context, task, constraints, output format, and review expectations.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Compare a vague request with a structured instruction that includes audience, context, format, and review rules.',
          commonMistake:
            'Blaming the AI tool for poor output when the instruction lacked context or constraints.',
          completionRequirement:
            'Learner can identify the missing pieces in a weak prompt.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-3-lesson-2',
          slug: 'models-apps-and-platforms',
          title: 'Models, apps, and platforms',
          sortOrder: 2,
          skillAreas: ['ai_fundamentals', 'tool_selection'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'future_builder'],
          outcome:
            'The learner understands the difference between the model, the product interface, and the platform around it.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'practical_example',
            'common_mistake',
            'next_step',
          ],
          practicalExample:
            'Distinguish between an underlying model, a chat app, an API, and a business product built on top.',
          commonMistake:
            'Thinking an app feature and a model capability are the same thing.',
          completionRequirement:
            'Learner can classify model, app, and platform examples.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-3-lesson-3',
          slug: 'files-memory-retrieval-and-search',
          title: 'Files, memory, retrieval, and search',
          sortOrder: 3,
          skillAreas: ['ai_fundamentals', 'output_validation'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'future_builder'],
          outcome:
            'The learner understands how uploaded files, saved memory, retrieval systems, and search-grounded answers differ.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'safety_or_validation_note',
            'common_mistake',
            'quick_recap',
          ],
          practicalExample:
            'Compare answering from a pasted document, a remembered preference, and a retrieved source.',
          commonMistake:
            'Assuming the AI always knows which source it used or that memory equals source-backed retrieval.',
          completionRequirement:
            'Learner can identify whether a response needs retrieval, memory, or source checking.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-3-lesson-4',
          slug: 'why-model-updates-change-behaviour',
          title: 'Why model updates change behaviour',
          sortOrder: 4,
          skillAreas: ['ai_fundamentals', 'output_validation', 'workflow_design'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner understands why AI behaviour can change after model, app, or platform updates and why training needs refresh logic.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'business_relevance',
            'safety_or_validation_note',
            'quick_recap',
            'sandbox_handoff',
          ],
          practicalExample:
            'A tool changes how it handles files, so a previously safe workflow needs review.',
          commonMistake:
            'Assuming an old tutorial or old workflow remains valid forever.',
          completionRequirement:
            'Learner can explain why a completed lesson may later need a refresher.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
      ],
      knowledgeCheck: {
        id: 'ai-fundamentals-module-3-concept-matching-check',
        type: 'concept_matching',
        title: 'Modern AI tool concept matching',
        purpose:
          'Confirm the learner can match core tool concepts to practical examples.',
        prompt:
          'Match prompt, model, app, platform, tool, retrieval, memory, context window, and automation to real examples.',
        passRule:
          'Learner must correctly match most terms and explain one mismatch risk.',
        blocksProgressUntilPassed: true,
      },
      sandboxTask: {
        id: 'ai-fundamentals-module-3-context-comparison',
        slug: 'compare-missing-context-and-complete-context',
        title: 'Compare missing context and complete context',
        requirement: 'required',
        scenario:
          'The learner runs or reviews the same task with missing context and complete context, then compares output quality.',
        instructions: [
          'Review the task with missing context.',
          'Review the task with complete context.',
          'Compare the outputs.',
          'Identify what context improved the result.',
          'Write a better instruction for the task.',
        ],
        expectedOutput: [
          'Comparison of weak and improved output.',
          'Missing context list.',
          'Improved prompt or instruction.',
          'Reason the improved version is safer or more useful.',
        ],
        successCriteria: [
          'Learner identifies missing context.',
          'Learner explains why context changed the output.',
          'Learner writes a clearer instruction.',
        ],
        commonMistake:
          'Adding more words without adding useful context, constraints, or review criteria.',
        reviewChecklist: [
          'Context gap identified.',
          'Improved instruction contains task, context, constraints, and output format.',
          'Learner explains practical effect on quality.',
        ],
        skillAreas: ['ai_fundamentals', 'prompt_foundations', 'output_validation'],
        difficulty: 'beginner',
        versionNumber: 1,
      },
      progressEffect: {
        dashboardSignals: [
          'Context skill introduced.',
          'Tool structure understanding improved.',
          'Sandbox evidence pending or complete.',
        ],
        progressEvents: [
          'lesson_viewed',
          'knowledge_check_passed',
          'sandbox_pending',
          'sandbox_submitted',
          'sandbox_passed',
        ],
        unlocks: ['Module 4: AI Strengths, Limits, and Risks'],
      },
      brainUpdateSensitivity: 'high',
      monetizationNote:
        'This module should sit inside Individual Architect, with selected preview content available to Free Explorer.',
      accessTier: ['individual_architect', 'business_team', 'enterprise_custom'],
    },
    {
      id: 'ai-fundamentals-module-4',
      slug: 'ai-strengths-limits-and-risks',
      moduleNumber: 4,
      title: 'AI Strengths, Limits, and Risks',
      purpose:
        'Teach safe judgement before tool dependence so learners can choose low-risk tasks, spot risky outputs, protect sensitive information, and know when review is required.',
      studentOutcome: [
        'Choose low-risk AI tasks.',
        'Spot risky AI outputs.',
        'Avoid sharing sensitive information.',
        'Know when human review is required.',
        'Recognise weak or unsupported claims.',
      ],
      lessons: [
        {
          id: 'ai-fundamentals-module-4-lesson-1',
          slug: 'what-ai-is-good-at',
          title: 'What AI is good at',
          sortOrder: 1,
          skillAreas: ['ai_fundamentals', 'workflow_design'],
          audience: ['beginner', 'individual_learner', 'business_staff'],
          outcome:
            'The learner can identify useful low-risk AI tasks such as drafting, summarising, brainstorming, classification, and first-pass structuring.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'practical_example',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Classify which everyday tasks are suitable for AI assistance and which need extra review.',
          commonMistake:
            'Using AI for high-stakes decisions just because it handled a low-risk writing task well.',
          completionRequirement:
            'Learner can name safe beginner AI tasks and explain why they are lower risk.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-4-lesson-2',
          slug: 'what-ai-is-bad-at',
          title: 'What AI is bad at',
          sortOrder: 2,
          skillAreas: ['ai_fundamentals', 'ai_safety', 'output_validation'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner can identify risky AI uses involving unsupported facts, private data, legal or medical advice, regulated decisions, and unreviewed automation.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'safety_or_validation_note',
            'quick_recap',
          ],
          practicalExample:
            'Review a list of tasks and mark which should not be delegated to AI without approval or review.',
          commonMistake:
            'Assuming AI can safely handle any task if the prompt is detailed enough.',
          completionRequirement:
            'Learner can explain at least three unsuitable or high-review AI uses.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-4-lesson-3',
          slug: 'hallucinations-and-weak-claims',
          title: 'Hallucinations and weak claims',
          sortOrder: 3,
          skillAreas: ['output_validation', 'ai_safety'],
          audience: ['beginner', 'business_staff', 'manager'],
          outcome:
            'The learner can spot unsupported claims, invented details, missing sources, overconfident summaries, and shallow evidence.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'safety_or_validation_note',
            'knowledge_check',
            'next_step',
          ],
          practicalExample:
            'Inspect an AI-generated report and mark which claims need source support before use.',
          commonMistake:
            'Only checking spelling, tone, or formatting instead of checking factual support.',
          completionRequirement:
            'Learner can mark weak claims and identify the needed source check.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-4-lesson-4',
          slug: 'privacy-bias-and-sensitive-data-basics',
          title: 'Privacy, bias, and sensitive data basics',
          sortOrder: 4,
          skillAreas: ['ai_safety', 'business_readiness'],
          audience: ['beginner', 'business_staff', 'manager'],
          outcome:
            'The learner understands not to paste sensitive data into unapproved tools and can identify privacy-sensitive workflows.',
          blocks: [
            'orientation',
            'concept_explanation',
            'business_relevance',
            'practical_example',
            'common_mistake',
            'safety_or_validation_note',
            'sandbox_handoff',
          ],
          practicalExample:
            'Identify sensitive details in sample customer feedback before using AI to summarise it.',
          commonMistake:
            'Removing names but leaving enough details for private or sensitive information to remain identifiable.',
          completionRequirement:
            'Learner can identify sensitive information and name a safe handling step.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
      ],
      knowledgeCheck: {
        id: 'ai-fundamentals-module-4-risk-classification-check',
        type: 'scenario_classification',
        title: 'AI task risk classification check',
        purpose:
          'Confirm the learner can classify tasks by risk and review requirement.',
        prompt:
          'Classify tasks as safe, needs review, do not use AI, or use only with approved tools or policies.',
        passRule:
          'Learner must correctly classify most scenarios and explain at least one sensitive-data boundary.',
        blocksProgressUntilPassed: true,
      },
      sandboxTask: {
        id: 'ai-fundamentals-module-4-output-safety-audit',
        slug: 'audit-ai-generated-outputs',
        title: 'Audit three AI-generated outputs',
        requirement: 'required',
        scenario:
          'The learner audits three AI-generated outputs and decides which is safe to use, which needs checking, and which should be rejected.',
        instructions: [
          'Read three sample outputs.',
          'Mark each as safe, needs checking, or reject.',
          'Explain the reason for each decision.',
          'Identify any sensitive-data or unsupported-claim issues.',
          'Write the review step required before use.',
        ],
        expectedOutput: [
          'Classification for each output.',
          'Risk explanation.',
          'Review step.',
          'Rejected-output reason where applicable.',
        ],
        successCriteria: [
          'Learner correctly identifies unsafe or unsupported outputs.',
          'Learner explains human review needs.',
          'Learner identifies privacy or sensitive-data concerns.',
        ],
        commonMistake:
          'Approving an output because it sounds polished while ignoring unsupported claims or privacy risk.',
        reviewChecklist: [
          'All three outputs classified.',
          'Risk reasoning included.',
          'Sensitive data checked.',
          'Review requirement stated.',
        ],
        skillAreas: ['ai_safety', 'output_validation', 'business_readiness'],
        difficulty: 'beginner',
        versionNumber: 1,
      },
      progressEffect: {
        dashboardSignals: [
          'AI safety skill introduced.',
          'Validation skill improved.',
          'Privacy awareness recorded.',
          'Business readiness relevance increased.',
        ],
        progressEvents: [
          'lesson_viewed',
          'knowledge_check_passed',
          'sandbox_pending',
          'sandbox_submitted',
          'sandbox_passed',
        ],
        unlocks: ['Module 5: AI Tool Categories and Use Cases'],
      },
      brainUpdateSensitivity: 'high',
      monetizationNote:
        'This module should be available in Individual Architect and Business Team. Business Team should include a staff-safe variant.',
      accessTier: ['individual_architect', 'business_team', 'enterprise_custom'],
    },
    {
      id: 'ai-fundamentals-module-5',
      slug: 'ai-tool-categories-and-use-cases',
      moduleNumber: 5,
      title: 'AI Tool Categories and Use Cases',
      purpose:
        'Stop beginners thinking every AI product does the same thing and teach tool choice based on task, risk, workflow, and use case.',
      studentOutcome: [
        'Identify what kind of AI tool they need.',
        'Avoid choosing tools from hype.',
        'Understand why one tool is not universally best.',
        'Match tool categories to real use cases.',
        'Start with the task instead of the brand name.',
      ],
      lessons: [
        {
          id: 'ai-fundamentals-module-5-lesson-1',
          slug: 'chatbots-vs-search-tools-vs-coding-assistants',
          title: 'Chatbots vs search tools vs coding assistants',
          sortOrder: 1,
          skillAreas: ['tool_selection', 'ai_fundamentals'],
          audience: ['beginner', 'individual_learner', 'business_staff'],
          outcome:
            'The learner can distinguish general assistants, search-grounded tools, and coding assistants by task fit.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'practical_example',
            'common_mistake',
            'next_step',
          ],
          practicalExample:
            'Choose the best tool category for drafting an email, researching a policy, and debugging code.',
          commonMistake:
            'Using one favourite AI tool for every job regardless of task or evidence needs.',
          completionRequirement:
            'Learner can match common tasks to broad tool categories.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-5-lesson-2',
          slug: 'research-tools-vs-general-assistants',
          title: 'Research tools vs general assistants',
          sortOrder: 2,
          skillAreas: ['tool_selection', 'output_validation'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner understands when source-grounded research support matters more than a fluent general answer.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'safety_or_validation_note',
            'common_mistake',
            'quick_recap',
          ],
          practicalExample:
            'Compare when a general assistant is acceptable and when a research tool with sources is needed.',
          commonMistake:
            'Using a general chatbot as if it has automatically checked current sources.',
          completionRequirement:
            'Learner can identify when a task needs source-grounded research.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-5-lesson-3',
          slug: 'automation-tools-vs-agent-systems',
          title: 'Automation tools vs agent systems',
          sortOrder: 3,
          skillAreas: ['tool_selection', 'workflow_design'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'future_builder'],
          outcome:
            'The learner understands the difference between repeatable automation and more flexible agent-like behaviour.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'practical_example',
            'common_mistake',
            'safety_or_validation_note',
            'next_step',
          ],
          practicalExample:
            'Compare a fixed email routing automation with an agent-like research assistant that needs boundaries and review.',
          commonMistake:
            'Calling every automation an agent or allowing agent-like tools to act without control.',
          completionRequirement:
            'Learner can explain when a predictable workflow is safer than agent-like autonomy.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-5-lesson-4',
          slug: 'choosing-tools-based-on-the-job',
          title: 'Choosing tools based on the job',
          sortOrder: 4,
          skillAreas: ['tool_selection', 'business_readiness'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner can define the task first, then choose a tool category based on capability, risk, review need, and workflow fit.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'business_relevance',
            'practical_example',
            'knowledge_check',
            'sandbox_handoff',
          ],
          practicalExample:
            'Create a tool category choice for five tasks: drafting, current research, code help, automation, and sensitive review.',
          commonMistake:
            'Choosing a tool because it is popular, new, or promoted instead of because it matches the job.',
          completionRequirement:
            'Learner can justify a tool category choice using task, risk, and workflow fit.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
      ],
      knowledgeCheck: {
        id: 'ai-fundamentals-module-5-tool-matching-check',
        type: 'tool_matching',
        title: 'Tool category matching quiz',
        purpose:
          'Confirm the learner can choose the right AI tool category for a task and explain why.',
        prompt:
          'Choose the best tool category for each scenario and explain the reason for the choice.',
        passRule:
          'Learner must correctly match most scenarios and include reasoning beyond brand preference.',
        blocksProgressUntilPassed: true,
      },
      sandboxTask: {
        id: 'ai-fundamentals-module-5-tool-selection-table',
        slug: 'build-simple-tool-selection-decision-table',
        title: 'Build a simple tool-selection decision table',
        requirement: 'required',
        scenario:
          'The learner builds a tool-selection table for five real tasks.',
        instructions: [
          'Choose five tasks.',
          'Define the task outcome.',
          'Choose the best tool category.',
          'Mark risk level.',
          'Add review requirement.',
          'Explain the reason for the choice.',
        ],
        expectedOutput: [
          'Five-row decision table.',
          'Task outcome for each row.',
          'Tool category for each row.',
          'Risk and review requirement.',
          'Reason for each choice.',
        ],
        successCriteria: [
          'Task is defined before tool choice.',
          'Tool categories match use cases.',
          'Risk and review needs are included.',
          'Reasoning avoids hype or popularity.',
        ],
        commonMistake:
          'Listing tool names without defining the task, risk, or review requirement.',
        reviewChecklist: [
          'Five tasks included.',
          'Tool category selected for each task.',
          'Risk level included.',
          'Review requirement included.',
          'Reasoning is practical and specific.',
        ],
        skillAreas: ['tool_selection', 'business_readiness', 'output_validation'],
        difficulty: 'beginner',
        versionNumber: 1,
      },
      progressEffect: {
        dashboardSignals: [
          'Tool selection skill introduced.',
          'Use-case thinking improved.',
          'Related Tool Intelligence recommendations unlocked.',
        ],
        progressEvents: [
          'lesson_viewed',
          'knowledge_check_passed',
          'sandbox_pending',
          'sandbox_submitted',
          'sandbox_passed',
        ],
        unlocks: ['Module 6: Safe Practical AI Workflow'],
      },
      brainUpdateSensitivity: 'high',
      monetizationNote:
        'Core concepts can be free, but full tool comparison practice should belong to Individual Architect or Business Team.',
      accessTier: ['individual_architect', 'business_team', 'enterprise_custom'],
    },
    {
      id: 'ai-fundamentals-module-6',
      slug: 'safe-practical-ai-workflow',
      moduleNumber: 6,
      title: 'Safe Practical AI Workflow',
      purpose:
        'Turn AI understanding into a repeatable habit that begins with the task, adds context and constraints, checks output quality, and includes review before real-world use.',
      studentOutcome: [
        'Use AI in a controlled workflow.',
        'Write a basic structured prompt.',
        'Check output quality.',
        'Decide next steps safely.',
        'Build a repeatable AI-use checklist.',
      ],
      lessons: [
        {
          id: 'ai-fundamentals-module-6-lesson-1',
          slug: 'define-the-task-before-choosing-the-tool',
          title: 'Define the task before choosing the tool',
          sortOrder: 1,
          skillAreas: ['workflow_design', 'tool_selection'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner can state the task, input, expected output, risk, and review need before choosing an AI tool.',
          blocks: [
            'orientation',
            'concept_explanation',
            'use_case_mapping',
            'business_relevance',
            'practical_example',
            'quick_recap',
          ],
          practicalExample:
            'Turn “use AI for customer feedback” into a specific task definition with input, output, risk, and review.',
          commonMistake:
            'Starting with a tool before defining the job it needs to do.',
          completionRequirement:
            'Learner can write a simple task definition.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-6-lesson-2',
          slug: 'give-context-constraints-and-output-format',
          title: 'Give context, constraints, and output format',
          sortOrder: 2,
          skillAreas: ['prompt_foundations', 'workflow_design'],
          audience: ['beginner', 'individual_learner', 'business_staff'],
          outcome:
            'The learner can write a basic structured prompt that includes context, constraints, format, and review expectations.',
          blocks: [
            'orientation',
            'concept_explanation',
            'practical_example',
            'common_mistake',
            'quick_recap',
            'next_step',
          ],
          practicalExample:
            'Rewrite a vague summarisation request into a controlled prompt with audience, format, exclusions, and review step.',
          commonMistake:
            'Adding a role but no useful context, constraints, or success criteria.',
          completionRequirement:
            'Learner writes a structured beginner prompt.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-6-lesson-3',
          slug: 'check-the-output-before-using-it',
          title: 'Check the output before using it',
          sortOrder: 3,
          skillAreas: ['output_validation', 'ai_safety'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner can check output for accuracy, missing context, unsupported claims, privacy risk, and review requirements.',
          blocks: [
            'orientation',
            'concept_explanation',
            'safety_or_validation_note',
            'practical_example',
            'common_mistake',
            'quick_recap',
          ],
          practicalExample:
            'Use a short checklist to review an AI-generated summary before sharing it.',
          commonMistake:
            'Checking tone and grammar but not checking factual support or sensitive data.',
          completionRequirement:
            'Learner can apply a simple output review checklist.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
        {
          id: 'ai-fundamentals-module-6-lesson-4',
          slug: 'create-a-simple-ai-workflow-checklist',
          title: 'Create a simple AI workflow checklist',
          sortOrder: 4,
          skillAreas: ['workflow_design', 'ai_safety', 'business_readiness'],
          audience: ['beginner', 'individual_learner', 'business_staff', 'manager'],
          outcome:
            'The learner can create a repeatable safe-use checklist for a beginner AI-assisted workflow.',
          blocks: [
            'orientation',
            'concept_explanation',
            'business_relevance',
            'practical_example',
            'knowledge_check',
            'sandbox_handoff',
            'next_step',
          ],
          practicalExample:
            'Build a six-step workflow checklist for summarising notes, drafting an email, researching a topic, or planning a task.',
          commonMistake:
            'Creating a checklist that only describes prompting and ignores review, privacy, or escalation.',
          completionRequirement:
            'Learner creates a safe AI workflow checklist.',
          versionNumber: 1,
          reviewStatus: 'planned',
        },
      ],
      knowledgeCheck: {
        id: 'ai-fundamentals-module-6-workflow-design-check',
        type: 'workflow_design',
        title: 'Workflow design assessment',
        purpose:
          'Confirm the learner can define a safe beginner AI workflow before final assessment.',
        prompt:
          'Given a task, define input, tool category, prompt structure, review step, safe output use, and escalation point.',
        passRule:
          'Learner must include task definition, safe input handling, prompt structure, output review, and escalation point.',
        blocksProgressUntilPassed: true,
      },
      sandboxTask: {
        id: 'ai-fundamentals-module-6-safe-ai-workflow',
        slug: 'create-safe-ai-assisted-workflow',
        title: 'Create a safe AI-assisted workflow',
        requirement: 'required',
        scenario:
          'The learner creates a safe AI-assisted workflow for summarising, drafting, researching, or planning.',
        instructions: [
          'Choose one beginner workflow.',
          'Define the task and input.',
          'Choose the tool category.',
          'Write a structured prompt.',
          'Add a human review step.',
          'Add a sensitive-data warning.',
          'Define how the output can safely be used.',
        ],
        expectedOutput: [
          'Task definition.',
          'Tool category choice.',
          'Structured prompt.',
          'Human review step.',
          'Sensitive-data warning.',
          'Safe output-use rule.',
        ],
        successCriteria: [
          'Workflow starts with task definition.',
          'Prompt includes context and constraints.',
          'Human review is included.',
          'Sensitive-data warning is clear.',
          'Output-use rule is safe.',
        ],
        commonMistake:
          'Building a workflow that sends sensitive information to an unapproved tool or skips human review.',
        reviewChecklist: [
          'Task defined.',
          'Tool category justified.',
          'Prompt is structured.',
          'Review step included.',
          'Sensitive-data rule included.',
          'Output use is safe.',
        ],
        skillAreas: [
          'workflow_design',
          'prompt_foundations',
          'ai_safety',
          'output_validation',
          'business_readiness',
        ],
        difficulty: 'beginner',
        versionNumber: 1,
      },
      progressEffect: {
        dashboardSignals: [
          'Beginner practical workflow skill gained.',
          'AI Fundamentals path nearly complete.',
          'Final skill check unlocked.',
        ],
        progressEvents: [
          'lesson_viewed',
          'knowledge_check_passed',
          'sandbox_pending',
          'sandbox_submitted',
          'sandbox_passed',
          'module_complete',
        ],
        unlocks: ['Final: Fundamentals Skill Check and Sandbox Assessment'],
      },
      brainUpdateSensitivity: 'medium',
      monetizationNote:
        'This module should be paid for full completion because it creates practical workflow value.',
      accessTier: ['individual_architect', 'business_team', 'enterprise_custom'],
    },
  ],
  finalSkillCheck: {
    id: 'ai-fundamentals-final-skill-check',
    slug: 'fundamentals-skill-check-and-sandbox-assessment',
    title: 'Fundamentals Skill Check and Sandbox Assessment',
    purpose:
      'Confirm the learner can apply the full AI Fundamentals foundation in a realistic beginner business scenario.',
    scenario:
      'A manager asks the learner to use AI to summarise customer feedback and recommend next actions.',
    learnerMustDemonstrate: [
      'Identify privacy risks.',
      'Pick a suitable AI tool category.',
      'Write a structured prompt.',
      'Add a human review step.',
      'Explain what should not be pasted into the tool.',
      'Decide whether the output is ready to use.',
      'Explain how important claims would be verified.',
    ],
    assessmentType:
      'Scenario-based assessment with checklist scoring.',
    passingEvidence: [
      'Task definition.',
      'Tool category choice.',
      'Prompt draft.',
      'Risk checklist.',
      'Review step.',
      'Output validation plan.',
    ],
    dashboardEffect: [
      'AI Fundamentals complete.',
      'Beginner Core progress increased.',
      'AI Fundamentals Badge awarded.',
      'Next recommended path available.',
      'Skill evidence record created.',
    ],
    award: 'AI Fundamentals Badge',
    skillTraceEffect:
      'This path contributes to future Verified AI Skill Trace eligibility, but should not by itself create a full public Skill Trace unless combined with sandbox evidence and account verification.',
    progressEvents: ['sandbox_passed', 'path_complete'],
  },
  progressPrinciples: {
    progressStates: aiFundamentalsProgressStates,
    movementRules: [
      'A lesson can be marked as viewed when the learner opens or reaches the end of the lesson.',
      'A lesson can be marked as understood when the knowledge check is passed.',
      'A skill can be marked as practised when the sandbox task is submitted.',
      'A module can be marked complete when the learner passes the module assessment or required sandbox task.',
      'A path can be marked complete when all required modules, assessments, and sandbox tasks are complete.',
      'A path can become outdated-aware when a verified Brain update changes lesson or sandbox task requirements.',
    ],
  },
  dashboardRules: {
    currentPathSummary:
      'Show active path, current module, next lesson, progress percentage, and next required action.',
    continueLearningPriority: [
      'Required unfinished lesson.',
      'Required knowledge check.',
      'Required sandbox task.',
      'Module assessment.',
      'Final skill check.',
      'Refresher caused by Brain update.',
    ],
    skillMapAreas: [
      'ai_fundamentals',
      'prompt_foundations',
      'tool_selection',
      'ai_safety',
      'output_validation',
      'workflow_design',
      'business_readiness',
    ],
  },
}

export const aiFundamentalsModules = aiFundamentalsLearningPath.modules

export const aiFundamentalsFinalSkillCheck = aiFundamentalsLearningPath.finalSkillCheck

export function getAIFundamentalsModuleBySlug(slug: string) {
  return aiFundamentalsModules.find((module) => module.slug === slug) ?? null
}

export function getAIFundamentalsLessonBySlug(slug: string) {
  for (const module of aiFundamentalsModules) {
    const lesson = module.lessons.find((moduleLesson) => moduleLesson.slug === slug)

    if (lesson) {
      return {
        module,
        lesson,
      }
    }
  }

  return null
}

export function getNextAIFundamentalsModule(currentModuleSlug: string) {
  const currentIndex = aiFundamentalsModules.findIndex((module) => module.slug === currentModuleSlug)

  if (currentIndex === -1) {
    return null
  }

  return aiFundamentalsModules[currentIndex + 1] ?? null
}

export function getPreviousAIFundamentalsModule(currentModuleSlug: string) {
  const currentIndex = aiFundamentalsModules.findIndex((module) => module.slug === currentModuleSlug)

  if (currentIndex <= 0) {
    return null
  }

  return aiFundamentalsModules[currentIndex - 1] ?? null
}

export function getAIFundamentalsRequiredSandboxTasks() {
  return aiFundamentalsModules
    .map((module) => module.sandboxTask)
    .filter((task) => task.requirement === 'required' || task.requirement === 'final_required')
}

export function getAIFundamentalsFreePreviewModules() {
  return aiFundamentalsModules.filter((module) => module.accessTier.includes('free_explorer'))
}
