
import { Label } from "@/components/ui/label";

export const QuickTips = () => (
  <div className="bg-secondary/10 rounded-lg p-3">
    <Label className="text-xs font-medium block mb-1">💡 Quick Tips</Label>
    <div className="text-xs text-muted-foreground space-y-1">
      <div>• Use Ctrl+Z to undo</div>
      <div>• Touch and drag on mobile</div>
      <div>• Lower opacity for blending</div>
    </div>
  </div>
);

