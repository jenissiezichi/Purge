import {Trash2, Zap} from "lucide-react"
import {useActivity} from "@/hooks/useActivity.ts";
import {useState} from "react";

function timeAgo(timestamp: string){
    const diffMS = Date.now() - new Date(timestamp).getTime()
    const mins= Math.floor(diffMS / 60000)
    if (mins<1) return "just now"
    if (mins<60) return `${mins} minutes ago`
    const hours = Math.floor(mins / 60)
    if (hours<24) return `${hours} hours ago`
    return `${Math.floor(hours/24)} days ago`

}

export function LogsPage() {
    const {activity, isLoading} = useActivity(50)
    const [visible, setVisible] = useState(9)
return (
    <div className="p-8">
<h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
    Logs
</h1>
        <div className="rounded-xl border overflow-hidden rounded-lg"
             style={{borderColor: "var(--border)"}}>
            {isLoading? (
                <p className="p-6 text-sm" style={{color: "var(--text-muted)"}}>Loading...
                </p>
            ): activity.length === 0? (
                <p className="p-12 text-center text-sm" style={{color: "var(--text-muted)"}}>No activity yet.</p>
            ):(
                <ul>
                    {activity.slice(0, visible).map((entry, i) => {
                        const isAuto = entry.action === "auto-trashed";
                        return(
                            <li key={i}
                            className="flex items-center justify-between px-5 py-4 border-b last:border-0"
                            style={{ borderColor: "var(--border)"}}>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex items-center justify-center h-8 w-8 rounded-lg shrink-0"
                                        style={{ backgroundColor: "var(--background)" }}
                                    >
                                        {isAuto
                                            ? <Zap size={14} style={{ color: "var(--accent)" }} />
                                            : <Trash2 size={14} style={{ color: "var(--primary)" }} />}
                                    </div>
                                    <div>
                                        <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                                            {isAuto ? "Auto-trashed" : "Trashed"} {entry.count} message{entry.count !== 1 ? "s" : ""}
                                        </p>
                                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                                            {isAuto ? "Nightly scan" : "Manual"}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
    {timeAgo(entry.timestamp)}
</span>
                            </li>
                        )
                    } )}
                </ul>
            )}
            {visible < activity.length && (
                <button
                    onClick={() => setVisible((v) => v + 15)}
                    className="w-full py-3 text-sm font-medium border-t transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--primary)" }}
                >
                    Show more ({activity.length - visible} left)
                </button>
            )}

        </div>
    </div>
)

}