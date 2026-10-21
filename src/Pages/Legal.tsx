import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {ShieldCheck} from "lucide-react";


const CONTACT_EMAIL = "eziokwubundujenissi@gmail.com"
const LAST_UPDATED = "October 21, 2026"

function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="min-h-screen px-6 py-12" style={{ backgroundColor: "var(--background)" }}>
            <div className="mx-auto max-w-6xl">
                <Link to="/" className="text-sm cursor-pointer hover:text-blue-500" style={{ color: "var(--accent)" }}>
                    &larr; Back to Purge
                </Link>
                <h1 className="text-3xl font-bold mt-6 mb-1" style={{ color: "var(--text-primary)" }}>
                    {title}
                </h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                    Last updated: {LAST_UPDATED}
                </p>
                <div className="flex flex-col gap-6">{children}</div>
                <div className="mt-10 pt-6 border-t flex gap-4 text-sm" style={{ borderColor: "var(--border)" }}>
                    <Link to="/privacy" style={{ color: "var(--accent)" }}>Privacy Policy</Link>
                    <Link to="/terms" style={{ color: "var(--accent)" }}>Terms of Service</Link>
                </div>
            </div>
        </div>
    )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {title}
            </h2>
            <div className="text-sm leading-relaxed flex flex-col gap-2" style={{ color: "var(--text-muted)" }}>
                {children}
            </div>
        </section>
    )
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="list-disc pl-5 flex flex-col gap-1">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}
interface Summary {
    id:number
    text:string
}
 const Details: Summary[]= [
     {id: 1, text: "Purge reads only the sender, subject and date of messages in your Spam folder"},
     {id:2 , text: "Your data is never sold or used for advertising"},
     {id:3 , text: "Messages are moved to Trash, not deleted, unless you turn on permanent delete"},
     {id:4, text: "You can revoke Purge's access at any time in your Google account"}
 ]

export function PrivacyPage() {
    return (
        <LegalLayout title="Privacy Policy">
            <div className="max-w-3xl rounded-xl border p-5" style={{borderColor: "var(--border)", backgroundColor:"var(--surface)"}}>
                <h2 className="text-sm font-semibold mb-2" style={{color: "var(--text-primary)"}}>Privacy at a glance</h2>
                <ul className="ml-1 flex flex-col gap-2">
                    {Details.map((detail) => (
                    <li className="flex items-start gap-2">
                        <ShieldCheck size={14} style={{ color: "var(--success)" }} className="mt-0.5" />
                            <span key={detail.id} className=" text-sm" style={{color: "var(--text-primary)"}}>{detail.text}</span>
                    </li>
                    ))}
                </ul>
            </div>
            <Section title="1. About Purge">

                <p>
                    Purge is an open-source tool that helps you clean spam out of your Gmail account. It is built and
                    run by an independent developer. This policy explains what data Purge accesses, what it stores, and
                    the choices you have.
                </p>
            </Section>

            <Section title="2. What Purge accesses from your Google account">
                <Bullets
                    items={[
                        "Your email address, to identify your account when you sign in with Google.",
                        "The sender, subject and date of messages in your Spam folder, together with their message IDs. Purge requests message metadata only. It does not request message bodies or attachments.",
                    ]}
                />
                <p>Purge asks for these Google permissions, and uses each one only for the purpose below:</p>
                <Bullets
                    items={[
                        "Read your emails (gmail.readonly): to list the messages in your Spam folder.",
                        "Move emails to trash (gmail.modify): to move spam that you select, or that matches your rules, to Trash.",
                        "Permanently delete emails (mail.google.com): only if you choose to enable it in Settings. You can switch it off again in Settings.",
                        "Your email address and sign-in identity (userinfo.email and openid): to log you in.",
                    ]}
                />
            </Section>

            <Section title="3. What Purge stores">
                <Bullets
                    items={[
                        "Your email address.",
                        "The Google sign-in tokens Purge needs to act on your account, including the permissions you granted and when the token expires.",
                        "The cleanup rules you create (keywords and sender text).",
                        "An activity log of what Purge moved to Trash: the action, how many messages, their message IDs, and the time.",
                        "Temporary sign-in state, which exists only while you are logging in.",
                    ]}
                />
                <p>
                    Purge does not store the content, subjects or senders of your emails. Spam messages are fetched
                    from Google when you open the dashboard or when a scan runs, and are not saved.
                </p>
            </Section>

            <Section title="4. How Purge uses your data">
                <p>
                    Your data is used only to provide Purge&apos;s features: showing your spam, applying your rules,
                    moving messages to Trash, and running an automatic scan once a day on your behalf. Purge does not
                    use your data for advertising, does not sell it, and does not use it to train machine learning
                    models. No person reads your email through Purge.
                </p>
            </Section>

            <Section title="5. Who else handles your data">
                <p>Purge does not share your data with third parties, except the services that host it:</p>
                <Bullets
                    items={[
                        "Google Firebase (Firestore), which stores the data in section 3.",
                        "Render, which hosts the Purge backend.",
                        "Vercel, which hosts the Purge website.",
                        "GitHub Actions, which only triggers the daily scan. It does not receive your email data.",
                    ]}
                />
                <p>We may also disclose data if the law requires it.</p>
            </Section>

            <Section title="6. Google API Services User Data Policy">
                <p>
                    Purge&apos;s use and transfer to any other app of information received from Google APIs will
                    adhere to the Google API Services User Data Policy, including the Limited Use requirements.
                </p>
            </Section>

            <Section title="7. Keeping and deleting your data">
                <Bullets
                    items={[
                        "You can disconnect Purge at any time at myaccount.google.com/permissions. This stops Purge from accessing your Gmail account.",
                        "You can delete any of your cleanup rules from the Rules page.",
                        `To have the rest of your stored data deleted (your tokens, rules and activity log), email ${CONTACT_EMAIL}. We will delete it within 30 days.`,
                    ]}
                />
            </Section>

            <Section title="8. Security">
                <p>
                    Purge is served over HTTPS, and access to its database is restricted. No system is perfectly
                    secure, so we cannot guarantee absolute security, but we take reasonable care to protect your data.
                </p>
            </Section>

            <Section title="9. Children">
                <p>Purge is not directed at children under 13, and we do not knowingly collect their data.</p>
            </Section>

            <Section title="10. Changes to this policy">
                <p>
                    If we change this policy we will update the date above. If a change affects how your Google data
                    is used, we will tell you in the app before it takes effect.
                </p>
            </Section>

            <Section title="11. Contact">
                <p>Questions or requests: {CONTACT_EMAIL}</p>
            </Section>
        </LegalLayout>
    )
}

