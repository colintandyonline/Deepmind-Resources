# Public Site Structure Plan

## Purpose

This document defines the public route, navigation, footer, and account-entry structure for DeepMind Resources before more academy, course, dashboard, or agent automation work is built.

DeepMind Resources must not drift into a generic static course website. The public site should explain the product clearly as a professional AI training and tool-intelligence platform:

AI update → verified meaning → practical lesson → sandbox task → user skill gain.

The site must support the .pro positioning: professional AI training, practical tool intelligence, sandbox practice, business-ready workflows, and trusted learning that stays current as AI changes.

---

## Source of Truth

Use `docs/PRODUCT_BLUEPRINT.md` as the strategic product source of truth.

Public site decisions must support these locked product goals:

1. Teach AI clearly from beginner to professional level.
2. Help users choose the right AI tools for real scenarios.
3. Track important AI platform and tool updates.
4. Verify information before publishing it.
5. Convert updates into practical lessons and sandbox tasks.
6. Support future business and team AI training.

---

## Public Brand Rules

Customer-facing copy must use:

- DeepMind Resources, with a space.
- deepmindresources.pro as the public domain.
- Blue and white crisp styling.
- Soft blue faded public-page backgrounds.
- Blue pill labels with white text where appropriate.
- Polished icons where they improve clarity.
- Professional, SEO-aware, mobile responsive, trust-building page structure.

Customer-facing copy must not use:

- Fake stats.
- Fake live data.
- Fake admin/build-status copy.
- Internal placeholder language.
- Customer-facing references to Google.
- Generic course-site positioning that ignores live AI intelligence and sandbox practice.

---

## Current Observed Routes and Files

These routes are already present or referenced in the current project state:

| Route | Current status | Notes |
|---|---:|---|
| `/` | Exists | Homepage is the current public entry point and includes the sidebar, business CTA, syllabus link, learning pathway, live AI intelligence block, module cards, sandbox block, and footer. |
| `/syllabus` | Exists | Public AI syllabus page with SEO metadata, structured content, learning pathway, capability areas, live release intelligence, and business links. |
| `/business-ai-training` | Exists | Public business training page with package structure, no prices, business signup CTA, and SEO metadata. |
| `/auth/login` | Exists | Magic-link login page. Needs later brand/email/auth flow polish. |
| `/auth/signup` | Exists | Signup page for individual and business account types. Business CTA currently uses `/auth/signup?type=business`, but the page should later read and apply that query value automatically. |
| `/auth/error` | Exists per project status | Needs safer friendly recovery copy later. |
| `/auth/callback` | Exists per project status | Bootstraps profiles from signup metadata and routes to dashboard. |
| `/dashboard` | Exists | Protected member dashboard. Not a public marketing route. |

---

## Known Sidebar and Legacy Link Caution

The current homepage still uses the platform sidebar. Some sidebar links point to routes that may not yet exist or may not be ready for public users.

These links need careful handling later:

| Referenced link | Current handling recommendation | Reason |
|---|---|---|
| `/sandbox` | Do not build randomly yet. Decide whether this should become a public explainer page or protected product area. | The homepage currently has an in-page sandbox section, but `/sandbox` is also linked as a route. |
| `/progress` | Keep protected or defer. Do not make public. | Progress belongs to logged-in product experience. |
| `/path/fundamentals` | Defer until course architecture exists. | Path pages should not be improvised before academy/course planning. |
| `/path/prompting` | Defer until course architecture exists. | Same as above. |
| `/path/agents` | Defer until course architecture exists. | Same as above. |
| `/path/multi-agent` | Defer until course architecture exists. | Same as above. |
| `/settings` | Replace or route later to protected account settings. | Should not be a public page. |
| `/profile` | Replace or route later to protected account/profile settings. | Should not be a public page. |

Important: do not remove or rebuild the sidebar without a deliberate navigation pass. The safer approach is to plan the public site structure first, then update navigation in one controlled file when ready.

---

## Public Site Route Map

### Primary Public Pages

These pages explain the product and should be part of the main public journey.

