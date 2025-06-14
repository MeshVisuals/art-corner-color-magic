
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2, ImagePlus } from "lucide-react";

interface GenerateScreenProps {
  onBack: () => void;
  onColorImage: (imageUrl: string) => void;
}

export const GenerateScreen: React.FC<GenerateScreenProps> = ({
  onBack,
  onColorImage,
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  // Fake generation for demo; replace with real API call
  async function handleGenerate() {
    if (!prompt.trim()) {
      toast({ title: "Enter a prompt!", description: "Try 'A dog on a skateboard'." });
      return;
    }
    setLoading(true);
    setGeneratedUrl(null);
    // Simulate image generation delay & URL
    setTimeout(() => {
      // Placeholder image; swap with result from your API
      const img = "https://placehold.co/512x512/png?text=" + encodeURIComponent(prompt);
      setGeneratedUrl(img);
      setLoading(false);
    }, 1800);
  }

  function handleContinue() {
    if (generatedUrl) {
      onColorImage(generatedUrl);
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-10 px-3">
      <div className="w-full max-w-xl balloon-frame p-7 flex flex-col gap-6 items-center shadow-lg relative">
        <button
          className="absolute left-5 top-5 text-black/50 hover:text-black text-lg"
          onClick={onBack}
          aria-label="Go Back"
        >
          ←
        </button>
        <h2 className="font-balloony text-3xl md:text-4xl mb-2 text-center">Generate an Image</h2>
        <div className="w-full flex flex-col md:flex-row gap-3">
          <Input
            className="flex-1 text-lg md:text-base"
            placeholder="Describe a picture to create (e.g., Cute elephant flying a kite!)"
            maxLength={100}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={loading}
            data-testid="prompt-input"
          />
          <Button onClick={handleGenerate} disabled={loading} className="md:w-[128px]">
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
        </div>
        <div className="w-full min-h-[260px] flex items-center justify-center mt-4">
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin mb-2 w-12 h-12 text-primary" />
              <div className="font-semibold text-primary">Letting my imagination run wild...</div>
            </div>
          ) : generatedUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={generatedUrl}
                alt={prompt}
                className="rounded-xl border-4 border-black shadow-xl mb-2 max-w-[340px] max-h-[340px] transition-all"
              />
              <Button onClick={handleContinue} size="lg" className="font-bold w-full max-w-xs">Color This!</Button>
            </div>
          ) : (
            <div className="text-muted-foreground text-lg text-center p-4">
              Enter a prompt and generate your own unique drawing!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
