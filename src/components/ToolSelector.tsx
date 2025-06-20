
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
    <Label htmlFor="tool-brush" className="text-sm font-medium mb-3 block">Tools</Label>
    <div className="flex gap-2" role="group" aria-labelledby="tool-selector-label">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              id="tool-brush"
              variant={tool === 'brush' ? 'cartoon' : 'cartoonOutline'}
              size="cartoon"
              onClick={() => setTool('brush')}
              className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
              data-testid="tool-brush"
              aria-pressed={tool === 'brush'}
            >
              <Brush className="w-5 h-5" />
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
              className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
              data-testid="tool-eraser"
              aria-pressed={tool === 'eraser'}
            >
              <Eraser className="w-5 h-5" />
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
