
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ currentColor, onColorChange }: ColorPickerProps) => {
  const [customColor, setCustomColor] = useState(currentColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorChange(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-xl flex items-center gap-2"
        >
          <Palette className="w-4 h-4" />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: currentColor }}
          />
          Custom Color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Pick a custom color</Label>
          <div className="flex gap-2 items-center">
            <Input
              type="color"
              value={customColor}
              onChange={handleColorChange}
              className="w-16 h-10 p-1 rounded-lg"
            />
            <Input
              type="text"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                  onColorChange(e.target.value);
                }
              }}
              placeholder="#FF6B6B"
              className="flex-1"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            You can enter any hex color code (like #FF6B6B) or use the color picker above!
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