| Route | Page name | Purpose | Target audience | SEO intent | Primary CTA | Exists now | Build status | Nav now/later | Footer now/later |
|---|---|---|---|---|---|---|---|---|
| `/` | Homepage | Introduce DeepMind Resources, the live learning loop, syllabus, business training, sandbox practice, and professional AI skill gain. | Individuals, teams, business buyers, AI learners. | Professional AI training platform; AI learning platform; AI tool intelligence. | `/auth/signup` and `/business-ai-training` | Yes | Keep improving carefully. | Now | Now |
| `/syllabus` | AI Syllabus | Show the structured learning map from AI fundamentals to agents, RAG, tool intelligence, business productivity, safety, and live updates. | Learners, professionals, businesses evaluating course depth. | AI syllabus; AI learning path; prompt engineering syllabus; AI agents training; AI tool intelligence. | `/auth/signup` | Yes | Keep as standard. | Now | Now |
| `/business-ai-training` | Business AI Training | Explain business packages, team AI training value, workflow training, sandbox practice, and team adoption. | Business owners, managers, operations leads, department heads, training buyers. | Business AI training; AI training for teams; professional AI training; AI workflow training. | `/auth/signup?type=business` | Yes | Upgrade later with deeper business use cases. | Now | Now |
| `/platform` | Platform | Explain what DeepMind Resources is as a system: learning paths, verified AI intelligence, sandbox tasks, progress, refreshers, and business/team capability. | All public visitors who need a product overview. | AI training platform; live AI learning platform; AI tool intelligence platform. | `/auth/signup` | No | Build next or soon. | Now after build | Now after build |
| `/methodology` | Methodology | Explain the core method: AI update → verified meaning → practical lesson → sandbox task → skill gain. | Trust-focused visitors, businesses, serious learners. | AI training methodology; verified AI learning; practical AI training. | `/syllabus` or `/auth/signup` | No | Good next page after `/platform`. | Now or soon after build | Now after build |
| `/tool-intelligence` | Tool Intelligence | Explain how the platform evaluates AI tools, maps use cases, avoids hype, and helps users choose tools. | Tool buyers, professionals, businesses, advanced learners. | AI tool comparison; AI tool intelligence; best AI tools for business; AI tools for workflows. | `/auth/signup` or `/business-ai-training` | No | Build after platform/methodology. | Later | Later |
| `/sandbox` | Sandbox | Public explainer for sandbox practice, not the full product sandbox. Explain guided tasks, workflow simulations, prompts, tool use, RAG, validation, and agent exercises. | Learners and businesses who want hands-on practice. | AI sandbox practice; prompt sandbox; AI workflow practice; agentic AI sandbox. | `/auth/signup` | No route confirmed | Build only after deciding route behavior. | Later | Later |

### Trust and Company Pages

These pages build trust, support SEO, and reduce friction.

| Route | Page name | Purpose | Target audience | SEO intent | Primary CTA | Exists now | Build status | Nav now/later | Footer now/later |
|---|---|---|---|---|---|---|---|---|
| `/about` | About | Explain the mission, why AI training must stay current, and how DeepMind Resources helps learners and businesses avoid stale/hype-led learning. | Trust-focused visitors, businesses, partners. | About DeepMind Resources; professional AI training mission. | `/methodology` or `/auth/signup` | No | Build after core product pages. | Later | Now after build |
| `/contact` | Contact | Give visitors a clear way to enquire about individual help, business training, partnerships, or support. | Business buyers, users needing support, potential partners. | Contact DeepMind Resources; business AI training enquiry. | Contact form or email workflow later | No | Build before paid/business outreach. | Later | Now after build |
| `/privacy` | Privacy Policy | Provide privacy policy for users and businesses. | All users, compliance reviewers, businesses. | DeepMind Resources privacy policy. | None or contact | No | Required before wider launch. | Footer only | Now after build |
| `/terms` | Terms of Service | Provide platform terms for account use, content, training access, and limitations. | All users, business buyers, compliance reviewers. | DeepMind Resources terms. | None or contact | No | Required before wider launch. | Footer only | Now after build |
| `/cookies` | Cookie Policy | Explain cookie and tracking use. | All users, compliance reviewers. | DeepMind Resources cookie policy. | None | No | Required if analytics/cookie tools are used. | Footer only | Now after build |
| `/accessibility` | Accessibility | Explain accessibility intent and support route. | Users with accessibility needs, businesses, public sector buyers. | DeepMind Resources accessibility statement. | `/contact` | No | Build as trust page. | Footer only | Now after build |

