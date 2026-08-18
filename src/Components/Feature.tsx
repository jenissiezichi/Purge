import { motion, type Variants } from "framer-motion"
import { ListFilter, Clock, ScrollText, Server } from "lucide-react"

const features = [
    {
        icon: ListFilter,
        title: "Custom rules",
        description: "Match spam by keyword, sender, or pattern — built by you, not a black box.",
    },
    {
        icon: Clock,
        title: "Scheduled auto-clean",
        description: "Purge runs in the background on a schedule, no manual triggering needed.",
    },
    {
        icon: ScrollText,
        title: "Activity log",
        description: "See exactly what got deleted, when, and which rule caught it.",
    },
    {
        icon: Server,
        title: "Self-hostable",
        description: "Run your own instance and keep full control of your data.",
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
export function Features() {
    return (
        <section id="features" className="py-24 px-6">
            <motion.div
                className="max-w-5xl mx-auto"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2
                    variants={item}
                    className="text-3xl sm:text-4xl font-bold text-center mb-16"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                    Built for control, not clutter
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                variants={item}
                                className="p-6 rounded-xl border"
                                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                            >
                                <div
                                    className="flex items-center justify-center h-10 w-10 rounded-lg mb-4"
                                    style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
                                >
                                    <Icon size={18} style={{ color: "var(--accent)" }} />
                                </div>
                                <h3
                                    className="text-base font-medium mb-2 font-display"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed font-signature"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {feature.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </section>
    )
}