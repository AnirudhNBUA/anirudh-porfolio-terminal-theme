import { TerminalWindow } from "@/components/terminal-window"

const ITEMS = [
  {
    title: "AIDP Team Induction",
    body: "Inducted into Morgan Stanley's AI Development Platform team within 2 months for agent skills innovation.",
  },
  {
    title: "Best Employee Award",
    body: "Recognized as best employee at Accenture for outstanding product contributions and promoted to Senior.",
  },
  {
    title: "Revenue Growth",
    body: "Drove ~25% product revenue uplift in 3 months via a CrewAI multi-agent feature launch.",
  },
]

export function Achievements() {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
        ~/achievements
      </h2>
      <TerminalWindow title="git log --oneline --stat" command="git log --achievements">
        <div className="grid gap-5 sm:grid-cols-3">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="rounded-md border border-border bg-secondary/20 p-4"
            >
              <p className="font-mono text-xs text-neon">★ {it.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  )
}
