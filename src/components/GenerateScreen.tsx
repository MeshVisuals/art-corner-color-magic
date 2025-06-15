
import React, { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ApiKeyInput } from "./ApiKeyInput";
import { FloatingDecorBackground } from "./FloatingDecorBackground";
import { ImageDisplay } from "./ImageDisplay";
import { PromptInput } from "./PromptInput";
import { StyleSelector } from "./StyleSelector";
import { UploadAndSkipButtons } from "./UploadAndSkipButtons";
import { GenerateOrContinueButton } from "./GenerateOrContinueButton";

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
      const img = "https://placehold.co/512x512/png?text=" +
        encodeURIComponent(`${prompt} (${STYLES.find(s => s.key === selectedStyle)?.label})`);
      setGeneratedUrl(img);
      setLoading(false);
    }, 1800);
  }

  function handleContinue() {
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
    onColorImage("https://placehold.co/512x512/png?text=Let%27s+Color!");
  }

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

  function handleApiKeyKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleValidateApiKey();
    }
  }

  const displayImageUrl = uploadedUrl || generatedUrl;

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-10 px-3 relative overflow-hidden">
      <FloatingDecorBackground />
      <div className="w-full max-w-xl p-7 flex flex-col gap-5 items-center relative" style={{ zIndex: 10 }}>
        <button
          className="absolute left-5 top-5 text-black/50 hover:text-black text-lg"
          onClick={onBack}
          aria-label="Go Back"
        >
          ←
        </button>
        <h2 className="font-balloony text-3xl md:text-4xl mb-2 text-center">Generate an Image</h2>
        <ApiKeyInput
          apiKey={apiKey}
          apiKeyStatus={apiKeyStatus}
          onApiKeyChange={value => {
            setApiKey(value);
            setApiKeyStatus("untouched");
          }}
          onValidate={handleValidateApiKey}
          onApiKeyKeyDown={handleApiKeyKeyDown}
        />
        <ImageDisplay loading={loading} displayImageUrl={displayImageUrl} prompt={prompt} />
        <UploadAndSkipButtons
          onUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onSkip={handleSkip}
        />
        <PromptInput prompt={prompt} setPrompt={setPrompt} loading={loading} />
        <StyleSelector
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          STYLES={STYLES}
        />
        <GenerateOrContinueButton
          displayImageUrl={displayImageUrl}
          loading={loading}
          onGenerate={handleGenerate}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};
