"use client";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section style={{
      background: "var(--color-bg-primary)",
      borderBottom: "1px solid var(--color-line-primary)",
      padding: "80px var(--page-padding-inline) 72px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: "var(--page-max-width)", margin: "0 auto" }}>

        {/* Eyebrow */}
        <div className="animate-fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36,
          padding: "4px 12px",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "var(--radius-rounded)",
          fontSize: "0.75rem",
          fontWeight: "var(--font-weight-medium)" as any,
          color: "var(--color-text-tertiary)",
          letterSpacing: "0.02em",
          animationDelay: "0ms",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
          AI-POWERED OPPORTUNITY INTELLIGENCE
        </div>

        {/* Headline — white on black, bold */}
        <h1 className="animate-fade-up" style={{
          fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
          fontWeight: 680,
          letterSpacing: "-0.04em",
          lineHeight: 1.0,
          color: "var(--color-text-primary)",
          marginBottom: 24,
          animationDelay: "50ms",
        }}>
          Stop Missing Deadlines.
          <br />
          <span style={{ color: "var(--color-text-tertiary)" }}>Start Winning.</span>
        </h1>

        {/* Subline */}
        <p className="animate-fade-up" style={{
          fontSize: "1.0625rem",
          color: "var(--color-text-tertiary)",
          lineHeight: 1.65,
          maxWidth: 520,
          marginBottom: 36,
          animationDelay: "100ms",
          fontWeight: 400,
        }}>
          Paste your opportunity emails. KaamAsaan ranks every scholarship,
          internship, and fellowship against your profile — tells you exactly
          what to apply to first.
        </p>

        {/* CTAs — white button, black text */}
        <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: 12, animationDelay: "150ms" }}>
          <button onClick={onGetStarted} className="btn-invert" style={{ fontSize: "0.9375rem", padding: "10px 22px", gap: 8 }}>
            Analyze My Emails <ArrowRight size={15} />
          </button>
          <button onClick={onGetStarted} className="btn-secondary" style={{ fontSize: "0.9375rem", padding: "10px 18px" }}>
            Try Demo Mode
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-up" style={{
          display: "flex", alignItems: "center", gap: 36, marginTop: 56,
          paddingTop: 28, borderTop: "1px solid var(--color-line-secondary)",
          animationDelay: "200ms",
        }}>
          {[
            { v: "< 15s",     l: "ranked results" },
            { v: "4 factors", l: "scoring engine" },
            { v: "1-click",   l: "cover letter" },
            { v: "bilingual", l: "EN + Roman Urdu" },
          ].map(({ v, l }) => (
            <div key={l}>
              <div style={{ fontSize: "1.125rem", fontWeight: 680, letterSpacing: "-0.03em", color: "var(--color-text-primary)" }}>{v}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-quaternary)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