### Possible Later Public Pages

These should not distract from the current foundation.

| Route | Page name | Purpose | Target audience | SEO intent | Primary CTA | Exists now | Build status | Nav now/later | Footer now/later |
|---|---|---|---|---|---|---|---|---|
| `/pricing` | Pricing | Explain individual and business pricing once the product and packages are ready. | Buyers and evaluators. | AI training pricing; business AI training pricing. | `/auth/signup` or business enquiry | No | Later only. Do not fake prices. | Later | Later |
| `/resources` | Resources | House articles, guides, explainers, tool updates, or public learning resources when content strategy is ready. | SEO visitors, learners, business readers. | AI resources; prompt engineering guide; AI tool guides. | `/auth/signup` or `/syllabus` | No | Later. Needs content model. | Later | Later |
| `/changelog` | Changelog | Public product/platform updates once there is meaningful product history. | Existing users, trust-focused visitors. | DeepMind Resources changelog; AI training platform updates. | `/auth/signup` | No | Later. Do not fake update history. | Later | Later |

---

## Auth, Account, and Product Route Structure

Auth and account pages are not ordinary public marketing pages, but they must still feel polished, trustworthy, and on-brand.

### Existing Auth Routes

| Route | Purpose | Public/product role | Status | Later work |
|---|---|---|---|---|
| `/auth/login` | Magic-link login | Public account entry route | Exists | Apply final blue/white brand pass; improve recovery copy; align wording to DeepMind Resources with a space. |
| `/auth/signup` | Account creation | Public conversion route | Exists | Auto-detect `?type=business`; improve business flow; add clearer individual/business routing. |
| `/auth/callback` | Supabase callback | Technical auth route | Exists per project status | Keep minimal and reliable. Do not add marketing copy. |
| `/auth/error` | Auth error handling | Public recovery route | Exists per project status | Make friendly, branded, and actionable. |

### Needed Auth and Account Routes

| Route | Purpose | Public/product role | Build timing | Notes |
|---|---|---|---|---|
| `/auth/forgot-password` | Lost password / reset request | Public account recovery | Before password auth is promoted | Must be clear and reassuring. |
| `/auth/reset-password` | Reset password after email link | Public account recovery | Before password auth is promoted | Needs safe token handling and friendly errors. |
| `/account` | Account overview | Protected product route | After profile/account planning | Should route based on individual/business profile type. |
| `/account/profile` | Personal profile settings | Protected product route | After account planning | Replaces old `/profile` if needed. |
| `/account/security` | Password/session/security settings | Protected product route | After account planning | Include change password route if password auth is enabled. |
| `/account/business` | Business account/company profile | Protected product route | After business data model | For business users and company admins. |
| `/account/team` | Business team management | Protected product route | Later | Requires business/team schema and permissions. |
| `/dashboard` | Member dashboard | Protected product route | Exists | Should remain the signed-in landing page until deeper routing exists. |

Recommended future account routing:

- Individual signup → `/dashboard`
- Business signup → `/dashboard` initially, later `/account/business/onboarding` or a business dashboard
- Existing user login → role-aware redirect based on `user_profiles.account_type`
- Unknown or incomplete profile → safe onboarding/profile completion route

---

## Navigation Strategy

### Current Public Navigation Problem

The homepage currently uses the platform sidebar, which makes the homepage feel partly like a public marketing page and partly like a product dashboard shell. This is acceptable temporarily because the homepage visual standard is now working, but it should be resolved deliberately.

### Recommended Main Public Nav

Once `/platform` and `/methodology` exist, public pages should use a consistent top navigation:

