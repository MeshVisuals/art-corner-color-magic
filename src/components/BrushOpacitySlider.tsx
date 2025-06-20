
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BrushOpacitySliderProps {
  value: number;
  onChange: (opacity: number) => void;
}

export const BrushOpacitySlider = ({ value, onChange }: BrushOpacitySliderProps) => (
  <div>
    <Label className="text-sm font-medium mb-3 block">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>Opacity: {value}%</span>
        </TooltipTrigger>
        <TooltipContent side="top">
          Make brush paint more or less see-through
        </TooltipContent>
      </Tooltip>
    </Label>
    <Slider
      id="brush-opacity-slider"
      value={[value]}
      onValueChange={v => onChange(v[0])}
      max={100}
      min={10}
      step={10}
      data-testid="slider-opacity"
    />
  </div>
);

