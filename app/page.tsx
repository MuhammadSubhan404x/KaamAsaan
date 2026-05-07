"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProfileForm from "@/components/ProfileForm";
import EmailInput from "@/components/EmailInput";
import ResultsPanel, { ResultsSkeleton } from "@/components/ResultsPanel";
import Footer from "@/components/Footer";
import TabNav, { type Tab } from "@/components/TabNav";
import AdvisorTab from "@/components/AdvisorTab";
import RoadmapTab from "@/components/RoadmapTab";
import { DEFAULT_PROFILE } from "@/lib/sampleData";
import type { StudentProfile, AnalyzeResponse, RankedOpportunity } from "@/lib/types";
import type { Message } from "@/components/AdvisorTab";
import { Sparkles, AlertCircle, RotateCcw, Zap, AlertTriangle } from "lucide-react";

const STORAGE_KEY = "kaamasaan_results";
const PROFILE_KEY = "kaamasaan_profile";

const tabVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function AnalysisProgress({ loading }: { loading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Initializing...");

  useEffect(() => {
    if (!loading) { setProgress(0); return; }
    setProgress(0);
    setStage("Reading your emails...");

    const stages = [
      { at: 8,  label: "Extracting opportunity details..." },
      { at: 20, label: "Identifying deadlines & eligibility..." },
      { at: 35, label: "Scoring against your profile..." },
      { at: 50, label: "Ranking by fit, urgency & prestige..." },
      { at: 65, label: "Building action checklists..." },
      { at: 78, label: "Finalizing results..." },
      { at: 88, label: "Almost there..." },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(p => {
        const next = Math.min(p + (p < 30 ? 1.8 : p < 60 ? 1.2 : p < 85 ? 0.6 : 0.2), 92);
        return next;
      });
      const s = stages.find(st => st.at === current);
      if (s) setStage(s.label);
    }, 600);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="glass border border-violet-500/20 rounded-2xl px-6 py-5 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300 font-medium">{stage}</span>
        <span className="text-violet-400 font-bold tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-slate-600">This typically takes 15–45 seconds depending on email count</p>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("analyzer");
  const [emails, setEmails] = useState<string[]>([]);
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalyzeResponse | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [advisorMessages, setAdvisorMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setResults(JSON.parse(saved));
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch {}
  }, [profile]);

  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails);
    if (newEmails.some(e => e.trim())) setDemoMode(false);
  };

  const handleDemoModeToggle = () => {
    if (!demoMode) {
      setEmails([]);
      setResults(null);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
    setDemoMode(d => !d);
  };

  const scrollToInput = () =>
    setTimeout(() => inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

  const handleAnalyze = async () => {
    const combined = emails.filter(e => e.trim()).join("\n\n---\n\n");
    if (!demoMode && !combined) {
      setError("Please add at least one email or load sample emails.");
      scrollToInput();
      return;
    }
    if (!demoMode && profile.preferredTypes.length === 0) {
      setError("Please select at least one opportunity type so the scoring engine knows what to prioritize.");
      scrollToInput();
      return;
    }
    setError(null);
    setIsFallback(false);
    setLoading(true);
    setResults(null);
    try {
      let data: AnalyzeResponse & { isFallback?: boolean };

      if (demoMode) {
        const res = await fetch("/api/analyze?demo=true", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emails: " ", profile }),
        });
        data = await res.json();
      } else {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emails: combined, profile }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Analysis failed. Please try again.");
        }
        data = await res.json();
        if (data.isFallback) setIsFallback(true);
      }

      setResults(data);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResults(null);
    setEmails([]);
    setIsFallback(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const topOpportunities: RankedOpportunity[] = results?.results ?? [];

  return (
    <main className="min-h-screen">
      {activeTab === "analyzer" && <Hero onGetStarted={scrollToInput} />}

      <TabNav active={activeTab} onChange={setActiveTab} hasResults={!!results} />

      <AnimatePresence mode="wait">
        {activeTab === "analyzer" && (
          <motion.div key="analyzer" variants={tabVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <div ref={inputRef} className="max-w-5xl mx-auto px-4 pb-8 pt-6 space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <EmailInput emails={emails} onChange={handleEmailsChange} />
                <ProfileForm profile={profile} onChange={setProfile} />
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-6)", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <AlertCircle size={14} style={{ flexShrink: 0, color: "var(--color-text-primary)" }} />{error}
                </div>
              )}

              {isFallback && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border-primary)", borderRadius: "var(--radius-6)", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0, color: "var(--color-text-primary)" }} />
                  AI extraction timed out — showing pre-analyzed sample results.
                </div>
              )}

              <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
                <button onClick={handleAnalyze} disabled={loading}
                  className="btn-invert"
                  style={{ padding: "12px 40px", fontSize: "1rem", gap: 10, borderRadius: "var(--radius-8)" }}>
                  <Sparkles size={18} className={loading ? "animate-spin" : ""} />
                  {loading ? "Analyzing..." : demoMode ? "Run Demo" : "Analyze Inbox"}
                </button>

                <button onClick={handleDemoModeToggle} disabled={loading}
                  className="btn-secondary"
                  style={{ padding: "12px 18px", fontSize: "0.9375rem", borderRadius: "var(--radius-8)", opacity: loading ? 0.4 : 1 }}>
                  <Zap size={14} />
                  {demoMode ? "Demo Mode ON" : "Demo Mode"}
                </button>

                {results && !loading && (
                  <button onClick={handleClear} className="btn-secondary"
                    style={{ padding: "12px 18px", fontSize: "0.9375rem", borderRadius: "var(--radius-8)" }}>
                    <RotateCcw size={14} /> Clear
                  </button>
                )}
              </div>

              <AnalysisProgress loading={loading} />

              <AnimatePresence>
                {results && !loading && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <ResultsPanel data={results} profile={profile} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeTab === "advisor" && (
          <motion.div key="advisor" variants={tabVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <AdvisorTab profile={profile} topOpportunities={topOpportunities} messages={advisorMessages} onMessagesChange={setAdvisorMessages} />
          </motion.div>
        )}

        {activeTab === "roadmap" && (
          <motion.div key="roadmap" variants={tabVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <RoadmapTab profile={profile} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
