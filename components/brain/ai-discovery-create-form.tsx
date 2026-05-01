import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ArrowRight, Radar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

const sourceGroupOptions = [
  { value: 'frontier_model_platform', label: 'Frontier model platform' },
  { value: 'ai_assistant_app', label: 'AI assistant app' },
  { value: 'ai_search_and_research', label: 'AI search and research' },
  { value: 'creative_image_generation', label: 'Creative image generation' },
  { value: 'creative_video_generation', label: 'Creative video generation' },
  { value: 'voice_audio_ai', label: 'Voice/audio AI' },
  { value: 'ai_coding_tool', label: 'AI coding tool' },
  { value: 'automation_agent_tool', label: 'Automation/agent tool' },
  { value: 'agent_rag_framework', label: 'Agent/RAG framework' },
  { value: 'ai_infrastructure', label: 'AI infrastructure' },
  { value: 'business_ai_suite', label: 'Business AI suite' },
  { value: 'experimental_tool', label: 'Experimental/early-stage tool' },
  { value: 'unknown', label: 'Unknown / needs classification' },
] as const

const trainingDepartmentOptions = [
  { value: 'general_ai_skills', label: 'General AI skills' },
  { value: 'business_ai_training', label: 'Business AI training' },
  { value: 'creative_ai_training', label: 'Creative AI training' },
  { value: 'research_workflows', label: 'Research workflows' },
  { value: 'ai_coding_training', label: 'AI coding training' },
  { value: 'advanced_builder_training', label: 'Advanced builder training' },
  { value: 'technical_builder_infrastructure', label: 'Technical builder infrastructure' },
  { value: 'tool_selection', label: 'Tool selection' },
  { value: 'ai_safety_validation', label: 'AI safety and validation' },
  { value: 'unknown', label: 'Unknown / needs routing' },
] as const

const discoveryStatusOptions = [
  { value: 'new_candidate', label: 'New candidate' },
  { value: 'needs_official_source', label: 'Needs official source' },
  { value: 'official_source_found', label: 'Official source found' },
  { value: 'worth_tracking', label: 'Worth tracking' },
  { value: 'watch_later', label: 'Watch later' },
  { value: 'rejected_hype', label: 'Rejected hype' },
  { value: 'duplicate', label: 'Duplicate' },
] as const

const signalQualityOptions = [
  { value: 'unreviewed', label: 'Unreviewed' },
  { value: 'official', label: 'Official' },
  { value: 'credible', label: 'Credible' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'weak_social_signal', label: 'Weak social signal' },
  { value: 'hype', label: 'Hype' },
] as const

const intakePriorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
  { value: 'watch_later', label: 'Watch later' },
] as const

const audienceLevelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'beginner_to_intermediate', label: 'Beginner to intermediate' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'intermediate_to_advanced', label: 'Intermediate to advanced' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'business_user', label: 'Business user' },
  { value: 'creative_user', label: 'Creative user' },
  { value: 'technical_builder', label: 'Technical builder' },
  { value: 'unknown', label: 'Unknown' },
] as const

const suggestedFeedTypeOptions = [
  { value: 'changelog_page', label: 'Changelog page' },
  { value: 'rss', label: 'RSS feed' },
  { value: 'atom', label: 'Atom feed' },
  { value: 'github_releases', label: 'GitHub releases' },
  { value: 'manual_review', label: 'Manual review only' },
  { value: 'unknown', label: 'Unknown' },
] as const

function cleanFormString(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed ? trimmed : null
}

function readAllowedValue<T extends readonly { value: string }[]>(
  value: FormDataEntryValue | null,
  options: T,
  fallback: T[number]['value'],
) {
  if (typeof value !== 'string') {
    return fallback
  }

  const option = options.find((item) => item.value === value)

  return option?.value ?? fallback
}

