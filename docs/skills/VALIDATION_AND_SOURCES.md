# Validation and Sources Skill

This skill defines how DeepMindResources should validate AI updates, tool claims, model releases, platform changes, lessons, sandbox tasks, comparisons, and business training material.

This file is a foundation rule for future agents, especially:

- Scout Agent
- Validator Agent
- Noise Filter Agent
- Tool Agent
- Comparison Agent
- Lesson Builder Agent
- Sandbox Builder Agent
- Business Training Agent
- Master Brain workflows

---

## Core Rule

DeepMindResources must not publish AI slop.

Do not treat every AI announcement, tweet, blog post, YouTube claim, affiliate article, or tool marketing page as true.

Every important claim should be checked, classified, and connected to trustworthy sources before it influences public lessons, tool recommendations, sandbox tasks, or business advice.

---

## Validation Goal

The goal of validation is to turn noisy AI information into useful, trustworthy training intelligence.

The platform should answer:

- What changed?
- Is it true?
- Is it official?
- Is it practically important?
- Who does it affect?
- What skill does it change?
- Does it require a lesson update?
- Does it require a new sandbox task?
- Does it affect a tool comparison?
- Is confidence high enough to publish?

---

## Source Quality Levels

Use source quality levels when storing or reviewing information.

### Level 1: Primary Official Sources

Highest trust.

Examples:

- Official product documentation
- Official API documentation
- Official release notes
- Official changelogs
- Official engineering blogs
- Official GitHub repositories
- Official pricing pages
- Official product pages
- Official status pages
- Official migration guides
- Official model cards or system cards

These should be preferred whenever available.

### Level 2: Primary Technical Evidence

High trust when reproducible.

Examples:

- Direct product testing
- API responses from real tests
- Reproducible benchmark scripts
- Public GitHub commits
- Maintainer comments on official repositories
- Documented behaviour observed in a controlled test

Testing evidence should describe the method, date, tool version, and limitations.

### Level 3: Trusted Secondary Sources

Useful, but should not override official sources.

Examples:

- Reputable technical publications
- Established AI research or engineering newsletters
- Independent tool reviews with evidence
- Well-documented expert analysis
- Recognised benchmark organisations
- Serious long-form technical comparisons

Secondary sources are useful for interpretation, but not enough on their own for high-confidence claims.

### Level 4: Weak or Noisy Sources

Low trust unless verified elsewhere.

Examples:

- Social media posts
- Viral threads
- YouTube summaries
- Affiliate review pages
- Thin comparison articles
- Marketing-heavy launch pages
- Unsourced blog posts
- Community rumours
- Screenshots without source links
- Claims copied from other low-quality sources

Weak sources can be used as discovery signals, but they should not be treated as verified facts.

---

## Claim Types

Every important piece of information should be classified by claim type.

Common claim types:

- Model release claim
- API change claim
- Feature availability claim
- Pricing claim
- Tool capability claim
- Tool limitation claim
- Performance claim
- Benchmark claim
- Safety claim
- Deprecation claim
- Integration claim
- Business productivity claim
- Training recommendation claim
- Lesson update claim
- Sandbox task claim

Different claim types require different evidence.

For example:

- Pricing claims need official pricing pages.
- API claims need official API docs or tests.
- Capability claims need official docs and/or reproducible testing.
- Performance claims need benchmark context and should be treated carefully.
- Business productivity claims need practical use-case evidence, not hype.

---

## Confidence Scores

Use confidence scores to avoid pretending uncertainty is certainty.

Suggested confidence levels:

### High Confidence

Use when:

- The claim is confirmed by official documentation or release notes.
- The claim is confirmed by reproducible testing.
- Multiple strong sources agree.
- The claim is specific and current.

High-confidence claims may be used in public lessons, tool comparisons, and business guidance.

### Medium Confidence

Use when:

- The claim is supported by a trusted secondary source.
- Official documentation is incomplete but supporting evidence is strong.
- Testing suggests the claim is true, but scope is limited.
- Multiple sources agree, but none are fully official.

Medium-confidence claims may be used with cautious wording.

### Low Confidence

Use when:

- The claim comes from social media, marketing, rumours, or weak sources.
- Sources conflict.
- The claim cannot be reproduced.
- The claim is vague or exaggerated.
- The claim may already be outdated.

Low-confidence claims should not be published as fact.

They may be stored as signals for later investigation.

---

## Required Validation Questions

Before publishing or using a claim, ask:

1. What exactly is being claimed?
2. Who is making the claim?
3. Is there an official source?
4. Is the source current?
5. Does the claim apply globally or only to a specific plan, region, model, API, beta, or user group?
6. Can the claim be reproduced or tested?
7. Do other reliable sources agree?
8. Are there conflicting sources?
9. Is the claim practically useful to learners or businesses?
10. What confidence score should be assigned?
11. Should the claim update an existing lesson?
12. Should the claim create a new lesson or sandbox task?

