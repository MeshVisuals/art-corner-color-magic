
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
            className="max-w-full h-auto border border-border rounded-lg cursor-crosshair"
            style={{ maxHeight: '70vh' }}
          />
        </div>
      </Card>
    </div>
  );
};
