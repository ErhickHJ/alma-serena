"use client";

import { useEffect, useState } from "react";

export function LotusAnimation() {
  const [bloom, setBloom] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBloom(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Floating petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g
            key={i}
            style={{ transformOrigin: "100px 140px", transform: `rotate(${angle}deg)` }}
          >
            <ellipse
              cx={100}
              cy={40 + (bloom ? 15 : 25)}
              rx={14}
              ry={bloom ? 28 : 10}
              className="transition-all duration-[1500ms] ease-out"
              style={{
                transformOrigin: "100px 140px",
                transform: bloom ? "translateY(-8px)" : "translateY(0)",
                fill: bloom ? "rgba(107, 141, 122, 0.35)" : "rgba(107, 141, 122, 0.12)",
                stroke: "rgba(107, 141, 122, 0.25)",
                strokeWidth: 0.5,
              }}
            />
          </g>
        ))}
        {/* Inner small petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g
            key={`inner-${i}`}
            style={{ transformOrigin: "100px 140px", transform: `rotate(${angle}deg)` }}
          >
            <ellipse
              cx={100}
              cy={50 + (bloom ? 20 : 30)}
              rx={8}
              ry={bloom ? 18 : 6}
              className="transition-all duration-[2000ms] ease-out"
              style={{
                transformOrigin: "100px 140px",
                transform: bloom ? "translateY(-6px)" : "translateY(0)",
                fill: bloom ? "rgba(242, 215, 171, 0.5)" : "rgba(242, 215, 171, 0.15)",
                stroke: "rgba(242, 215, 171, 0.3)",
                strokeWidth: 0.5,
              }}
            />
          </g>
        ))}
        {/* Center */}
        <circle
          cx={100}
          cy={bloom ? 82 : 90}
          r={bloom ? 10 : 5}
          className="transition-all duration-[2000ms] ease-out"
          style={{
            fill: bloom ? "rgba(242, 200, 140, 0.7)" : "rgba(242, 200, 140, 0.2)",
          }}
        />
        {/* Stem */}
        <path
          d="M100 195 Q105 155 100 130"
          fill="none"
          stroke="rgba(107, 141, 122, 0.3)"
          strokeWidth={2}
          className="transition-opacity duration-1000"
          style={{ opacity: bloom ? 1 : 0.3 }}
        />
        {/* Ripples */}
        <ellipse
          cx={100}
          cy={188}
          rx={bloom ? 45 : 20}
          ry={bloom ? 6 : 2}
          className="transition-all duration-[2000ms] ease-out"
          style={{
            fill: "none",
            stroke: "rgba(107, 141, 122, 0.15)",
            strokeWidth: 1,
          }}
        />
        <ellipse
          cx={100}
          cy={188}
          rx={bloom ? 60 : 25}
          ry={bloom ? 8 : 3}
          className="transition-all duration-[2500ms] ease-out"
          style={{
            fill: "none",
            stroke: "rgba(107, 141, 122, 0.08)",
            strokeWidth: 0.8,
          }}
        />
      </svg>
    </div>
  );
}