| Nav item | Destination | Timing |
|---|---|---|
| Home | `/` | Now |
| Syllabus | `/syllabus` | Now |
| Platform | `/platform` | Add after build |
| Methodology | `/methodology` | Add after build |
| Business | `/business-ai-training` | Now |
| Sign in | `/auth/login` | Now |
| Start learning | `/auth/signup` | Now |

### Later Public Nav Additions

| Nav item | Destination | Timing |
|---|---|---|
| Tool Intelligence | `/tool-intelligence` | After route exists |
| Sandbox | `/sandbox` | After route behavior is decided |
| Pricing | `/pricing` | After pricing is real |
| Resources | `/resources` | After content strategy exists |

### Footer Strategy

Footer should contain stable trust and conversion links without sending users to dead routes.

Recommended footer groups once routes exist:

| Group | Links |
|---|---|
| Platform | Home, Platform, Methodology, Syllabus, Sandbox, Tool Intelligence |
| Business | Business AI Training, Business Signup, Contact |
| Account | Sign in, Create account |
| Trust | About, Privacy, Terms, Cookies, Accessibility |

Do not add footer links to pages until those pages exist or have safe temporary handling.

---

## Recommended Build Order

The next work should proceed one route or one file at a time.

### Step 1: Lock this planning document

Create `docs/PUBLIC_SITE_STRUCTURE_PLAN.md` and commit it.

No build required because this is docs-only.

### Step 2: Build `/platform`

Purpose: explain the full DeepMind Resources system.

The page should cover:

- What DeepMind Resources is.
- Why normal AI courses go stale.
- The live learning loop.
- Structured syllabus.
- Tool intelligence.
- Sandbox practice.
- Progress and refreshers.
- Business/team training.
- Safe, verified, practical learning.

Primary CTA:

- `/auth/signup`
- Secondary: `/syllabus`
- Business CTA: `/business-ai-training`

### Step 3: Build `/methodology`

Purpose: explain the method in a trust-building way.

The page should cover:

- Track important AI updates.
- Verify what changed.
- Translate updates into practical meaning.
- Refresh relevant lessons.
- Create sandbox tasks.
- Improve tool recommendations.
- Protect users from hype, weak claims, and stale guidance.

Primary CTA:

- `/syllabus`
- Secondary: `/auth/signup`

### Step 4: Update public navigation carefully

Only after `/platform` and `/methodology` exist, update shared public navigation/footer structure.

Do not rewrite the whole visual system.

### Step 5: Plan old/sidebar route handling

Before building `/sandbox`, `/progress`, `/path/*`, `/settings`, or `/profile`, decide whether each link should:

- Become a public explainer route.
- Become a protected product route.
- Redirect to `/dashboard`.
- Redirect to `/syllabus`.
- Be removed from public navigation until product architecture exists.

### Step 6: Build trust/legal pages

Build these as simple, polished, professional public pages:

- `/privacy`
- `/terms`
- `/cookies`
- `/accessibility`
- `/contact`
- `/about`

Legal pages should be reviewed before relying on them commercially.

---

## `/platform` Page Brief

Suggested page goal:

Explain DeepMind Resources as the professional AI training platform that stays useful as AI changes.

Suggested sections:

1. Hero: professional AI training that stays current.
2. Why static AI courses go stale.
3. The DeepMind Resources loop: AI update → verified meaning → lesson → sandbox task → skill gain.
4. Structured syllabus and capability map.
5. Tool intelligence and comparison layer.
6. Sandbox practice layer.
7. Business/team learning layer.
8. Trust and validation principles.
9. CTA block.

SEO intent:

- AI training platform
- professional AI training platform
- AI learning platform
- AI tool intelligence platform
- AI training that stays current

Primary CTA:

- Start learning: `/auth/signup`

Secondary CTAs:

- View syllabus: `/syllabus`
- Business training: `/business-ai-training`

---

## `/methodology` Page Brief

Suggested page goal:

Make the product loop credible, memorable, and trust-building.

Suggested sections:

