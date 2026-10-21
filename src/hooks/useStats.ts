import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"

interface Stats {
    active_rules: number
    total_auto_trashed: number
    last_scan_at: string | null
}

export function useStats() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [isLoading1, setIsLoading] = useState(true)

    const fetchStats = useCallback(async () => {
        try {
            const res = await api.get<Stats>("/api/stats")
            setStats(res.data)
        } catch (err) {
            console.error("Failed to fetch stats", err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    return { stats, isLoading1, refetch: fetchStats }
}