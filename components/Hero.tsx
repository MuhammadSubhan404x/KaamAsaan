"use client";

import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "80px 24px 72px", background: "var(--bg-app)" }}
    >
      {/* Subtle ambient orbs */}
      <div
        className="animate-orb-1 pointer-events-none"
        style={{
          position: "absolute", top: "-100px", left: "-100px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(94,106,210,0.1) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      <div
        className="animate-orb-2 pointer-events-none"
        style={{
          position: "absolute", bottom: "-80px", right: "-80px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(66,167,114,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      {/* Dot grid */}
      <div
        className="dot-grid pointer-events-none"
        style={{ position: "absolute", inset: 0, opacity: 0.5 }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="animate-fade-up inline-flex items-center gap-2 mb-8"
          style={{
            background: "rgba(94,106,210,0.08)",
            border: "1px solid rgba(94,106,210,0.2)",
            borderRadius: "99px",
            padding: "5px 14px",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "#7A85FF",
            letterSpacing: "0.02em",
            animationDelay: "0ms",
          }}
        >
          <Sparkles size={11} />
          <span>AI-Powered Opportunity Intelligence</span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--score-high)", flexShrink: 0 }} />
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            marginBottom: "20px",
            color: "var(--text-primary)",
            animationDelay: "60ms",
          }}
        >
          Stop Missing{" "}
          <span className="gradient-text-animated">Deadlines.</span>
          <br />
          <span style={{ color: "rgba(242,242,242,0.7)" }}>Start Winning.</span>
        </h1>

        {/* Subline */}
        <p
          className="animate-fade-up"
          style={{
            fontSize: "1.0625rem",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            maxWidth: "580px",
            margin: "0 auto 40px",
            animationDelay: "120ms",
          }}
        >
          Paste your opportunity emails. KaamAsaan scores every scholarship,
          internship, and fellowship against your profile and tells you exactly
          what to apply to first.
        </p>

        {/* CTA */}
        <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
          <button
            onClick={onGetStarted}
            className="btn-primary"
            style={{
              padding: "10px 24px",
              fontSize: "0.9375rem",
              borderRadius: "8px",
              gap: "8px",
            }}
          >
            <span>Analyze My Emails</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            marginTop: "48px",
            animationDelay: "240ms",
          }}
        >
          {[
            { value: "< 15s", label: "ranked results" },
            { value: "4 factors", label: "scoring engine" },
            { value: "1-click", label: "cover letter" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "2px", letterSpacing: "0.02em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
