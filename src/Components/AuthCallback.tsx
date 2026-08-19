import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export function AuthCallback() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()


    useEffect(() => {
        const token = searchParams.get("token")
        const email = searchParams.get("email")
        if (token && email) {
            localStorage.setItem("purge_token", token)
            localStorage.setItem("purge_email", email)
            navigate("/dashboard")
        } else {
            navigate("/login")
        }
    }, [searchParams, navigate])

    return <p>Signing you in...</p>
}