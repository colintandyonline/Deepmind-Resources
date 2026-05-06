# AGENTS.md — DeepMind Resources Codex Instructions

Project: DeepMind Resources
Repo: colintandyonline/Deepmind-Resources
Domain: https://deepmindresources.pro

Core loop:
AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain

Rules:
- Work one focused change at a time.
- Do not refactor unrelated code.
- Do not redesign unless asked.
- Do not rename files, routes, functions, or data structures unless required.
- Do not add placeholder, admin, build-status, or internal planning copy.
- Customer-facing brand name is DeepMind Resources.
- Do not expose secrets, keys, tokens, credentials, or private data.
- Use environment variable names only.
- Never commit .env files, secret files, credential files, private exports, or database dumps.
- Prefer the smallest safe fix.

Workflow:
- Inspect before editing.
- Change only required files.
- Run npm run build for code changes.
- Commit only after build passes.
- Docs-only changes do not need a build.

Protected pages:
- app/academy/path/fundamentals/page.tsx
- app/academy/learn/fundamentals/page.tsx
- app/dashboard/page.tsx

Academy source of truth:
- lib/academy/fundamentals.ts

Dynamic Academy pages:
- app/academy/learn/fundamentals/module/[moduleSlug]/page.tsx
- app/academy/learn/fundamentals/module/[moduleSlug]/lesson/[lessonSlug]/page.tsx

Academy lesson rules:
- Lessons must teach, not just describe.
- Include teaching, practical example, common mistake, recap, practice, understanding check, and completion.
- Do not make learner pages feel like admin screens.

Practice tool rule:
- One learner prompt.
- One improved prompt.
- Use this prompt fills the practice box.
- Checking the improved prompt must not create another prompt.
- Original prompt, improved prompt, comparison, why-better text, and safety note must stay locked.
- Only Start again clears the cycle.
- Keep comparisons tied to the learner topic.

Style:
- Blue/white DeepMind Resources style.
- Mobile responsive.
- Professional, clear, learner-focused.
- No fake stats, fake live data, generic AI course copy, or internal wording.

Env variable names only:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- OPENAI_API_KEY
- OPENAI_ACADEMY_FEEDBACK_MODEL

Windows path rule:
- Use -LiteralPath for PowerShell paths containing [moduleSlug] or [lessonSlug].
- Use git literal pathspecs for bracket paths.

Definition of done:
- Focused change.
- Build passes if code changed.
- Clear commit.
- No secrets exposed.
- Requested behaviour actually fixed.
