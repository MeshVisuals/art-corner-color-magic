
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaintHeaderProps {
  onBack: () => void;
  onStartOver: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const PaintHeader = ({ onBack, onStartOver, canvasRef }: PaintHeaderProps) => {
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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="cartoonOutline"
          size="cartoon"
          onClick={onBack}
          className="rounded-full p-3"
          title="Back to generate"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-balloony text-2xl font-semibold text-foreground">
          Paint Your Art
        </h1>
      </div>
      <div className="flex gap-3">
        <Button
          variant="cartoon"
          size="cartoon"
          onClick={downloadImage}
          title="Download your painted masterpiece"
          style={{
            letterSpacing: "0.04em",
            boxShadow: "0 2px 18px rgba(79,160,120,0.16)",
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
        <Button
          variant="cartoonOutline"
          size="cartoon"
          onClick={onStartOver}
          title="Start over with a new drawing"
          style={{
            letterSpacing: "0.04em",
            boxShadow: "0 2px 18px rgba(0,0,0,0.1)",
          }}
        >
          START OVER
        </Button>
      </div>
    </div>
  );
};
