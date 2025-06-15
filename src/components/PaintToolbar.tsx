import { ToolSelector } from "./ToolSelector";
import { BrushSizeSlider } from "./BrushSizeSlider";
import { BrushOpacitySlider } from "./BrushOpacitySlider";
import { ColorPalette } from "./ColorPalette";
import { HistoryControls } from "./HistoryControls";
import { QuickTips } from "./QuickTips";

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
        <ToolSelector tool={tool} setTool={setTool} />
        <BrushSizeSlider value={brushSize} onChange={setBrushSize} />
        {tool === 'brush' && (
          <BrushOpacitySlider value={brushOpacity} onChange={setBrushOpacity} />
        )}
        {tool === 'brush' && (
          <ColorPalette
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            colors={colors}
          />
        )}
        <HistoryControls
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <QuickTips />
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
