
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ColorPicker } from "./ColorPicker";

interface ColorPaletteProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
  colors: string[];
}

export const ColorPalette = ({ currentColor, setCurrentColor, colors }: ColorPaletteProps) => (
  <div>
    <Label className="text-sm font-medium mb-3 block">Colors</Label>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setCurrentColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                currentColor === color 
                  ? "border-foreground scale-110"
                  : "border-border hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              title={color}
              aria-label={`Use color ${color}`}
              data-testid={`color-swatch-${color}`}
            />
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        Pick a color!
      </TooltipContent>
    </Tooltip>
    <div data-testid="color-picker">
      <ColorPicker
        currentColor={currentColor}
        onColorChange={setCurrentColor}
      />
    </div>
  </div>
);

