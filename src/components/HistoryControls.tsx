
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HistoryControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const HistoryControls = ({ onUndo, onRedo, canUndo, canRedo }: HistoryControlsProps) => (
  <div>
    <Label htmlFor="undo-btn" className="text-sm font-medium mb-3 block">History</Label>
    <div className="flex gap-2" role="group" aria-labelledby="history-controls-label">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              id="undo-btn"
              variant={canUndo ? "cartoonOutline" : "cartoonOutline"}
              size="cartoon"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex-1"
              data-testid="undo-btn"
              aria-label="Undo last stroke"
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
              variant={canRedo ? "cartoonOutline" : "cartoonOutline"}
              size="cartoon"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex-1"
              data-testid="redo-btn"
              aria-label="Redo stroke"
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
);
