export function PlaybookLibraryHeader({
  heading,
  description,
}: {
  heading: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-light tracking-tight text-balance sm:text-5xl">
        {heading}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-balance text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