1. Hero: how DeepMind Resources turns AI change into skill gain.
2. Step 1: Track important AI changes.
3. Step 2: Verify meaning and practical impact.
4. Step 3: Refresh lessons.
5. Step 4: Create sandbox tasks.
6. Step 5: Improve tool comparisons and recommendations.
7. Step 6: Support business-ready training.
8. What the methodology avoids: hype, fake certainty, stale tutorials, weak claims.
9. CTA block.

SEO intent:

- AI training methodology
- verified AI learning
- practical AI training
- AI skill development
- AI learning that updates

Primary CTA:

- View the syllabus: `/syllabus`

Secondary CTA:

- Start learning: `/auth/signup`

---

## `/tool-intelligence` Page Brief

Suggested page goal:

Explain how DeepMind Resources helps users and businesses choose the right AI tools for real scenarios.

This page should not publish fake rankings or unsupported comparisons. It should explain the future tool intelligence method and use example categories only.

Suggested sections:

1. Hero: choose AI tools by real work, not hype.
2. Tool categories: coding, research, writing, automation, internal knowledge, customer support, data analysis, agents.
3. Evaluation criteria: use case fit, reliability, workflow value, cost awareness, safety, team suitability, source-backed changes.
4. How updates affect recommendations.
5. Business value: reduce wasted tool spend and unclear adoption.
6. CTA block.

SEO intent:

- AI tool intelligence
- AI tool comparison
- best AI tools for business workflows
- AI tool selection

Primary CTA:

- `/auth/signup`

Secondary CTA:

- `/business-ai-training`

---

## `/sandbox` Page Brief

Suggested page goal:

Explain sandbox practice as a public product concept without pretending the full product sandbox is complete.

The public page can describe planned and supported practice types, but must avoid fake live claims.

Suggested sections:

1. Hero: practise AI skills before using them in real work.
2. Prompt practice.
3. Tool-calling and agent workflow practice.
4. RAG and knowledge system exercises.
5. Business workflow simulations.
6. Validation and review tasks.
7. How sandbox tasks connect to AI updates.
8. CTA block.

SEO intent:

- AI sandbox practice
- prompt engineering practice
- AI workflow sandbox
- agentic AI practice

Primary CTA:

- `/auth/signup`

Important route decision:

If `/sandbox` later becomes a protected application area, the public explainer should either be `/sandbox` with authenticated users routed onward, or `/sandbox-demo` / `/sandbox-practice` should be used for the public explanation. Decide before building.

---

## Business Page Later Upgrade Brief

The existing `/business-ai-training` page is live and structurally sound. Later it should be expanded with deeper real-world business AI use cases.

Future sections to add carefully:

- Operations and process improvement.
- Marketing and content workflows.
- Sales and customer support.
- Leadership and decision support.
- Internal knowledge and onboarding.
- Automation and agentic workflows.
- Safety, governance, and review habits.
- Tool stack intelligence.
- Release-aware team refreshers.

Do not add prices until pricing is real.

---

## Public Page Quality Checklist

Every public page should include:

- Clear SEO metadata.
- Canonical URL.
- Strong H1 matching search intent.
- DeepMind Resources brand name with a space.
- Mobile-responsive layout.
- Soft blue faded public-page background.
- Blue/white crisp visual standard.
- Trust-building copy.
- No fake data or fake live claims.
- Clear CTA.
- Polished icon usage if helpful.
- Footer links only to existing/safe routes.
- No internal admin/build-status copy.
- No customer-facing Google references.

---

## Non-Goals for This Stage

Do not build these yet:

- Full academy/course engine.
- Lesson database UI.
- Course path pages under `/path/*`.
- Full sandbox application.
- Tool ranking database.
- Automated agent system.
- Pricing page with made-up prices.
- Fake changelog or fake release feed.
- Business team management dashboard.

Architecture planning must come before these product areas are built.

---

## Immediate Next Recommendation

After this document is committed, the next build page should be `/platform`.

Reason:

`/platform` explains the whole product clearly before deeper methodology, tool intelligence, sandbox, or academy pages are built. It gives visitors a single public explanation of why DeepMind Resources exists and how the platform works.

Suggested commit message for this document:

`Add public site structure plan`
