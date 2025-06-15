
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Plus, Eye, EyeOff, Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react";

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  canvas: HTMLCanvasElement;
}

interface LayersPanelProps {
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
}

export const LayersPanel = ({
  layers,
  activeLayerId,
  onAddLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onToggleLayerVisibility,
  onSelectLayer,
  onMoveLayer,
  onRenameLayer,
  onChangeLayerOpacity
}: LayersPanelProps) => {
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleRename = (layerId: string, currentName: string) => {
    setEditingLayerId(layerId);
    setEditingName(currentName);
  };

  const handleRenameSubmit = (layerId: string) => {
    if (editingName.trim()) {
      onRenameLayer(layerId, editingName.trim());
    }
    setEditingLayerId(null);
    setEditingName("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-medium">Layers</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="cartoonOutline"
              size="sm"
              onClick={onAddLayer}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Add new layer</TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {layers.slice().reverse().map((layer, index) => (
          <div
            key={layer.id}
            className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${
              layer.id === activeLayerId
                ? "border-[#51C7B0] bg-[#51C7B0]/10"
                : "border-border bg-background hover:bg-accent"
            }`}
            onClick={() => onSelectLayer(layer.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLayerVisibility(layer.id);
                }}
                className="h-6 w-6 p-0"
              >
                {layer.visible ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                {editingLayerId === layer.id ? (
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => handleRenameSubmit(layer.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(layer.id);
                      if (e.key === 'Escape') setEditingLayerId(null);
                    }}
                    className="h-6 text-xs"
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-xs font-medium truncate block"
                    onDoubleClick={() => handleRename(layer.id, layer.name)}
                  >
                    {layer.name}
                  </span>
                )}
              </div>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveLayer(layer.id, 'up');
                  }}
                  className="h-6 w-6 p-0"
                  disabled={index === 0}
                >
                  <ArrowUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveLayer(layer.id, 'down');
                  }}
                  className="h-6 w-6 p-0"
                  disabled={index === layers.length - 1}
                >
                  <ArrowDown className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateLayer(layer.id);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLayer(layer.id);
                  }}
                  className="h-6 w-6 p-0"
                  disabled={layers.length <= 1}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-xs">Opacity:</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={layer.opacity}
                onChange={(e) => onChangeLayerOpacity(layer.id, parseInt(e.target.value))}
                className="flex-1 h-2"
                onClick={(e) => e.stopPropagation()}
              />
              <span className="text-xs w-8">{layer.opacity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
