
import React from "react";

interface OutlinedTextProps {
  text: string;
  fontSize?: number | string;
  color?: string;
  outlineColor?: string;
  outlineWidth?: number;
  fontFamily?: string;
  shadowColor?: string;
  shadowOffset?: number;
  letterSpacing?: string | number;
  skew?: number;
  rotate?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Stacks multiple layers to simulate very thick cartoon outline.
 * Supports multi-line text!
 */
export const OutlinedText: React.FC<OutlinedTextProps> = ({
  text,
  fontSize = "2.7rem",
  color = "#FFF6DC",
  outlineColor = "#181211",
  outlineWidth = 6,
  fontFamily = "'Fredoka', 'Baloo 2', 'sniglet', 'Nunito', cursive",
  shadowColor = "#EF7B24",
  shadowOffset = 0,
  letterSpacing = "0.09em",
  skew = -5,
  rotate = -2.5,
  style = {},
  className = ""
}) => {
  // For stack effect, several layered spans
  // add textShadow for glow and "extra cartoon" look
  const svgFilter = `drop-shadow(0px 0px ${outlineWidth}px ${outlineColor})`;
  return (
    <span
      className={className}
      aria-label={text}
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily,
        fontWeight: 900,
        fontSize,
        color,
        letterSpacing,
        WebkitTextStroke: `${outlineWidth}px ${outlineColor}`,
        textStroke: `${outlineWidth}px ${outlineColor}`,
        textShadow:
          `
            -2px 2px 0 ${outlineColor},
            2px 2px 0 ${outlineColor},
            2px -2px 0 ${outlineColor},
            -2px -2px 0 ${outlineColor},
            4px 4px 0 ${shadowColor},
            0px 6px 30px rgba(0,0,0,0.11)
          ` +
            (shadowOffset
              ? `, ${shadowOffset}px ${shadowOffset}px 0 ${shadowColor}`
              : ""),
        transform: `skewY(${skew}deg) rotate(${rotate}deg)`,
        ...style,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        filter: svgFilter,
      }}
    >
      {text}
    </span>
  );
};

