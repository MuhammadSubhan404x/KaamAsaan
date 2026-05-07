import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      marginTop: 80,
      padding: "18px 24px",
      background: "#09090b",
    }}>
      <div style={{
        maxWidth: 1152, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 16, height: 16, borderRadius: 3,
            background: "#fafafa",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.5rem", fontWeight: 900, color: "#09090b",
          }}>K</div>
          <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#fafafa", letterSpacing: "-0.02em" }}>KaamAsaan</span>
          <span style={{ fontSize: "0.75rem", color: "#3f3f46" }}>— Making Work Easy</span>
        </div>

        <span style={{ fontSize: "0.6875rem", color: "#3f3f46" }}>
          Emails processed transiently. Nothing stored. © 2026 KaamAsaan.
        </span>

        <a
          href="https://github.com/MuhammadSubhan404x/KaamAsaan"
          target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "#52525b", textDecoration: "none", transition: "color 150ms ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#a1a1aa")}
          onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}
        >
          <Github size={12} /> github.com/MuhammadSubhan404x/KaamAsaan
        </a>
      </div>
    </footer>
  );
}
