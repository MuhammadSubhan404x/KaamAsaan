"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import type { StudentProfile, RankedOpportunity } from "@/lib/types";

function renderMarkdown(text: string): string {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = escaped.split("\n");
  const out: string[] = [];
  let inList = false;

  for (const line of lines) {
    const listMatch = line.match(/^[-•*] (.+)$/);
    if (listMatch) {
      if (!inList) { out.push('<ul style="margin:6px 0;padding-left:16px;display:flex;flex-direction:column;gap:3px">'); inList = true; }
      out.push(`<li>${listMatch[1].replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</li>`);
    } else {
      if (inList) { out.push("</ul>"); inList = false; }
      if (line.trim() === "") out.push("<br/>");
      else out.push(`<span>${line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</span><br/>`);
    }
  }
  if (inList) out.push("</ul>");
  return out.join("");
}

export interface Message { role: "user" | "assistant"; content: string; }

interface AdvisorTabProps {
  profile: StudentProfile;
  topOpportunities: RankedOpportunity[];
  messages: Message[];
  onMessagesChange: (msgs: Message[]) => void;
}

const QUICK_PROMPTS = [
  { label: "First internship strategy",   text: "Mujhe pehli internship kaise milegi? Main Lahore mein hoon aur CS kar raha hoon." },
  { label: "Best Lahore tech companies",  text: "What are the best tech companies in Lahore for a fresh CS graduate? Include salaries." },
  { label: "Top opportunity breakdown",   text: "Which of my ranked opportunities should I apply to first and why?" },
  { label: "HEC scholarship tips",        text: "How do I strengthen my HEC scholarship application?" },
  { label: "Remote jobs from Pakistan",   text: "How can I get a remote job from Pakistan? Which platforms work best?" },
  { label: "6-month career roadmap",      text: "Give me a realistic 6-month plan to land my first tech job in Pakistan." },
];

export default function AdvisorTab({ profile, topOpportunities, messages, onMessagesChange }: AdvisorTabProps) {
  const setMessages = (updater: Message[] | ((prev: Message[]) => Message[])) => {
    onMessagesChange(typeof updater === "function" ? updater(messages) : updater);
  };
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, profile, topOpportunities: topOpportunities.slice(0, 3) }),
      });
      if (!res.ok) throw new Error("Advisor unavailable");
      const data = await res.json() as { text?: string; error?: string };
      setMessages(prev => [...prev, { role: "assistant", content: data.text ?? "Sorry, could not generate a response." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Advisor unavailable right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <div
      className="animate-fade-up"
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, #5E6AD2, #7A85FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(94,106,210,0.3)",
        }}>
          <Bot size={18} style={{ color: "#fff" }} />
        </div>
        <div>
          <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            KaamAsaan AI Advisor
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 1 }}>
            Pakistan-aware · English & Roman Urdu
          </p>
        </div>
        <div style={{
          marginLeft: "auto",
          display: "flex", alignItems: "center", gap: 6,
          fontSize: "0.6875rem", fontWeight: 500,
          color: "var(--score-high)",
          background: "rgba(66,167,114,0.08)",
          border: "1px solid rgba(66,167,114,0.15)",
          borderRadius: 99,
          padding: "4px 10px",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} className="animate-pulse" />
          Online
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {messages.length === 0 && (
          <div className="animate-fade-up">
            <div style={{
              textAlign: "center",
              padding: "32px 0 24px",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "rgba(94,106,210,0.1)",
                border: "1px solid rgba(94,106,210,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px",
              }}>
                <Bot size={22} style={{ color: "var(--accent-light)" }} />
              </div>
              <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: 4 }}>
                Your AI Career Advisor
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
                Ask anything in English ya Roman Urdu
              </p>
            </div>

            {/* Quick prompts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.label}
                  onClick={() => sendMessage(qp.text)}
                  style={{
                    padding: "9px 12px",
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8,
                    color: "var(--text-secondary)",
                    fontSize: "0.8125rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(94,106,210,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(94,106,210,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: 10,
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animationDelay: `${i * 40}ms`,
            }}
          >
            {msg.role === "assistant" && (
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: "linear-gradient(135deg, #5E6AD2, #7A85FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 2,
              }}>
                <Bot size={13} style={{ color: "#fff" }} />
              </div>
            )}

            <div
              style={{
                maxWidth: "78%",
                padding: "9px 13px",
                borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #5E6AD2, #7A85FF)"
                  : "var(--bg-elevated)",
                color: msg.role === "user" ? "#fff" : "var(--text-secondary)",
                border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                boxShadow: msg.role === "user"
                  ? "0 2px 12px rgba(94,106,210,0.25)"
                  : "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {msg.content
                ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                : <span style={{ color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Loader2 size={12} className="animate-spin" /> Thinking...
                  </span>
              }
            </div>

            {msg.role === "user" && (
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 2,
              }}>
                <User size={13} style={{ color: "var(--text-secondary)" }} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #5E6AD2, #7A85FF)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Bot size={13} style={{ color: "#fff" }} />
            </div>
            <div style={{
              padding: "10px 14px",
              background: "var(--bg-elevated)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px 12px 12px 4px",
              display: "flex", alignItems: "center", gap: 8,
              fontSize: "0.875rem", color: "var(--text-tertiary)",
            }}>
              <Loader2 size={13} className="animate-spin" style={{ color: "var(--accent-light)" }} />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        background: "var(--bg-elevated)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "border-color 150ms ease",
      }}
        onFocusCapture={e => (e.currentTarget.style.borderColor = "rgba(94,106,210,0.4)")}
        onBlurCapture={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
      >
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask in English ya Roman Urdu... (Enter to send)"
          disabled={loading}
          rows={2}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "11px 14px 8px",
            color: "var(--text-primary)",
            fontSize: "0.875rem",
            fontFamily: "inherit",
            resize: "none",
            outline: "none",
            lineHeight: 1.5,
          }}
        />
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px 8px",
        }}>
          <span style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
            Shift+Enter for new line
          </span>
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="btn-primary"
            style={{ fontSize: "0.75rem", padding: "5px 12px", gap: 5 }}
          >
            <Send size={11} />
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
