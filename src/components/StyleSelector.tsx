
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
  <div className="w-full flex gap-2 mt-1 mb-1 justify-center">
    {STYLES.map(style => (
      <Button
        key={style.key}
        variant={selectedStyle === style.key ? "cartoon" : "cartoonOutline"}
        size="cartoon"
        className="flex-1"
        type="button"
        onClick={() => setSelectedStyle(style.key)}
      >
        {style.label}
      </Button>
    ))}
  </div>
);
