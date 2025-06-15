
import { useRef, useEffect, useState } from 'react';
import { Layer } from '@/components/LayersPanel';

interface UsePaintCanvasProps {
  imageUrl: string;
  tool: 'brush' | 'eraser';
  brushSize: number;
  brushOpacity: number;
  currentColor: string;
  onSaveToHistory: (canvas: HTMLCanvasElement) => void;
  activeLayer?: Layer;
  layers: Layer[];
}

export const usePaintCanvas = ({
  imageUrl,
  tool,
  brushSize,
  brushOpacity,
  currentColor,
  onSaveToHistory,
  activeLayer,
  layers
}: UsePaintCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Composite all layers onto the main canvas
  const compositeLayersOnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || layers.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all visible layers in order
    layers.forEach(layer => {
      if (layer.visible) {
        ctx.globalAlpha = layer.opacity / 100;
        ctx.drawImage(layer.canvas, 0, 0);
      }
    });

    ctx.globalAlpha = 1;
  };

  // Update canvas when layers change
  useEffect(() => {
    compositeLayersOnCanvas();
  }, [layers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || layers.length === 0) return;

    // Set canvas dimensions based on the first layer
    const firstLayer = layers[0];
    if (firstLayer && firstLayer.canvas) {
      canvas.width = firstLayer.canvas.width;
      canvas.height = firstLayer.canvas.height;
      compositeLayersOnCanvas();
    }
  }, [imageUrl, layers]);

  const getPointerPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return { x: 0, y: 0 };
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!activeLayer) return;
    
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !activeLayer) return;

    const ctx = activeLayer.canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPointerPosition(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = (brushOpacity / 100) * (activeLayer.opacity / 100);
      ctx.strokeStyle = currentColor;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Update the main canvas
    compositeLayersOnCanvas();
  };

  const stopDrawing = () => {
    if (isDrawing && activeLayer) {
      setIsDrawing(false);
      const ctx = activeLayer.canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        const canvas = canvasRef.current;
        if (canvas) {
          onSaveToHistory(canvas);
        }
      }
    }
  };

  return {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing
  };
};
