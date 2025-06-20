
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BrushSizeSliderProps {
  value: number;
  onChange: (size: number) => void;
}

export const BrushSizeSlider = ({ value, onChange }: BrushSizeSliderProps) => (
  <div>
    <Label className="text-sm font-medium mb-3 block">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>Size: {value}px</span>
        </TooltipTrigger>
        <TooltipContent side="top">
          Choose brush/eraser size
        </TooltipContent>
      </Tooltip>
    </Label>
    <Slider
      id="brush-size-slider"
      value={[value]}
      onValueChange={v => onChange(v[0])}
      max={50}
      min={1}
      step={1}
      data-testid="slider-size"
    />
  </div>
);

