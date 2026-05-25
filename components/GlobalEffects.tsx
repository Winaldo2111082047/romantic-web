"use client";

import { useEffect, useState } from "react";

// Gunakan CSS animation murni — lebih ringan dari Framer Motion untuk banyak elemen
const HEART_COUNT = 8;
const SPARKLE_COUNT = 10;

interface FloatItem {
  id: number;
  left: number;       // %
  animDelay: number;  // s
  animDuration: number; // s
  size: number;       // px
}

function generateItems(count: number, minDur: number, maxDur: number, minSize: number, maxSize: number): FloatItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 95 + 2,
    animDelay: Math.random() * 8,
    animDuration: Math.random() * (maxDur - minDur) + minDur,
    size: Math.random() * (maxSize - minSize) + minSize,
  }));
}

export default function GlobalEffects() {
  const [hearts, setHearts] = useState<FloatItem[]>([]);
  const [sparkles, setSparkles] = useState<FloatItem[]>([]);

  useEffect(() => {
    setHearts(generateItems(HEART_COUNT, 8, 14, 12, 22));
    setSparkles(generateItems(SPARKLE_COUNT, 6, 12, 6, 14));
  }, []);

  return (
    <>
      {/* ── Animated background glow orbs ── */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      {/* ── Floating Hearts (CSS animation) ── */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {hearts.map((h) => (
          <div
            key={`heart-${h.id}`}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.animDelay}s`,
              animationDuration: `${h.animDuration}s`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      {/* ── Sparkle Particles (CSS animation) ── */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {sparkles.map((s) => (
          <div
            key={`sparkle-${s.id}`}
            className="floating-sparkle"
            style={{
              left: `${s.left}%`,
              fontSize: `${s.size}px`,
              animationDelay: `${s.animDelay}s`,
              animationDuration: `${s.animDuration}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>
    </>
  );
}
