# Build, Deployment and QA Skill

This skill defines how DeepMindResources should handle local checks, GitHub workflow, Vercel deployment, environment variables, Supabase checks, mobile QA, SEO QA, and post-deploy verification.

A clean workflow keeps local, GitHub, Vercel, and production aligned.

---

## Core Purpose

DeepMindResources should be built and deployed in a controlled way.

The project should stay aligned across:

- Local project
- GitHub `main`
- Vercel production
- Supabase configuration
- Production domain

Every meaningful change should be checked before and after deployment.

---

## Core Rule

A change is not finished just because it was committed.

A change is complete when it is built, committed, pushed, deployed, and checked in the environment where users will see it.

---

## Standard Workflow

Normal workflow:

1. Make focused changes.
2. Run local checks where available.
3. Run `npm run build` before important commits.
4. Check `git status`.
5. Commit with a clear message.
6. Push to `main`.
7. Confirm Vercel deployment starts.
8. Confirm Vercel deployment is ready.
9. Check production page or route.
10. Verify mobile and desktop where relevant.

Current project standard is to commit to `main` so GitHub, Vercel, and local stay aligned.

---

## Git and GitHub Rules

Use clear commits.

Good commit messages:

- Add SEO and AI search skill standard
- Fix homepage mobile content width
- Refine live AI intelligence feed section
- Add validation and sources skill standard

Avoid vague messages such as:

- update
- changes
- fix stuff
- final

Do not commit `.env.local`, secret files, tokens, keys, private exports, or database dumps containing private data.

---

## Vercel Deployment Rules

After pushing to `main`, check Vercel.

Confirm:

- Correct project
- Correct GitHub repo
- Branch is `main`
- Deployment target is production
- Deployment state is ready
- Production domain resolves
- Latest commit matches the expected change

Do not assume deployment succeeded without checking.

---

## Environment Variable Rules

Never expose secret values.

Only reference environment variable names.

Expected public Supabase-related variable names currently include:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Environment checks should verify names and presence, not reveal values.

If a value is missing, it should be added in the correct dashboard, not pasted into chat.

---

## Supabase QA Rules

When Supabase features are added, check:

- Correct project
- Correct project ref
- Required tables exist
- RLS rules are planned or enabled where needed
- Public keys are used only where appropriate
- Service role keys stay server-side only
- User/team data is permission-protected

Do not build user or team features without considering RLS and permissions.

---

## Build QA Rules

Before considering a code change complete, check:

- App builds successfully
- No obvious TypeScript errors
- No broken imports
- No missing components
- No accidental placeholder copy
- No secret exposure
- No public/private data leak

For important UI changes, test the route manually as well.

---

## Mobile QA Rules

Mobile quality is required.

Check:

- No horizontal overflow
- Sidebar does not crush content
- Hero text wraps cleanly
- Cards stack properly
- Buttons are tappable
- Navigation works as drawer/top bar where relevant
- Main content uses full mobile width
- Text remains readable

If mobile looks crushed or confusing, the page is not done.

---

## SEO and Content QA Rules

Public pages should be checked for:

- Unique title
- Unique meta description
- Correct H1
- Clear search intent
- LLM-readable structure
- No placeholder metadata
- No generic v0 metadata
- Useful internal links
- Clear page purpose above the fold
- No unsupported AI hype

SEO and AI-search readiness are part of public page QA.

---

## Post-Deploy Verification

After deployment, verify:

- Latest commit deployed
- Deployment is ready
- Production page loads
- Changed section appears correctly
- Mobile layout still works
- No obvious page error is visible
- SEO metadata is not obviously broken where relevant

If Vercel reports a build error, inspect the failure before making additional changes.

---

## Rollback Awareness

If production breaks, identify:

- Last working deployment
- Commit that introduced the issue
- Files changed
- Whether rollback or forward fix is safer

Avoid panic-patching multiple unrelated files.

Make focused fixes.

---

## Definition of Done

A build or deployment task is complete when:

- Code change is focused
- Build passes where applicable
- Git status is understood
- Commit message is clear
- Change is pushed to `main`
- Vercel deployment is ready
- Production route is checked where relevant
- Mobile behaviour is checked where relevant
- No secrets or private data are exposed
- SEO/page QA is checked for public pages

---

## Locked Rule

DeepMindResources should move carefully from local to GitHub to production.

A change is not finished until the deployed product reflects it safely.
