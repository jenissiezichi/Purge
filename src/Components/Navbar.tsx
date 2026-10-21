import { Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { useState } from "react"

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
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
            <nav
                className="relative flex items-center justify-between gap-6 rounded-full border px-6 py-3 backdrop-blur-xl shadow-lg shadow-black/20"
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

                <ul
                    className={`absolute left-0 right-0 top-full mt-2 flex flex-col gap-4 overflow-hidden rounded-2xl border p-5
        transition-all duration-300 ease-out md:hidden
        ${isMenuOpen
                        ? "visible max-h-60 translate-y-0 opacity-100"
                        : "invisible max-h-0 -translate-y-2 opacity-0 pointer-events-none"
                    }`}
                    style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--surface)",
                    }}
                >
                    {navLinks.map((link, index) => (
                        <li
                            key={link.href}
                            className="transition-transform duration-300"
                            style={{
                                transform: isMenuOpen ? "translateX(0)" : "translateX(-8px)",
                                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                            }}
                        >
                            <a
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm transition-colors"
                                style={{ color: "var(--text-muted)" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--accent)"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--text-muted)"
                                }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                {isMenuOpen && (
                    <ul
                        className="absolute left-0 right-0 top-full mt-2 flex flex-col gap-4 rounded-2xl border p-5 md:hidden"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    >
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-sm"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                        className="md:hidden relative inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                        style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
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