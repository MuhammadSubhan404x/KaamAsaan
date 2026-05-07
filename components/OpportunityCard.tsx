"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Clock, ExternalLink, CheckSquare, AlertTriangle, FileText, CalendarPlus } from "lucide-react";
import type { RankedOpportunity } from "@/lib/types";

interface OpportunityCardProps {
  item: RankedOpportunity;
  style?: React.CSSProperties;
  onCoverLetter?: () => void;
  index?: number;
}

const TYPE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  scholarship: { color: "#22c55e",  bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.15)"  },
  internship:  { color: "#a1a1aa",  bg: "rgba(161,161,170,0.08)", border: "rgba(161,161,170,0.15)" },
  fellowship:  { color: "#e4e4e7",  bg: "rgba(228,228,231,0.08)", border: "rgba(228,228,231,0.15)" },
  competition: { color: "#f59e0b",  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.15)"  },
  research:    { color: "#60a5fa",  bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.15)"  },
  default:     { color: "#71717a",  bg: "rgba(113,113,122,0.08)", border: "rgba(113,113,122,0.15)" },
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
  const scoreClass = score.total >= 70 ? "score-high" : score.total >= 45 ? "score-mid" : "score-low";

  return (
    <div
      className="animate-row-in"
      style={{
        ...style,
        animationDelay: `${index * 40}ms`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Row */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 100ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {/* Rank */}
        <div style={{ width: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {rank <= 3 ? (
            <div style={{
              width: 22, height: 22, borderRadius: 4,
              background: rank === 1 ? "#fafafa" : rank === 2 ? "#27272a" : "#1c1c1f",
              border: rank === 1 ? "none" : "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.6875rem", fontWeight: 800,
              color: rank === 1 ? "#09090b" : "#a1a1aa",
              letterSpacing: "-0.02em",
            }}>
              {rank}
            </div>
          ) : (
            <span style={{ fontSize: "0.75rem", color: "#3f3f46", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {rank}
            </span>
          )}
        </div>

        {/* Title + org */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{
              fontSize: "0.875rem", fontWeight: 500, color: "#fafafa",
              letterSpacing: "-0.01em", lineHeight: 1.3,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 400,
            }}>
              {opp.title}
            </span>
            {isUrgent && (
              <span style={{
                fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.06em",
                padding: "1px 5px", borderRadius: 99, textTransform: "uppercase",
                background: "rgba(239,68,68,0.1)", color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.2)",
              }}>
                urgent
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "0.75rem", color: "#71717a" }}>{opp.organization}</span>
            {daysUntilDeadline !== null && (
              <span style={{
                display: "flex", alignItems: "center", gap: 3,
                fontSize: "0.6875rem",
                color: isUrgent ? "#ef4444" : daysUntilDeadline <= 7 ? "#f59e0b" : "#52525b",
              }}>
                <Clock size={10} />
                {daysUntilDeadline <= 0 ? "Passed" : `${daysUntilDeadline}d`}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span
            className="type-pill"
            style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}
          >
            {opp.type}
          </span>
          <span className={`score-badge ${scoreClass}`} style={{ minWidth: 34 }}>
            {score.total}
          </span>
          <ChevronDown
            size={12}
            style={{
              color: "#52525b",
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 150ms ease",
              flexShrink: 0,
            }}
          />
        </div>
      </button>

      {/* Expanded */}
      {expanded && (
        <div
          className="animate-fade-in"
          style={{
            padding: "12px 16px 16px 56px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Score breakdown */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { label: "Fit",          value: score.fit },
              { label: "Urgency",      value: score.urgency },
              { label: "Completeness", value: score.completeness },
              { label: "Prestige",     value: score.prestige },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "4px 10px",
                background: "#18181b", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 6, fontSize: "0.75rem",
              }}>
                <span style={{ color: "#52525b" }}>{label}</span>
                <span style={{ color: "#a1a1aa", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          {opp.summary && (
            <p style={{ fontSize: "0.8125rem", color: "#71717a", lineHeight: 1.6 }}>{opp.summary}</p>
          )}

          {/* Evidence */}
          {score.evidence.length > 0 && (
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Evidence</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {score.evidence.slice(0, 6).map((ev, i) => (
                  <span key={i} style={{
                    fontSize: "0.6875rem", padding: "2px 8px", borderRadius: 4,
                    background: "#18181b", border: "1px solid rgba(255,255,255,0.06)",
                    color: "#71717a",
                  }}>{ev}</span>
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {actionChecklist.length > 0 && (
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Action Checklist</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {actionChecklist.slice(0, 5).map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", color: "#71717a" }}>
                    <CheckSquare size={12} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
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
                className="btn-primary"
                style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "6px 14px", gap: 5 }}>
                Apply Now <ExternalLink size={11} />
              </a>
            )}
            <a href={buildCalendarUrl(opp)} target="_blank" rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); toast.success("Opening Google Calendar"); }}
              className="btn-secondary"
              style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "6px 14px", gap: 5 }}>
              <CalendarPlus size={11} /> Calendar
            </a>
            {onCoverLetter && (
              <button onClick={(e) => { e.stopPropagation(); onCoverLetter(); }}
                className="btn-secondary"
                style={{ fontSize: "0.8125rem", padding: "6px 14px", gap: 5 }}>
                <FileText size={11} /> Cover Letter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
