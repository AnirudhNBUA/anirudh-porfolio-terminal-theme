import { DotMap } from "@/components/dot-map"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Achievements } from "@/components/achievements"
import { TerminalWindow } from "@/components/terminal-window"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <DotMap />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Hero />

        <div className="space-y-20 pb-24">
          <Experience />
          <Projects />
          <Skills />
          <Achievements />

          <div className="space-y-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              ~/education
            </h2>
            <TerminalWindow title="whoami --education" command="cat education.md">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">
                  B.Tech, Information Technology
                </h3>
                <span className="font-mono text-xs text-electric">
                  Aug 2019 – May 2023
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Vellore Institute of Technology · Vellore, India · CGPA 8.58
              </p>
            </TerminalWindow>
          </div>
        </div>

        <footer className="border-t border-border py-8 font-mono text-xs text-muted-foreground">
          <p>
            <span className="text-neon">$</span> echo &quot;built by Anirudh B
            K&quot; — {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  )
}
