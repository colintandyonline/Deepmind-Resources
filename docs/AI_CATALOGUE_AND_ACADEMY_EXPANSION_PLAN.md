# AI Catalogue and Academy Expansion Plan

## Purpose

This document captures the new DeepMind Resources AI catalogue foundation and explains how it changes the Academy, Sandbox, business training, and future Scout workflow.

The Academy has now expanded beyond static lessons or single-tool training. The platform needs to support a living AI intelligence system where companies, platforms, models, capabilities, comparison groups, source signals, verified Brain records, lessons, sandbox tasks, and business updates all connect.

The guiding product loop remains:

AI update → verified meaning → practical lesson → sandbox task → user skill gain

The catalogue now becomes the stable map that lets this happen across the whole AI landscape.

---

## Why this matters

DeepMind Resources should not train users on one model or one tool in isolation.

Modern AI training needs to answer:

- Which company created the tool or model?
- Which platform or product does it belong to?
- Which model family does it belong to?
- What is the individual model?
- What is it useful for?
- Which training department does it affect?
- Which other models or tools should it be compared against?
- Which lessons should be created or updated?
- Which sandbox tasks should exist?
- Which business users should care?
- Which source signals or releases affect it?

This is especially important for areas like image generation, video generation, coding assistants, AI search, business productivity tools, RAG, voice, music, legal AI, healthcare AI, robotics, and small/edge models.

For example, an image generation lesson may teach the same core concept across multiple tools, but each tool handles prompts, style, text rendering, reference images, edits, and output quality differently. The catalogue lets us build comparison-based training instead of narrow one-tool lessons.

---

## Current database foundation

The catalogue database foundation has been created.

### Catalogue tables

The following tables now exist:

- ai_catalog_entities
- ai_catalog_entity_links
- ai_catalog_capabilities
- ai_catalog_entity_capabilities
- ai_catalog_comparison_groups
- ai_catalog_entity_comparison_groups

All six catalogue tables have RLS enabled and admin-only access for the Brain admin account.

### Link fields added to existing Brain/intake tables

Catalogue link columns were added to:

- ai_discovery_items
- source_feeds
- source_feed_items
- sources
- agent_findings
- master_brain_records
- publication_queue

The shared link columns are:

- catalog_entity_id
- company_catalog_entity_id
- platform_catalog_entity_id
- model_catalog_entity_id

These allow discovery items, feeds, feed items, sources, Scout findings, verified Brain records, and future publication tasks to point back to the exact company, platform, model, or catalogue entity they affect.

---

## Current seeded discovery inventory

The Discovery Queue currently includes:

- 100 AI company/platform candidates
- 100 AI model candidates

These were inserted as discovery candidates, not verified Brain records.

They are intentionally stored as unverified discovery material with source verification still required before anything becomes trusted training content.

Typical discovery state:

- discovery_status = needs_official_source
- signal_quality = unreviewed
- verification_required = true

---

## Catalogue structure

The catalogue is designed around this hierarchy:

Company  
→ Platform / product  
→ Model family  
→ Model  
→ Capabilities  
→ Comparison groups

Example:

OpenAI  
→ ChatGPT / OpenAI API / Sora  
→ GPT / DALL-E / Whisper / Codex / Sora  
→ individual models  
→ relevant capabilities  
→ relevant comparison groups

Example:

Anthropic  
→ Claude  
→ Claude Opus / Claude Sonnet  
→ individual models  
→ reasoning, coding, document, and agentic workflow capabilities  
→ frontier model and coding comparison groups

Example:

Midjourney  
→ Midjourney  
→ Midjourney model family  
→ Midjourney v7  
→ image generation capability  
→ image generation comparison groups

---

## Backfill status

The catalogue backfill is complete for the core structure.

### Companies

Company catalogue entities were created from provider_name values in ai_discovery_items.

Result:

- 133 company entities
- 200 discovery items linked to company_catalog_entity_id

### Platforms / products

Platform catalogue entities were created from provider_name + product_name pairs.

Result:

