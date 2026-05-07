"use client";

import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section style={{
      background: "var(--color-bg-primary)",
      borderBottom: "1px solid var(--color-border-primary)",
      padding: "80px var(--page-padding-inline) 72px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle dot texture */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(94,106,210,0.1) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", maxWidth: "var(--page-max-width)", margin: "0 auto" }}>

        {/* Badge */}
        <div className="animate-fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          marginBottom: 32,
          padding: "4px 12px",
          background: "rgba(94,106,210,0.1)",
          border: "1px solid rgba(94,106,210,0.2)",
          borderRadius: "var(--radius-rounded)",
          fontSize: "0.75rem",
          fontWeight: 510,
          color: "#828fff",
          letterSpacing: "0.01em",
          animationDelay: "0ms",
        }}>
          <Sparkles size={11} />
          AI-Powered Opportunity Intelligence
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up" style={{
          fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
          fontWeight: 680,
          letterSpacing: "-0.04em",
          lineHeight: 1.0,
          color: "var(--color-text-primary)",
          marginBottom: 24,
          animationDelay: "50ms",
        }}>
          Stop Missing{" "}
          <span className="gradient-text-animated">Deadlines.</span>
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
          Paste your opportunity emails. KaamAsaan scores every scholarship,
          internship, and fellowship against your profile — and tells you exactly
          what to apply to first.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: 10, animationDelay: "150ms" }}>
          <button onClick={onGetStarted} className="btn-invert" style={{ fontSize: "0.9375rem", padding: "10px 22px", gap: 8 }}>
            Analyze My Emails <ArrowRight size={15} />
          </button>
          <button onClick={onGetStarted} className="btn-secondary" style={{ fontSize: "0.9375rem", padding: "10px 18px" }}>
            Try Demo Mode
          </button>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-up" style={{
          display: "flex", alignItems: "center", gap: 36,
          marginTop: 56,
          paddingTop: 28,
          borderTop: "1px solid var(--color-line-secondary)",
          animationDelay: "200ms",
        }}>
          {[
            { v: "< 15s",     l: "ranked results" },
            { v: "4 factors", l: "scoring engine" },
            { v: "1-click",   l: "cover letter" },
            { v: "bilingual", l: "EN + Roman Urdu" },
          ].map(({ v, l }) => (
            <div key={l}>
              <div style={{
                fontSize: "1.125rem",
                fontWeight: 680,
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
              }}>{v}</div>
              <div style={{
                fontSize: "0.75rem",
                color: "var(--color-text-quaternary)",
                marginTop: 2,
                letterSpacing: "0.01em",
              }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
