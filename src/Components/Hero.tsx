import { motion, type Variants } from 'framer-motion';
import {Link} from "react-router-dom"


export function Hero() {
    const GithubIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
        </svg>
    )

    const container: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute left-0 right-0 h-px animate-scan"
                    style={{
                        background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                        boxShadow: "0 0 20px 2px var(--accent)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <motion.div
                className="relative z-10 flex flex-col items-center"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    variants={item}

                    className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl"
                    style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                    }}
                >
                    Stop fighting Gmail's spam filters.
                </motion.h1>

                <motion.p
                    variants={item}
                    className="mt-5 text-lg leading-relaxed max-w-4xl font-signature"
                    style={{ color: "var(--text-muted)" }}
                >
                    Purge scans your inbox, applies rules you set, and clears out spam
                    automatically — no digging through Gmail's settings.
                </motion.p>

                <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                 <Link to="/login">

                     <button
                         className="px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
                         style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                     >
                         Sign in with Google
                     </button>
                 </Link>

<a
                    href="https://github.com/jenissiezichi/Purge-Backend"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
    <GithubIcon />
                    View on GitHub
                </a>
            </motion.div>
                <motion.p
                    variants={item}
                    className="mt-4 text-xs mt-8"
                    style={{ color: "var(--text-muted)" }}
                >
                    Free forever · No lock-in · Self-hostable · 100% Open Source
                </motion.p>
        </motion.div>
</section>
)
}