- 174 platform entities
- 174 company → platform links
- 200 discovery items linked to platform_catalog_entity_id

### Model families

Model family catalogue entities were created from provider_name + model_family pairs.

Result:

- 96 model family entities
- 96 expected model families

### Models

Model catalogue entities were created from provider_name + model_name pairs.

Result:

- 100 model entities
- 100 model discovery items linked to model_catalog_entity_id
- model discovery items also linked through catalog_entity_id

### Entity relationships

The catalogue now supports relationships such as:

- company_owns_platform
- company_develops_model
- platform_uses_model
- model_belongs_to_family

This gives the system a connected spine instead of a flat list of candidates.

---

## Capability taxonomy

The catalogue now has 42 capabilities.

These capabilities are the training routing layer. They describe what an entity is useful for.

Current capability areas include:

- frontier_reasoning
- multimodal_reasoning
- long_context_reasoning
- ai_search_research
- document_analysis
- coding_assistant
- agentic_coding
- app_scaffolding
- image_generation
- image_editing
- typography_design
- video_generation
- cinematic_video
- text_to_3d
- voice_generation
- music_generation
- speech_to_text
- speech_translation
- rag_retrieval
- embedding_retrieval
- reranking
- data_ingestion_parsing
- business_automation
- customer_support
- presentation_generation
- writing_assistance
- legal_analysis
- medical_documentation
- robotics_control
- autonomous_driving
- data_security
- model_infrastructure
- edge_ai_small_models
- ai_safety_validation
- browser_agents
- marketing_content_generation
- financial_analysis
- scientific_discovery
- math_reasoning
- regional_language_models
- sound_design
- data_labeling_rlHF

Current link result:

- 197 catalogue entity → capability links

This means catalogue entities are now routed into useful training buckets.

---

## Comparison group taxonomy

The catalogue now has 28 comparison groups.

Comparison groups are what allow DeepMind Resources to create comparison-based Academy lessons and sandbox tasks.

Current comparison groups include:

- frontier_general_models
- long_context_models
- cost_efficient_models
- ai_coding_assistants
- agentic_coding_models
- app_scaffolding_tools
- image_generation_general
- image_generation_typography
- image_generation_open_weight
- video_generation_general
- video_generation_cinematic
- voice_generation_tools
- music_generation_tools
- speech_to_text_models
- ai_search_research_tools
- rag_embedding_models
- reranking_models
- business_presentation_tools
- writing_assistants
- customer_support_agents
- legal_ai_tools
- robotics_models
- browser_agent_tools
- business_automation_agents
- healthcare_documentation_tools
- data_security_governance_tools
- scientific_discovery_models
- math_reasoning_models

Current link result:

- 182 catalogue entity → comparison group links

This means lessons and sandbox tasks can later pull relevant models/tools into comparison-based exercises.

---

## Academy impact

The Academy has now expanded from simple topic-based learning into a structured AI training system.

The Academy should eventually support these training departments:

- General AI Skills
- Business AI Training
- Creative AI Training
- AI Coding Training
- Research Workflows
- Advanced Builder Training
- Technical Builder Training
- Technical Builder Infrastructure
- AI Safety and Validation
- Tool Selection and Comparison

Each course or lesson should eventually be able to connect to:

- one or more catalogue entities
- one or more capabilities
- one or more comparison groups
- related source signals
- verified Brain records
- sandbox tasks
- business update implications

This allows lessons to remain living and update-aware.

---

## Example: image generation training

Image generation should not be treated as one static lesson.

A future image generation course can include:

- image prompt fundamentals
- composition and style control
- brand-safe image generation
- typography and text-in-image
- prompt adherence comparisons
- open-weight vs closed image tools
- reference image workflows
- editing and variation workflows
- commercial and business use considerations

The catalogue can support comparison tasks such as:

- same prompt across Midjourney, DALL-E, FLUX, Ideogram, Stable Diffusion, and Krea
- typography comparison across Ideogram and other image tools
- brand asset generation comparison
- open-weight vs hosted creative platform comparison
- prompt adherence scoring
- realism vs style comparison
- business usefulness scoring

