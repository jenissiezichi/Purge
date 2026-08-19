import { Trash2, X } from "lucide-react"

interface BulkActionBarProps {
    count: number
    onTrash: () => void
    onClear: () => void
    isProcessing: boolean
}

export function BulkActionBar({ count, onTrash, onClear, isProcessing }: BulkActionBarProps) {
    if (count === 0) return null

    return (
        <div
            className="flex items-center justify-between px-4 py-3 rounded-xl border mb-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
            <div className="flex items-center gap-3">
                <button onClick={onClear} style={{ color: "var(--text-muted)" }}>
                    <X size={16} />
                </button>
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
          {count} selected
        </span>
            </div>

            <button
                onClick={onTrash}
                disabled={isProcessing}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
            >
                <Trash2 size={14} />
                {isProcessing ? "Moving to trash..." : "Move to Trash"}
            </button>
        </div>
    )
}