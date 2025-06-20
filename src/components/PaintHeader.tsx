
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
          title="Back to generate"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="moodcake-font text-3xl font-black text-[#F7D04B]"
            style={{ 
              WebkitTextStroke: "1px #2A2320", 
              textShadow: "4px 4px 0px #2A2320, -2px -2px 0px #2A2320, 2px -2px 0px #2A2320, -2px 2px 0px #2A2320",
              filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
            }}>
          Paint Your Art
        </h1>
      </div>
      <div className="flex gap-3">
        <Button
          variant="cartoon"
          size="cartoon"
          onClick={downloadImage}
          title="Download your painted masterpiece"
        >
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
        <Button
          variant="cartoonOutline"
          size="cartoon"
          onClick={onStartOver}
          title="Start over with a new drawing"
        >
          START OVER
        </Button>
      </div>
    </div>
  );
};
