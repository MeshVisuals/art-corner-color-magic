
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, ImagePlus, Upload, SkipForward, KeyRound } from "lucide-react";

interface GenerateScreenProps {
  onBack: () => void;
  onColorImage: (imageUrl: string) => void;
}

const STYLES = [
  { key: "bobby_goods", label: "Bobby Goods" },
  { key: "pixar", label: "Pixar" },
  { key: "disney", label: "Disney" },
  { key: "manga", label: "Manga" },
];

export const GenerateScreen: React.FC<GenerateScreenProps> = ({
  onBack,
  onColorImage,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string>("bobby_goods");
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Read uploaded file and get a local URL for preview
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", className: "bg-red-100 border-red-200 text-red-700" });
      return;
    }
    const url = URL.createObjectURL(file);
    setUploadedUrl(url);
    setGeneratedUrl(null);
    setLoading(false);
    toast({ title: "Image uploaded!", className: "bg-green-100 border-green-200 text-green-900" });
  }

  // "Generate" button logic (demo for now)
  async function handleGenerate() {
    if (!prompt.trim()) {
      toast({ 
        title: "Enter a prompt!", 
        description: "Try 'A dog on a skateboard'.",
        className: "bg-blue-100 border-blue-200 text-blue-800"
      });
      return;
    }
    setLoading(true);
    setGeneratedUrl(null);
    setUploadedUrl(null);
    setTimeout(() => {
      // Placeholder image; use API call for production (pass apiKey & selectedStyle eventually)
      const img = "https://placehold.co/512x512/png?text=" +
        encodeURIComponent(`${prompt} (${STYLES.find(s => s.key === selectedStyle)?.label})`);
      setGeneratedUrl(img);
      setLoading(false);
    }, 1800);
  }

  function handleContinue() {
    // onColorImage prefers uploaded image, fallback to generated image
    if (uploadedUrl) {
      onColorImage(uploadedUrl);
    } else if (generatedUrl) {
      onColorImage(generatedUrl);
    }
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleSkip() {
    toast({
      title: "Skipped image generation.",
      description: "You'll start coloring right away!",
      className: "bg-yellow-100 border-yellow-300 text-yellow-900"
    });
    // Use a fallback placeholder if user neither uploads nor generates
    onColorImage("https://placehold.co/512x512/png?text=Let%27s+Color!");
  }

  // The display image: uploaded takes precedence, else generated
  const displayImageUrl = uploadedUrl || generatedUrl;

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-10 px-3">
      <div className="w-full max-w-xl p-7 flex flex-col gap-5 items-center relative">
        {/* Removed balloon-frame class above */}

        <button
          className="absolute left-5 top-5 text-black/50 hover:text-black text-lg"
          onClick={onBack}
          aria-label="Go Back"
        >
          ←
        </button>
        <h2 className="font-balloony text-3xl md:text-4xl mb-2 text-center">Generate an Image</h2>
        
        {/* API Key input */}
        <div className="w-full flex flex-col gap-2 mb-1">
          <label className="flex gap-2 items-center font-semibold text-sm text-black/70" htmlFor="api-key-input">
            <KeyRound className="w-4 h-4" />
            Enter your API Key
          </label>
          <Input
            id="api-key-input"
            placeholder="Paste or type your API key here"
            value={apiKey}
            type="password"
            onChange={e => setApiKey(e.target.value)}
            className="bg-white border-gray-200"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="text-xs text-muted-foreground ml-1">
            <span className="font-medium">Tip:</span> Required for using your own AI model API.
          </span>
        </div>

        {/* Display current image (uploaded or generated) */}
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

        {/* UPLOAD and SKIP buttons */}
        <div className="w-full flex items-center gap-3 justify-center mb-2">
          <Button
            variant="cartoon"
            onClick={handleUploadClick}
            type="button"
            className="flex-1 flex gap-2"
          >
            <Upload className="w-5 h-5" /> Upload
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
            data-testid="file-upload"
          />
          <Button
            variant="cartoonOutline"
            onClick={handleSkip}
            type="button"
            className="flex-1 flex gap-2"
          >
            <SkipForward className="w-5 h-5" /> Skip
          </Button>
        </div>

        {/* Prompt input */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="prompt-input" className="font-semibold text-black/70">Enter your prompt</label>
          <Input
            className="text-lg md:text-base bg-purple-50 border-purple-200 focus:border-purple-300 focus:ring-purple-200"
            placeholder="Describe a picture to create (e.g., Cute elephant flying a kite!)"
            maxLength={100}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={loading}
            id="prompt-input"
            data-testid="prompt-input"
          />
        </div>

        {/* Style selection buttons */}
        <div className="w-full flex gap-2 mt-1 mb-1 justify-center">
          {STYLES.map(style => (
            <Button
              key={style.key}
              variant={selectedStyle === style.key ? "cartoon" : "cartoonOutline"}
              size="cartoon"
              className="flex-1"
              type="button"
              onClick={() => setSelectedStyle(style.key)}
            >
              {style.label}
            </Button>
          ))}
        </div>

        {/* Generate or Continue button */}
        <div className="w-full mt-2 flex flex-col items-center gap-2">
          {displayImageUrl ? (
            <Button
              onClick={handleContinue}
              size="lg"
              className="font-bold w-full max-w-xs"
              variant="cartoon"
            >
              Color This!
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
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
      </div>
    </div>
  );
};
