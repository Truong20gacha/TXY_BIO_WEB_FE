import { ArrowDown, ArrowRight } from 'lucide-react'

type Step = Readonly<{ title: string; body: string }>

type ModeOfActionDiagramProps = Readonly<{
  steps: ReadonlyArray<Step>
}>

export function ModeOfActionDiagram({ steps }: ModeOfActionDiagramProps) {
  if (steps.length === 0) return null

  return (
    <div>
      <div className="mb-12 flex items-center gap-3">
        <span className="h-px w-8 bg-line-mid" aria-hidden="true" />
        <p className="text-eyebrow text-ink-tertiary">Mode of action</p>
        <span className="h-px flex-1 bg-line-mid" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6 md:items-start">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <div key={step.title} className="contents">
              <div>
                <p className="font-mono text-eyebrow text-accent-primary">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-h3 font-medium text-ink-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-sm text-ink-secondary leading-relaxed">
                  {step.body}
                </p>
              </div>

              {!isLast && (
                <>
                  {/* Desktop horizontal connector */}
                  <div
                    className="hidden md:flex items-center justify-center pt-1"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={20}
                      strokeWidth={1.25}
                      className="text-ink-tertiary"
                    />
                  </div>

                  {/* Mobile vertical connector */}
                  <div
                    className="flex items-center justify-center md:hidden"
                    aria-hidden="true"
                  >
                    <ArrowDown
                      size={20}
                      strokeWidth={1.25}
                      className="text-ink-tertiary"
                    />
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