This same pattern should be reused across video, coding, research, RAG, voice, music, presentation tools, writing tools, legal AI, healthcare AI, and automation agents.

---

## Example: AI coding training

AI coding training can now be organised around:

- coding assistants
- IDE completions
- agentic coding
- terminal-based coding agents
- debugging agents
- app scaffolding tools
- refactoring tools
- search-assisted developer tools

Comparison groups allow lessons such as:

- same bug fix across several AI coding assistants
- same app scaffold across Replit-style and other app builder tools
- agentic coding vs normal chat-based coding
- local/open coding models vs hosted frontier coding models
- speed vs correctness vs safety comparison

---

## Example: business training

Business training can now route tools and models into practical use cases:

- customer support
- operations
- marketing
- sales
- research
- finance
- legal
- healthcare admin
- writing and communication
- presentation creation
- data security and governance
- automation workflows

This means business updates can eventually say:

- which department should care
- what workflow changed
- whether staff need retraining
- whether a lesson needs updating
- whether a sandbox task should be created
- whether a tool comparison should change

---

## Future Scout workflow

The catalogue is designed for future automatic Scout behaviour.

Future workflow:

1. Source signal detected
2. Scout extracts provider, product, model, capability, and update type
3. Scout searches catalogue for matching company/platform/model
4. If a match exists, the signal links to the existing catalogue entity
5. If no match exists, the signal creates or updates a discovery candidate
6. Official source verification is required before trusted Brain records or Academy updates
7. Approved Brain records can then trigger lesson, sandbox, tool comparison, or business update actions

This helps prevent social media hype from polluting trusted training.

---

## Brain page role

The /brain page should remain the command centre, not the full catalogue browser.

The Brain page should focus on:

- current system health
- active review queue
- latest source signals
- latest Brain records
- discovery queue summary
- trusted intake feeds
- urgent items needing action

The full catalogue should be built separately as:

- /brain/catalog
- /brain/catalog/companies
- /brain/catalog/platforms
- /brain/catalog/models
- /brain/catalog/capabilities
- /brain/catalog/comparison-groups

The first build can start with one private /brain/catalog page and expand later.

---

## Suggested next app build

The next build should be a private catalogue browsing page.

Recommended first page:

/brain/catalog

It should show:

- total companies
- total platforms/products
- total model families
- total models
- total capabilities
- total comparison groups
- recent catalogue entities
- filters by entity type
- filters by source group
- filters by training department
- filters by capability
- filters by comparison group

Initial page should be read-only.

Actions such as edit, merge, promote, verify, attach source, or attach feed can come later.

---

## Future Academy docs to review or update

The following planning areas should be reviewed against the new catalogue foundation:

- Initial course map
- Course and monetisation plan
- Content architecture
- Lesson builder plan
- Sandbox builder plan
- Progress tracking and assessment
- Tool comparison plan
- Business training plan
- Live AI intelligence plan
- Source ingestion and research plan
- Trust methodology and transparency plan

The Academy has expanded significantly, so these docs may need updates to reflect:

- capability-based learning
- comparison-based lessons
- catalogue-linked sandbox tasks
- business department routing
- model and platform tracking
- source-signal-driven refresh recommendations
- verified Brain record impact on lessons and tasks

---

## Strategic rule

The catalogue is not public truth by itself.

Discovery candidates and catalogue entries are internal tracking structures until supported by official or trusted sources.

Training content should only be influenced by:

- verified Brain records
- trusted source signals
- official documentation
- validated internal testing
- reviewed Scout findings

The catalogue helps organise the world. The Brain decides what is trusted.

---

## Current stopping point

Database side complete for this phase:

- catalogue foundation tables created
- RLS enabled
- discovery inventory imported
- companies created and linked
- platforms/products created and linked
- model families created
- models created and linked
- capabilities seeded
- comparison groups seeded
- entities linked to capabilities
- entities linked to comparison groups

Next phase:

Build the private /brain/catalog page so the catalogue can be browsed, filtered, and managed before Academy buildout.
