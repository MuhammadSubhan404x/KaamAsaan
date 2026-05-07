import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.1)",
      marginTop: 80, padding: "18px 24px",
      background: "#000000",
    }}>
      <div style={{
        maxWidth: 1152, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 3, background: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.5625rem", fontWeight: 900, color: "#000000",
          }}>K</div>
          <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>KaamAsaan</span>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>— Making Work Easy</span>
        </div>
        <span style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.2)" }}>
          Emails processed transiently. Nothing stored. © 2026 KaamAsaan.
        </span>
        <a href="https://github.com/MuhammadSubhan404x/KaamAsaan" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 120ms ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
          <Github size={12} /> github.com/MuhammadSubhan404x/KaamAsaan
        </a>
      </div>
    </footer>
  );
}
