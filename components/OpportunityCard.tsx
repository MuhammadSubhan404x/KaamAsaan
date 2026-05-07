"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Clock, ExternalLink, CheckSquare, FileText, CalendarPlus, AlertTriangle } from "lucide-react";
import type { RankedOpportunity } from "@/lib/types";

interface OpportunityCardProps {
  item: RankedOpportunity;
  style?: React.CSSProperties;
  onCoverLetter?: () => void;
  index?: number;
}

const TYPE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  scholarship: { color: "#4ade80",  bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.15)"  },
  internship:  { color: "#828fff",  bg: "rgba(130,143,255,0.08)", border: "rgba(130,143,255,0.15)" },
  fellowship:  { color: "#d0d6e0",  bg: "rgba(208,214,224,0.06)", border: "rgba(208,214,224,0.12)" },
  competition: { color: "#f59e0b",  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.15)"  },
  research:    { color: "#67e8f9",  bg: "rgba(103,232,249,0.08)", border: "rgba(103,232,249,0.15)" },
  default:     { color: "#8a8f98",  bg: "rgba(138,143,152,0.06)", border: "rgba(138,143,152,0.12)" },
};

function buildCalendarUrl(opp: import("@/lib/types").ExtractedOpportunity): string {
  const title = encodeURIComponent(`Apply: ${opp.title}`);
  const details = encodeURIComponent(`${opp.title} — ${opp.organization}${opp.applicationLink ? `\nApply: ${opp.applicationLink}` : ""}`);
  let dates = "";
  if (opp.deadline) {
    const d = opp.deadline.replace(/-/g, "");
    const end = new Date(opp.deadline);
    end.setDate(end.getDate() + 1);
    dates = `${d}/${end.toISOString().slice(0, 10).replace(/-/g, "")}`;
  }
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${encodeURIComponent(opp.organization)}`;
}

export default function OpportunityCard({ item, style, onCoverLetter, index = 0 }: OpportunityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { rank, opportunity: opp, score, actionChecklist, daysUntilDeadline } = item;

  const typeStyle = TYPE_COLORS[opp.type] ?? TYPE_COLORS.default;
  const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 3;
  const isThisWeek = daysUntilDeadline !== null && daysUntilDeadline > 3 && daysUntilDeadline <= 7;
  const scoreClass = score.total >= 70 ? "score-high" : score.total >= 45 ? "score-mid" : "score-low";
  const urgencyColor = isUrgent ? "var(--score-low)" : isThisWeek ? "var(--score-mid)" : "var(--color-text-quaternary)";

  return (
    <div
      className="animate-row-in"
      style={{ ...style, animationDelay: `${index * 45}ms`, borderBottom: "1px solid var(--color-line-secondary)" }}
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          padding: "10px 16px",
          background: "transparent", border: "none",
          cursor: "pointer", textAlign: "left",
          transition: "background 100ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {/* Rank */}
        <div style={{ width: 26, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {rank <= 3 ? (
            <div style={{
              width: 20, height: 20, borderRadius: "var(--radius-4)",
              background: rank === 1 ? "var(--color-brand-bg)" : "var(--color-bg-tertiary)",
              border: rank === 1 ? "none" : "1px solid var(--color-border-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.625rem", fontWeight: 680,
              color: rank === 1 ? "#fff" : "var(--color-text-tertiary)",
              boxShadow: rank === 1 ? "0 0 8px rgba(94,106,210,0.35)" : "none",
            }}>
              {rank}
            </div>
          ) : (
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-quaternary)", fontWeight: 510, fontVariantNumeric: "tabular-nums" }}>
              {rank}
            </span>
          )}
        </div>

        {/* Title + org */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{
              fontSize: "0.875rem",
              fontWeight: 510,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.008em",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 400,
            }}>
              {opp.title}
            </span>
            {isUrgent && (
              <span style={{
                fontSize: "0.625rem", fontWeight: 590, letterSpacing: "0.06em",
                padding: "1px 5px", borderRadius: "var(--radius-rounded)", textTransform: "uppercase",
                background: "rgba(248,113,113,0.12)", color: "var(--score-low)",
                border: "1px solid rgba(248,113,113,0.2)",
              }}>
                urgent
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>{opp.organization}</span>
            {daysUntilDeadline !== null && (
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.6875rem", color: urgencyColor }}>
                <Clock size={10} />
                {daysUntilDeadline <= 0 ? "Passed" : `${daysUntilDeadline}d left`}
              </span>
            )}
            {opp.location && (
              <span style={{ fontSize: "0.6875rem", color: "var(--color-text-quaternary)" }}>{opp.location}</span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span className="type-pill" style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}>
            {opp.type}
          </span>
          <span className={`score-badge ${scoreClass}`}>{score.total}</span>
          <ChevronDown size={12} style={{
            color: "var(--color-text-quaternary)",
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform 150ms ease",
            flexShrink: 0,
          }} />
        </div>
      </button>

      {/* Expanded */}
      {expanded && (
        <div className="animate-fade-in" style={{
          padding: "12px 16px 16px 54px",
          borderTop: "1px solid var(--color-line-tertiary)",
          display: "flex", flexDirection: "column", gap: 12,
          background: "rgba(255,255,255,0.01)",
        }}>
          {/* Score breakdown */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { l: "Fit",          v: score.fit },
              { l: "Urgency",      v: score.urgency },
              { l: "Completeness", v: score.completeness },
              { l: "Prestige",     v: score.prestige },
            ].map(({ l, v }) => (
              <div key={l} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "3px 9px",
                background: "var(--color-bg-level-3)",
                border: "1px solid var(--color-border-primary)",
                borderRadius: "var(--radius-6)",
                fontSize: "0.75rem",
              }}>
                <span style={{ color: "var(--color-text-quaternary)" }}>{l}</span>
                <span style={{ color: "var(--color-text-secondary)", fontWeight: 590, fontVariantNumeric: "tabular-nums" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          {opp.summary && (
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>{opp.summary}</p>
          )}

          {/* Evidence */}
          {score.evidence.length > 0 && (
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Evidence</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {score.evidence.slice(0, 6).map((ev, i) => (
                  <span key={i} style={{
                    fontSize: "0.6875rem", padding: "2px 8px",
                    borderRadius: "var(--radius-4)",
                    background: "var(--color-bg-level-3)",
                    border: "1px solid var(--color-border-primary)",
                    color: "var(--color-text-tertiary)",
                  }}>{ev}</span>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility */}
          {opp.eligibility && (
            <div>
              <div className="label" style={{ marginBottom: 5 }}>Eligibility</div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>{opp.eligibility}</p>
            </div>
          )}

          {/* Checklist */}
          {actionChecklist.length > 0 && (
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Action Checklist</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {actionChecklist.slice(0, 5).map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                    <CheckSquare size={12} style={{ color: "var(--score-high)", flexShrink: 0, marginTop: 2 }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {opp.applicationLink && (
              <a href={opp.applicationLink} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "6px 12px", gap: 5 }}>
                Apply Now <ExternalLink size={11} />
              </a>
            )}
            <a href={buildCalendarUrl(opp)} target="_blank" rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); toast.success("Opening Google Calendar", { description: opp.title }); }}
              className="btn-secondary" style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "6px 12px", gap: 5 }}>
              <CalendarPlus size={11} /> Calendar
            </a>
            {onCoverLetter && (
              <button onClick={(e) => { e.stopPropagation(); onCoverLetter(); }}
                className="btn-secondary" style={{ fontSize: "0.8125rem", padding: "6px 12px", gap: 5 }}>
                <FileText size={11} /> Cover Letter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
