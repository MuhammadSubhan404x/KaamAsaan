"use client";

import { Sparkles, MessageSquare, Map } from "lucide-react";

export type Tab = "analyzer" | "advisor" | "roadmap";

interface TabNavProps {
  active: Tab;
  onChange: (t: Tab) => void;
  hasResults: boolean;
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "analyzer", label: "Analyzer", icon: Sparkles      },
  { id: "advisor",  label: "Advisor",  icon: MessageSquare },
  { id: "roadmap",  label: "Roadmap",  icon: Map           },
];

export default function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(0,0,0,0.95)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
    }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 52 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 36 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 4,
              background: "#ffffff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 900, color: "#000000",
              letterSpacing: "-0.04em",
            }}>
              K
            </div>
            <span style={{
              fontSize: "0.9375rem", fontWeight: 800,
              color: "#ffffff", letterSpacing: "-0.04em",
            }}>
              KaamAsaan
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", marginRight: 28 }} />

          {/* Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 14px",
                    borderRadius: 4,
                    background: isActive ? "#ffffff" : "transparent",
                    border: isActive ? "none" : "1px solid transparent",
                    color: isActive ? "#000000" : "rgba(255,255,255,0.45)",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 100ms ease",
                    letterSpacing: isActive ? "-0.02em" : "0",
                  }}
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "transparent"; } }}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Status */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
            Live
          </div>
        </div>
      </div>
    </nav>
  );
}
