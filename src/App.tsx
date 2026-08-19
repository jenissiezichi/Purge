import { Landing } from "@/Components/Landing.tsx"
import { LoginPage } from "@/Components/Login.tsx"
import {AuthCallback} from "@/Components/AuthCallback.tsx";
import {Dashboard} from "@/Pages/Dashboard.tsx";
import './App.css'
import {Toaster} from "sonner";
import { Routes, Route } from "react-router-dom"
import {Rules} from "@/Pages/Rules.tsx"
import {DashboardLayout} from "@/Pages/DashboardLayout.tsx";
import {Settings} from "@/Pages/Setting.tsx";

function App() {
  return (
      <div className="min-h-screen">
          <Toaster
              position="top-right"
              closeButton
              expand={false}
              toastOptions={{
                  classNames: {
                      toast: 'rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] !min-w-[420px] !p-4 !text-[15px] !font-medium border',
                      title: '!text-base !font-semibold',
                      success: '![background-color:var(--surface)] ![color:var(--success)] ![border-color:var(--success)]',
                      error: '![background-color:var(--surface)] ![color:var(--primary)] ![border-color:var(--primary)]',
                      warning: '![background-color:var(--surface)] ![color:var(--accent)] ![border-color:var(--accent)]',
                      info: '![background-color:var(--surface)] ![color:var(--accent)] ![border-color:var(--accent)]',
                      closeButton: '![background-color:var(--background)] !border-none ![color:var(--text-muted)] hover:![color:var(--text-primary)]',
                      icon: '!w-5 !h-5',
                  },
              }}
          />
        <Routes>
          <Route path="/" element={<Landing />} />
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/settings" element={<Settings/>} />
            </Route>
          <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
  )
}

export default App