
import { Label } from "@/components/ui/label";

export const QuickTips = () => (
  <div className="p-3">
    <Label className="text-xs font-medium block mb-1">💡 Quick Tips</Label>
    <div className="text-xs text-muted-foreground space-y-1" role="list">
      <div role="listitem">• Use Ctrl+Z to undo</div>
      <div role="listitem">• Touch and drag on mobile</div>
      <div role="listitem">• Lower opacity for blending</div>
    </div>
  </div>
);

