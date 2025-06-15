
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, ImagePlus, Upload, SkipForward, KeyRound, ArrowRight, Check, X, Star } from "lucide-react";
import { FloatingDecor } from "./FloatingDecor";

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

// Simulate API key validation: just check length >= 10
function validateApiKey(key: string) {
  return key.trim().length >= 10;
}

// Utility to pick color sets for decor
const decorColors = ["#FFC857", "#F7BB48", "#67B6B2", "#FF5B5B", "#E87FFF", "#FFF2B2", "#55DDF2", "#F9E9EE"];

// Floating decor layouts
const floatingDecorConfig = [
  { shape: "star", color: "#FFD700", size: 32, style: { top: "8%", left: "10%", animation: "pulse 3.6s infinite alternate" } },
  { shape: "star", color: "#F7BB48", size: 18, style: { top: "85%", left: "75%", animation: "pulse 2.3s infinite alternate-reverse" } },
  { shape: "heart", color: "#FF5B5B", size: 28, style: { top: "16%", left: "82%", animation: "pulse 2.8s infinite alternate-reverse" } },
  { shape: "sparkle", color: "#67B6B2", size: 28, style: { top: "75%", left: "18%", animation: "pulse 3.1s infinite alternate" } },
  { shape: "star", color: "#E87FFF", size: 20, style: { top: "60%", left: "60%", animation: "pulse 2.1s infinite alternate" } },
  { shape: "sparkle", color: "#FFC857", size: 21, style: { top: "30%", left: "60%", animation: "pulse 2.7s infinite alternate-reverse" } },
  { shape: "heart", color: "#F9E9EE", size: 22, style: { top: "58%", left: "7%", animation: "pulse 2.5s infinite alternate" } }
];

export const GenerateScreen: React.FC<GenerateScreenProps> = ({
  onBack,
  onColorImage,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyStatus, setApiKeyStatus] = useState<"untouched" | "loading" | "valid" | "invalid">("untouched");
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

  // API Key validation handler
  function handleValidateApiKey() {
    setApiKeyStatus("loading");
    setTimeout(() => {
      if (validateApiKey(apiKey)) {
        setApiKeyStatus("valid");
      } else {
        setApiKeyStatus("invalid");
      }
    }, 800);
  }

  // Keyboard "Enter" on API key input triggers validation
  function handleApiKeyKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleValidateApiKey();
    }
  }

  // The display image: uploaded takes precedence, else generated
  const displayImageUrl = uploadedUrl || generatedUrl;

  // Choose appropriate icon for API key validation
  let apiStatusIcon = null;
  let apiStatusMsg = "";
  if (apiKeyStatus === "valid") {
    apiStatusIcon = <Check className="w-5 h-5 text-green-600" aria-label="API key valid" />;
    apiStatusMsg = "API Key looks valid!";
  } else if (apiKeyStatus === "invalid") {
    apiStatusIcon = <X className="w-5 h-5 text-red-500" aria-label="API key invalid" />;
    apiStatusMsg = "API Key is invalid. Try again!";
  } else if (apiKeyStatus === "loading") {
    apiStatusIcon = <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-10 px-3 relative overflow-hidden">
      {/* Animated floating decorations on background */}
      {floatingDecorConfig.map((cfg, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{
            zIndex: 0,
            ...cfg.style,
            opacity: 0.65 + Math.random() * 0.25
          }}
        >
          <FloatingDecor
            //@ts-expect-error: strict type for floating decor shape
            shape={cfg.shape}
            color={cfg.color}
            size={cfg.size}
          />
        </div>
      ))}
      {/* Main card */}
      <div className="w-full max-w-xl p-7 flex flex-col gap-5 items-center relative" style={{ zIndex: 10 }}>
        <button
          className="absolute left-5 top-5 text-black/50 hover:text-black text-lg"
          onClick={onBack}
          aria-label="Go Back"
        >
          ←
        </button>
        <h2 className="font-balloony text-3xl md:text-4xl mb-2 text-center">Generate an Image</h2>
        
        {/* API Key input with Enter/go button and validation icon */}
        <div className="w-full flex flex-col gap-2 mb-1">
          <label className="flex gap-2 items-center font-semibold text-sm text-black/70" htmlFor="api-key-input">
            <KeyRound className="w-4 h-4" />
            Enter your API Key
          </label>
          <div className="w-full relative flex items-center">
            <Input
              id="api-key-input"
              placeholder="Paste or type your API key here"
              value={apiKey}
              type="password"
              onChange={e => {
                setApiKey(e.target.value);
                setApiKeyStatus("untouched");
              }}
              className="bg-white border-gray-200 pr-11"
              autoComplete="off"
              spellCheck={false}
              onKeyDown={handleApiKeyKeyDown}
              data-testid="api-key-input"
            />
            {/* Enter/arrow button or status icon on right */}
            <button
              type="button"
              onClick={apiKeyStatus === "valid" || apiKeyStatus === "invalid" ? undefined : handleValidateApiKey}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full hover:scale-105 transition-transform focus:outline-none"
              style={{ width: 32, height: 32 }}
              aria-label="Validate API key"
              tabIndex={-1}
              disabled={apiKeyStatus === "loading"}
            >
              {apiKeyStatus === "untouched" || apiKeyStatus === "loading" ? (
                <ArrowRight className="w-5 h-5 text-gray-500" />
              ) : (
                apiStatusIcon
              )}
            </button>
          </div>
          {apiKeyStatus === "valid" && (
            <span className="text-green-700 text-xs font-medium mt-1 flex items-center gap-1">
              <Check className="w-4 h-4" /> {apiStatusMsg}
            </span>
          )}
          {apiKeyStatus === "invalid" && (
            <span className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
              <X className="w-4 h-4" /> {apiStatusMsg}
            </span>
          )}
          {apiKeyStatus === "loading" && (
            <span className="text-gray-500 text-xs font-medium mt-1 flex items-center gap-1">
              <Loader2 className="w-4 h-4 animate-spin" /> Checking API Key...
            </span>
          )}
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
