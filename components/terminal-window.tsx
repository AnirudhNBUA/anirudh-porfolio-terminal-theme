import type { ReactNode } from "react"

export function TerminalWindow({
  title,
  command,
  children,
  className = "",
}: {
  title: string
  command?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`glass overflow-hidden rounded-lg border border-border ${className}`}
    >
      <header className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-muted-foreground/40" />
          <span className="size-3 rounded-full bg-muted-foreground/40" />
          <span className="size-3 rounded-full bg-muted-foreground/40" />
        </span>
        <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
          {title}
        </span>
      </header>
      <div className="p-5 sm:p-6">
        {command ? (
          <p className="mb-5 font-mono text-sm">
            <span className="text-neon">{"> "}</span>
            <span className="text-foreground/90">{command}</span>
          </p>
        ) : null}
        {children}
      </div>
    </section>
  )
}