async function createDiscoveryItem(formData: FormData) {
  'use server'

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const adminEmail = user.email?.trim().toLowerCase()

  if (adminEmail !== BRAIN_ADMIN_EMAIL) {
    redirect('/account')
  }

  const providerName = cleanFormString(formData.get('provider_name'))
  const productName = cleanFormString(formData.get('product_name'))
  const modelName = cleanFormString(formData.get('model_name'))
  const modelFamily = cleanFormString(formData.get('model_family'))
  const websiteUrl = cleanFormString(formData.get('website_url'))
  const officialSourceUrl = cleanFormString(formData.get('official_source_url'))
  const discoveredUrl = cleanFormString(formData.get('discovered_url'))
  const sourceType = cleanFormString(formData.get('source_type'))
  const toolCategory = cleanFormString(formData.get('tool_category'))
  const productArea = cleanFormString(formData.get('product_area'))
  const capabilityArea = cleanFormString(formData.get('capability_area'))
  const primaryUseCase = cleanFormString(formData.get('primary_use_case'))
  const academyRelevance = cleanFormString(formData.get('academy_relevance'))
  const businessRelevance = cleanFormString(formData.get('business_relevance'))
  const sandboxRelevance = cleanFormString(formData.get('sandbox_relevance'))
  const discoverySummary = cleanFormString(formData.get('discovery_summary'))
  const practicalTrainingValue = cleanFormString(formData.get('practical_training_value'))
  const socialNoiseNotes = cleanFormString(formData.get('social_noise_notes'))
  const verificationNotes = cleanFormString(formData.get('verification_notes'))
  const discoveredFrom = cleanFormString(formData.get('discovered_from'))

  const sourceGroup = readAllowedValue(formData.get('source_group'), sourceGroupOptions, 'unknown')
  const trainingDepartment = readAllowedValue(
    formData.get('training_department'),
    trainingDepartmentOptions,
    'unknown',
  )
  const discoveryStatus = readAllowedValue(
    formData.get('discovery_status'),
    discoveryStatusOptions,
    'new_candidate',
  )
  const signalQuality = readAllowedValue(
    formData.get('signal_quality'),
    signalQualityOptions,
    'unreviewed',
  )
  const intakePriority = readAllowedValue(
    formData.get('intake_priority'),
    intakePriorityOptions,
    'normal',
  )
  const audienceLevel = readAllowedValue(
    formData.get('audience_level'),
    audienceLevelOptions,
    'unknown',
  )
  const suggestedFeedType = readAllowedValue(
    formData.get('suggested_feed_type'),
    suggestedFeedTypeOptions,
    'unknown',
  )

  if (!providerName) {
    redirect('/brain?discovery=missing-provider')
  }

  const { error } = await supabase.from('ai_discovery_items').insert({
    provider_name: providerName,
    product_name: productName,
    model_name: modelName,
    model_family: modelFamily,
    website_url: websiteUrl,
    official_source_url: officialSourceUrl,
    source_type: sourceType,
    suggested_feed_type: suggestedFeedType,
    source_group: sourceGroup,
    tool_category: toolCategory,
    product_area: productArea,
    capability_area: capabilityArea,
    training_department: trainingDepartment,
    primary_use_case: primaryUseCase,
    audience_level: audienceLevel,
    discovery_status: discoveryStatus,
    signal_quality: signalQuality,
    intake_priority: intakePriority,
    academy_relevance: academyRelevance,
    business_relevance: businessRelevance,
    sandbox_relevance: sandboxRelevance,
    discovery_summary: discoverySummary,
    practical_training_value: practicalTrainingValue,
    social_noise_notes: socialNoiseNotes,
    verification_notes: verificationNotes,
    discovered_from: discoveredFrom,
    discovered_url: discoveredUrl,
    created_by: user.id,
    raw_payload: {},
  })

  if (error) {
    console.error('DeepMind Resources AI discovery item creation failed:', error.message)
    redirect('/brain?discovery=error')
  }

  revalidatePath('/brain')
  redirect('/brain?discovery=created')
}

