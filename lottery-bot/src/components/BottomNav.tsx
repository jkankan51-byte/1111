import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <line x1="6" y1="14" x2="10" y2="14" />
      <line x1="13" y1="14" x2="17" y2="14" />
    </svg>
  ),
  tutorial: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function BottomNav() {
  const { user, card, countdown } = useAuth();
  const [location, setLocation] = useLocation();

  const cardBadge = card?.active
    ? (countdown ?? null)
    : "未激活";

  const isUrgent = card?.active && countdown && !countdown.includes("天") && parseInt(countdown.split(":")[0] ?? "99") < 1;

  const items = [
    { path: "/",         icon: icons.dashboard, label: "主控台", show: true },
    { path: "/trend",    icon: icons.trend,     label: "走势",   show: true },
    { path: "/card-key", icon: icons.card,      label: "卡密",   show: true },
    { path: "/tutorial", icon: icons.tutorial,  label: "教程",   show: true },
    { path: "/admin",    icon: icons.admin,     label: "后台",   show: !!user?.isAdmin },
  ].filter(i => i.show);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b0e1a]/95 border-t border-[#1e2235] backdrop-blur">
      <div className="max-w-lg mx-auto flex">
        {items.map(item => {
          const active = location === item.path;
          const badge = item.path === "/card-key" ? cardBadge : null;
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition relative
                ${active ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <span className="leading-none">{item.icon}</span>
              <span className="text-[11px] font-medium">{item.label}</span>
              {badge && (
                <span className={`absolute top-1.5 right-[5%] text-[8px] px-1 py-0.5 rounded-full leading-none font-mono whitespace-nowrap
                  ${card?.active
                    ? isUrgent
                      ? "bg-red-500/90 text-white animate-pulse"
                      : "bg-emerald-700/80 text-emerald-100"
                    : "bg-red-500 text-white"}`}>
                  {badge}
                </span>
              )}
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
