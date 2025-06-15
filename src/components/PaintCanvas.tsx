
import { Card } from "@/components/ui/card";

interface PaintCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export const PaintCanvas = ({
  canvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave
}: PaintCanvasProps) => {
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    onMouseDown(mouseEvent as any);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    onMouseMove(mouseEvent as any);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    onMouseUp();
  };

  return (
    <div className="lg:col-span-3">
      <Card className="cozy-card p-4">
        <div className="w-full overflow-auto">
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="max-w-full h-auto border border-border rounded-lg cursor-crosshair touch-none"
            style={{ maxHeight: '70vh' }}
          />
        </div>
      </Card>
    </div>
  );
};
