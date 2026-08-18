import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

interface NavLink {
    label: string
    href: string
}

const navLinks: NavLink[] = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "GitHub", href: "https://github.com" },
]

export function Navbar() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
            <nav
                className="flex items-center justify-between gap-6 rounded-full border px-6 py-3 backdrop-blur-xl shadow-lg shadow-black/20"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                <div>
                    <img src="/purge.png" alt="Purge Logo" className="h-8 w-8 inline-block mr-2" />
                    <a
                        href="/"
                        className="font-signature font-semibold text-lg shrink-0"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Purge
                    </a>
                </div>

                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm transition-colors"
                                style={{ color: "var(--text-muted)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center items-center">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                        style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </div>
            </nav>
        </header>


    )
}