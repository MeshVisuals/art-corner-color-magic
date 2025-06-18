
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ImagePlus, RotateCcw } from "lucide-react";

interface GenerateOrContinueButtonProps {
  displayImageUrl?: string | null;
  loading: boolean;
  onGenerate: () => void;
  onContinue: () => void;
  onRedo?: () => void;
}

export const GenerateOrContinueButton: React.FC<GenerateOrContinueButtonProps> = ({
  displayImageUrl,
  loading,
  onGenerate,
  onContinue,
  onRedo
}) => (
  <div className="w-full mt-4 flex flex-col gap-1">
    {displayImageUrl ? (
      <>
        <Button
          onClick={onContinue}
          size="xs"
          className="w-32 h-8 text-xs font-bold"
          variant="cartoon"
        >
          Color This!
        </Button>
        {onRedo && (
          <Button
            onClick={onRedo}
            size="xs"
            className="w-32 h-8 text-xs font-bold"
            variant="cartoonOutline"
            title="Generate Another"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Generate Another
          </Button>
        )}
      </>
    ) : (
      <Button
        onClick={onGenerate}
        disabled={loading}
        size="xs"
        className="w-32 h-8 text-xs font-bold"
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
