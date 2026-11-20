export function PageHeader({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="flex max-w-2xl flex-col gap-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {children ? (
        <div className="text-muted-foreground text-base leading-relaxed sm:text-[17px]">
          {children}
        </div>
      ) : null}
    </header>
  )
}

export function SectionTitle({
  id,
  children,
  action,
}: {
  id: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-4">
      <h2
        id={id}
        className="text-muted-foreground text-[13px] font-medium tracking-wide uppercase"
      >
        {children}
      </h2>
      {action}
    </div>
  )
}
