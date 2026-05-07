"use client";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section style={{
      background: "#000000",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
      padding: "80px 24px 72px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 960, margin: "0 auto" }}>

        {/* Eyebrow */}
        <div className="animate-fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36,
          padding: "4px 14px",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 99,
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.04em",
          animationDelay: "0ms",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
          AI-POWERED OPPORTUNITY INTELLIGENCE
        </div>

        {/* Massive headline */}
        <h1 className="animate-fade-up" style={{
          fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          lineHeight: 0.92,
          color: "#ffffff",
          marginBottom: 32,
          animationDelay: "50ms",
        }}>
          STOP<br />
          MISSING<br />
          <span style={{
            WebkitTextStroke: "2px #ffffff",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
            DEADLINES.
          </span>
        </h1>

        {/* Subline */}
        <p className="animate-fade-up" style={{
          fontSize: "1.0625rem",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.65,
          maxWidth: 500,
          marginBottom: 40,
          animationDelay: "100ms",
          fontWeight: 400,
        }}>
          Paste your opportunity emails. KaamAsaan ranks every scholarship,
          internship, and fellowship against your profile — tells you exactly
          what to apply to first.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up" style={{
          display: "flex", alignItems: "center", gap: 12,
          animationDelay: "150ms",
        }}>
          <button onClick={onGetStarted} className="btn-primary" style={{ padding: "12px 24px", fontSize: "1rem", gap: 8 }}>
            Analyze My Emails <ArrowRight size={16} />
          </button>
          <button onClick={onGetStarted} className="btn-ghost" style={{ fontSize: "1rem" }}>
            View demo →
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-up" style={{
          display: "flex", alignItems: "center", gap: 40, marginTop: 64,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          animationDelay: "200ms",
        }}>
          {[
            { v: "< 15s",     l: "ranked results" },
            { v: "4 factors", l: "scoring engine" },
            { v: "1-click",   l: "cover letter" },
            { v: "bilingual", l: "EN + Roman Urdu" },
          ].map(({ v, l }) => (
            <div key={l}>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#ffffff" }}>{v}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: 2, letterSpacing: "0.02em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
