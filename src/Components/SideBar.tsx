import { LayoutDashboard, ListFilter, ScrollText, Settings, LogOut, X , Sun, Moon} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "@/hooks/useTheme"


const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Rules", icon: ListFilter, href: "/rules" },
    { label: "Logs", icon: ScrollText, href: "/logs" },
    { label: "Settings", icon: Settings, href: "/settings" },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

 function useAuth() {
    const token = localStorage.getItem("purge_token")
    const email = localStorage.getItem("purge_email")

    return {
        email,
        isAuthenticated: !!token,
    }
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const { email } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("purge_token")
        navigate("/login")
    }

    return (
        <>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={onClose}
                />
            )}

            <aside
                className={`w-60 shrink-0 h-screen flex flex-col border-r px-4 py-6 fixed md:static top-0 left-0 z-50 transition-transform duration-200 ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/" className="font-semibold font-signature text-lg px-2 flex items-center justify-center gap-1" style={{ color: "var(--text-primary)" }}>
                            <img src="/purge.png" alt="Purge" className="w-8 h-8" />
                            Purge
                        </Link>
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}

                        </button>
                    </div>
                    <button onClick={onClose} className="md:hidden" style={{ color: "var(--text-muted)" }}>
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                style={{
                                    backgroundColor: isActive ? "var(--background)" : "transparent",
                                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                                }}
                            >
                                <Icon size={16} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {email && (
                    <div
                        className="px-3 py-2 mb-2 text-xs truncate rounded-lg"
                        style={{ color: "var(--text-muted)", backgroundColor: "var(--background)" }}
                        title={email}
                    >
                        Connected as
                        <br />
                        <span style={{ color: "var(--text-primary)" }}>{email}</span>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: "var(--text-muted)" }}
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </aside>
        </>
    )
}