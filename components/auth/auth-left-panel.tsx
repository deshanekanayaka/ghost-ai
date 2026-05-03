import { Cpu, Share2, FileText } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between px-14 py-12 w-[520px] shrink-0 border-r border-border-default">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-accent-primary flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-bg-base">G</span>
        </div>
        <span className="text-sm font-semibold text-text-primary">Ghost AI</span>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-text-primary leading-tight">
            Design systems at the speed of thought.
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            Describe your architecture in plain English. Ghost AI maps it to a shared
            canvas your whole team can refine in real time.
          </p>
        </div>

        <div className="space-y-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 h-10 w-10 rounded-xl bg-bg-elevated flex items-center justify-center">
                <Icon className="h-5 w-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{title}</p>
                <p className="text-sm text-text-muted mt-0.5 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-text-faint">© 2026 Ghost AI. All rights reserved.</p>
    </div>
  )
}
