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
    <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", background: "var(--bg-elevated)" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="shimmer" style={{ height: 16, width: 160, borderRadius: 4 }} />
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <div className="shimmer" style={{ width: 24, height: 24, borderRadius: 4, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="shimmer" style={{ height: 14, width: "60%", borderRadius: 3, marginBottom: 6 }} />
            <div className="shimmer" style={{ height: 11, width: "35%", borderRadius: 3 }} />
          </div>
          <div className="shimmer" style={{ height: 22, width: 40, borderRadius: 99 }} />
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
    <div className="animate-fade-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Urgency alerts */}
      {critical.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: "rgba(227,88,88,0.08)",
          border: "1px solid rgba(227,88,88,0.2)",
          borderRadius: 8,
          fontSize: "0.8125rem",
        }}>
          <AlertTriangle size={14} style={{ color: "var(--score-low)", flexShrink: 0 }} />
          <span style={{ color: "var(--score-low)", fontWeight: 500 }}>
            {critical.length} deadline{critical.length > 1 ? "s" : ""} in 3 days
          </span>
          <span style={{ color: "var(--text-secondary)", marginLeft: 4 }}>
            — {critical.map(r => r.opportunity.title).join(", ")}
          </span>
        </div>
      )}
      {thisWeek.length > 0 && critical.length === 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: "rgba(242,161,68,0.08)",
          border: "1px solid rgba(242,161,68,0.2)",
          borderRadius: 8,
          fontSize: "0.8125rem",
        }}>
          <Clock size={14} style={{ color: "var(--score-mid)", flexShrink: 0 }} />
          <span style={{ color: "var(--score-mid)", fontWeight: 500 }}>
            {thisWeek.length} deadline{thisWeek.length > 1 ? "s" : ""} this week
          </span>
          <span style={{ color: "var(--text-secondary)", marginLeft: 4 }}>
            — {thisWeek.map(r => r.opportunity.title).join(", ")}
          </span>
        </div>
      )}

      {/* Results table */}
      <div style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--bg-elevated)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.3)",
      }}>
        {/* Table header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Trophy size={14} style={{ color: "var(--score-mid)" }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              Ranked Results
            </span>
            <span style={{
              fontSize: "0.6875rem", fontWeight: 500,
              padding: "1px 7px", borderRadius: 99,
              background: "rgba(94,106,210,0.12)",
              color: "var(--accent-light)",
              border: "1px solid rgba(94,106,210,0.2)",
            }}>
              {results.length}
            </span>
            {spamCount > 0 && (
              <span style={{
                fontSize: "0.6875rem", fontWeight: 500,
                padding: "1px 7px", borderRadius: 99,
                background: "rgba(227,88,88,0.08)",
                color: "var(--score-low)",
                border: "1px solid rgba(227,88,88,0.15)",
              }}>
                {spamCount} filtered
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <CareerRoadmap profile={profile} />

            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <TrendingUp size={11} /> avg {avg}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={11} /> top {topScore}
              </span>
            </div>
          </div>
        </div>

        {/* Column labels */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "6px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ width: 24, flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: "0.6875rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500 }}>
            Opportunity
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.6875rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500 }}>
            <span>Type</span>
            <span style={{ paddingRight: 24 }}>Score</span>
          </div>
        </div>

        {/* Scoring formula */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          fontSize: "0.6875rem",
          color: "var(--text-tertiary)",
        }}>
          <Filter size={10} />
          <span>Fit ×0.45 · Urgency ×0.30 · Completeness ×0.15 · Prestige ×0.10</span>
        </div>

        {/* Rows */}
        {results.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center" }}>
            <Trophy size={24} style={{ color: "var(--text-tertiary)", margin: "0 auto 10px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>No matching opportunities found</p>
            <p style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem", marginTop: 4 }}>
              {spamCount > 0 ? `${spamCount} emails were filtered as noise.` : "Try selecting more opportunity types in your profile."}
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
            padding: "8px 16px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            fontSize: "0.6875rem",
            color: "var(--text-tertiary)",
          }}>
            Analyzed {new Date(processedAt).toLocaleTimeString()} · Results saved locally
          </div>
        )}
      </div>

      {coverLetterItem && (
        <CoverLetterModal item={coverLetterItem} profile={profile} onClose={() => setCoverLetterItem(null)} />
      )}
    </div>
  );
}
