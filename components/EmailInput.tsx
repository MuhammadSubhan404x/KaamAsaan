"use client";

import { useState } from "react";
import { Mail, Plus, Trash2, RefreshCw, ChevronDown, ChevronUp, Inbox } from "lucide-react";
import { SAMPLE_EMAILS_ARRAY } from "@/lib/sampleData";
import FileUpload from "./FileUpload";
import GmailConnect from "./GmailConnect";

interface EmailInputProps {
  emails: string[];
  onChange: (emails: string[]) => void;
}

function EmailCard({ index, value, onChange, onRemove }: {
  index: number; value: string; onChange: (v: string) => void; onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const preview =
    value.trim().split("\n").find(l => l.toLowerCase().startsWith("subject:"))?.replace(/subject:/i, "").trim() ||
    value.trim().split("\n")[0]?.slice(0, 60) ||
    `Email ${index + 1}`;

  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 8,
      overflow: "hidden",
      background: "rgba(255,255,255,0.015)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderBottom: expanded ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
          background: "rgba(94,106,210,0.15)",
          border: "1px solid rgba(94,106,210,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.625rem", fontWeight: 700, color: "var(--accent-light)",
        }}>
          {index + 1}
        </div>
        <span style={{
          flex: 1, fontSize: "0.75rem", color: "var(--text-secondary)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontWeight: 500,
        }}>
          {preview}
        </span>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", padding: 2, display: "flex" }}
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        <button
          onClick={onRemove}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", padding: 2, display: "flex", transition: "color 150ms ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--score-low)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
        >
          <Trash2 size={12} />
        </button>
      </div>
      {expanded && (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={5}
          placeholder={`From: sender@example.com\nSubject: Opportunity Title\n\nEmail body...`}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "10px 12px",
            color: "var(--text-secondary)",
            fontSize: "0.75rem",
            fontFamily: "ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', monospace",
            lineHeight: 1.6,
            resize: "none",
            outline: "none",
          }}
        />
      )}
    </div>
  );
}

export default function EmailInput({ emails, onChange }: EmailInputProps) {
  const addEmail    = () => onChange([...emails, ""]);
  const removeEmail = (i: number) => onChange(emails.filter((_, idx) => idx !== i));
  const updateEmail = (i: number, v: string) => onChange(emails.map((e, idx) => idx === i ? v : e));
  const loadSamples = () => onChange(SAMPLE_EMAILS_ARRAY);

  const handleGmailLoad = (fetched: string[]) => {
    const existing = new Set(emails.map(e => e.slice(0, 80)));
    onChange([...emails, ...fetched.filter(e => !existing.has(e.slice(0, 80)))]);
  };

  return (
    <div style={{
      background: "var(--bg-elevated)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Mail size={13} style={{ color: "#64A0DC" }} />
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Emails
          </span>
          {emails.length > 0 && (
            <span style={{
              fontSize: "0.6875rem", fontWeight: 500,
              padding: "1px 7px", borderRadius: 99,
              background: "rgba(100,160,220,0.1)", color: "#64A0DC",
              border: "1px solid rgba(100,160,220,0.2)",
            }}>
              {emails.length}
            </span>
          )}
        </div>
        <button
          onClick={loadSamples}
          className="btn-secondary"
          style={{ fontSize: "0.6875rem", padding: "4px 10px", gap: 5 }}
        >
          <RefreshCw size={10} />
          Load Samples
        </button>
      </div>

      {/* Gmail connect */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="label" style={{ marginBottom: 8 }}>Connect Gmail</div>
        <GmailConnect onEmailsLoaded={handleGmailLoad} />
      </div>

      {/* Email list */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "10px 14px",
        maxHeight: 360,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}>
        {emails.length === 0 ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 16px",
            gap: 8,
            color: "var(--text-tertiary)",
          }}>
            <Inbox size={22} style={{ opacity: 0.4 }} />
            <p style={{ fontSize: "0.8125rem", fontWeight: 500 }}>No emails yet</p>
            <p style={{ fontSize: "0.75rem" }}>Connect Gmail or load samples above</p>
          </div>
        ) : (
          emails.map((email, i) => (
            <EmailCard
              key={i}
              index={i}
              value={email}
              onChange={v => updateEmail(i, v)}
              onRemove={() => removeEmail(i)}
            />
          ))
        )}
      </div>

      {/* Footer actions */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 8 }}>
        <FileUpload
          label="Drop PDF of emails here"
          hint="Extracts text automatically"
          onTextExtracted={(text) => onChange([...emails, text])}
        />
        <button
          onClick={addEmail}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "7px 12px",
            background: "transparent",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: 6,
            color: "var(--text-tertiary)",
            fontSize: "0.8125rem",
            cursor: "pointer",
            transition: "all 150ms ease",
            width: "100%",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(94,106,210,0.4)";
            (e.currentTarget as HTMLElement).style.color = "var(--accent-light)";
            (e.currentTarget as HTMLElement).style.background = "rgba(94,106,210,0.04)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <Plus size={13} />
          Add Email Manually
        </button>
      </div>
    </div>
  );
}
