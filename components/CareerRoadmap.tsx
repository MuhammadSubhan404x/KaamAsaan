"use client";

import { useState } from "react";
import { Map, ChevronDown, Loader2, Target, BookOpen, Building2, Globe, TrendingUp, X } from "lucide-react";
import type { StudentProfile } from "@/lib/types";
import type { RoadmapResponse, TargetRole } from "@/lib/roadmap";
import { ROLES } from "@/lib/roadmap";

interface CareerRoadmapProps {
  profile: StudentProfile;
}

export default function CareerRoadmap({ profile }: CareerRoadmapProps) {
  const [open, setOpen] = useState(false);
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
    } catch { setError("Could not generate roadmap. Try again."); }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* Trigger button — white text, white border */}
      <button
        onClick={() => setOpen(true)}
        className="btn-secondary"
        style={{ fontSize: "0.8125rem", padding: "6px 14px", gap: 6 }}
      >
        <Map size={13} /> Career Roadmap
      </button>

      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
        }}>
          <div style={{
            width: "100%", maxWidth: 640, maxHeight: "88vh",
            overflowY: "auto", borderRadius: "var(--radius-12)",
            border: "1px solid var(--color-border-primary)",
            background: "var(--color-bg-level-1)",
            boxShadow: "var(--shadow-high)",
          }}>
            {/* Modal header */}
            <div style={{
              position: "sticky", top: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid var(--color-line-secondary)",
              background: "var(--color-bg-level-1)",
              zIndex: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "var(--radius-6)",
                  background: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Map size={15} style={{ color: "#000000" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 680, fontSize: "0.9375rem", color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>Career Roadmap</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--color-text-quaternary)" }}>Pakistan-specific · Phase-by-phase</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="btn-ghost" style={{ padding: 6 }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {!roadmap && (
                <>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)" }}>
                    Select your target role for a personalized, Pakistan-aware roadmap.
                  </p>
                  <div style={{ position: "relative" }}>
                    <select
                      value={selectedRole}
                      onChange={e => setSelectedRole(e.target.value as TargetRole)}
                      className="input-field"
                      style={{ cursor: "pointer", paddingRight: 28, appearance: "none" as any }}
                    >
                      <option value="">Choose a target role...</option>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <ChevronDown size={13} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-quaternary)", pointerEvents: "none" }} />
                  </div>
                  {error && <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{error}</p>}
                  <button
                    onClick={generate}
                    disabled={!selectedRole || loading}
                    className="btn-invert"
                    style={{ width: "100%", padding: "11px 20px", fontSize: "0.9375rem", gap: 8, opacity: (!selectedRole || loading) ? 0.35 : 1, cursor: (!selectedRole || loading) ? "not-allowed" : "pointer" }}
                  >
                    {loading
                      ? <><Loader2 size={15} className="animate-spin" /> Generating roadmap...</>
                      : <><TrendingUp size={15} /> Generate Roadmap</>
                    }
                  </button>
                </>
              )}

              {roadmap && (
                <>
                  {/* Summary */}
                  <div style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--color-border-primary)",
                    borderRadius: "var(--radius-8)",
                    padding: "14px 16px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                      <p style={{ fontWeight: 680, fontSize: "1rem", color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>{roadmap.role}</p>
                      <span className="badge">{roadmap.totalDuration}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>{roadmap.summary}</p>
                  </div>

                  {/* Phases */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {roadmap.phases.map((phase, i) => {
                      const isExpanded = expandedPhase === i;
                      return (
                        <div key={i} style={{
                          border: "1px solid var(--color-border-primary)",
                          borderRadius: "var(--radius-8)",
                          overflow: "hidden",
                        }}>
                          <button
                            onClick={() => setExpandedPhase(isExpanded ? null : i)}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", gap: 10,
                              padding: "10px 14px",
                              background: isExpanded ? "rgba(255,255,255,0.05)" : "transparent",
                              border: "none", cursor: "pointer", textAlign: "left",
                              transition: "background 100ms ease",
                            }}
                          >
                            <span style={{
                              width: 24, height: 24, borderRadius: "var(--radius-4)", flexShrink: 0,
                              background: isExpanded ? "#ffffff" : "rgba(255,255,255,0.08)",
                              color: isExpanded ? "#000000" : "var(--color-text-secondary)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.6875rem", fontWeight: 680,
                            }}>
                              {phase.phase}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: "0.875rem", fontWeight: 510, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>{phase.title}</p>
                              <p style={{ fontSize: "0.75rem", color: "var(--color-text-quaternary)" }}>{phase.duration}</p>
                            </div>
                            <span className="badge" style={{ flexShrink: 0, fontSize: "0.6875rem" }}>{phase.salaryRange}</span>
                            <ChevronDown size={13} style={{ color: "var(--color-text-quaternary)", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 150ms ease", flexShrink: 0 }} />
                          </button>

                          {isExpanded && (
                            <div style={{ padding: "12px 14px 14px", borderTop: "1px solid var(--color-line-tertiary)", display: "flex", flexDirection: "column", gap: 10 }}>
                              <div>
                                <div className="label" style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={9} /> Skills</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                  {phase.skills.map((s, j) => (
                                    <span key={j} style={{ fontSize: "0.6875rem", padding: "2px 8px", borderRadius: "var(--radius-rounded)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-secondary)", background: "rgba(255,255,255,0.03)" }}>{s}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="label" style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}><Target size={9} /> Actions</div>
                                <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                  {phase.actions.map((a, j) => (
                                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffffff", flexShrink: 0, marginTop: 6 }} />
                                      {a}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="label" style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={9} /> Resources</div>
                                <ul style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                  {phase.resources.map((r, j) => (
                                    <li key={j} style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", display: "flex", gap: 6 }}>
                                      <span style={{ color: "var(--color-text-quaternary)", flexShrink: 0 }}>→</span> {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-6)" }}>
                                <div className="label" style={{ marginBottom: 4 }}>Milestone</div>
                                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-primary)" }}>{phase.milestone}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Companies + Global */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ padding: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-8)" }}>
                      <div className="label" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}><Building2 size={9} /> Top companies</div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {roadmap.topCompanies.map((c, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ padding: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-8)" }}>
                      <div className="label" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}><Globe size={9} /> Global opportunities</div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {roadmap.globalOpportunities.map((o, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => { setRoadmap(null); setSelectedRole(""); }}
                    className="btn-ghost"
                    style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                  >
                    ← Generate for a different role
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
