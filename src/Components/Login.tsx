import { motion } from "framer-motion"
import {LogIn, ArrowLeft, ShieldCheck} from "lucide-react"
import { Link } from "react-router-dom"
import {api} from "@/api/axios.ts"
import {useState} from "react";

export function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false)

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const res = await api.get("/auth/google")
            window.location.href = res.data.auth_url
        } catch (err) {
            console.error("Failed to start Google login", err)
            setLoading(false)
        }
    }

    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
            style={{ backgroundColor: "var(--background)" }}
        >

            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
                <div
                    className="absolute left-0 right-0 h-px animate-scan"
                    style={{
                        background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                        boxShadow: "0 0 20px 2px var(--accent)",
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-sm flex flex-col items-center"
            >
                <Link
                    to="/"
                    className="mb-8 font-semibold text-2xl flex items-center justify-center flex-row gap-1 font-signature"
                    style={{ color: "var(--text-primary)" }}
                >
                    <img src="/purge.png" alt="Purge" className="w-8 h-8" />
                    Purge
                </Link>

                <div
                    className="w-full p-8 rounded-xl border text-center"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                >
                    <h1
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                    >
                        Welcome back
                    </h1>
                    <p className="font-display text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                        Sign in with Google to start cleaning your inbox.
                    </p>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "var(--accent)", color: "var(--background)" }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--accent)")}
                    >
                        <LogIn size={16} />
                        {loading ? "Setting up..." : "Continue with Google"}
                    </button>

                    <div
                        className="font-display mt-6 flex items-start gap-2 text-xs text-left"
                        style={{ color: "var(--text-muted)" }}
                    >
                        <ShieldCheck size={14} className=" mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                        <span>
              Purge only acts on messages that match your spam rules. It never touches anything else, even though Gmail's permission model is broad
            </span>
                    </div>
                </div>

                <Link
                    to="/"
                    className="mt-6 flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}
                >
                    <ArrowLeft size={14} />
                    Back to home
                </Link>

                <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
                    Open source · Self-hostable · 100% Secure
                </p>
            </motion.div>
        </div>
    )
}