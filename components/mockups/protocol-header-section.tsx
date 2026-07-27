export function ProtocolHeaderSection({
  eyebrow,
  heading,
  description,
}: {
  eyebrow: string
  heading: string
  description: string
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-medium text-balance">{heading}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  )
}
