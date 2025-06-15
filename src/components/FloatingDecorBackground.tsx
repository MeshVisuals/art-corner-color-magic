
import React from "react";
import { FloatingDecor } from "./FloatingDecor";

const floatingDecorConfig = [
  { shape: "star", color: "#FFD700", size: 32, style: { top: "8%", left: "10%", animation: "pulse 3.6s infinite alternate" } },
  { shape: "star", color: "#F7BB48", size: 18, style: { top: "85%", left: "75%", animation: "pulse 2.3s infinite alternate-reverse" } },
  { shape: "heart", color: "#FF5B5B", size: 28, style: { top: "16%", left: "82%", animation: "pulse 2.8s infinite alternate-reverse" } },
  { shape: "sparkle", color: "#67B6B2", size: 28, style: { top: "75%", left: "18%", animation: "pulse 3.1s infinite alternate" } },
  { shape: "star", color: "#E87FFF", size: 20, style: { top: "60%", left: "60%", animation: "pulse 2.1s infinite alternate" } },
  { shape: "sparkle", color: "#FFC857", size: 21, style: { top: "30%", left: "60%", animation: "pulse 2.7s infinite alternate-reverse" } },
  { shape: "heart", color: "#F9E9EE", size: 22, style: { top: "58%", left: "7%", animation: "pulse 2.5s infinite alternate" } }
] as const;

export const FloatingDecorBackground: React.FC = () => (
  <>
    {floatingDecorConfig.map((cfg, i) => (
      <div
        key={i}
        className="pointer-events-none absolute"
        style={{
          zIndex: 0,
          ...cfg.style,
          opacity: 0.65 + Math.random() * 0.25
        }}
      >
        <FloatingDecor
          //@ts-expect-error: design uses fixed strings
          shape={cfg.shape}
          color={cfg.color}
          size={cfg.size}
        />
      </div>
    ))}
  </>
);
