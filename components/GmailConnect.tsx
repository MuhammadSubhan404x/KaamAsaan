"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Loader2, Download, LogOut, AlertCircle } from "lucide-react";

interface GmailConnectProps {
  onEmailsLoaded: (emails: string[]) => void;
}

export default function GmailConnect({ onEmailsLoaded }: GmailConnectProps) {
  const { data: session, status } = useSession();
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    setFetching(true); setError(null); setFetched(null);
    try {
      const res = await fetch("/api/gmail");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch emails");
      onEmailsLoaded(data.emails);
      setFetched(data.count);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setFetching(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "var(--color-text-quaternary)", padding: "6px 0" }}>
        <Loader2 size={11} className="animate-spin" /> Checking connection...
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* White button, black text — Connect Gmail */}
        <button
          onClick={() => signIn("google")}
          className="btn-invert"
          style={{ width: "100%", padding: "8px 16px", fontSize: "0.875rem", gap: 8, borderRadius: "var(--radius-6)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#000"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#000"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#000"/>
          </svg>
          Connect Gmail
        </button>
        <p style={{ fontSize: "0.6875rem", color: "var(--color-text-quaternary)", textAlign: "center" }}>
          Read-only · Nothing stored
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {/* Connected state */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {session.user?.email}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.6875rem", color: "var(--color-text-quaternary)", background: "none", border: "none", cursor: "pointer", transition: "color 120ms ease", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-quaternary)")}
        >
          <LogOut size={10} /> Disconnect
        </button>
      </div>

      {/* Import button — white bg, black text */}
      <button
        onClick={fetchEmails}
        disabled={fetching}
        className="btn-invert"
        style={{ width: "100%", padding: "8px 16px", fontSize: "0.875rem", gap: 8, borderRadius: "var(--radius-6)" }}
      >
        {fetching
          ? <><Loader2 size={13} className="animate-spin" /> Importing...</>
          : <><Download size={13} /> Import from Gmail</>
        }
      </button>

      {fetched !== null && (
        <div style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ffffff", flexShrink: 0 }} />
          {fetched} emails imported
        </div>
      )}
      {error && (
        <div style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 5 }}>
          <AlertCircle size={10} /> {error}
        </div>
      )}
    </div>
  );
}
