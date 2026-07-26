import type { ReactNode } from "react"

type PlatformPageProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function PlatformPage({ title, action, children }: PlatformPageProps) {
  return (
    <section className="-mx-4 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 pb-10 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 md:pt-18">
      <header className="flex items-center justify-between gap-4">
        <h1 className="font-sans text-[2rem] leading-[0.98] font-light tracking-[-0.025em] text-balance">
          {title}
        </h1>
        {action && <div>{action}</div>}
      </header>
      <div className="flex flex-col gap-10 pt-10">{children}</div>
    </section>
  )
}
