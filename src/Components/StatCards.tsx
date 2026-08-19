import type { LucideIcon } from "lucide-react"

interface StatCardProps {
    label: string
    value: string
    icon: LucideIcon
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
    return (
        <div
            className="flex-1 p-5 rounded-xl border"
    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
>
    <div className="flex items-center justify-between mb-3">
    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
    {label}
    </span>
    <Icon size={16} style={{ color: "var(--accent)" }} />
    </div>
    <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
    {value}
    </span>
    </div>
)
}