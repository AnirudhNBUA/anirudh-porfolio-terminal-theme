"use client"

import { useEffect, useState } from "react"
import { Mail, Phone } from "lucide-react"
import { TypeLine } from "@/components/type-line"
import { HeroGlobe } from "@/components/globe"

const TAGS = ["Python", "Snowflake", "LLMs", "Multi-Agent Systems"]

type HeroProps = {
  onReady?: () => void
}

function GithubGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function Hero({ onReady }: HeroProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= 3) onReady?.()
  }, [step, onReady])

  return (
    <header className="relative flex min-h-[100svh] items-start py-14 sm:py-16 lg:items-center lg:py-20">
      {/* full-bleed solid black backdrop — hides the page dot-map within the hero */}
      <div
        className="absolute inset-y-0 z-0 bg-background"
        style={{ left: "calc(50% - 50vw)", width: "100vw" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
        {/* left column: boot sequence + content */}
        <div className="w-full lg:w-1/2 lg:pr-10">
          {/* boot sequence */}
          <div className="mb-8 font-mono text-sm text-muted-foreground">
            <p>
              <TypeLine
                text="> executing profile.sh"
                speed={34}
                className="text-neon"
                onDone={() => setStep(1)}
              />
            </p>
            {step >= 1 && (
              <p className="mt-1">
                <TypeLine
                  text="> mounting /home/anirudh ... ok"
                  speed={18}
                  onDone={() => setStep(2)}
                />
              </p>
            )}
            {step >= 2 && (
              <p className="mt-1">
                <TypeLine
                  text="> initializing portfolio --mode=dark"
                  speed={18}
                  cursor={false}
                  onDone={() => setStep(3)}
                />
              </p>
            )}
          </div>

          <div
            className={step >= 3 ? "animate-fade-up" : "opacity-0"}
            style={{ animationDelay: "60ms" }}
          >
            <h1 className="text-balance text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Anirudh B K
            </h1>

            <p className="mt-5 font-mono text-base text-electric sm:text-lg">
              [ AI/Data Engineer ]
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-secondary/30 px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              ~3 years building data platforms and LLM-driven backends.
              Currently engineering ESG data pipelines at{" "}
              <span className="text-foreground">Morgan Stanley</span>, serving
              1000+ investment users firmwide on Snowflake and FastAPI.
            </p>

            <nav
              aria-label="Contact links"
              className="mt-8 flex flex-wrap items-center gap-4 font-mono text-sm"
            >
              <a
                href="mailto:anirudhnbua@gmail.com"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-neon"
              >
                <Mail className="size-4" aria-hidden="true" />
                anirudhnbua@gmail.com
              </a>
              <a
                href="tel:+918688456460"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-neon"
              >
                <Phone className="size-4" aria-hidden="true" />
                +91-8688456460
              </a>
              <a
                href="https://github.com/AnirudhNBUA"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-neon"
              >
                <GithubGlyph />
                github
              </a>
              <a
                href="https://linkedin.com/in/anirudh-b-k"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-neon"
              >
                <LinkedinGlyph />
                linkedin
              </a>
            </nav>
          </div>
        </div>

        {/* globe layer: stacked on mobile, massive hemisphere on desktop */}
        <div
          className={`pointer-events-none relative -mx-5 h-[42svh] overflow-hidden sm:-mx-8 lg:mx-0 lg:h-[100svh] lg:flex-1 lg:self-stretch lg:overflow-visible ${
            step >= 3 ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "220ms" }}
        >
          <div
            className="absolute inset-0 lg:inset-y-0 lg:right-[calc(50%-50vw)] lg:left-auto lg:w-[60vw]"
          >
            <HeroGlobe />
          </div>
        </div>
      </div>
    </header>
  )
}
