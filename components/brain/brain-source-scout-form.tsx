import { ArrowRight, Radar } from 'lucide-react'

export function BrainSourceScoutForm() {
  return (
    <section className="mt-8 rounded-[2rem] border border-sand/10 bg-white/92 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
            <Radar className="h-4 w-4" aria-hidden="true" />
            Source Scout
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-sand sm:text-4xl">
            Scout official sources before they become Brain records.
          </h2>

          <p className="mt-4 text-base leading-8 text-sand/65">
            This area will become the controlled Source Scout for reading official release notes,
            documentation, changelogs, and trusted references. The Scout will create private
            candidate findings for review before anything becomes training content.
          </p>

          <div className="mt-7 rounded-3xl bg-[#EAF7FF] p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#123BFF]">
              Controlled workflow
            </p>
            <p className="mt-3 text-sm leading-7 text-sand/65">
              The Scout will be manual, admin-only, and review-first. It will not publish directly,
              create lessons automatically, or treat model output as verified truth.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-sand/10 bg-white p-5 shadow-sm sm:p-6">
          <label htmlFor="source_url_preview" className="block text-sm font-semibold text-sand">
            Source URL
          </label>

          <input
            id="source_url_preview"
            name="source_url_preview"
            type="url"
            disabled
            placeholder="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            className="mt-2 w-full rounded-2xl border border-sand/10 bg-[#F7FBFF] px-4 py-3 text-sm text-sand/55 shadow-sm outline-none placeholder:text-sand/35"
          />

          <label htmlFor="source_focus_preview" className="mt-5 block text-sm font-semibold text-sand">
            Scout focus
          </label>

          <textarea
            id="source_focus_preview"
            name="source_focus_preview"
            rows={5}
            disabled
            placeholder="Find updates that affect business training, sandbox tasks, tool intelligence, or workflow practice."
            className="mt-2 w-full resize-y rounded-2xl border border-sand/10 bg-[#F7FBFF] px-4 py-3 text-sm leading-7 text-sand/55 shadow-sm outline-none placeholder:text-sand/35"
          />

          <button
            type="button"
            disabled
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123BFF]/45 px-5 py-3 text-sm font-bold text-white shadow-sm sm:w-auto"
          >
            Scout action coming next
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
