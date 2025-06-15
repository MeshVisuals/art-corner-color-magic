
import React from "react";
import { Loader2 } from "lucide-react";

interface ImageDisplayProps {
  loading: boolean;
  displayImageUrl?: string | null;
  prompt: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  loading,
  displayImageUrl,
  prompt
}) => {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center mb-3">
      {loading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin mb-2 w-12 h-12 text-primary" />
          <div className="font-semibold text-primary">Letting my imagination run wild...</div>
        </div>
      ) : displayImageUrl ? (
        <img
          src={displayImageUrl}
          alt={prompt || "Colored image"}
          className="rounded-xl border-4 border-black shadow-xl max-w-[340px] max-h-[340px] transition-all"
        />
      ) : (
        <div className="text-muted-foreground text-lg text-center p-4 w-full">
          No image yet! Generate or upload one to start coloring.
        </div>
      )}
    </div>
  );
};
