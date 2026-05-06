# DeepMind Resources Codex Instructions

Project: DeepMind Resources
Domain: https://deepmindresources.pro
Repo: colintandyonline/Deepmind-Resources

Core product loop:
AI update -> verified meaning -> practical lesson -> sandbox task -> user skill gain

Rules:
- Work one focused change at a time.
- Do not refactor unrelated code.
- Do not redesign unless asked.
- Do not add placeholder, admin, build-status, or internal copy to public/logged-in pages.
- Customer-facing name is DeepMind Resources.
- Do not expose secrets. Use environment variable names only.
- Run npm run build before committing code changes.
- Keep Academy pages mobile-friendly and blue/white branded.

Academy:
- Public gateway: app/academy/path/fundamentals/page.tsx
- Course overview: app/academy/learn/fundamentals/page.tsx
- Module page: app/academy/learn/fundamentals/module/[moduleSlug]/page.tsx
- Lesson page: app/academy/learn/fundamentals/module/[moduleSlug]/lesson/[lessonSlug]/page.tsx
- Source of truth: lib/academy/fundamentals.ts

Lesson practice rule:
- One learner prompt.
- One improved prompt.
- Use this prompt locks that pair.
- Checking the improved prompt must not create another prompt.
- Only Start again clears the cycle.
