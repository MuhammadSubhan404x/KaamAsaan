"use client";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section
      style={{
        background: "#09090b",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "72px 24px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot grid */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

      {/* Subtle radial vignette from center */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
        {/* Eyebrow badge */}
        <div
          className="animate-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
            padding: "5px 12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 99,
            fontSize: "0.75rem",
            color: "#a1a1aa",
            letterSpacing: "0.02em",
            animationDelay: "0ms",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          AI-Powered Opportunity Intelligence · Pakistan
        </div>

        {/* Aceternity-style massive headline */}
        <h1
          className="animate-fade-up"
          style={{
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#fafafa",
            marginBottom: 28,
            animationDelay: "60ms",
          }}
        >
          Stop Missing
          <br />
          <span style={{ color: "#52525b" }}>Deadlines.</span>
          <br />
          Start{" "}
          <span style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.5)",
            WebkitTextFillColor: "transparent",
          }}>
            Winning.
          </span>
        </h1>

        {/* Subline */}
        <p
          className="animate-fade-up"
          style={{
            fontSize: "1rem",
            color: "#71717a",
            lineHeight: 1.6,
            maxWidth: 520,
            marginBottom: 36,
            animationDelay: "120ms",
            fontWeight: 400,
          }}
        >
          Paste your opportunity emails. KaamAsaan scores every scholarship,
          internship, and fellowship against your profile — tells you exactly
          what to apply to first.
        </p>

        {/* CTA group */}
        <div
          className="animate-fade-up"
          style={{ display: "flex", alignItems: "center", gap: 12, animationDelay: "180ms" }}
        >
          <button
            onClick={onGetStarted}
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: "0.9375rem", gap: 8 }}
          >
            Analyze My Emails
            <ArrowRight size={15} />
          </button>
          <button
            onClick={onGetStarted}
            className="btn-ghost"
            style={{ fontSize: "0.9375rem", color: "#71717a" }}
          >
            View Demo →
          </button>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 56,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            animationDelay: "240ms",
          }}
        >
          {[
            { value: "< 15s",   label: "ranked results" },
            { value: "4×",      label: "scoring factors" },
            { value: "1-click", label: "cover letter" },
            { value: "bilingual", label: "English + Roman Urdu" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#fafafa" }}>
                {value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#52525b", marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
