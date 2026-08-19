import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"

interface ActivityEntry {
    email: string
    action: string
    count: number
    message_ids: string[]
    timestamp: string
}

export function useActivity() {
    const [activity, setActivity] = useState<ActivityEntry[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchActivity = useCallback(async () => {
        try {
            const res = await api.get<{ activity: ActivityEntry[] }>("/api/activity")
            setActivity(res.data.activity)
        } catch (err) {
            console.error("Failed to fetch activity", err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchActivity()
    }, [fetchActivity])

    return { activity, isLoading, refetch: fetchActivity }
}