export function AiDiscoveryCreateForm() {
  return (
    <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
            <Radar className="h-4 w-4" aria-hidden="true" />
            Add discovery candidate
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
            Capture new AI tools before they become trusted sources.
          </h2>

          <p className="mt-4 text-base leading-8 text-sand/65">
            Use this when you spot a new AI model, company, app, platform, creative tool, coding
            tool, automation product, or social-media claim that may deserve tracking. It goes into
            discovery first, not directly into training.
          </p>

          <div className="mt-7 rounded-3xl bg-[#EAF7FF] p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
              Discovery rule
            </p>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              Capture broadly, classify carefully. The discovery queue is for spotting new
              opportunities without letting hype pollute the verified Brain.
            </p>
          </div>
        </div>

        <form
          action={createDiscoveryItem}
          className="rounded-[2rem] border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="provider_name" className="block text-sm font-semibold text-sand">
                Provider name
              </label>
              <input
                id="provider_name"
                name="provider_name"
                type="text"
                required
                placeholder="Example: OpenAI, Anthropic, Runway, Midjourney"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="product_name" className="block text-sm font-semibold text-sand">
                Product / platform
              </label>
              <input
                id="product_name"
                name="product_name"
                type="text"
                placeholder="Example: Claude, Cursor, Ideogram, ElevenLabs"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="model_name" className="block text-sm font-semibold text-sand">
                Model name
              </label>
              <input
                id="model_name"
                name="model_name"
                type="text"
                placeholder="Optional model name"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="model_family" className="block text-sm font-semibold text-sand">
                Model family
              </label>
              <input
                id="model_family"
                name="model_family"
                type="text"
                placeholder="Example: Opus, Sonnet, GPT, Flux"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="source_group" className="block text-sm font-semibold text-sand">
                Source group
              </label>
              <select
                id="source_group"
                name="source_group"
                defaultValue="unknown"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {sourceGroupOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="training_department"
                className="block text-sm font-semibold text-sand"
              >
                Training department
              </label>
              <select
                id="training_department"
                name="training_department"
                defaultValue="unknown"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {trainingDepartmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="tool_category" className="block text-sm font-semibold text-sand">
                Tool category
              </label>
              <input
                id="tool_category"
                name="tool_category"
                type="text"
                placeholder="Example: image_generation, ai_coding_tool"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="capability_area" className="block text-sm font-semibold text-sand">
                Capability area
              </label>
              <input
                id="capability_area"
                name="capability_area"
                type="text"
                placeholder="Example: image_editing, voice_cloning, coding"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="audience_level" className="block text-sm font-semibold text-sand">
                Audience level
              </label>
              <select
                id="audience_level"
                name="audience_level"
                defaultValue="unknown"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {audienceLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="intake_priority" className="block text-sm font-semibold text-sand">
                Intake priority
              </label>
              <select
                id="intake_priority"
                name="intake_priority"
                defaultValue="normal"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {intakePriorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="discovery_status" className="block text-sm font-semibold text-sand">
                Discovery status
              </label>
              <select
                id="discovery_status"
                name="discovery_status"
                defaultValue="new_candidate"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {discoveryStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="signal_quality" className="block text-sm font-semibold text-sand">
                Signal quality
              </label>
              <select
                id="signal_quality"
                name="signal_quality"
                defaultValue="unreviewed"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {signalQualityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="suggested_feed_type" className="block text-sm font-semibold text-sand">
                Suggested feed type
              </label>
              <select
                id="suggested_feed_type"
                name="suggested_feed_type"
                defaultValue="unknown"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {suggestedFeedTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="source_type" className="block text-sm font-semibold text-sand">
                Source type
              </label>
              <input
                id="source_type"
                name="source_type"
                type="text"
                placeholder="Example: official_docs, social_post, product_page"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="primary_use_case" className="block text-sm font-semibold text-sand">
              Primary use case
            </label>
            <input
              id="primary_use_case"
              name="primary_use_case"
              type="text"
              placeholder="Example: brand image generation, coding assistant, meeting automation"
              className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="website_url" className="block text-sm font-semibold text-sand">
                Website URL
              </label>
              <input
                id="website_url"
                name="website_url"
                type="url"
                placeholder="https://..."
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label
                htmlFor="official_source_url"
                className="block text-sm font-semibold text-sand"
              >
                Official source URL
              </label>
              <input
                id="official_source_url"
                name="official_source_url"
                type="url"
                placeholder="Release notes, docs, changelog, blog, GitHub..."
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="discovered_from" className="block text-sm font-semibold text-sand">
                Discovered from
              </label>
              <input
                id="discovered_from"
                name="discovered_from"
                type="text"
                placeholder="Example: social post, newsletter, official launch page"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="discovered_url" className="block text-sm font-semibold text-sand">
                Discovered URL
              </label>
              <input
                id="discovered_url"
                name="discovered_url"
                type="url"
                placeholder="Optional discovery link"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="academy_relevance" className="block text-sm font-semibold text-sand">
                Academy relevance
              </label>
              <input
                id="academy_relevance"
                name="academy_relevance"
                type="text"
                placeholder="high / medium / low"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="business_relevance" className="block text-sm font-semibold text-sand">
                Business relevance
              </label>
              <input
                id="business_relevance"
                name="business_relevance"
                type="text"
                placeholder="high / medium / low"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="sandbox_relevance" className="block text-sm font-semibold text-sand">
                Sandbox relevance
              </label>
              <input
                id="sandbox_relevance"
                name="sandbox_relevance"
                type="text"
                placeholder="high / medium / low"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="discovery_summary" className="block text-sm font-semibold text-sand">
              Discovery summary
            </label>
            <textarea
              id="discovery_summary"
              name="discovery_summary"
              rows={4}
              placeholder="What is this tool/model/platform, and why might it matter?"
              className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="practical_training_value"
              className="block text-sm font-semibold text-sand"
            >
              Practical training value
            </label>
            <textarea
              id="practical_training_value"
              name="practical_training_value"
              rows={3}
              placeholder="What training, tool selection, sandbox, or business workflow could this support?"
              className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="social_noise_notes" className="block text-sm font-semibold text-sand">
              Social noise notes
            </label>
            <textarea
              id="social_noise_notes"
              name="social_noise_notes"
              rows={3}
              placeholder="What hype, uncertainty, or weak-signal context should be remembered?"
              className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="verification_notes" className="block text-sm font-semibold text-sand">
              Verification notes
            </label>
            <textarea
              id="verification_notes"
              name="verification_notes"
              rows={3}
              placeholder="What official source, docs, release notes, or missing evidence should be checked?"
              className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] sm:w-auto"
          >
            Save discovery candidate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}
