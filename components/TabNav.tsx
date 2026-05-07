"use client";

import { Sparkles, MessageSquare, Map } from "lucide-react";

export type Tab = "analyzer" | "advisor" | "roadmap";

interface TabNavProps {
  active: Tab;
  onChange: (t: Tab) => void;
  hasResults: boolean;
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "analyzer", label: "AI Analyzer",    icon: Sparkles      },
  { id: "advisor",  label: "AI Advisor",     icon: MessageSquare },
  { id: "roadmap",  label: "Career Roadmap", icon: Map           },
];

export default function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: "var(--layer-header)" as any,
      background: "var(--header-bg)",
      backdropFilter: "blur(var(--header-blur))",
      WebkitBackdropFilter: "blur(var(--header-blur))",
      borderBottom: "1px solid var(--header-border)",
      height: "var(--header-height)",
    }}>
      <div style={{
        maxWidth: "calc(var(--page-max-width) + var(--page-padding-inline) * 2)",
        margin: "0 auto",
        padding: "0 var(--page-padding-inline)",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}>

        {/* Brand mark — white square with black K */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 28 }}>
          <div style={{
            width: 24, height: 24,
            borderRadius: "var(--radius-6)",
            background: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.6875rem", fontWeight: 680, color: "#000000",
            letterSpacing: "-0.04em",
            flexShrink: 0,
          }}>K</div>
          <span style={{
            fontSize: "0.9375rem",
            fontWeight: 680,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
          }}>KaamAsaan</span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 18, background: "var(--color-line-primary)", marginRight: 24 }} />

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 1, height: "100%" }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button key={tab.id} onClick={() => onChange(tab.id)} style={{
                position: "relative",
                display: "flex", alignItems: "center", gap: 6,
                height: "100%",
                padding: "0 14px",
                background: "transparent", border: "none",
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                fontSize: "0.8125rem",
                fontWeight: isActive ? 510 : 400,
                letterSpacing: "-0.006em",
                cursor: "pointer",
                transition: "color 100ms ease",
              }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--color-text-tertiary)"; }}
              >
                <Icon size={13} style={{ flexShrink: 0 }} />
                {tab.label}
                {/* White indicator line */}
                {isActive && (
                  <span style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "1.5px",
                    background: "#ffffff",
                    borderRadius: "var(--radius-rounded) var(--radius-rounded) 0 0",
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Live dot */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "var(--color-text-quaternary)" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
          Live
        </div>
      </div>
    </nav>
  );
}