---

## Noise Filter Rules

The Noise Filter Agent should reduce low-value information before it reaches the Master Brain.

Filter out or downgrade:

- Affiliate-driven recommendations with no evidence
- Viral posts with no source links
- Tool launch hype with no real capability proof
- Repeated news that adds no new practical value
- Old tutorials presented as current
- AI-generated comparison pages with no testing
- Unsupported claims that one tool is universally best
- Misleading benchmark claims
- Posts that confuse model names, products, or capabilities
- Speculation presented as fact

Do not discard everything noisy automatically.

Some noisy sources can be useful early signals, but they must be clearly marked as unverified.

---

## Publication Rules

Do not publish a claim as fact unless it has enough evidence.

A public-facing page, lesson, tool comparison, or business recommendation should not rely only on:

- A single tweet
- A single YouTube video
- A single affiliate article
- A single marketing page with no technical details
- A third-party claim about pricing or API behaviour without official confirmation

When uncertain, use cautious wording such as:

- Early evidence suggests...
- Official documentation currently says...
- This appears to apply to...
- We have not yet verified...
- This should be treated as a signal, not a confirmed change...

Never hide uncertainty.

---

## Source Record Requirements

When storing a verified item in the Master Brain, record:

- Source title
- Source URL
- Source type
- Publisher or owner
- Publication date where available
- Date checked
- Relevant claim summary
- Confidence score
- Affected tool, model, platform, lesson, or skill
- Notes on limitations
- Whether a lesson update is needed
- Whether a sandbox task is needed
- Whether business training material is affected

Avoid storing raw scraped text as final knowledge.

Store interpreted, validated summaries with references.

---

## Tool Comparison Validation

Tool comparisons must be use-case based.

Do not say one tool is universally best.

A valid comparison should consider:

- User skill level
- Business or individual use case
- Technical capability
- Cost and plan limits
- Integrations
- Data/privacy needs
- Reliability
- Learning curve
- Output quality
- Evidence from official docs or tests
- Whether the tool is changing quickly

Comparison pages should explain why a tool is recommended for a scenario.

---

## Lesson Update Validation

A lesson should be updated when verified information changes the practical skill being taught.

Examples:

- A model changes tool-calling behaviour.
- A platform changes API syntax.
- A major product deprecates a feature.
- A tool introduces a workflow that changes best practice.
- A safety issue changes recommended usage.
- A pricing or plan change affects business recommendations.

Do not update lessons for every minor announcement.

Only update when there is practical learning value.

---

## Sandbox Task Validation

A sandbox task should be created when a verified update can become hands-on practice.

Good sandbox task triggers include:

- New tool-calling behaviour
- New model comparison opportunity
- New workflow automation pattern
- RAG or memory-system change
- New debugging pattern
- New agent framework behaviour
- Business automation example
- Safety or validation exercise

Sandbox tasks should be practical, testable, and connected to a lesson or skill.

---

## Business Training Validation

Business-facing advice must be especially careful.

Before recommending a tool or workflow to a business, validate:

- Cost implications
- Team skill requirements
- Data/privacy considerations
- Security concerns
- Admin controls
- Reliability
- Support and documentation
- Integration with existing workflows
- Whether the tool is suitable for non-technical staff

Avoid recommending tools based only on popularity.

Recommend tools based on use case, constraints, and evidence.

---

## Time Sensitivity

AI information goes stale quickly.

Any claim about the current state of tools, models, pricing, APIs, product capabilities, availability, or platform rules must be treated as time-sensitive.

For time-sensitive claims:

- Prefer official current sources.
- Store the date checked.
- Recheck before major publication.
- Avoid evergreen wording if the claim may change.
- Flag content that may need future review.

---

## Agent Behaviour Rules

Future agents should follow these rules:

- Scout Agent finds signals, but does not decide truth alone.
- Validator Agent checks claims before publication.
- Noise Filter Agent downgrades hype and weak sources.
- Tool Agent records tool claims with source references.
- Comparison Agent compares tools by use case, not popularity.
- Lesson Builder Agent uses verified claims only.
- Sandbox Builder Agent creates tasks from verified practical changes.
- Business Training Agent uses extra caution for company-facing recommendations.
- Master Brain stores source-backed summaries, not raw hype.

Agents may suggest public updates, but validation should happen before publication.

---

## Definition of Done for Verified Intelligence

A verified intelligence item is complete when it has:

- Clear claim summary
- Source references
- Source quality level
- Confidence score
- Date checked
- Affected tool/model/platform
- Affected skill or lesson area
- Practical meaning
- Publication recommendation
- Lesson update recommendation
- Sandbox task recommendation
- Notes on uncertainty or limitations

---

## Locked Rule

DeepMindResources should prefer being slower and correct over being fast and wrong.

Verified, useful, practical AI intelligence is the product.
