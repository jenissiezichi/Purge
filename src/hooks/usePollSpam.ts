import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"

interface SpamMessage {
    id: string
    from: string
    subject: string
    date: string
}

interface SpamResponse {
    count: number
    messages: SpamMessage[]
}

const POLL_INTERVAL = 5 * 60 * 1000

export function usePollSpam() {
    const [data, setData] = useState<SpamResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchSpam = useCallback(async () => {
        try {
            const res = await api.get<SpamResponse>("/api/spam")
            setData(res.data)
            setLastUpdated(new Date())
            setError(null)
        } catch (err) {
            console.error("Failed to fetch spam", err)
            setError("Couldn't reach Purge's backend")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSpam()

        const interval = setInterval(fetchSpam, POLL_INTERVAL)
        return () => clearInterval(interval)
    }, [fetchSpam])

    return { data, isLoading, error, lastUpdated, refetch: fetchSpam }
}