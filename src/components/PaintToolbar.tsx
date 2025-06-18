
import { ToolSelector } from "./ToolSelector";
import { BrushSizeSlider } from "./BrushSizeSlider";
import { BrushOpacitySlider } from "./BrushOpacitySlider";
import { ColorPalette } from "./ColorPalette";
import { HistoryControls } from "./HistoryControls";
import { LayersPanel, Layer } from "./LayersPanel";
import { RasterizeControls } from "./RasterizeControls";
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
  // Layer props
  layers: Layer[];
  activeLayerId: string;
  onAddLayer: () => void;
  onDeleteLayer: (layerId: string) => void;
  onDuplicateLayer: (layerId: string) => void;
  onToggleLayerVisibility: (layerId: string) => void;
  onSelectLayer: (layerId: string) => void;
  onMoveLayer: (layerId: string, direction: 'up' | 'down') => void;
  onRenameLayer: (layerId: string, newName: string) => void;
  onChangeLayerOpacity: (layerId: string, opacity: number) => void;
  onRasterizeAll: () => void;
  onRasterizeVisible: () => void;
  onFlattenImage: () => void;
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
  canRedo,
  layers,
  activeLayerId,
  onAddLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onToggleLayerVisibility,
  onSelectLayer,
  onMoveLayer,
  onRenameLayer,
  onChangeLayerOpacity,
  onRasterizeAll,
  onRasterizeVisible,
  onFlattenImage
}: PaintToolbarProps) => {
  return (
    <div className="cozy-card p-2" data-testid="paint-toolbar">
      <div className="space-y-3">
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
        <LayersPanel
          layers={layers}
          activeLayerId={activeLayerId}
          onAddLayer={onAddLayer}
          onDeleteLayer={onDeleteLayer}
          onDuplicateLayer={onDuplicateLayer}
          onToggleLayerVisibility={onToggleLayerVisibility}
          onSelectLayer={onSelectLayer}
          onMoveLayer={onMoveLayer}
          onRenameLayer={onRenameLayer}
          onChangeLayerOpacity={onChangeLayerOpacity}
        />
        <RasterizeControls
          onRasterizeAll={onRasterizeAll}
          onRasterizeVisible={onRasterizeVisible}
          onFlattenImage={onFlattenImage}
        />
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
