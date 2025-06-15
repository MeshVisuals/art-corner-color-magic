
import { useState, useEffect } from "react";
import { PaintHeader } from "./PaintHeader";
import { PaintToolbar } from "./PaintToolbar";
import { PaintCanvas } from "./PaintCanvas";
import { usePaintHistory } from "@/hooks/usePaintHistory";
import { usePaintCanvas } from "@/hooks/usePaintCanvas";

interface PaintScreenProps {
  imageUrl: string;
  onBack: () => void;
  onStartOver: () => void;
}

export const PaintScreen = ({ imageUrl, onBack, onStartOver }: PaintScreenProps) => {
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [brushOpacity, setBrushOpacity] = useState(100);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');

  const { saveToHistory, undo, redo, canUndo, canRedo } = usePaintHistory();
  
  const { canvasRef, startDrawing, draw, stopDrawing } = usePaintCanvas({
    imageUrl,
    tool,
    brushSize,
    brushOpacity,
    currentColor,
    onSaveToHistory: saveToHistory
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo]);

  const handleUndo = () => {
    if (canvasRef.current && canUndo) {
      undo(canvasRef.current);
    }
  };

  const handleRedo = () => {
    if (canvasRef.current && canRedo) {
      redo(canvasRef.current);
    }
  };

  return (
    <div className="min-h-screen dreamy-gradient p-4">
      <div className="max-w-6xl mx-auto">
        <PaintHeader
          onBack={onBack}
          onStartOver={onStartOver}
          canvasRef={canvasRef}
        />

        <div className="grid lg:grid-cols-4 gap-6">
          <PaintToolbar
            tool={tool}
            setTool={setTool}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            brushOpacity={brushOpacity}
            setBrushOpacity={setBrushOpacity}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
          />

          <PaintCanvas
            canvasRef={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};
