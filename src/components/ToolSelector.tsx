
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Brush, Eraser } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ToolSelectorProps {
  tool: 'brush' | 'eraser';
  setTool: (tool: 'brush' | 'eraser') => void;
}

export const ToolSelector = ({ tool, setTool }: ToolSelectorProps) => (
  <div>
    <Label className="text-sm font-medium mb-3 block">Tools</Label>
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              variant={tool === 'brush' ? 'cartoon' : 'cartoonOutline'}
              size="cartoon"
              onClick={() => setTool('brush')}
              className="flex-1"
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
              variant={tool === 'eraser' ? 'cartoon' : 'cartoonOutline'}
              size="cartoon"
              onClick={() => setTool('eraser')}
              className="flex-1"
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
);
