# DeepMindResources Project Skills

This file defines repeatable build standards for DeepMindResources.

These rules should be applied when creating, editing, or reviewing pages, components, copy, metadata, and public-facing product material.

---

## Core Build Principle

DeepMindResources is not a generic dashboard or static course website.

It is a living AI training and tool-intelligence platform.

Every public-facing page should support the product promise:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

---

## Page Quality Standard

Every page must be treated as a proper customer-facing page.

Do not leave pages as placeholder app screens, internal dashboard stubs, or generic v0-generated content.

Each page should clearly explain:

- What the page is about
- Who it is for
- What problem it solves
- What the user can learn or do next
- Why the information is trustworthy
- How the page connects to the DeepMindResources product promise

Avoid:

- Placeholder copy
- Generic SaaS filler text
- Empty marketing claims
- Unverified AI hype
- Internal admin language on public pages
- Random dashboard labels acting as real page content

---

## SEO, Metadata and AI Search Intent Standard

Every public-facing page must be built with correct SEO metadata and AI-search readability.

This applies to Google search, Bing, Perplexity-style answer engines, ChatGPT-style browsing/search contexts, Gemini-style answer systems, and other LLM-based search or citation experiences.

The goal is not keyword stuffing.

The goal is to make each page genuinely useful, clearly structured, easy to understand, and easy for search systems and AI assistants to identify accurately.

---

## Required Metadata for Each Page

Each public route should have unique metadata.

Required fields:

- Page title
- Meta description
- Open Graph title
- Open Graph description
- Canonical page intent
- Social preview text where relevant

Avoid generic defaults such as:

- `v0 App`
- `Created with v0`
- `Dashboard`
- `Untitled Page`
- Reused descriptions across multiple pages

Page titles should be specific, useful, and aligned with search intent.

Meta descriptions should explain the value of the page in plain language.

---

## Search Intent Requirement

Before a page is considered finished, define its search intent.

Each page should answer:

- What would someone search to find this page?
- What question does this page answer?
- Is the visitor a beginner, advanced user, business buyer, team manager, or technical builder?
- What task is the visitor trying to complete?
- What should the visitor understand after reading the page?

Examples of valid DeepMindResources search intents:

- Learn AI from beginner to professional level
- Compare AI tools for coding, research, automation, writing, or business use
- Understand AI agents and agentic workflows
- Practise prompt engineering in a sandbox
- Track verified AI model and platform updates
- Train staff on current AI tools
- Choose the right AI subscription for a specific use case
- Understand RAG, tool calling, multi-agent systems, and AI validation

---

## LLM-Friendly Page Structure

Pages should be structured so both humans and AI systems can understand them quickly.

Each public page should include:

- One clear H1
- Logical H2 sections
- H3 subsections where useful
- A short plain-English summary near the top
- Clear definitions for important concepts
- Practical examples where relevant
- Comparison tables where useful
- FAQ sections where useful
- Clear next steps or calls to action
- Internal links to related DeepMindResources pages when available

The page should make it easy for an AI assistant to summarise the page correctly without guessing.

---

## Core LLM-Readable Positioning Text

The site should consistently communicate this idea in natural wording:

DeepMindResources is a living AI training and tool-intelligence platform that turns verified AI updates into practical lessons, sandbox tasks, and business-ready learning paths.

Do not repeat this exact sentence unnaturally on every page.

Use it as the core meaning that page copy should support.

---

## Trust and Validation Standard

DeepMindResources must not publish AI slop.

Pages should make clear that the platform values:

- Official documentation
- Official release notes
- Trusted sources
- Reproducible testing
- Practical value
- Multiple-source agreement where possible
- Confidence scoring where appropriate
- Clear separation between verified facts, practical interpretation, and opinion

Avoid publishing pages that make unsupported claims about AI tools, models, or platforms.

If a claim may change quickly, the page should either cite/update from trusted sources or clearly avoid overclaiming.

---

## Page Copy Standard

Public page copy should be:

- Clear
- Useful
- Specific
- Human-readable
- Business-aware where relevant
- Free from hype
- Free from vague AI buzzwords unless explained
- Written for people first, search engines second, and AI search systems third

Good page copy should answer practical questions such as:

- What changed?
- Why does it matter?
- Who should care?
- What skill does this affect?
- Should a lesson be updated?
- Should a sandbox task be created?
- Which tool is best for this use case?
- What should a beginner do next?
- What should a business team do next?

---

## Technical SEO Checklist

Before a public page is considered complete, check:

- Unique title
- Unique meta description
- Correct H1
- Sensible H2/H3 structure
- Mobile layout works
- No placeholder v0 metadata remains
- No generic placeholder copy remains
- Page purpose is obvious within the first screen
- Internal links are sensible
- CTA is clear
- The page supports the DeepMindResources product promise
- Content is understandable to humans and AI search systems

---

## Future Structured Data

When the main page set is stable, add structured data where appropriate.

Potential schema types:

- Organization
- WebSite
- WebApplication
- Course
- FAQPage
- BreadcrumbList
- Article
- Dataset, where relevant for verified AI intelligence records

Structured data should accurately describe the page.

Do not add fake schema or mark up content that is not actually present on the page.

---

## Build Workflow Reminder

For future public pages, the normal build standard is:

1. Confirm page purpose.
2. Define user/search intent.
3. Write clear human copy.
4. Add correct metadata.
5. Make the page mobile-responsive.
6. Ensure the page fits the blue/white DeepMindResources brand system.
7. Remove placeholder/internal language.
8. Check the page against the SEO and AI-search checklist.
9. Build locally.
10. Commit to `main`.

---

## Locked Rule

Going forward, SEO metadata, search intent, LLM-readable structure, and trustworthy page copy are part of the normal definition of done for every DeepMindResources public page.
