import { TerminalWindow } from "@/components/terminal-window"

type Role = {
  company: string
  role: string
  period: string
  location: string
  stack: string[]
  bullets: string[]
}

const ROLES: Role[] = [
  {
    company: "Morgan Stanley",
    role: "Data Engineer — ESG ODS Services",
    period: "Nov 2025 – Present",
    location: "Bengaluru, India · via Teamware Solutions",
    stack: [
      "Python 3.12",
      "FastAPI",
      "Streamlit",
      "Snowflake",
      "DuckDB",
      "IBM MQ",
      "Autosys",
      "Jenkins",
    ],
    bullets: [
      "Build & operate ESG ODS Services, ingesting 5–20 GB/day from 12+ vendors (MSCI, ISS, Sustainalytics, FactSet) into Snowflake for 1000+ investment users firmwide.",
      "Designed a 6-stage daily KPI pipeline (validation, issuer resolution, KPI mapping, country normalization, staging, bitemporal publishing) orchestrated via Autosys — resumable from the last successful stage on failure.",
      "Built a FastAPI REST API with 13 domain routers + a Streamlit ops dashboard for uploads, run monitoring, and rollbacks, secured with role-based access.",
      "Inducted into the firm's AI Development Platform (AIDP) team within 2 months; authored reusable agent skills for Git/GitHub, Jira, Jenkins, Snowflake & Sourcegraph CLI for spec-driven development.",
    ],
  },
  {
    company: "Accenture",
    role: "Senior AI/ML Backend Engineer",
    period: "Aug 2023 – Oct 2025",
    location: "Bengaluru, India",
    stack: [
      "Python",
      "NodeJS",
      "Flask",
      "Express",
      "LangChain",
      "CrewAI",
      "Autogen",
      "PostgreSQL",
      "Redis",
    ],
    bullets: [
      "Built a multi-agent network with CrewAI & Autogen on NodeJS/Express orchestrating 5–10 agents in real time; API supports 25+ input formats to generate bug reports and presentation-ready charts/PPTs — drove ~25% revenue uplift in 3 months.",
      "Developed a Flask + LangChain SDLC automation product generating on-demand web app prototypes — cut prototype turnaround ~50% and dev cycle ~30%; enriches 150+ user stories into structured LLM inputs.",
      "Designed a Redis caching layer cutting redundant LLM/API calls and server load ~15%; introduced SOLID and domain-driven design standards. Promoted to Senior for product impact.",
    ],
  },
]

export function Experience() {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
        ~/execution-log
      </h2>
      {ROLES.map((r) => (
        <TerminalWindow
          key={r.company}
          title={`${r.company.toLowerCase().replace(/\s+/g, "-")}.log`}
          command={`cat experience/${r.company.toLowerCase().split(" ")[0]}.md`}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              {r.role}
            </h3>
            <span className="font-mono text-xs text-electric">{r.period}</span>
          </div>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {r.company} · {r.location}
          </p>

          <ul className="mt-5 space-y-3">
            {r.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden="true" className="mt-1 text-neon">
                  ▸
                </span>
                <span className="text-foreground/85">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {r.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </TerminalWindow>
      ))}
    </div>
  )
}
