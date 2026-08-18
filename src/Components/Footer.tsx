import {MessageCircle, Link} from "lucide-react";

interface SocialLink {
    label: string
    href: string
    icon: React.ReactNode
}

export function Footer() {
    const GithubIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
        </svg>
    )

    const socials: SocialLink[] = [
        { label: "GitHub", href: "https://github.com/jenissiezichi", icon: <GithubIcon /> },
        { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_HANDLE", icon: <Link size={16} /> },
        { label: "WhatsApp", href: "https://wa.me/YOUR_NUMBER", icon: <MessageCircle size={16} /> },

    ]
    return (
        <footer
            className="py-10 px-6 border-t"
            style={{ borderColor: "var(--border)" }}
        >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <img src="/purge.png" alt="Purge Logo" className="h-8 w-8 inline-block mr-2" />
                <span
                    className="font-semibold text-sm"
                    style={{ color: "var(--text-primary)" }}
                >
          Purge
        </span>
            </div>

                <div className="flex items-center gap-6">
<a
                    href="https://github.com"
                    className="flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                    <GithubIcon />
                    GitHub
                </a>
            </div>

          <div className="gap-2">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Built by Ezichi Jenissi
        </span>
            <div className="flex gap-2">  {socials.map((social) => (
                <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center
                 border border-black/10 dark:border-white/10
                 text-ink/70 dark:text-paper/70
                 hover:bg-circuit hover:text-paper hover:border-circuit
                 transition-colors"
                >
                    {social.icon}
                </a>
            ))}</div>
          </div>

        </div>
</footer>
)
}