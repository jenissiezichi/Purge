import { motion, type Variants } from "framer-motion"
import { LogIn, SlidersHorizontal, Sparkles } from "lucide-react"

const steps = [
    {
        icon: LogIn,
        title: "Sign in with Google",
        description: "Connect your Gmail account securely — Purge only requests the access it needs to scan and manage spam.",
    },
    {
        icon: SlidersHorizontal,
        title: "Set your rules",
        description: "Define keywords or sender patterns to catch, or start with Purge's smart defaults.",
    },
    {
        icon: Sparkles,
        title: "Sit back and let it clean",
        description: "Purge scans on a schedule and clears out matches automatically — no manual digging required.",
    },
]

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
export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-8 px-6">
            <motion.div
                className="max-w-5xl mx-auto"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    variants={item}
                    className="text-3xl sm:text-4xl font-bold text-center mb-16"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                    How it works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={step.title}
                                variants={item}
                                className="flex flex-col items-center text-center"
                            >
                                <div
                                    className="flex items-center justify-center h-12 w-12 rounded-lg mb-4"
                                    style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                                >
                                    <Icon size={20} style={{ color: "var(--accent)" }} />
                                </div>
                                <h3
                                    className="text-lg font-medium mb-2 font-display"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed max-w-xs font-signature"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {step.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </section>
    )
}