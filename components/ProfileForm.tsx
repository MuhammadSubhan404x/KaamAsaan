"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import FileUpload from "./FileUpload";
import type { StudentProfile, OpportunityType } from "@/lib/types";

interface ProfileFormProps {
  profile: StudentProfile;
  onChange: (p: StudentProfile) => void;
}

const DEGREES = [
  "BS Computer Science","BS Software Engineering","BS Artificial Intelligence",
  "BS Data Science","BS Information Technology","BS Cyber Security",
  "BS Computer Engineering","BS Electrical Engineering","BS Electronic Engineering",
  "BS Telecom Engineering","BS Mechatronics Engineering","BS Mechanical Engineering",
  "BS Mathematics","BS Applied Mathematics","BS Statistics","BS Physics","BS Bioinformatics",
];

const OPP_TYPES: OpportunityType[] = ["scholarship","internship","fellowship","competition","research","admission"];

const INPUT_STYLE = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 6,
  padding: "6px 10px",
  color: "#F2F2F2",
  fontSize: "0.8125rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "all 150ms ease",
};

const LABEL_STYLE = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  color: "var(--text-tertiary)",
  marginBottom: 5,
};

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const [open, setOpen] = useState(true);
  const [semesterRaw, setSemesterRaw] = useState(String(profile.semester));
  const [skillsRaw, setSkillsRaw] = useState(profile.skills.join(", "));
  const [cgpaRaw, setCgpaRaw] = useState(String(profile.cgpa));

  const skillsKey = profile.skills.join(",");
  useEffect(() => { setSkillsRaw(profile.skills.join(", ")); }, [skillsKey]);

  const set = <K extends keyof StudentProfile>(k: K, v: StudentProfile[K]) => onChange({ ...profile, [k]: v });
  const toggleType = (t: OpportunityType) => {
    const cur = profile.preferredTypes;
    set("preferredTypes", cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);
  };

  const commitSemester = (raw: string) => {
    const n = parseInt(raw);
    const clamped = isNaN(n) || n < 1 ? 1 : n > 8 ? 8 : n;
    setSemesterRaw(String(clamped));
    set("semester", clamped);
  };

  const commitCgpa = (raw: string) => {
    const v = parseFloat(raw);
    const clamped = isNaN(v) || v < 0 ? 0 : v > 4 ? 4 : Math.round(v * 100) / 100;
    setCgpaRaw(clamped.toFixed(2));
    set("cgpa", clamped);
  };

  return (
    <div style={{
      background: "var(--bg-elevated)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: "transparent",
          border: "none",
          borderBottom: open ? "1px solid rgba(255,255,255,0.06)" : "none",
          cursor: "pointer",
          transition: "background 150ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <User size={13} style={{ color: "var(--accent-light)" }} />
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Your Profile
          </span>
        </div>
        {open
          ? <ChevronUp size={13} style={{ color: "var(--text-tertiary)" }} />
          : <ChevronDown size={13} style={{ color: "var(--text-tertiary)" }} />
        }
      </button>

      {open && (
        <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Name + Degree */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={LABEL_STYLE}>Name</label>
              <input
                style={INPUT_STYLE}
                value={profile.name}
                onChange={e => set("name", e.target.value)}
                placeholder="Muhammad Subhan"
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(94,106,210,0.2)"; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Degree</label>
              <select
                style={{ ...INPUT_STYLE, cursor: "pointer" }}
                value={profile.degree}
                onChange={e => set("degree", e.target.value)}
              >
                {DEGREES.map(d => <option key={d} value={d} style={{ background: "#1C1E23" }}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Semester + CGPA */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={LABEL_STYLE}>Semester</label>
              <input
                style={INPUT_STYLE}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={semesterRaw}
                onChange={e => { const v = e.target.value.replace(/[^1-8]/g,"").slice(0,1); setSemesterRaw(v); if(v) set("semester",parseInt(v)); }}
                onBlur={e => commitSemester(e.target.value)}
                placeholder="6"
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(94,106,210,0.2)"; }}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>CGPA</label>
              <input
                style={INPUT_STYLE}
                type="text"
                inputMode="decimal"
                value={cgpaRaw}
                onChange={e => { let v = e.target.value.replace(/[^0-9.]/g,""); const p = v.split("."); if(p.length>2) v=p[0]+"."+p.slice(1).join(""); if(v.length>4) v=v.slice(0,4); setCgpaRaw(v); }}
                onBlur={e => commitCgpa(e.target.value)}
                placeholder="3.20"
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(94,106,210,0.2)"; }}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label style={LABEL_STYLE}>Skills</label>
            <input
              style={INPUT_STYLE}
              value={skillsRaw}
              onChange={e => setSkillsRaw(e.target.value)}
              onBlur={e => set("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              placeholder="Python, React, Machine Learning"
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(94,106,210,0.2)"; }}
            />
            {profile.skills.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                {profile.skills.slice(0, 6).map((s, i) => (
                  <span key={i} style={{
                    fontSize: "0.6875rem", padding: "1px 7px", borderRadius: 99,
                    background: "rgba(94,106,210,0.1)", color: "var(--accent-light)",
                    border: "1px solid rgba(94,106,210,0.15)",
                  }}>{s}</span>
                ))}
              </div>
            )}
          </div>

          {/* Location + Experience */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={LABEL_STYLE}>Location</label>
              <input style={INPUT_STYLE} value={profile.location} onChange={e => set("location", e.target.value)} placeholder="Lahore"
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(94,106,210,0.2)"; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Experience</label>
              <input style={INPUT_STYLE} value={profile.experience} onChange={e => set("experience", e.target.value)} placeholder="GDG, freelance..."
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(94,106,210,0.2)"; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Opportunity types */}
          <div>
            <label style={{ ...LABEL_STYLE, display: "flex", alignItems: "center", gap: 6 }}>
              <span>Preferred Types</span>
              {profile.preferredTypes.length === 0 && (
                <span style={{ color: "var(--score-mid)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— select at least one</span>
              )}
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {OPP_TYPES.map(t => {
                const active = profile.preferredTypes.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 99,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: "1px solid",
                      transition: "all 150ms ease",
                      textTransform: "capitalize",
                      background: active ? "rgba(94,106,210,0.15)" : "transparent",
                      color: active ? "var(--accent-light)" : "var(--text-secondary)",
                      borderColor: active ? "rgba(94,106,210,0.3)" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CV upload */}
          <div>
            <label style={LABEL_STYLE}>CV / Resume (PDF)</label>
            <FileUpload
              label="Drop CV here"
              hint="Auto-extracts skills"
              compact
              onTextExtracted={(text) => {
                const skills = text.match(/\b(Python|Java|React|Node\.js|TypeScript|C\+\+|ML|Machine Learning|Deep Learning|NLP|SQL|AWS|Docker|Git|Flutter|Django|FastAPI|TensorFlow|PyTorch|Kubernetes|Firebase)\b/gi) ?? [];
                const unique = [...new Set(skills.map(s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())))];
                if (unique.length) set("skills", [...new Set([...profile.skills, ...unique])]);
              }}
            />
          </div>

          {/* Financial need toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => set("financialNeed", !profile.financialNeed)}
              style={{
                position: "relative",
                width: 32, height: 18,
                borderRadius: 99,
                background: profile.financialNeed ? "var(--accent)" : "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                transition: "background 150ms ease",
                flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute",
                top: 2, left: profile.financialNeed ? 16 : 2,
                width: 14, height: 14,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 150ms ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }} />
            </button>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Financial need — boosts funded opportunities</span>
          </div>
        </div>
      )}
    </div>
  );
}
