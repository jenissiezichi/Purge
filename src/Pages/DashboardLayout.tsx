import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "lucide-react"
import { Sidebar } from "@/Components/SideBar"

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex" style={{ backgroundColor: "var(--background)" }}>
            <div
                className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center px-4 py-3 border-b"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
                <button onClick={() => setIsSidebarOpen(true)} style={{ color: "var(--text-primary)" }}>
                    <Menu size={22} />
                </button>
                <span className="flex flex-row gap-1 ml-4 font-signature font-semibold text-center text-xl" style={{ color: "var(--text-primary)" }}>
                    <img src="/purge.png" alt="Purge" className="w-8 h-8" />
          Purge
        </span>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 min-h-screen overflow-y-auto pt-14 md:pt-0">
                <Outlet />
            </main>
        </div>
    )
}