
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ImagePlus } from "lucide-react";

interface GenerateOrContinueButtonProps {
  displayImageUrl?: string | null;
  loading: boolean;
  onGenerate: () => void;
  onContinue: () => void;
}

export const GenerateOrContinueButton: React.FC<GenerateOrContinueButtonProps> = ({
  displayImageUrl,
  loading,
  onGenerate,
  onContinue
}) => (
  <div className="w-full mt-2 flex flex-col items-center gap-2">
    {displayImageUrl ? (
      <Button
        onClick={onContinue}
        size="lg"
        className="font-bold w-full max-w-xs"
        variant="cartoon"
      >
        Color This!
      </Button>
    ) : (
      <Button
        onClick={onGenerate}
        disabled={loading}
        size="lg"
        className="w-full max-w-xs font-bold"
        variant="cartoon"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Generating...
          </>
        ) : (
          <>
            <ImagePlus /> Generate
          </>
        )}
      </Button>
    )}
  </div>
);
