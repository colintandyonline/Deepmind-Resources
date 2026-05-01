import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ArrowRight, FileSearch } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const BRAIN_ADMIN_EMAIL = 'colintandy@gmail.com'

const sourceTypeOptions = [
  { value: 'official_docs', label: 'Official documentation' },
  { value: 'release_notes', label: 'Release notes' },
  { value: 'api_docs', label: 'API documentation' },
  { value: 'github_repo', label: 'GitHub repository' },
  { value: 'research_paper', label: 'Research paper' },
  { value: 'trusted_article', label: 'Trusted technical article' },
  { value: 'vendor_marketing', label: 'Vendor marketing page' },
  { value: 'social_post', label: 'Social post / weak signal' },
  { value: 'internal_test', label: 'Internal test' },
  { value: 'other', label: 'Other' },
] as const

const trustLevelOptions = [
  { value: 'official', label: 'Official' },
  { value: 'trusted', label: 'Trusted' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'weak', label: 'Weak' },
  { value: 'untrusted', label: 'Untrusted' },
  { value: 'unreviewed', label: 'Unreviewed' },
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

async function createSourceRecord(formData: FormData) {
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

  const sourceType = readAllowedValue(formData.get('source_type'), sourceTypeOptions, 'official_docs')
  const trustLevel = readAllowedValue(formData.get('trust_level'), trustLevelOptions, 'unreviewed')
  const title = cleanFormString(formData.get('title'))
  const url = cleanFormString(formData.get('url'))
  const publisher = cleanFormString(formData.get('publisher'))
  const author = cleanFormString(formData.get('author'))
  const summary = cleanFormString(formData.get('summary'))
  const rawExcerpt = cleanFormString(formData.get('raw_excerpt'))

  if (!title) {
    redirect('/brain?source=missing-title')
  }

  const { error } = await supabase.from('sources').insert({
    source_type: sourceType,
    title,
    url,
    publisher,
    author,
    trust_level: trustLevel,
    summary,
    raw_excerpt: rawExcerpt,
    status: 'new',
    is_public: false,
    metadata: {},
    created_by: user.id,
  })

  if (error) {
    console.error('DeepMind Resources Brain source creation failed:', error.message)
    redirect('/brain?source=error')
  }

  revalidatePath('/brain')
  redirect('/brain?source=created')
}

export function BrainSourceCreateForm() {
  return (
    <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
            <FileSearch className="h-4 w-4" aria-hidden="true" />
            Create source
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
            Add the first source-backed signal.
          </h2>

          <p className="mt-4 text-base leading-8 text-sand/65">
            Sources are the first layer of the Brain. Add official documentation, release notes,
            trusted technical material, internal test results, or weak discovery signals before
            creating Brain records, validation reviews, lessons, or sandbox tasks.
          </p>

          <div className="mt-7 rounded-3xl bg-[#EAF7FF] p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
              Source rule
            </p>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              A source is not automatically treated as truth. The Brain stores it first, then
              validation decides whether the claim is verified, weak, conflicting, outdated, or
              useful enough to influence training.
            </p>
          </div>
        </div>

        <form
          action={createSourceRecord}
          className="rounded-[2rem] border border-sand/10 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="source_type" className="block text-sm font-semibold text-sand">
                Source type
              </label>
              <select
                id="source_type"
                name="source_type"
                defaultValue="official_docs"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {sourceTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="trust_level" className="block text-sm font-semibold text-sand">
                Initial trust level
              </label>
              <select
                id="trust_level"
                name="trust_level"
                defaultValue="unreviewed"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              >
                {trustLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="title" className="block text-sm font-semibold text-sand">
              Source title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Example: Official release notes for a model update"
              className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="url" className="block text-sm font-semibold text-sand">
              Source URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://..."
              className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="publisher" className="block text-sm font-semibold text-sand">
                Publisher
              </label>
              <input
                id="publisher"
                name="publisher"
                type="text"
                placeholder="Source owner or publisher"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-sand">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Optional"
                className="mt-2 w-full rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="summary" className="block text-sm font-semibold text-sand">
              Source summary
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={4}
              placeholder="What does this source appear to say, and why might it matter?"
              className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="raw_excerpt" className="block text-sm font-semibold text-sand">
              Short excerpt or note
            </label>
            <textarea
              id="raw_excerpt"
              name="raw_excerpt"
              rows={3}
              placeholder="Optional short excerpt, claim summary, or internal note."
              className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-white px-4 py-3 text-sm leading-7 text-sand shadow-sm outline-none transition placeholder:text-sand/35 focus:border-[#123BFF] focus:ring-4 focus:ring-[#123BFF]/10"
            />
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A63FF] sm:w-auto"
          >
            Save source to Brain
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}
