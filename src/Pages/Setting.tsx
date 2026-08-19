import { useState } from "react"
import { ShieldCheck, ShieldAlert, LogOut, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "@/hooks/useAccount"
import { api } from "@/api/axios.ts"
import { toast } from "sonner"

const SCOPE_LABELS: Record<string, string> = {
    "https://www.googleapis.com/auth/gmail.readonly": "Read your emails",
    "https://www.googleapis.com/auth/gmail.modify": "Move emails to trash",
    "https://www.googleapis.com/auth/userinfo.email": "View your email address",
    "openid": "Verify your identity",
    "https://mail.google.com/": "Permanently delete emails",
}

export function Settings() {
    const { account, isLoading, hasFullDeleteAccess } = useAccount()
    const [isUpgrading, setIsUpgrading] = useState(false)
    const navigate = useNavigate()

    const handleUpgrade = async () => {
        setIsUpgrading(true)
        try {
            const res = await api.get("/auth/google/upgrade/permanent_delete")
            window.location.href = res.data.auth_url
        } catch (err) {
            console.error("Failed to start upgrade flow", err)
            toast.error("Couldn't start the upgrade. Try again.")
            setIsUpgrading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("purge_token")
        localStorage.removeItem("purge_email")
        navigate("/login")
    }

    return (
        <div className="p-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Settings
            </h1>

            {/* Account info */}
            <div
                className="p-5 rounded-xl border mb-4"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                    Account
                </h2>
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center h-9 w-9 rounded-lg shrink-0"
                        style={{ backgroundColor: "var(--background)" }}
                    >
                        <Mail size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                        <p className="text-sm font-signature" style={{ color: "var(--text-primary)" }}>
                            {isLoading ? "Loading..." : account?.email}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            Connected
                        </p>
                    </div>
                </div>
            </div>


            <div
                className="p-5 rounded-xl border mb-4"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                    Permissions granted
                </h2>

                {isLoading ? (
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Loading...
                    </p>
                ) : (
                    <ul className="flex flex-col gap-2 mb-4">
                        {account?.scopes.map((scope) => (
                            <li key={scope} className="flex items-center gap-2 text-sm">
                                <ShieldCheck size={14} style={{ color: "var(--success)" }} />
                                <span style={{ color: "var(--text-primary)" }}>
            {SCOPE_LABELS[scope] ?? scope}
          </span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex items-start gap-3 mb-4 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    {hasFullDeleteAccess ? (
                        <ShieldCheck size={16} className="mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
                    ) : (
                        <ShieldAlert size={16} className="mt-0.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                    )}
                    <div>
                        <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                            Permanent delete
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {hasFullDeleteAccess
                                ? "Enabled — you can permanently delete messages, not just move them to trash."
                                : "Not enabled — Purge can only move spam to trash, which Gmail auto-clears after 30 days."}
                        </p>
                    </div>
                </div>

                {!hasFullDeleteAccess && (
                    <button
                        onClick={handleUpgrade}
                        disabled={isUpgrading}
                        className="px-4 py-2 rounded-lg text-sm font-semibold font-signature transition-colors disabled:opacity-60"
                        style={{ backgroundColor: "var(--accent)", color: "var(--background)" }}
                    >
                        {isUpgrading ? "Redirecting..." : "Enable permanent delete"}
                    </button>
                )}
            </div>


            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--primary)" }}
            >
                <LogOut size={14} />
                Logout
            </button>
        </div>
    )
}