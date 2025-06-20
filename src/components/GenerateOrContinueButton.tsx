
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ImagePlus, RotateCcw, Eye } from "lucide-react";

interface GenerateOrContinueButtonProps {
  displayImageUrl?: string | null;
  loading: boolean;
  onGenerate: () => void;
  onContinue: () => void;
  onRedo?: () => void;
  onRevealPrompt?: () => void;
}

export const GenerateOrContinueButton: React.FC<GenerateOrContinueButtonProps> = ({
  displayImageUrl,
  loading,
  onGenerate,
  onContinue,
  onRedo,
  onRevealPrompt
}) => (
  <div className="w-full mt-6 flex flex-col gap-4 items-end">
    {displayImageUrl ? (
      <>
        <Button
          onClick={onContinue}
          size="xs"
          className="w-40 h-10 text-sm font-bold"
          variant="cartoon"
        >
          Color This!
        </Button>
        {onRedo && (
          <Button
            onClick={onRedo}
            size="xs"
            className="w-40 h-10 text-sm font-bold flex gap-2 justify-center"
            variant="cartoonOutline"
            title="Generate Another"
          >
            <RotateCcw className="w-4 h-4" />
            Generate Another
          </Button>
        )}
        {onRevealPrompt && (
          <Button
            onClick={onRevealPrompt}
            size="xs"
            className="w-40 h-10 text-sm font-bold flex gap-2 justify-center"
            variant="cartoonOutline"
            title="Reveal Prompt"
          >
            <Eye className="w-4 h-4" />
            Reveal Prompt
          </Button>
        )}
      </>
    ) : (
      <Button
        onClick={onGenerate}
        disabled={loading}
        size="xs"
        className="w-40 h-10 text-sm font-bold flex gap-2 justify-center"
        variant="cartoon"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" /> Generating...
          </>
        ) : (
          <>
            <ImagePlus className="w-4 h-4" /> Generate
          </>
        )}
      </Button>
    )}
  </div>
);
