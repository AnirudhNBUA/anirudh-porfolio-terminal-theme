import { ArrowUpRight } from "lucide-react"
import { TerminalWindow } from "@/components/terminal-window"

type Project = {
  name: string
  tagline: string
  description: string
  stack: string[]
  links: { label: string; href: string }[]
}

const PROJECTS: Project[] = [
  {
    name: "PLDD-SRGAN",
    tagline: "Plant Leaf Disease Detection with Super-Resolution GAN",
    description:
      "Two-stage deep-learning pipeline: an SRGAN upscales low-quality leaf images, then a CNN classifier identifies plant diseases — improving classification on poor-quality field photos. Deployed end-to-end behind a Flask web app.",
    stack: ["Python", "TensorFlow/Keras", "SRGAN", "CNN", "Flask", "OpenCV"],
    links: [
      { label: "github", href: "https://github.com/AnirudhNBUA/PLDD-SRGAN" },
    ],
  },
  {
    name: "BrochureAI",
    tagline: "AI-Powered Brochure Generator",
    description:
      "Full-stack AI app that scrapes a company's site with Cheerio, picks relevant pages via GPT-4.1-nano, and streams a structured brochure word-by-word from GPT-4.1-mini over SSE. Live on Netlify with cost-optimized serverless functions.",
    stack: ["React 18", "Vite", "Tailwind", "Node 20", "GPT-4.1", "SSE"],
    links: [
      { label: "github", href: "https://github.com/AnirudhNBUA/Brouchere-AI" },
      { label: "live", href: "https://brouchere-ai.netlify.app" },
    ],
  },
  {
    name: "SDLC Automation Suite",
    tagline: "GenAI Prototype & Spec Generator",
    description:
      "Proprietary internal tool that converts business user stories into technical specifications and on-demand web app prototypes using Generative AI and LangChain workflows — cutting SDLC time ~50% across product teams.",
    stack: ["Python", "Flask", "LangChain", "GenAI", "PostgreSQL"],
    links: [],
  },
  {
    name: "E-Commerce API",
    tagline: "Scalable Online-Store Backend",
    description:
      "Complete backend service for an online store: product catalogs, inventory management, and multi-step order processing, secured with JWT authentication and integrated Stripe payments.",
    stack: ["Node.js", "REST API", "MongoDB", "Stripe", "JWT"],
    links: [{ label: "github", href: "https://github.com/AnirudhNBUA" }],
  },
  {
    name: "CKD Detection",
    tagline: "Chronic Kidney Disease ML Classifier",
    description:
      "Ensemble machine-learning project predicting chronic kidney disease from the Kaggle dataset, benchmarking multiple classifiers to reach high diagnostic accuracy.",
    stack: ["Python", "Scikit-learn", "Ensemble ML", "Jupyter"],
    links: [
      {
        label: "github",
        href: "https://github.com/AnirudhNBUA/Chronic-Kidney-Disease-Detection",
      },
    ],
  },
  {
    name: "Mapty",
    tagline: "Geo-location Workout Tracker",
    description:
      "OOP-driven workout tracker that pins running and cycling sessions on an interactive Leaflet.js map using the browser's Geolocation API. Workouts persist across sessions via localStorage.",
    stack: ["JavaScript", "Leaflet.js", "Geolocation API", "OOP", "CSS"],
    links: [
      {
        label: "github",
        href: "https://github.com/AnirudhNBUA/mapty-workout-tracker",
      },
      {
        label: "live",
        href: "https://anirudhnbua.github.io/mapty-workout-tracker/",
      },
    ],
  },
]

export function Projects() {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
        ~/projects
      </h2>
      <TerminalWindow title="ls -la ~/projects" command="ls -la ~/projects">
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col rounded-md border border-border bg-secondary/20 p-5 transition-colors hover:border-neon/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-mono text-lg font-semibold text-neon">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-foreground/80">
                    {p.tagline}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4 border-t border-border pt-3 empty:hidden">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-mono text-xs text-electric transition-colors hover:text-neon"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </TerminalWindow>
    </div>
  )
}
