"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Clock, ExternalLink, CheckSquare, FileText, CalendarPlus } from "lucide-react";
import type { RankedOpportunity } from "@/lib/types";

interface OpportunityCardProps {
  item: RankedOpportunity;
  style?: React.CSSProperties;
  onCoverLetter?: () => void;
  index?: number;
}

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

  const isUrgent   = daysUntilDeadline !== null && daysUntilDeadline <= 3;
  const isThisWeek = daysUntilDeadline !== null && daysUntilDeadline > 3 && daysUntilDeadline <= 7;

  /* All text white, dim for secondary */
  const deadlineColor = isUrgent
    ? "var(--color-text-primary)"
    : isThisWeek
      ? "var(--color-text-secondary)"
      : "var(--color-text-quaternary)";

  return (
    <div className="animate-row-in" style={{
      ...style,
      animationDelay: `${index * 45}ms`,
      borderBottom: "1px solid var(--color-line-secondary)",
    }}>
      {/* Row */}
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
              width: 20, height: 20,
              borderRadius: "var(--radius-4)",
              background: rank === 1 ? "#ffffff" : "transparent",
              border: rank === 1 ? "none" : "1px solid var(--color-border-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.625rem",
              fontWeight: 680,
              color: rank === 1 ? "#000000" : "var(--color-text-tertiary)",
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
                fontSize: "0.625rem", fontWeight: 590,
                padding: "1px 5px", borderRadius: "var(--radius-rounded)",
                letterSpacing: "0.05em", textTransform: "uppercase",
                border: "1px solid var(--color-border-secondary)",
                color: "var(--color-text-primary)",
                background: "rgba(255,255,255,0.06)",
              }}>urgent</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>{opp.organization}</span>
            {daysUntilDeadline !== null && (
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.6875rem", color: deadlineColor }}>
                <Clock size={10} />
                {daysUntilDeadline <= 0 ? "Passed" : `${daysUntilDeadline}d left`}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span className="type-pill">{opp.type}</span>
          <span className="score-badge">{score.total}</span>
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
          background: "rgba(255,255,255,0.01)",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {/* Score breakdown — all white */}
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
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border-primary)",
                borderRadius: "var(--radius-6)",
                fontSize: "0.75rem",
              }}>
                <span style={{ color: "var(--color-text-quaternary)" }}>{l}</span>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 590, fontVariantNumeric: "tabular-nums" }}>{v}</span>
              </div>
            ))}
          </div>

          {opp.summary && (
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>{opp.summary}</p>
          )}

          {score.evidence.length > 0 && (
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Evidence</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {score.evidence.slice(0, 6).map((ev, i) => (
                  <span key={i} style={{
                    fontSize: "0.6875rem", padding: "2px 8px",
                    borderRadius: "var(--radius-4)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--color-border-primary)",
                    color: "var(--color-text-tertiary)",
                  }}>{ev}</span>
                ))}
              </div>
            </div>
          )}

          {opp.eligibility && (
            <div>
              <div className="label" style={{ marginBottom: 5 }}>Eligibility</div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>{opp.eligibility}</p>
            </div>
          )}

          {actionChecklist.length > 0 && (
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Action Checklist</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {actionChecklist.slice(0, 5).map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                    <CheckSquare size={12} style={{ color: "var(--color-text-primary)", flexShrink: 0, marginTop: 2 }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {opp.applicationLink && (
              <a href={opp.applicationLink} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "6px 12px", gap: 5 }}>
                Apply Now <ExternalLink size={11} />
              </a>
            )}
            <a href={buildCalendarUrl(opp)} target="_blank" rel="noopener noreferrer"
              onClick={e => { e.stopPropagation(); toast.success("Opening Google Calendar"); }}
              className="btn-secondary" style={{ textDecoration: "none", fontSize: "0.8125rem", padding: "6px 12px", gap: 5 }}>
              <CalendarPlus size={11} /> Calendar
            </a>
            {onCoverLetter && (
              <button onClick={e => { e.stopPropagation(); onCoverLetter(); }}
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
