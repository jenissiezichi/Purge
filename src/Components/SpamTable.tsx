interface SpamMessage {
    id: string
    from: string
    subject: string
    date: string
}

interface SpamTableProps {
    messages?: SpamMessage[]
    selectedIds: string[]
    onToggle: (id: string) => void
    onToggleAll: () => void
}

export function SpamTable({ messages = [], selectedIds, onToggle, onToggleAll }: SpamTableProps) {
    const allSelected = messages.length > 0 && selectedIds.length === messages.length

    if (messages.length === 0) {
        return (
            <div
                className="rounded-xl border py-12 text-center text-sm"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text-muted)" }}
            >
                No spam detected yet. Purge will populate this once it scans your inbox.
            </div>
        )
    }

    return (
        <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
            {/* Desktop table */}
            <table className="hidden sm:table w-full text-sm">
                <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    <th className="w-10 py-3 pl-4">
                        <input type="checkbox" checked={allSelected} onChange={onToggleAll} />
                    </th>
                    <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>
                        Sender
                    </th>
                    <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>
                        Subject
                    </th>
                    <th className="text-left py-3 px-2 pr-4 font-medium" style={{ color: "var(--text-muted)" }}>
                        Date
                    </th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg) => (
                    <tr key={msg.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                        <td className="py-3 pl-4">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(msg.id)}
                                onChange={() => onToggle(msg.id)}
                            />
                        </td>
                        <td className="py-3 px-2 truncate max-w-[200px]" style={{ color: "var(--text-primary)" }} title={msg.from}>
                            {msg.from}
                        </td>
                        <td className="py-3 px-2 truncate max-w-[300px]" style={{ color: "var(--text-muted)" }} title={msg.subject}>
                            {msg.subject}
                        </td>
                        <td className="py-3 px-2 pr-4 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                            {msg.date}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Mobile stacked cards */}
            <div className="sm:hidden divide-y" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between px-4 py-3">
                    <label className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <input type="checkbox" checked={allSelected} onChange={onToggleAll} />
                        Select all
                    </label>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {messages.length} messages
          </span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3 px-4 py-3" style={{ borderColor: "var(--border)" }}>
                        <input
                            type="checkbox"
                            className="mt-1 shrink-0"
                            checked={selectedIds.includes(msg.id)}
                            onChange={() => onToggle(msg.id)}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm truncate" style={{ color: "var(--text-primary)" }}>
                                {msg.from}
                            </p>
                            <p className="text-sm truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                                {msg.subject}
                            </p>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                                {msg.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}