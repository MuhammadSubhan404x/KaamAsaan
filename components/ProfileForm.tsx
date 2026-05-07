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

/* WHITE bg, BLACK text input */
const INPUT = {
  width: "100%",
  background: "#ffffff",
  border: "1px solid #ffffff",
  borderRadius: 4,
  padding: "7px 10px",
  color: "#000000",
  fontSize: "0.875rem",
  fontFamily: "inherit",
  outline: "none",
};

const LABEL = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.45)",
  marginBottom: 5,
};

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const [open, setOpen] = useState(true);
  const [semesterRaw, setSemesterRaw] = useState(String(profile.semester));
  const [skillsRaw, setSkillsRaw] = useState(profile.skills.join(", "));
  const [cgpaRaw, setCgpaRaw] = useState(String(profile.cgpa));

  useEffect(() => { setSkillsRaw(profile.skills.join(", ")); }, [profile.skills.join(",")]);

  const set = <K extends keyof StudentProfile>(k: K, v: StudentProfile[K]) => onChange({ ...profile, [k]: v });
  const toggleType = (t: OpportunityType) => {
    const cur = profile.preferredTypes;
    set("preferredTypes", cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);
  };

  const commitCgpa = (raw: string) => {
    const v = parseFloat(raw);
    const c = isNaN(v) || v < 0 ? 0 : v > 4 ? 4 : Math.round(v * 100) / 100;
    setCgpaRaw(c.toFixed(2));
    set("cgpa", c);
  };

  const commitSemester = (raw: string) => {
    const n = parseInt(raw);
    const c = isNaN(n) || n < 1 ? 1 : n > 8 ? 8 : n;
    setSemesterRaw(String(c));
    set("semester", c);
  };

  return (
    <div style={{
      background: "#000000",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 6,
      overflow: "hidden",
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 14px",
          background: "transparent", border: "none",
          borderBottom: open ? "1px solid rgba(255,255,255,0.1)" : "none",
          cursor: "pointer", transition: "background 100ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <User size={13} style={{ color: "rgba(255,255,255,0.6)" }} />
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Your Profile
          </span>
        </div>
        {open
          ? <ChevronUp size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
          : <ChevronDown size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
        }
      </button>

      {open && (
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Name + Degree */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={LABEL}>Name</label>
              <input style={INPUT} value={profile.name} onChange={e => set("name", e.target.value)} placeholder="Muhammad Subhan" />
            </div>
            <div>
              <label style={LABEL}>Degree</label>
              <select
                style={{ ...INPUT, cursor: "pointer", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", paddingRight: 26, appearance: "none" as any }}
                value={profile.degree}
                onChange={e => set("degree", e.target.value)}
              >
                {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Semester + CGPA */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={LABEL}>Semester</label>
              <input style={INPUT} type="text" inputMode="numeric" maxLength={1}
                value={semesterRaw}
                onChange={e => { const v = e.target.value.replace(/[^1-8]/g,"").slice(0,1); setSemesterRaw(v); if(v) set("semester", parseInt(v)); }}
                onBlur={e => commitSemester(e.target.value)}
                placeholder="6"
              />
            </div>
            <div>
              <label style={LABEL}>CGPA</label>
              <input style={INPUT} type="text" inputMode="decimal"
                value={cgpaRaw}
                onChange={e => { let v = e.target.value.replace(/[^0-9.]/g,""); const p = v.split("."); if(p.length>2) v=p[0]+"."+p.slice(1).join(""); if(v.length>4) v=v.slice(0,4); setCgpaRaw(v); }}
                onBlur={e => commitCgpa(e.target.value)}
                placeholder="3.20"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label style={LABEL}>Skills</label>
            <input style={INPUT}
              value={skillsRaw}
              onChange={e => setSkillsRaw(e.target.value)}
              onBlur={e => set("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              placeholder="Python, React, Machine Learning"
            />
            {profile.skills.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                {profile.skills.slice(0, 6).map((s, i) => (
                  <span key={i} style={{
                    fontSize: "0.6875rem", padding: "2px 8px", borderRadius: 99,
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.6)",
                  }}>{s}</span>
                ))}
              </div>
            )}
          </div>

          {/* Location + Experience */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={LABEL}>Location</label>
              <input style={INPUT} value={profile.location} onChange={e => set("location", e.target.value)} placeholder="Lahore" />
            </div>
            <div>
              <label style={LABEL}>Experience</label>
              <input style={INPUT} value={profile.experience} onChange={e => set("experience", e.target.value)} placeholder="GDG, freelance..." />
            </div>
          </div>

          {/* Opportunity types */}
          <div>
            <label style={{ ...LABEL, display: "flex", alignItems: "center", gap: 6 }}>
              Preferred Types
              {profile.preferredTypes.length === 0 && <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— select one</span>}
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {OPP_TYPES.map(t => {
                const on = profile.preferredTypes.includes(t);
                return (
                  <button key={t} onClick={() => toggleType(t)} style={{
                    padding: "4px 12px", borderRadius: 99,
                    fontSize: "0.75rem", fontWeight: on ? 600 : 400,
                    cursor: "pointer",
                    border: "1px solid",
                    transition: "all 100ms ease",
                    textTransform: "capitalize",
                    background: on ? "#ffffff" : "transparent",
                    color: on ? "#000000" : "rgba(255,255,255,0.45)",
                    borderColor: on ? "#ffffff" : "rgba(255,255,255,0.2)",
                  }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CV upload */}
          <div>
            <label style={LABEL}>CV / Resume (PDF)</label>
            <FileUpload label="Drop CV here" hint="Auto-extracts skills" compact
              onTextExtracted={(text) => {
                const skills = text.match(/\b(Python|Java|React|Node\.js|TypeScript|C\+\+|ML|Machine Learning|NLP|SQL|AWS|Docker|Git|Flutter|Django|FastAPI|TensorFlow|PyTorch|Kubernetes|Firebase)\b/gi) ?? [];
                const u = [...new Set(skills.map(s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())))];
                if (u.length) set("skills", [...new Set([...profile.skills, ...u])]);
              }}
            />
          </div>

          {/* Financial need toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => set("financialNeed", !profile.financialNeed)} style={{
              position: "relative", width: 36, height: 20, borderRadius: 99,
              background: profile.financialNeed ? "#ffffff" : "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              cursor: "pointer", transition: "background 120ms ease",
              flexShrink: 0,
            }}>
              <span style={{
                position: "absolute", top: 2,
                left: profile.financialNeed ? 18 : 2,
                width: 14, height: 14, borderRadius: "50%",
                background: profile.financialNeed ? "#000000" : "rgba(255,255,255,0.4)",
                transition: "left 120ms ease, background 120ms ease",
              }} />
            </button>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)" }}>
              Financial need — boosts funded opportunities
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
