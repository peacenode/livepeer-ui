import type { ReactNode } from "react"

type PlatformPageProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function PlatformPage({ title, action, children }: PlatformPageProps) {
  return (
    <section className="relative min-h-0 flex-1">
      <header className="absolute -inset-x-6 top-0 z-10 flex h-9 items-center justify-between gap-4 bg-background px-6 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-gradient-to-b after:from-background after:to-transparent md:-inset-x-10 md:px-10">
        <h1 className="text-xl font-medium">{title}</h1>
        {action}
      </header>
      <div className="-mx-6 h-full overflow-x-hidden overflow-y-auto overscroll-contain px-6 pt-17 pb-8 md:-mx-10 md:px-10">
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </section>
  )
}
