import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      marginTop: 80,
      padding: "20px 24px",
    }}>
      <div style={{
        maxWidth: "1152px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 4,
            background: "linear-gradient(135deg, #5E6AD2, #7A85FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.5625rem", fontWeight: 800, color: "#fff",
          }}>
            K
          </div>
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            KaamAsaan
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>—</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Making Work Easy</span>
        </div>

        <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
          Emails processed transiently by AI. Nothing stored. © 2026 KaamAsaan.
        </span>

        <a
          href="https://github.com/MuhammadSubhan404x/KaamAsaan"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
        >
          <Github size={13} />
          <span>github.com/MuhammadSubhan404x/KaamAsaan</span>
        </a>
      </div>
    </footer>
  );
}
