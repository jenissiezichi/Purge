import { Trash2, ListFilter,Plus } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"
import {toast} from "sonner";


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

export function Rules() {
    const { rules, isLoading, addRule, removeRule } = useRules()
    const [keyword, setKeyword] = useState("")
    const [senderContains, setSenderContains] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


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
                ) : (
                    <ul>
                        {rules.map((rule) => (
                            <li
                                key={rule.id}
                                className="flex items-center justify-between px-5 py-4 border-b last:border-0"
                                style={{ borderColor: "var(--border)" }}
                            >
                                <div className="text-sm" style={{ color: "var(--text-primary)" }}>
                                    {rule.keyword && (
                                        <span>
                      Keyword contains <strong>"{rule.keyword}"</strong>
                    </span>
                                    )}
                                    {rule.keyword && rule.sender_contains && <span> and </span>}
                                    {rule.sender_contains && (
                                        <span>
                      Sender contains <strong>"{rule.sender_contains}"</strong>
                    </span>
                                    )}
                                </div>
                                <button onClick={() => removeRule(rule.id)} style={{ color: "var(--text-muted)" }}>
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}