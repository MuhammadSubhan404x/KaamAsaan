import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--color-line-secondary)",
      marginTop: 80,
      padding: "18px var(--page-padding-inline)",
      background: "var(--color-bg-panel)",
    }}>
      <div style={{
        maxWidth: "calc(var(--page-max-width) + var(--page-padding-inline) * 2)",
        margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: "var(--radius-4)",
            background: "var(--color-brand-bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.5625rem", fontWeight: 680, color: "#fff",
            boxShadow: "0 0 8px rgba(94,106,210,0.3)",
          }}>K</div>
          <span style={{ fontSize: "0.875rem", fontWeight: 590, color: "var(--color-text-primary)", letterSpacing: "-0.025em" }}>
            KaamAsaan
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-quaternary)" }}>— Making Work Easy</span>
        </div>

        <span style={{ fontSize: "0.6875rem", color: "var(--color-text-quaternary)" }}>
          Emails processed transiently. Nothing stored. © 2026 KaamAsaan.
        </span>

        <a href="https://github.com/MuhammadSubhan404x/KaamAsaan" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "var(--color-text-quaternary)", textDecoration: "none", transition: "color 120ms ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-link-hover)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-quaternary)")}>
          <Github size={12} /> github.com/MuhammadSubhan404x/KaamAsaan
        </a>
      </div>
    </footer>
  );
}
