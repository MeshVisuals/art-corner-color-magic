import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Brush, 
  Eraser, 
  Download, 
  Undo2, 
  Redo2,
  Palette,
  Upload
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tooltip } from "@/components/ui/tooltip";

interface PaintScreenProps {
  imageUrl: string;
  onBack: () => void;
  onStartOver: () => void;
}

export const PaintScreen = ({ imageUrl, onBack, onStartOver }: PaintScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [brushOpacity, setBrushOpacity] = useState(100);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#EE5A24', '#0DD3F7', '#222F3E', '#DDA0DD', '#98D8C8'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      saveToHistory();
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = brushOpacity / 100;
      ctx.strokeStyle = currentColor;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          saveToHistory();
        }
      }
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setHistoryIndex(historyIndex - 1);
      ctx.putImageData(history[historyIndex - 1], 0, 0);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setHistoryIndex(historyIndex + 1);
      ctx.putImageData(history[historyIndex + 1], 0, 0);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `painted-art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "🎨 Downloaded!",
      description: "Your painted artwork has been saved."
    });
  };

  return (
    <div className="min-h-screen dreamy-gradient p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="rounded-full p-2"
              title="Back to generate"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-balloony text-2xl font-semibold text-foreground">
              Paint Your Art
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={downloadImage}
              className="rounded-xl bg-primary hover:bg-primary/90"
              title="Download your painted masterpiece"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={onStartOver}
              className="rounded-xl"
              title="Start over with a new drawing"
            >
              <span className="font-bold">Start Over</span>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <Card className="cozy-card p-4 lg:col-span-1">
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
                  />
                </div>
              )}

              {/* Color Palette */}
              {tool === 'brush' && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Colors</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="grid grid-cols-5 gap-2">
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
                          />
                        ))}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Pick a color!
                    </TooltipContent>
                  </Tooltip>
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
                          onClick={undo}
                          disabled={historyIndex <= 0}
                          className="flex-1 rounded-xl"
                        >
                          <Undo2 className="w-4 h-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Undo last stroke
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={redo}
                          disabled={historyIndex >= history.length - 1}
                          className="flex-1 rounded-xl"
                        >
                          <Redo2 className="w-4 h-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Redo
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <Card className="cozy-card p-4">
              <div className="w-full overflow-auto">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="max-w-full h-auto border border-border rounded-lg cursor-crosshair"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// NOTE: This file is now 320+ lines long. Consider asking to refactor it into smaller logical pieces for maintainability!
