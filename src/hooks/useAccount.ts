import { useEffect, useState, useCallback } from "react"
import { api } from "@/api/axios.ts"

const FULL_DELETE_SCOPE = "https://mail.google.com/"

interface AccountInfo {
    email: string
    scopes: string[]
}

export function useAccount() {
    const [account, setAccount] = useState<AccountInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchAccount = useCallback(async () => {
        try {
            const res = await api.get<AccountInfo>("/api/me")
            setAccount(res.data)
        } catch (err) {
            console.error("Failed to fetch account", err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAccount()
    }, [fetchAccount])

    const hasFullDeleteAccess = account?.scopes.includes(FULL_DELETE_SCOPE) ?? false

    return { account, isLoading, hasFullDeleteAccess, refetch: fetchAccount }
}