"use client"

import { useState } from "react"
import { DotMap } from "@/components/dot-map"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Achievements } from "@/components/achievements"
import { TerminalWindow } from "@/components/terminal-window"
import { Footer } from "@/components/footer"

export default function Page() {
  const [heroReady, setHeroReady] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <DotMap />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Hero onReady={() => setHeroReady(true)} />

        <div
          className={`space-y-20 pb-24 transition-opacity duration-500 ${
            heroReady ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!heroReady}
        >
          <Experience />
          <Projects />
          <Skills />
          <Achievements />

          <div className="space-y-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              ~/education
            </h2>
            <TerminalWindow title="whoami --education" command="cat education.md">
              <div className="space-y-6">
                {/* Degree */}
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold">
                      B.Tech, Information Technology
                    </h3>
                    <span className="font-mono text-xs text-electric">
                      Aug 2019 – May 2023
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Vellore Institute of Technology · Vellore, India
                  </p>
                  <p className="mt-1 font-mono text-xs text-neon">CGPA 8.58</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Coursework: Data Structures &amp; Algorithms · DBMS · Operating Systems · Computer Networks
                  </p>
                </div>

                <div className="border-t border-border" />

                {/* Intermediate */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="text-sm font-semibold">Intermediate (10+2)</h4>
                      <span className="font-mono text-xs text-electric">2019</span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      BIEAP · Andhra Pradesh
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-neon">CGPA 9.79</p>
                  </div>

                  {/* SSC */}
                  <div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="text-sm font-semibold">SSC (10th)</h4>
                      <span className="font-mono text-xs text-electric">2017</span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      BSEAP · Andhra Pradesh
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-neon">CGPA 9.8</p>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
