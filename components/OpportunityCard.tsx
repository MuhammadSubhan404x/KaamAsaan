"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, Clock, ExternalLink, CheckSquare, AlertTriangle, FileText, CalendarPlus, ChevronDown } from "lucide-react";
import type { RankedOpportunity } from "@/lib/types";
import ScoreRing from "./ScoreRing";

interface OpportunityCardProps {
  item: RankedOpportunity;
  style?: React.CSSProperties;
  onCoverLetter?: () => void;
  index?: number;
}

const TYPE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  scholarship: { bg: "rgba(66,167,114,0.1)",   color: "#42A772", border: "rgba(66,167,114,0.2)"  },
  internship:  { bg: "rgba(94,106,210,0.1)",   color: "#7A85FF", border: "rgba(94,106,210,0.2)"  },
  fellowship:  { bg: "rgba(122,133,255,0.1)",  color: "#9DA8FF", border: "rgba(122,133,255,0.2)" },
  competition: { bg: "rgba(242,161,68,0.1)",   color: "#F2A144", border: "rgba(242,161,68,0.2)"  },
  research:    { bg: "rgba(100,160,220,0.1)",  color: "#64A0DC", border: "rgba(100,160,220,0.2)" },
  default:     { bg: "rgba(138,143,152,0.1)",  color: "#8A8F98", border: "rgba(138,143,152,0.2)" },
};

const RANK_COLORS = [
  "linear-gradient(135deg, #F2A144, #E8904A)",
  "linear-gradient(135deg, #8A8F98, #6E737C)",
  "linear-gradient(135deg, #CD7F32, #B56A22)",
];

function buildCalendarUrl(opp: import("@/lib/types").ExtractedOpportunity): string {
  const title = encodeURIComponent(`Apply: ${opp.title}`);
  const org = encodeURIComponent(opp.organization);
  const link = opp.applicationLink ? `\nApply: ${opp.applicationLink}` : "";
  const details = encodeURIComponent(`Opportunity: ${opp.title}\nOrganization: ${opp.organization}${link}\n\nRanked by KaamAsaan`);
  let dates = "";
  if (opp.deadline) {
    const d = opp.deadline.replace(/-/g, "");
    const end = new Date(opp.deadline);
    end.setDate(end.getDate() + 1);
    dates = `${d}/${end.toISOString().slice(0, 10).replace(/-/g, "")}`;
  }
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${org}`;
}

export default function OpportunityCard({ item, style, onCoverLetter, index = 0 }: OpportunityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { rank, opportunity: opp, score, actionChecklist, daysUntilDeadline } = item;

  const typeStyle = TYPE_COLORS[opp.type] ?? TYPE_COLORS.default;
  const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 3;
  const isThisWeek = daysUntilDeadline !== null && daysUntilDeadline > 3 && daysUntilDeadline <= 7;

  const urgencyColor = isUrgent ? "var(--score-low)" : isThisWeek ? "var(--score-mid)" : "var(--text-tertiary)";

  const scoreColor = score.total >= 80 ? "var(--score-high)" : score.total >= 50 ? "var(--score-mid)" : "var(--score-low)";
  const scoreClass = score.total >= 80 ? "score-high" : score.total >= 50 ? "score-mid" : "score-low";

  return (
    <div
      className="animate-row-in"
      style={{
        ...style,
        animationDelay: `${index * 55}ms`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "11px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 150ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {/* Rank */}
        <div style={{ width: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {rank <= 3 ? (
            <div style={{
              width: 20, height: 20, borderRadius: "4px",
              background: RANK_COLORS[rank - 1] ?? "rgba(138,143,152,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.625rem", fontWeight: 700, color: "#fff",
            }}>
              {rank}
            </div>
          ) : (
            <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {rank}
            </span>
          )}
        </div>

        {/* Title + org */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "380px",
            }}>
              {opp.title}
            </span>
            {isUrgent && (
              <span style={{
                fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.06em",
                padding: "1px 6px", borderRadius: "99px",
                background: "rgba(227,88,88,0.15)", color: "var(--score-low)",
                border: "1px solid rgba(227,88,88,0.25)", textTransform: "uppercase",
              }}>
                urgent
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{opp.organization}</span>
            {daysUntilDeadline !== null && (
              <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.6875rem", color: urgencyColor }}>
                <Clock size={10} />
                {daysUntilDeadline <= 0 ? "Passed" : `${daysUntilDeadline}d left`}
              </span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span
            className="type-pill"
            style={{
              background: typeStyle.bg,
              color: typeStyle.color,
              borderColor: typeStyle.border,
            }}
          >
            {opp.type}
          </span>

          <span className={`score-badge ${scoreClass}`} style={{ minWidth: 36 }}>
            {score.total}
          </span>

          <ChevronDown
            size={13}
            style={{
              color: "var(--text-tertiary)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 150ms ease",
            }}
          />
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="animate-slide-down"
          style={{
            padding: "0 16px 16px 52px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Score breakdown */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px", marginTop: "14px", flexWrap: "wrap" }}>
            {[
              { label: "Fit", value: score.fit, color: "#7A85FF" },
              { label: "Urgency", value: score.urgency, color: "var(--score-low)" },
              { label: "Completeness", value: score.completeness, color: "#64A0DC" },
              { label: "Prestige", value: score.prestige, color: "var(--score-mid)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "4px 10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
                fontSize: "0.75rem",
              }}>
                <span style={{ color: "var(--text-tertiary)" }}>{label}</span>
                <span style={{ color, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          {opp.summary && (
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>
              {opp.summary}
            </p>
          )}

          {/* Evidence */}
          {score.evidence.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <div className="label" style={{ marginBottom: "6px" }}>Evidence</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {score.evidence.slice(0, 6).map((ev, i) => (
                  <span key={i} style={{
                    fontSize: "0.6875rem",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "var(--text-secondary)",
                  }}>
                    {ev}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {actionChecklist.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div className="label" style={{ marginBottom: "6px" }}>Action Checklist</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {actionChecklist.slice(0, 5).map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                    <CheckSquare size={12} style={{ color: "var(--score-high)", flexShrink: 0, marginTop: 2 }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {opp.applicationLink && (
              <a
                href={opp.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: "none", fontSize: "0.75rem", padding: "5px 12px" }}
              >
                Apply Now <ExternalLink size={11} />
              </a>
            )}
            <a
              href={buildCalendarUrl(opp)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); toast.success("Opening Google Calendar", { description: opp.title }); }}
              className="btn-secondary"
              style={{ textDecoration: "none", fontSize: "0.75rem", padding: "5px 12px" }}
            >
              <CalendarPlus size={11} /> Calendar
            </a>
            {onCoverLetter && (
              <button
                onClick={(e) => { e.stopPropagation(); onCoverLetter(); }}
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "5px 12px" }}
              >
                <FileText size={11} /> Cover Letter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
