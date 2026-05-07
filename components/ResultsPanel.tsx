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
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="shimmer" style={{ height: 14, width: 140, borderRadius: 4 }} />
      </div>
      {[1,2,3].map(i => (
        <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 12 }}>
          <div className="shimmer" style={{ width: 22, height: 22, borderRadius: 4, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="shimmer" style={{ height: 13, width: "55%", borderRadius: 3, marginBottom: 5 }} />
            <div className="shimmer" style={{ height: 10, width: "30%", borderRadius: 3 }} />
          </div>
          <div className="shimmer" style={{ height: 20, width: 36, borderRadius: 99 }} />
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

      {/* Alerts */}
      {critical.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px",
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: 6, fontSize: "0.8125rem",
        }}>
          <AlertTriangle size={13} style={{ color: "#ef4444", flexShrink: 0 }} />
          <span style={{ color: "#ef4444", fontWeight: 500 }}>{critical.length} deadline{critical.length > 1 ? "s" : ""} in 3 days —</span>
          <span style={{ color: "#71717a" }}>{critical.map(r => r.opportunity.title).join(", ")}</span>
        </div>
      )}
      {thisWeek.length > 0 && critical.length === 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px",
          background: "rgba(245,158,11,0.06)",
          border: "1px solid rgba(245,158,11,0.12)",
          borderRadius: 6, fontSize: "0.8125rem",
        }}>
          <Clock size={13} style={{ color: "#f59e0b", flexShrink: 0 }} />
          <span style={{ color: "#f59e0b", fontWeight: 500 }}>{thisWeek.length} deadline{thisWeek.length > 1 ? "s" : ""} this week —</span>
          <span style={{ color: "#71717a" }}>{thisWeek.map(r => r.opportunity.title).join(", ")}</span>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Trophy size={13} style={{ color: "#f59e0b" }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "-0.02em", color: "#fafafa" }}>
              Ranked Results
            </span>
            <span className="badge">{results.length}</span>
            {spamCount > 0 && <span className="badge">{spamCount} filtered</span>}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CareerRoadmap profile={profile} />
            <span style={{ fontSize: "0.75rem", color: "#52525b", display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingUp size={11} /> avg {avg}
              <Star size={11} style={{ marginLeft: 4 }} /> top {topScore}
            </span>
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "5px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ width: 28 }} />
          <div className="label" style={{ flex: 1 }}>Opportunity</div>
          <div className="label" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Filter size={9} /> Type · Score
          </div>
        </div>

        {/* Rows */}
        {results.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center" }}>
            <Trophy size={20} style={{ color: "#3f3f46", margin: "0 auto 8px" }} />
            <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#52525b" }}>No matching opportunities found</p>
            <p style={{ fontSize: "0.8125rem", color: "#3f3f46", marginTop: 4 }}>
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
            borderTop: "1px solid rgba(255,255,255,0.04)",
            fontSize: "0.6875rem", color: "#3f3f46",
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
