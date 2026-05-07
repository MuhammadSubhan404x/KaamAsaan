"use client";

import type { AnalyzeResponse, StudentProfile } from "@/lib/types";
import OpportunityCard from "./OpportunityCard";
import CoverLetterModal from "./CoverLetterModal";
import CareerRoadmap from "./CareerRoadmap";
import { Trophy, AlertTriangle, Clock, TrendingUp, Star, Filter } from "lucide-react";
import { useState } from "react";
import type { RankedOpportunity } from "@/lib/types";

interface ResultsPanelProps {
  data: AnalyzeResponse;
  profile: StudentProfile;
}

export function ResultsSkeleton() {
  return (
    <div style={{ background: "var(--color-bg-level-2)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-8)", overflow: "hidden", boxShadow: "var(--shadow-low)" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--color-line-secondary)" }}>
        <div className="shimmer" style={{ height: 14, width: 140, borderRadius: "var(--radius-4)" }} />
      </div>
      {[1,2,3].map(i => (
        <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid var(--color-line-tertiary)", display: "flex", alignItems: "center", gap: 12 }}>
          <div className="shimmer" style={{ width: 20, height: 20, borderRadius: "var(--radius-4)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="shimmer" style={{ height: 13, width: "55%", borderRadius: "var(--radius-4)", marginBottom: 5 }} />
            <div className="shimmer" style={{ height: 10, width: "30%", borderRadius: "var(--radius-4)" }} />
          </div>
          <div className="shimmer" style={{ height: 20, width: 36, borderRadius: "var(--radius-rounded)" }} />
        </div>
      ))}
    </div>
  );
}

export default function ResultsPanel({ data, profile }: ResultsPanelProps) {
  const { results, spamCount, processedAt } = data;
  const [coverLetterItem, setCoverLetterItem] = useState<RankedOpportunity | null>(null);

  const avg = results.length ? Math.round(results.reduce((s, r) => s + r.score.total, 0) / results.length) : 0;
  const critical = results.filter(r => r.daysUntilDeadline !== null && r.daysUntilDeadline <= 3);
  const thisWeek = results.filter(r => r.daysUntilDeadline !== null && r.daysUntilDeadline > 3 && r.daysUntilDeadline <= 7);
  const topScore = results[0]?.score.total ?? 0;

  return (
    <div className="animate-fade-up" style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Urgency alerts */}
      {critical.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-6)",
          fontSize: "0.8125rem",
        }}>
          <AlertTriangle size={13} style={{ color: "var(--color-text-primary)", flexShrink: 0 }} />
          <span style={{ color: "var(--color-text-primary)", fontWeight: 510 }}>
            {critical.length} deadline{critical.length > 1 ? "s" : ""} in 3 days
          </span>
          <span style={{ color: "var(--color-text-tertiary)" }}>
            — {critical.map(r => r.opportunity.title).join(", ")}
          </span>
        </div>
      )}
      {thisWeek.length > 0 && critical.length === 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-6)",
          fontSize: "0.8125rem",
        }}>
          <Clock size={13} style={{ color: "var(--color-text-primary)", flexShrink: 0 }} />
          <span style={{ color: "var(--color-text-primary)", fontWeight: 510 }}>
            {thisWeek.length} deadline{thisWeek.length > 1 ? "s" : ""} this week
          </span>
          <span style={{ color: "var(--color-text-tertiary)" }}>
            — {thisWeek.map(r => r.opportunity.title).join(", ")}
          </span>
        </div>
      )}

      {/* Main table */}
      <div style={{
        background: "var(--color-bg-level-2)",
        border: "1px solid var(--color-border-primary)",
        borderRadius: "var(--radius-8)",
        overflow: "hidden",
        boxShadow: "var(--shadow-low)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid var(--color-line-secondary)",
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Trophy size={13} style={{ color: "var(--color-text-secondary)" }} />
            <span style={{
              fontSize: "0.875rem",
              fontWeight: 590,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}>
              Ranked Results
            </span>
            <span className="badge">{results.length}</span>
            {spamCount > 0 && <span className="badge">{spamCount} filtered</span>}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CareerRoadmap profile={profile} />
            <span style={{
              fontSize: "0.75rem",
              color: "var(--color-text-quaternary)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <TrendingUp size={11} /> avg {avg}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={11} /> top {topScore}
              </span>
            </span>
          </div>
        </div>

        {/* Column header */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "5px 16px",
          borderBottom: "1px solid var(--color-line-tertiary)",
        }}>
          <div style={{ width: 26 }} />
          <div className="label" style={{ flex: 1, marginLeft: 12 }}>Opportunity</div>
          <div className="label" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Filter size={9} /> Type · Score
          </div>
        </div>

        {/* Rows */}
        {results.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center" }}>
            <Trophy size={20} style={{ color: "var(--color-text-quaternary)", margin: "0 auto 8px" }} />
            <p style={{ fontSize: "0.875rem", fontWeight: 510, color: "var(--color-text-tertiary)" }}>
              No matching opportunities found
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-quaternary)", marginTop: 4 }}>
              {spamCount > 0 ? `${spamCount} emails filtered as noise.` : "Try selecting more opportunity types."}
            </p>
          </div>
        ) : (
          results.map((item, i) => (
            <OpportunityCard
              key={`${item.opportunity.emailIndex}-${i}`}
              item={item}
              index={i}
              onCoverLetter={() => setCoverLetterItem(item)}
            />
          ))
        )}

        {/* Footer */}
        {processedAt && (
          <div style={{
            padding: "6px 16px",
            borderTop: "1px solid var(--color-line-tertiary)",
            fontSize: "0.6875rem",
            color: "var(--color-text-quaternary)",
          }}>
            Analyzed {new Date(processedAt).toLocaleTimeString()} · Saved locally
          </div>
        )}
      </div>

      {coverLetterItem && (
        <CoverLetterModal item={coverLetterItem} profile={profile} onClose={() => setCoverLetterItem(null)} />
      )}
    </div>
  );
}
