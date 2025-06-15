
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Brush, Eraser, Undo2, Redo2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ColorPicker } from "./ColorPicker";

interface PaintToolbarProps {
  tool: 'brush' | 'eraser';
  setTool: (tool: 'brush' | 'eraser') => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  brushOpacity: number;
  setBrushOpacity: (opacity: number) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#EE5A24', '#0DD3F7', '#222F3E', '#DDA0DD', '#98D8C8'
];

export const PaintToolbar = ({
  tool,
  setTool,
  brushSize,
  setBrushSize,
  brushOpacity,
  setBrushOpacity,
  currentColor,
  setCurrentColor,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: PaintToolbarProps) => {
  return (
    <div className="cozy-card p-4 lg:col-span-1" data-testid="paint-toolbar">
      <div className="space-y-6">
        {/* Tool Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Tools</Label>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant={tool === 'brush' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTool('brush')}
                    className="flex-1 rounded-xl"
                    data-testid="tool-brush"
                  >
                    <Brush className="w-4 h-4 mr-1" />
                    Brush
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Brush: draw/color!
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant={tool === 'eraser' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTool('eraser')}
                    className="flex-1 rounded-xl"
                    data-testid="tool-eraser"
                  >
                    <Eraser className="w-4 h-4 mr-1" />
                    Eraser
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Eraser: fix mistakes
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Brush Size */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            <Tooltip>
              <TooltipTrigger asChild>
                <span>Size: {brushSize}px</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                Choose brush/eraser size
              </TooltipContent>
            </Tooltip>
          </Label>
          <Slider
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
            max={50}
            min={1}
            step={1}
            data-testid="slider-size"
          />
        </div>

        {/* Opacity */}
        {tool === 'brush' && (
          <div>
            <Label className="text-sm font-medium mb-3 block">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>Opacity: {brushOpacity}%</span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Make brush paint more or less see-through
                </TooltipContent>
              </Tooltip>
            </Label>
            <Slider
              value={[brushOpacity]}
              onValueChange={(value) => setBrushOpacity(value[0])}
              max={100}
              min={10}
              step={10}
              data-testid="slider-opacity"
            />
          </div>
        )}

        {/* Color Palette */}
        {tool === 'brush' && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Colors</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        currentColor === color 
                          ? 'border-foreground scale-110' 
                          : 'border-border hover:scale-105'
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
            
            {/* Custom Color Picker */}
            <div data-testid="color-picker">
              <ColorPicker 
                currentColor={currentColor}
                onColorChange={setCurrentColor}
              />
            </div>
          </div>
        )}

        {/* History Controls */}
        <div>
          <Label className="text-sm font-medium mb-3 block">History</Label>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="flex-1 rounded-xl"
                    data-testid="undo-btn"
                  >
                    <Undo2 className="w-4 h-4" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Undo last stroke (Ctrl+Z)
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="flex-1 rounded-xl"
                    data-testid="redo-btn"
                  >
                    <Redo2 className="w-4 h-4" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Redo (Ctrl+Y)
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-secondary/10 rounded-lg p-3">
          <Label className="text-xs font-medium block mb-1">💡 Quick Tips</Label>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• Use Ctrl+Z to undo</div>
            <div>• Touch and drag on mobile</div>
            <div>• Lower opacity for blending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Test ID reference documentation (for testing!):
// - data-testid="paint-toolbar": overall toolbar container
// - data-testid="tool-brush": brush select button
// - data-testid="tool-eraser": eraser select button
// - data-testid="slider-size": size slider
// - data-testid="slider-opacity": opacity slider
// - data-testid={`color-swatch-${color}`}: each preset color swatch (e.g., color-swatch-#FF6B6B')
// - data-testid="color-picker": the custom color picker trigger/button
// - data-testid="undo-btn": undo button
// - data-testid="redo-btn": redo button
