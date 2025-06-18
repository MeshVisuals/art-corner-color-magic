import React from "react";

export type FloatingShape = "heart" | "star" | "sparkle" | "flower" | "butterfly" | "rainbow";

interface FloatingDecorProps {
  shape: FloatingShape;
  color: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const FloatingDecor = ({
  shape,
  color,
  size = 28,
  style,
  className = "",
}: FloatingDecorProps) => {
  if (shape === "heart") {
    return (
      <svg
        width={size}
        height={size}
        style={style}
        className={className}
        viewBox="0 0 32 29"
        fill="none"
      >
        <path
          d="M23.5 2.5c-2.5 0-4.5 1.6-5.5 3.7C16 4.1 14 2.5 11.5 2.5c-3.3 0-6 2.7-6 6 0 7.9 10 14 10 14s10-6.1 10-14c0-3.3-2.7-6-6-6z"
          fill={color}
          stroke="#2A2320"
          strokeWidth={2.2}
        />
      </svg>
    );
  }
  if (shape === "star") {
    return (
      <svg
        width={size}
        height={size}
        style={style}
        className={className}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M16 3l4.1 9.7 10 .9-7.7 6.6L24.8 30 16 24.7 7.2 30l2.4-9.8L2 13.6l10-.9L16 3z"
          fill={color}
          stroke="#2A2320"
          strokeWidth={2.2}
        />
      </svg>
    );
  }
  if (shape === "flower") {
    return (
      <svg
        width={size}
        height={size}
        style={style}
        className={className}
        viewBox="0 0 32 32"
        fill="none"
      >
        {/* Flower petals */}
        <circle cx={16} cy={8} r={4} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        <circle cx={24} cy={16} r={4} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        <circle cx={16} cy={24} r={4} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        <circle cx={8} cy={16} r={4} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        {/* Center */}
        <circle cx={16} cy={16} r={3} fill="#F7BB48" stroke="#2A2320" strokeWidth={1.5} />
      </svg>
    );
  }
  if (shape === "butterfly") {
    return (
      <svg
        width={size}
        height={size}
        style={style}
        className={className}
        viewBox="0 0 32 32"
        fill="none"
      >
        {/* Butterfly wings */}
        <ellipse cx={10} cy={12} rx={6} ry={4} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        <ellipse cx={22} cy={12} rx={6} ry={4} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        <ellipse cx={10} cy={20} rx={5} ry={3} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        <ellipse cx={22} cy={20} rx={5} ry={3} fill={color} stroke="#2A2320" strokeWidth={1.5} />
        {/* Body */}
        <ellipse cx={16} cy={16} rx={1} ry={8} fill="#2A2320" />
        {/* Antennae */}
        <path d="M15 8c-1-2 1-4 2-3M17 8c1-2-1-4-2-3" stroke="#2A2320" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    );
  }
  if (shape === "rainbow") {
    return (
      <svg
        width={size}
        height={size}
        style={style}
        className={className}
        viewBox="0 0 32 32"
        fill="none"
      >
        {/* Rainbow arcs */}
        <path d="M6 20 Q16 6 26 20" stroke="#FF6B6B" strokeWidth={2} fill="none" />
        <path d="M8 20 Q16 8 24 20" stroke="#FFA500" strokeWidth={2} fill="none" />
        <path d="M10 20 Q16 10 22 20" stroke="#F7BB48" strokeWidth={2} fill="none" />
        <path d="M12 20 Q16 12 20 20" stroke="#51C7B0" strokeWidth={2} fill="none" />
        {/* Clouds */}
        <circle cx={6} cy={20} r={2} fill="white" stroke="#2A2320" strokeWidth={1} />
        <circle cx={26} cy={20} r={2} fill="white" stroke="#2A2320" strokeWidth={1} />
      </svg>
    );
  }
  // Sparkle
  return (
    <svg
      width={size}
      height={size}
      style={style}
      className={className}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M16 2v8M16 22v8M2 16h8M22 16h8M8.8 8.8l5.6 5.6M23.2 23.2l-5.6-5.6M23.2 8.8l-5.6 5.6M8.8 23.2l5.6-5.6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={16} cy={16} r={2.5} fill={color} />
    </svg>
  );
};

