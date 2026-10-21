import { Trash2, ListFilter,Plus,X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"
import {toast} from "sonner";
import type {ReactNode} from "react";



interface Rule {
    id: string
    keyword: string | null
    sender_contains: string | null
}

function useRules() {
    const [rules, setRules] = useState<Rule[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchRules = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await api.get<{ rules: Rule[] }>("/api/rules")
            setRules(res.data.rules)
        } catch (err) {
            console.error("Failed to fetch rules", err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addRule = async (keyword: string | null, senderContains: string | null) => {
        const res = await api.post("/api/rules", { keyword, sender_contains: senderContains })
        setRules((prev) => [...prev, res.data])
    }

    const removeRule = async (id: string) => {
        await api.delete(`/api/rules/${id}`)
        setRules((prev) => prev.filter((r) => r.id !== id))
    }

    useEffect(() => {
        fetchRules()
    }, [fetchRules])

    return { rules, isLoading, addRule, removeRule }
}

function RuleChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span
            className="inline-flex max-w-full items-center gap-1.5 pl-3 pr-2 py-1 rounded-full border text-sm break-all"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }}
        >
            {label}
            <button onClick={onRemove} aria-label={`Delete rule ${label}`} style={{ color: "var(--text-muted)" }}>
                <X size={14} />
            </button>
        </span>
    )
}

function RuleGroup({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                {title}
            </p>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    )
}

export function Rules() {
    const { rules, isLoading, addRule, removeRule } = useRules()
    const [keyword, setKeyword] = useState("")
    const [senderContains, setSenderContains] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [search, setSearch] = useState("")

    const handleAddRule = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!keyword.trim() && !senderContains.trim()) {
            toast.error("Enter a keyword or sender to match.")
            return
        }
        setIsSubmitting(true)
        try {
            await addRule(keyword.trim() || null, senderContains.trim() || null)
            toast.success("Rule added")
            setKeyword("")
            setSenderContains("")
        } catch (err) {
            console.error("Failed to add rule", err)

            toast.error("Couldn't add rule. Try again.")
        } finally {
            setIsSubmitting(false)
        }
    }
    const query = search.trim().toLowerCase()
    const visibleRules = rules.filter((r) =>
        `${r.keyword ?? ""} ${r.sender_contains ?? ""}`.toLowerCase().includes(query)
    )
    const keywordRules = visibleRules.filter((r) => r.keyword && !r.sender_contains)
    const senderRules = visibleRules.filter((r) => r.sender_contains && !r.keyword)
    const combinedRules = visibleRules.filter((r) => r.keyword && r.sender_contains)

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Rules
            </h1>

            <form
                onSubmit={handleAddRule}
                className="flex flex-col sm:flex-row gap-3 mb-6 p-5 rounded-xl border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                <input
                    type="text"
                    placeholder="Keyword (e.g. lottery)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm border outline-none"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }}
                />
                <input
                    type="text"
                    placeholder="Sender contains (e.g. spam.ru)"
                    value={senderContains}
                    onChange={(e) => setSenderContains(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm border outline-none"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                    style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                >
                    <Plus size={14} />
                    {isSubmitting ? "Adding..." : "Add Rule"}
                </button>
            </form>
            <div className="flex items-center gap-3 mb-3">
                <input
                    type="text"
                    placeholder="Search rules..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm border outline-none"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text-primary)" }}
                />
                <span className="text-sm shrink-0" style={{ color: "var(--text-muted)" }}>
        {query ? `${visibleRules.length} of ${rules.length}` : `${rules.length} rule${rules.length !== 1 ? "s" : ""}`}
    </span>
            </div>
            <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                {isLoading ? (
                    <p className="p-6 text-sm" style={{ color: "var(--text-muted)" }}>
                        Loading...
                    </p>
                ) : rules.length === 0 ? (
                    <div className="p-12 text-center">
                        <ListFilter size={24} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            No rules yet. Add one to start catching spam automatically.
                        </p>
                    </div>
                ) : visibleRules.length === 0 ? (
                    <p className="p-6 text-sm" style={{ color: "var(--text-muted)" }}>
                        No rules match "{search}".
                    </p>
                ) : (
                    <div className="p-5 flex flex-col gap-5">
                        {keywordRules.length > 0 && (
                            <RuleGroup title="Keywords (subject)">
                                {keywordRules.map((r) => (
                                    <RuleChip key={r.id} label={r.keyword ?? ""} onRemove={() => removeRule(r.id)} />
                                ))}
                            </RuleGroup>
                        )}
                        {senderRules.length > 0 && (
                            <RuleGroup title="Senders">
                                {senderRules.map((r) => (
                                    <RuleChip key={r.id} label={r.sender_contains ?? ""} onRemove={() => removeRule(r.id)} />
                                ))}
                            </RuleGroup>
                        )}
                        {combinedRules.length > 0 && (
                            <RuleGroup title="Keyword and sender together">
                                {combinedRules.map((r) => (
                                    <RuleChip key={r.id} label={`${r.keyword} + ${r.sender_contains}`} onRemove={() => removeRule(r.id)} />
                                ))}
                            </RuleGroup>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}