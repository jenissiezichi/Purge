import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"

interface ActivityEntry {
    email: string
    action: string
    count: number
    message_ids: string[]
    timestamp: string
}

export function useActivity(limit: number = 10) {
    const [activity, setActivity] = useState<ActivityEntry[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchActivity = useCallback(async () => {
        try {
            const res = await api.get<{ activity: ActivityEntry[] }>(`/api/activity?limit=${limit}`)
            setActivity(res.data.activity)
        } catch (err) {
            console.error("Failed to fetch activity", err)
        } finally {
            setIsLoading(false)
        }
    }, [limit])

    useEffect(() => {
        fetchActivity()
    }, [fetchActivity])

    return { activity, isLoading, refetch: fetchActivity }
}