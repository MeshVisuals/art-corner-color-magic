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
import { ArrowLeft } from "lucide-react";

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

// Updated preset images from the new uploads
const PRESET_IMAGES = [
  "/lovable-uploads/17c5a5b4-acf6-48aa-8a0b-c47c7bd553ab.png",
  "/lovable-uploads/db3515c3-7ac0-4340-bec8-7fee77576f37.png",
  "/lovable-uploads/dc030de0-0e63-46b3-b45f-9ac0247657c2.png",
  "/lovable-uploads/8eff0c06-2eee-467c-b0f5-82367d9d2347.png",
  "/lovable-uploads/cead8119-124d-4658-a353-bcd6141cca32.png",
  "/lovable-uploads/1167739c-c152-4105-a557-217d3fd74080.png",
  "/lovable-uploads/b0dd923e-fc81-4766-84de-cb362b862ef4.png",
  "/lovable-uploads/2ef77181-4213-4752-9572-da21ca1b2651.png",
  "/lovable-uploads/b57ae84e-efc6-4f7e-ad40-299c478b420d.png",
  "/lovable-uploads/18104844-4828-4fde-98b3-6a9ce5c3de2d.png"
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
    // Select a random preset image from the new uploads
    const randomImage = PRESET_IMAGES[Math.floor(Math.random() * PRESET_IMAGES.length)];
    toast({
      title: "Skipped image generation!",
      description: "Here's a beautiful coloring page to get you started!",
      className: "bg-yellow-100 border-yellow-300 text-yellow-900"
    });
    onColorImage(randomImage);
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
        <Button
          variant="cartoonOutline"
          size="cartoon"
          className="absolute left-5 top-5"
          onClick={onBack}
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
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
