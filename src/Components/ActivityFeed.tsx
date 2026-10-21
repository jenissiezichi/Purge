import { Trash2, Zap, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

interface ActivityEntry {
    email: string
    action: string
    count: number
    message_ids: string[]
    timestamp: string
}

function timeAgo(timestamp: string) {
    const diffMs = Date.now() - new Date(timestamp).getTime()
    const mins = Math.floor(diffMs / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins} min ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
}
function getActionMeta(entry: ActivityEntry) {
    const s = `${entry.count} message${entry.count > 1 ? "s" : ""}`
    switch (entry.action) {
        case "auto-trashed":
            return { Icon: Zap, label: `Nightly scan trashed ${s}` }
        case "ai-trashed":
            return { Icon: Sparkles, label: `AI cleanup trashed ${s}` }
        default:
            return { Icon: Trash2, label: `You moved ${s} to trash` }
    }
}

export function ActivityFeed({ activity = [], isLoading }: { activity?: ActivityEntry[]; isLoading: boolean }) {
    return (
        <div
            className="rounded-xl border p-4 mb-2"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Recent Activity
                </h2>
                <Link to="/logs" className="text-xs font-medium" style={{ color: "var(--primary)" }}>
                    View all
                </Link>
            </div>

            {isLoading ? (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Loading...
                </p>
            ) : activity.length === 0 ? (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    No activity yet.
                </p>
            ) : (
                <ul className="flex flex-col gap-2.5">
                    {activity.map((entry, i) => {
                        const { Icon, label } = getActionMeta(entry)
                        return (
                            <li key={i} className="flex items-center gap-2.5">
                                <div
                                    className="flex items-center justify-center h-6 w-6 rounded-md shrink-0"
                                    style={{ backgroundColor: "var(--background)" }}
                                >
                                    <Icon size={12} style={{ color: "var(--primary)" }} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm truncate" style={{ color: "var(--text-primary)" }}>
                                        {label}
                                    </p>
                                </div>
                                <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                    {timeAgo(entry.timestamp)}
                </span>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}