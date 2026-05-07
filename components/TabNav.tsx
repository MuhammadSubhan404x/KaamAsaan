"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Map } from "lucide-react";

export type Tab = "analyzer" | "advisor" | "roadmap";

interface TabNavProps {
  active: Tab;
  onChange: (t: Tab) => void;
  hasResults: boolean;
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "analyzer", label: "Analyzer",  icon: Sparkles      },
  { id: "advisor",  label: "Advisor",   icon: MessageSquare },
  { id: "roadmap",  label: "Roadmap",   icon: Map           },
];

export default function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(9,9,11,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 48 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 32 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 4,
              background: "#fafafa",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.625rem", fontWeight: 900, color: "#09090b",
              letterSpacing: "-0.03em",
            }}>
              K
            </div>
            <span style={{
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.03em",
            }}>
              KaamAsaan
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", marginRight: 24 }} />

          {/* Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                    color: isActive ? "#fafafa" : "#71717a",
                    fontSize: "0.8125rem",
                    fontWeight: isActive ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 100ms ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#a1a1aa";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#71717a";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right — status */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#52525b" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            Live
          </div>
        </div>
      </div>
    </nav>
  );
}
