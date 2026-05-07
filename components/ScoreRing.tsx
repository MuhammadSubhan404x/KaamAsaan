interface ScoreRingProps {
  score: number;
  size?: number;
}

export default function ScoreRing({ score, size = 64 }: ScoreRingProps) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="flex-shrink-0">
      {/* Track — dark */}
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
      {/* Progress — white */}
      <circle
        cx="32" cy="32" r={r} fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 32 32)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="32" y="37" textAnchor="middle" fontSize="13" fontWeight="680" fill="#ffffff" fontFamily="var(--font-regular)">
        {score}
      </text>
    </svg>
  );
}