export function TermsPage() {
    return (
        <LegalLayout title="Terms of Service">
            <Section title="1. Using Purge">
                <p>
                    By signing in to Purge you agree to these terms. If you do not agree, please do not use Purge.
                    Purge is a free, open-source tool provided by an independent developer.
                </p>
            </Section>

            <Section title="2. Your account and permissions">
                <p>
                    Purge works through your Google account and only with the permissions you grant. You can withdraw
                    them at any time at myaccount.google.com/permissions. You are responsible for the Google account
                    you connect and for keeping it secure.
                </p>
            </Section>

            <Section title="3. What Purge does">
                <Bullets
                    items={[
                        "Purge shows messages from your Spam folder and moves messages to Trash, when you select them or when they match rules you create.",
                        "Purge runs an automatic scan once a day and applies your rules without you being present.",
                        "Messages moved to Trash can be recovered from the Gmail Trash for about 30 days, after which Gmail removes them.",
                        "If you enable permanent delete, deleted messages cannot be recovered. Turn this on only if you accept that.",
                    ]}
                />
                <p>
                    You are responsible for the rules you create. A rule that is too broad may move messages you wanted
                    to keep, so review your rules and your activity log.
                </p>
            </Section>

            <Section title="4. Acceptable use">
                <p>
                    Use Purge only on Gmail accounts that you own or are authorized to manage. Do not misuse the
                    service, try to disrupt it, or try to access other people&apos;s data through it.
                </p>
            </Section>

            <Section title="5. Open source">
                <p>
                    Purge&apos;s source code is public. The code is available under the license stated in its
                    repository, and these terms apply to the hosted service.
                </p>
            </Section>

            <Section title="6. No warranty">
                <p>
                    Purge is provided as is and as available, without warranties of any kind. We do not promise that
                    it will always be available, error-free, or that it will catch every spam message.
                </p>
            </Section>

            <Section title="7. Limitation of liability">
                <p>
                    To the extent the law allows, the developer is not liable for any loss arising from your use of
                    Purge, including messages moved to Trash or permanently deleted, or messages that were not caught.
                </p>
            </Section>

            <Section title="8. Changes and ending the service">
                <p>
                    We may update these terms or change or stop the service at any time. You may stop using Purge at
                    any time by revoking its access in your Google account.
                </p>
            </Section>

            <Section title="9. Contact">
                <p>Questions: {CONTACT_EMAIL}</p>
            </Section>
        </LegalLayout>
    )
}