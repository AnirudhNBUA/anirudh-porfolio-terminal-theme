import { Mail, Phone } from "lucide-react"

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

type Social = {
  icon: React.ReactNode
  label: string
  href: string
  handle: string
}

const SOCIALS: Social[] = [
  {
    icon: <GithubGlyph />,
    label: "GitHub",
    href: "https://github.com/AnirudhNBUA",
    handle: "@AnirudhNBUA",
  },
  {
    icon: <LinkedinGlyph />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/anirudh-b-k/",
    handle: "anirudh-b-k",
  },
  {
    icon: <Mail className="size-4" aria-hidden="true" />,
    label: "Email",
    href: "mailto:anirudhnbua@gmail.com",
    handle: "anirudhnbua@gmail.com",
  },
  {
    icon: <Phone className="size-4" aria-hidden="true" />,
    label: "Phone",
    href: "tel:+918688456460",
    handle: "+91-8688456460",
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10 font-mono">
      {/* Contact CTA */}
      <div className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          ~/contact
        </p>
        <h2 className="text-2xl font-semibold text-foreground">
          Let&apos;s build something{" "}
          <span className="text-neon">scalable &amp; intelligent.</span>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Currently focused on high-scale data engineering and AI agents at Morgan Stanley.
          Open to interesting conversations, collaborations, and new opportunities.
        </p>
      </div>

      {/* Social / contact cards */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SOCIALS.map(({ icon, label, href, handle }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="group flex flex-col gap-2 rounded-md border border-border bg-secondary/20 p-4 transition-colors hover:border-neon/50"
          >
            <span className="text-muted-foreground transition-colors group-hover:text-neon">
              {icon}
            </span>
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <span className="break-all text-xs text-foreground/80">{handle}</span>
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="text-neon">$</span> echo &quot;built by Anirudh B K&quot; —{" "}
          {new Date().getFullYear()}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="text-electric">git commit</span> -m &quot;portfolio v2 — always
          shipping&quot;
        </p>
      </div>
    </footer>
  )
}
