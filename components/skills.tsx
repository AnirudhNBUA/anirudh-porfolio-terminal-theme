import { TerminalWindow } from "@/components/terminal-window"

const GROUPS: { key: string; items: string[] }[] = [
  {
    key: "languages_core",
    items: ["Python", "JavaScript", "SQL", "Bash"],
  },
  {
    key: "backend",
    items: [
      "FastAPI",
      "Flask",
      "NodeJS",
      "Express",
      "Pydantic",
      "SQL",
      "Pandas",
      "Jinja2",
    ],
  },
  {
    key: "ai_llm",
    items: [
      "Machine Learning",
      "Deep learning",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Autogen",
      "Agentic AI",
      "Agentic skills",
      "Scikit-learn",
      "Prompt Engineering",
    ],
  },
  {
    key: "data_storage",
    items: ["Snowflake", "PostgreSQL", "MongoDB", "DuckDB", "Redis", "IBM MQ"],
  },
  {
    key: "cloud_devops",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Terraform",
      "Jenkins",
      "CI/CD",
      "Git",
      "Sourcegraph",
    ],
  },
]

const CERTS = [
  "AWS Certified Cloud Practitioner",
  "Microsoft Certified: Azure Fundamentals",
  "Microsoft Certified: Azure AI Fundamentals",
  "Microsoft Certified: Azure Administrator Associate",
  "Microsoft Certified: Azure Solutions Architect Expert",
  "Google Cloud Digital Cloud Leader",
  "Google Cloud Associate Cloud Engineer",
]

export function Skills() {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
        ~/dependencies
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <TerminalWindow
          title="package.json"
          command="cat package.json | jq .dependencies"
        >
          <dl className="space-y-4 font-mono text-sm">
            {GROUPS.map((g) => (
              <div key={g.key}>
                <dt className="text-electric">{`"${g.key}": [`}</dt>
                <dd className="ml-4 flex flex-wrap gap-x-2 gap-y-1 text-foreground/85">
                  {g.items.map((it, i) => (
                    <span key={it}>
                      {`"${it}"`}
                      {i < g.items.length - 1 ? "," : ""}
                    </span>
                  ))}
                </dd>
                <p className="text-electric">{"]"}</p>
              </div>
            ))}
          </dl>
        </TerminalWindow>

        <TerminalWindow
          title="certifications.txt"
          command="cat security/certifications.txt"
        >
          <ul className="space-y-3 font-mono text-sm">
            {CERTS.map((c) => (
              <li key={c} className="flex gap-3 text-foreground/85">
                <span aria-hidden="true" className="text-neon">
                  [✓]
                </span>
                {c}
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </div>
    </div>
  )
}
