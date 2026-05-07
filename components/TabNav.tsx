"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Map } from "lucide-react";

export type Tab = "analyzer" | "advisor" | "roadmap";

interface TabNavProps {
  active: Tab;
  onChange: (t: Tab) => void;
  hasResults: boolean;
}

const TABS: { id: Tab; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "analyzer", label: "AI Analyzer",    icon: Sparkles,      desc: "Rank opportunities" },
  { id: "advisor",  label: "AI Advisor",     icon: MessageSquare, desc: "English & Roman Urdu" },
  { id: "roadmap",  label: "Career Roadmap", icon: Map,           desc: "Phase-by-phase plan" },
];

export default function TabNav({ active, onChange }: TabNavProps) {
  return (
    <div
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(14,15,17,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center">
          {/* Logo mark */}
          <div className="flex items-center gap-2.5 mr-8 py-3 border-r pr-8" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #5E6AD2, #7A85FF)",
                boxShadow: "0 0 12px rgba(94,106,210,0.4)",
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              K
            </div>
            <span
              className="font-semibold text-sm"
              style={{ color: "#F2F2F2", letterSpacing: "-0.03em" }}
            >
              KaamAsaan
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-stretch h-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  className="relative flex items-center gap-2 px-4 py-3.5 text-sm transition-all duration-150"
                  style={{
                    color: isActive ? "#F2F2F2" : "#8A8F98",
                    fontWeight: isActive ? "500" : "400",
                    letterSpacing: "-0.01em",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#C8CBD0";
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#8A8F98";
                  }}
                >
                  <Icon size={14} style={{ color: isActive ? "#7A85FF" : "currentColor", flexShrink: 0 }} />
                  <span>{tab.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0"
                      style={{ height: "1px", background: "linear-gradient(90deg, #5E6AD2, #7A85FF)" }}
                      transition={{ type: "spring", stiffness: 600, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side — status indicator */}
          <div className="ml-auto flex items-center gap-2 py-3">
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "#42A772" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span style={{ fontWeight: 500 }}>Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
