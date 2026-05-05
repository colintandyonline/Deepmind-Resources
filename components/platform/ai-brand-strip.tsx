import type { ComponentType, SVGProps } from 'react'
import { ArrowRight } from 'lucide-react'

type BrandItem = {
  company: string
  product: string
  descriptor: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

function OpenAIMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M12 4.3 15.8 6.5V11L12 13.2 8.2 11V6.5L12 4.3Z" />
      <path d="M8.2 6.5 5.2 8.3V12.7L8.9 14.8" />
      <path d="M15.8 6.5 18.8 8.3V12.7L15.1 14.8" />
      <path d="M8.9 14.8V18.2L12 20 15.1 18.2V14.8" />
      <path d="M5.2 12.7 8.2 11" />
      <path d="M18.8 12.7 15.8 11" />
    </svg>
  )
}

function ClaudeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <path d="M12 4 19 20H15.4L13.9 16.3H10.1L8.6 20H5L12 4Z" />
      <path d="M11.3 13.4H12.7" />
    </svg>
  )
}

function GeminiMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3.8 13.8 10.2 20.2 12 13.8 13.8 12 20.2 10.2 13.8 3.8 12 10.2 10.2 12 3.8Z" />
      <path d="M12 7.6V16.4" />
      <path d="M7.6 12H16.4" />
    </svg>
  )
}

function PerplexityMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2.5" />
      <path d="M7 12h10" />
      <path d="M12 7v10" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  )
}

function GrokMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M8.1 8.1 15.9 15.9" />
      <path d="M15.9 8.1 10.9 13.1" />
      <path d="M8.1 15.9 10.9 13.1" />
    </svg>
  )
}

function DeepSeekMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 5.2H12.8C16.7 5.2 19.2 7.7 19.2 12S16.7 18.8 12.8 18.8H8z" />
      <path d="M8 5.2V18.8" />
      <path d="M10.1 9.4H14.1" />
      <path d="M10.1 14.6H15.3" />
    </svg>
  )
}

const brands: BrandItem[] = [
  {
    company: 'OpenAI',
    product: 'ChatGPT',
    descriptor: 'flagship assistant',
    Icon: OpenAIMark,
  },
  {
    company: 'Anthropic',
    product: 'Claude',
    descriptor: 'reasoning + writing',
    Icon: ClaudeMark,
  },
  {
    company: 'Google',
    product: 'Gemini',
    descriptor: 'multimodal stack',
    Icon: GeminiMark,
  },
  {
    company: 'Perplexity',
    product: 'Perplexity',
    descriptor: 'answer engine',
    Icon: PerplexityMark,
  },
  {
    company: 'xAI',
    product: 'Grok',
    descriptor: 'live web-native model',
    Icon: GrokMark,
  },
  {
    company: 'DeepSeek',
    product: 'DeepSeek',
    descriptor: 'open-weight challenger',
    Icon: DeepSeekMark,
  },
]

export function AiBrandStrip() {
  return (
    <section className="mt-8 lg:mt-10">
      <div className="overflow-hidden rounded-[2.25rem] border border-sand/10 bg-white/92 p-5 shadow-sm backdrop-blur sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#123BFF] px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
              Frontier model coverage
            </span>

            <h2 className="mt-5 max-w-xl text-2xl font-bold tracking-tight text-sand sm:text-3xl">
              Tracking the AI platforms shaping modern workflows.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-sand/62 sm:text-base">
              Cleaner brand recognition, tighter visual rhythm, and a blue-only icon system that
              feels deliberate instead of filler.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <div className="rounded-2xl border border-[#123BFF]/10 bg-[#F7FBFF] px-4 py-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#123BFF]">
                Coverage focus
              </p>
              <p className="mt-1 text-sm font-semibold text-sand">Models, search, agents, tools</p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#123BFF] px-4 py-3 text-sm font-bold text-white shadow-sm">
              Live landscape
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#123BFF]/20 to-transparent" />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => {
            const Icon = brand.Icon

            return (
              <article
                key={brand.product}
                className="group relative overflow-hidden rounded-[1.75rem] border border-sand/10 bg-gradient-to-br from-white via-[#FBFDFF] to-[#F4F9FF] p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#123BFF]/20 hover:shadow-md sm:p-5"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#123BFF]/30 to-transparent" />

                <div className="flex items-start gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] border border-[#123BFF]/12 bg-[#EAF4FF] text-[#123BFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition group-hover:bg-[#123BFF] group-hover:text-white">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#123BFF]">
                      {brand.company}
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-sand">
                      {brand.product}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-sand/60">{brand.descriptor}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
