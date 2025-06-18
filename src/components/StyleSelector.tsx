
import React from "react";
import { Button } from "@/components/ui/button";

interface StyleSelectorProps {
  selectedStyle: string;
  setSelectedStyle: (key: string) => void;
  STYLES: { key: string; label: string }[];
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  setSelectedStyle,
  STYLES
}) => (
  <div className="w-full flex flex-col gap-1">
    {STYLES.map(style => (
      <Button
        key={style.key}
        variant={selectedStyle === style.key ? "cartoon" : "cartoonOutline"}
        size="xs"
        className="w-32 h-8 text-xs"
        type="button"
        onClick={() => setSelectedStyle(style.key)}
      >
        {style.label}
      </Button>
    ))}
  </div>
);
