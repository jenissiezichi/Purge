export function useAuth() {
    const token = localStorage.getItem("purge_token")
    const email = localStorage.getItem("purge_email")

    return {
        email,
        isAuthenticated: !!token,
    }
}