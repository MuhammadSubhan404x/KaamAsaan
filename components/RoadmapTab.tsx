"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ChevronDown, Loader2, Target, BookOpen, Building2, Globe, TrendingUp } from "lucide-react";
import type { StudentProfile } from "@/lib/types";
import type { RoadmapResponse, TargetRole } from "@/lib/roadmap";
import { ROLES } from "@/lib/roadmap";

interface RoadmapTabProps {
  profile: StudentProfile;
}

export default function RoadmapTab({ profile }: RoadmapTabProps) {
  const [selectedRole, setSelectedRole] = useState<TargetRole | "">("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  const generate = async () => {
    if (!selectedRole || loading) return;
    setLoading(true); setError(null); setRoadmap(null);
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole, profile }),
      });
      if (!res.ok) throw new Error("Failed");
      setRoadmap(await res.json() as RoadmapResponse);
      setExpandedPhase(0);
    } catch { setError("Could not generate roadmap. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>

      {/* Header — white square icon, no gradient */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44,
          borderRadius: "var(--radius-8)",
          background: "#ffffff",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Map size={20} style={{ color: "#000000" }} />
        </div>
        <div>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 680, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Career Roadmap
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-quaternary)", marginTop: 2 }}>
            Pakistan-specific · Phase-by-phase · Real companies & salaries
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!roadmap ? (
          <motion.div key="selector" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Role grid */}
            <div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", marginBottom: 14 }}>
                Select your target role:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                {ROLES.map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    style={{
                      textAlign: "left",
                      fontSize: "0.8125rem",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-6)",
                      border: "1px solid",
                      cursor: "pointer",
                      transition: "all 120ms ease",
                      background: selectedRole === role ? "#ffffff" : "rgba(255,255,255,0.03)",
                      color: selectedRole === role ? "#000000" : "var(--color-text-tertiary)",
                      borderColor: selectedRole === role ? "#ffffff" : "var(--color-border-primary)",
                      fontWeight: selectedRole === role ? 510 : 400,
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{error}</p>
            )}

            {/* Generate button — white bg, black text */}
            <button
              onClick={generate}
              disabled={!selectedRole || loading}
              className="btn-invert"
              style={{
                width: "100%", padding: "13px 20px",
                fontSize: "1rem", gap: 8,
                borderRadius: "var(--radius-8)",
                opacity: (!selectedRole || loading) ? 0.35 : 1,
                cursor: (!selectedRole || loading) ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Generating your roadmap...</>
                : <><TrendingUp size={16} /> Generate Roadmap</>
              }
            </button>
          </motion.div>
        ) : (
          <motion.div key="roadmap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Summary */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--color-border-primary)",
              borderRadius: "var(--radius-8)",
              padding: "16px 18px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <p style={{ fontSize: "1.125rem", fontWeight: 680, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>
                  {roadmap.role}
                </p>
                <span className="badge">{roadmap.totalDuration}</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", lineHeight: 1.65 }}>
                {roadmap.summary}
              </p>
            </div>

            {/* Phases */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {roadmap.phases.map((phase, i) => {
                const isExpanded = expandedPhase === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{ border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-8)", overflow: "hidden" }}
                  >
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : i)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 16px",
                        background: isExpanded ? "rgba(255,255,255,0.05)" : "transparent",
                        border: "none", cursor: "pointer", textAlign: "left",
                        transition: "background 100ms ease",
                      }}
                    >
                      <span style={{
                        width: 26, height: 26, borderRadius: "var(--radius-4)", flexShrink: 0,
                        background: isExpanded ? "#ffffff" : "rgba(255,255,255,0.08)",
                        color: isExpanded ? "#000000" : "var(--color-text-tertiary)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.6875rem", fontWeight: 680,
                      }}>
                        {phase.phase}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.9375rem", fontWeight: 510, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
                          {phase.title}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--color-text-quaternary)", marginTop: 1 }}>
                          {phase.duration}
                        </p>
                      </div>
                      <span className="badge" style={{ flexShrink: 0 }}>{phase.salaryRange}</span>
                      <ChevronDown size={14} style={{
                        color: "var(--color-text-quaternary)",
                        transform: isExpanded ? "rotate(180deg)" : "none",
                        transition: "transform 200ms ease",
                        flexShrink: 0,
                      }} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ padding: "14px 16px 16px", borderTop: "1px solid var(--color-line-tertiary)", display: "flex", flexDirection: "column", gap: 12 }}>

                            {/* Skills */}
                            <div>
                              <div className="label" style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 4 }}>
                                <BookOpen size={9} /> Skills to acquire
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                {phase.skills.map((s, j) => (
                                  <span key={j} style={{
                                    fontSize: "0.6875rem", padding: "2px 8px",
                                    borderRadius: "var(--radius-rounded)",
                                    border: "1px solid var(--color-border-primary)",
                                    color: "var(--color-text-secondary)",
                                    background: "rgba(255,255,255,0.04)",
                                  }}>{s}</span>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div>
                              <div className="label" style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 4 }}>
                                <Target size={9} /> Actions
                              </div>
                              <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                {phase.actions.map((a, j) => (
                                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffffff", flexShrink: 0, marginTop: 6 }} />
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Resources */}
                            <div>
                              <div className="label" style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 4 }}>
                                <BookOpen size={9} /> Resources
                              </div>
                              <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {phase.resources.map((r, j) => (
                                  <li key={j} style={{ display: "flex", gap: 7, fontSize: "0.8125rem", color: "var(--color-text-tertiary)" }}>
                                    <span style={{ color: "var(--color-text-quaternary)", flexShrink: 0 }}>→</span>
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Milestone */}
                            <div style={{
                              padding: "10px 12px",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid var(--color-border-primary)",
                              borderRadius: "var(--radius-6)",
                            }}>
                              <div className="label" style={{ marginBottom: 4 }}>Milestone</div>
                              <p style={{ fontSize: "0.875rem", color: "var(--color-text-primary)", fontWeight: 510 }}>
                                {phase.milestone}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Companies + Global */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-8)" }}>
                <div className="label" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                  <Building2 size={9} /> Top companies
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {roadmap.topCompanies.map((c, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-8)" }}>
                <div className="label" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                  <Globe size={9} /> Global opportunities
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {roadmap.globalOpportunities.map((o, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => { setRoadmap(null); setSelectedRole(""); }}
              className="btn-ghost"
              style={{ width: "100%", justifyContent: "center", padding: 10 }}
            >
              ← Generate for a different role
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
