import { motion, type Variants } from "framer-motion"
import { Star } from "lucide-react"

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
export function OpenSource() {
    const GithubIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z" />
        </svg>
    )
    return (
        <section className="py-24 px-6">
            <motion.div
                className="max-w-2xl mx-auto text-center"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    variants={item}
                    className="text-3xl sm:text-4xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                    Self-host it. Contribute. It's yours.
                </motion.h2>

                <motion.p
                    variants={item}
                    className="text-base leading-relaxed mb-8 font-signature"
                    style={{ color: "var(--text-muted)" }}
                >
                    Purge is fully open source — run your own instance, read every
                    line of code that touches your inbox, or help build the next
                    feature.
                </motion.p>

                <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-3">
<a
                    href="https://github.com"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
                    <GithubIcon />
                    View source
                </a>

<a
                href="https://github.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                <Star size={16} />
                Star on GitHub
            </a>
        </motion.div>
</motion.div>
</section>
)
}