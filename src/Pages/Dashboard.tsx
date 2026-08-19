import { useState } from "react"
import { ShieldAlert, Trash2, ListFilter, Clock, AlertTriangle } from "lucide-react"
import { StatCard } from "@/Components/StatCards.tsx"
import { SpamTable } from "@/Components/SpamTable"
import { usePollSpam } from "@/hooks/usePollSpam"
import {BulkActionBar} from "@/Components/BulkActionBar.tsx";
import {api} from "@/api/axios.ts"
import {useActivity} from "@/hooks/useActivity.ts";
import {ActivityFeed} from "@/Components/ActivityFeed.tsx";
import {toast} from 'sonner'

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    description: string
    confirmLabel?: string
    isProcessing?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDialog({
                                  isOpen,
                                  title,
                                  description,
                                  confirmLabel = "Confirm",
                                  isProcessing = false,
                                  onConfirm,
                                  onCancel,
                              }: ConfirmDialogProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm rounded-xl border p-6"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start gap-3 mb-4">
                    <div
                        className="flex items-center justify-center h-9 w-9 rounded-lg shrink-0"
                        style={{ backgroundColor: "var(--background)" }}
                    >
                        <AlertTriangle size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                            {title}
                        </h2>
                        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-6">
                    <button
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-60"
                        style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                    >
                        {isProcessing ? "Working..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}


export function Dashboard() {
    const { data, isLoading, error, lastUpdated, refetch } = usePollSpam()
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [isTrashing, setIsTrashing] = useState(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const { activity, isLoading: isActivityLoading, refetch: refetchActivity } = useActivity()

    const messages = data?.messages ?? []

    const toggle = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedIds(selectedIds.length === messages.length ? [] : messages.map((m) => m.id))
    }

    const confirmTrash = async () => {
        setIsTrashing(true)
        try {
            await api.post("/api/spam/trash", { message_ids: selectedIds })
            toast.success(`Moved ${selectedIds.length} message${selectedIds.length > 1 ? "s" : ""} to trash`)
            setSelectedIds([])
            refetch()
            refetchActivity()
        } catch (err) {
            console.error("Failed to trash messages", err)
            toast.error("Couldn't move messages to trash. Try again.")
        } finally {
            setIsTrashing(false)
            setShowConfirm(false)
        }
    }


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Dashboard
            </h1>

            {error && (
                <p className="mb-4 text-sm" style={{ color: "var(--primary)" }}>
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Spam Detected" value={isLoading ? "…" : String(data?.count ?? 0)} icon={ShieldAlert} />
                <StatCard label="Total Auto-Deleted" value="0" icon={Trash2} />
                <StatCard label="Active Rules" value="0" icon={ListFilter} />
                <StatCard label="Last Scan" value={lastUpdated ? lastUpdated.toLocaleTimeString() : "—"} icon={Clock} />
            </div>

            <BulkActionBar
                count={selectedIds.length}
                onTrash={() => setShowConfirm(true)}
                onClear={() => setSelectedIds([])}
                isProcessing={isTrashing}
            />
            <ActivityFeed activity={activity} isLoading={isActivityLoading} />
            <ConfirmDialog
                isOpen={showConfirm}
                title="Move to trash?"
                description={`${selectedIds.length} message${selectedIds.length > 1 ? "s" : ""} will be moved to Gmail's trash. You can recover them there within 30 days.`}
                confirmLabel="Move to Trash"
                isProcessing={isTrashing}
                onConfirm={confirmTrash}
                onCancel={() => setShowConfirm(false)}
            />



            <SpamTable
                messages={messages}
                selectedIds={selectedIds}
                onToggle={toggle}
                onToggleAll={toggleAll}
            />

        </div>
    )
}