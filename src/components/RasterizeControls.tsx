
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Layers, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RasterizeControlsProps {
  onRasterizeAll: () => void;
  onRasterizeVisible: () => void;
  onFlattenImage: () => void;
}

export const RasterizeControls = ({
  onRasterizeAll,
  onRasterizeVisible,
  onFlattenImage
}: RasterizeControlsProps) => {
  const handleRasterizeAll = () => {
    onRasterizeAll();
    toast({
      title: "🎨 Rasterized!",
      description: "All layers have been merged into one."
    });
  };

  const handleRasterizeVisible = () => {
    onRasterizeVisible();
    toast({
      title: "🎨 Rasterized!",
      description: "Visible layers have been merged."
    });
  };

  const handleFlattenImage = () => {
    onFlattenImage();
    toast({
      title: "🎨 Flattened!",
      description: "All layers merged into background layer."
    });
  };

  return (
    <div>
      <Label className="text-sm font-medium mb-3 block">Rasterize</Label>
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="cartoonOutline"
              size="sm"
              onClick={handleRasterizeAll}
              className="w-full justify-start"
            >
              <Layers className="w-4 h-4 mr-2" />
              Merge All
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Combine all layers into one
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="cartoonOutline"
              size="sm"
              onClick={handleRasterizeVisible}
              className="w-full justify-start"
            >
              <Layers className="w-4 h-4 mr-2" />
              Merge Visible
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Combine only visible layers
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="cartoonOutline"
              size="sm"
              onClick={handleFlattenImage}
              className="w-full justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Flatten Image
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Merge everything to background
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
