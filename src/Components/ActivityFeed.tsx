import { Trash2 } from "lucide-react"

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

export function ActivityFeed({ activity, isLoading }: { activity: ActivityEntry[]; isLoading: boolean }) {
    return (
        <div
            className="rounded-xl border p-5 mb-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
            <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Recent Activity
            </h2>

            {isLoading ? (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Loading...
                </p>
            ) : activity.length === 0 ? (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    No activity yet.
                </p>
            ) : (
                <ul className="flex flex-col gap-3">
                    {activity.map((entry, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div
                                className="flex items-center justify-center h-7 w-7 rounded-lg shrink-0 mt-0.5"
                                style={{ backgroundColor: "var(--background)" }}
                            >
                                <Trash2 size={13} style={{ color: "var(--primary)" }} />
                            </div>
                            <div>
                                <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                                    Moved {entry.count} message{entry.count > 1 ? "s" : ""} to trash
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                                    {timeAgo(entry.timestamp)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}