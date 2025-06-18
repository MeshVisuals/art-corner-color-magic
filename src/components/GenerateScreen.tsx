import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Settings } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { FloatingDecorBackground } from "./FloatingDecorBackground";
import { GenerateOrContinueButton } from "./GenerateOrContinueButton";
import { ImageDisplay } from "./ImageDisplay";
import { PromptInput } from "./PromptInput";
import { StyleSelector } from "./StyleSelector";
import { UploadAndSkipButtons } from "./UploadAndSkipButtons";

interface GenerateScreenProps {
  onBack: () => void;
  onColorImage: (imageUrl: string) => void;
  onSettings?: () => void;
}

const STYLES = [
  { key: "bobby_goods", label: "Bobby Goods" },
  { key: "pixar", label: "Pixar" },
  { key: "disney", label: "Disney" },
  { key: "manga", label: "Manga" },
];

// All coloring page images from lovable-uploads folder (excluding Vanessa.png)
const PRESET_IMAGES = [
  "/lovable-uploads/0.png",
  "/lovable-uploads/0f9defed-ff18-4dd5-866b-3ff6c5fa3b5b.png",
  "/lovable-uploads/1167739c-c152-4105-a557-217d3fd74080.png",
  "/lovable-uploads/17c5a5b4-acf6-48aa-8a0b-c47c7bd553ab.png",
  "/lovable-uploads/18104844-4828-4fde-98b3-6a9ce5c3de2d.png",
  "/lovable-uploads/2ef77181-4213-4752-9572-da21ca1b2651.png",
  "/lovable-uploads/84079a02-d4a9-4396-84ac-0bc0297ce8cb.png",
  "/lovable-uploads/8eff0c06-2eee-467c-b0f5-82367d9d2347.png",
  "/lovable-uploads/afe66581-25b7-4114-9306-f9b7be26e040.png",
  "/lovable-uploads/b0dd923e-fc81-4766-84de-cb362b862ef4.png",
  "/lovable-uploads/b57ae84e-efc6-4f7e-ad40-299c478b420d.png",
  "/lovable-uploads/cead8119-124d-4658-a353-bcd6141cca32.png",
  "/lovable-uploads/db3515c3-7ac0-4340-bec8-7fee77576f37.png",
  "/lovable-uploads/dc030de0-0e63-46b3-b45f-9ac0247657c2.png"
];

// Validate Hugging Face API key format
function validateApiKey(key: string) {
  return key.trim().startsWith('hf_') && key.trim().length >= 20;
}

export const GenerateScreen: React.FC<GenerateScreenProps> = ({
  onBack,
  onColorImage,
  onSettings,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string>("bobby_goods");
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for saved API key on component mount and when window gains focus
  useEffect(() => {
    const checkApiKey = () => {
      const savedKey = localStorage.getItem('hf_api_key');
      if (savedKey && validateApiKey(savedKey)) {
        setApiKey(savedKey);
        setHasApiKey(true);
      } else {
        setApiKey("");
        setHasApiKey(false);
      }
    };

    // Check immediately
    checkApiKey();

    // Also check when window gains focus (e.g., coming back from settings)
    const handleFocus = () => checkApiKey();
    window.addEventListener('focus', handleFocus);
    
    // Check periodically in case localStorage was updated by another tab
    const interval = setInterval(checkApiKey, 1000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

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

    // Removed API key check since we're using free Spaces

    setLoading(true);
    setGeneratedUrl(null);
    setUploadedUrl(null);

    try {
      // Create enhanced prompt with style
      const stylePrompt = STYLES.find(s => s.key === selectedStyle)?.label || "cartoon style";
      const enhancedPrompt = `${prompt}, ${stylePrompt} coloring book page, black and white line art, simple outlines, no shading`;

      console.log("Making API request with prompt:", enhancedPrompt);
      console.log("API Key starts with:", apiKey.substring(0, 10) + "...");
      
      const response = await fetch(
        "https://multimodalart-flux-lora-the-explorer.hf.space/gradio_api/run/generate_image",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            data: [
              enhancedPrompt,  // prompt
              "None",          // lora_selection
              512,             // width  
              512,             // height
              4,               // num_inference_steps
              3.5,             // guidance_scale
              42               // seed
            ],
            fn_index: 0
          }),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response body:", errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log("FLUX Dev response:", result);
      
      // Handle FLUX response - typically returns image path or URL
      if (result.data && result.data[0]) {
        const imageData = result.data[0];
        
        // Check if it's a URL or file path
        if (typeof imageData === 'string' && imageData.startsWith('http')) {
          setGeneratedUrl(imageData);
        } else if (typeof imageData === 'string' && imageData.startsWith('/')) {
          // Convert relative path to full Space URL
          const imageUrl = `https://black-forest-labs-flux-1-dev.hf.space/file=${imageData}`;
          setGeneratedUrl(imageUrl);
        } else {
          setGeneratedUrl(imageData);
        }
      } else {
        throw new Error("Unexpected response format from FLUX Space");
      }

      toast({
        title: "Image generated!",
        description: "Your coloring page is ready!",
        className: "bg-green-100 border-green-200 text-green-800"
      });

    } catch (error) {
      console.error("Generation error:", error);
      let errorMessage = "Please try again or check your API key.";
      
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          errorMessage = "Invalid API key. Please check your settings.";
        } else if (error.message.includes('402')) {
          errorMessage = "API usage limit reached. You may need to upgrade your Hugging Face plan or wait for monthly reset.";
        } else if (error.message.includes('503')) {
          errorMessage = "Service temporarily unavailable. Try again in a moment.";
        } else if (error.message.includes('429')) {
          errorMessage = "Rate limit exceeded. Please wait before trying again.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      toast({
        title: "Generation failed!",
        description: errorMessage,
        className: "bg-red-100 border-red-200 text-red-800"
      });
    } finally {
      setLoading(false);
    }
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
      className: "bg-white border-gray-300 text-gray-900"
    });
    onColorImage(randomImage);
  }

  function handleRedo() {
    setGeneratedUrl(null);
    setUploadedUrl(null);
  }


  const displayImageUrl = uploadedUrl || generatedUrl;

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-10 px-3 relative overflow-hidden">
      <FloatingDecorBackground />
      <div className="w-full max-w-xl p-7 flex flex-col gap-5 items-center relative" style={{ zIndex: 10 }}>
        <Button
          variant="cartoonOutline"
          size="cartoon"
          className="absolute -left-[80px] top-20"
          onClick={onBack}
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center mb-6">
          {/* API Key Status - Clickable */}
          <div className="flex items-center justify-center mb-4">
            {hasApiKey ? (
              <button
                onClick={onSettings}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full hover:bg-green-200 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700 font-medium">API Key Configured</span>
              </button>
            ) : (
              <button
                onClick={onSettings}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-full hover:bg-yellow-200 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-700 font-medium">API Key Required - Click to Configure</span>
              </button>
            )}
          </div>
          
          <h2 className="moodcake-font text-5xl font-black text-[#F7D04B] mb-2" 
              style={{ 
                WebkitTextStroke: "1px #2A2320", 
                textShadow: "4px 4px 0px #2A2320, -2px -2px 0px #2A2320, 2px -2px 0px #2A2320, -2px 2px 0px #2A2320",
                filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
              }}>
            Generate an Image
          </h2>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-[10px_1fr_10px] gap-12 w-full max-w-full px-1">
          {/* LEFT COLUMN - Style Selector */}
          <div className="space-y-4 relative -left-[120px]">
            <StyleSelector
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              STYLES={STYLES}
            />
          </div>

          {/* CENTER COLUMN - Image Display */}
          <div className="space-y-4">
            <ImageDisplay loading={loading} displayImageUrl={displayImageUrl} prompt={prompt} />
          </div>

          {/* RIGHT COLUMN - Upload, Skip, Generate buttons */}
          <div className="space-y-10">
            <UploadAndSkipButtons
              onUploadClick={handleUploadClick}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
              onSkip={handleSkip}
            />
            <GenerateOrContinueButton
              displayImageUrl={displayImageUrl}
              loading={loading}
              onGenerate={handleGenerate}
              onContinue={handleContinue}
              onRedo={handleRedo}
            />
          </div>
        </div>

        {/* Prompt Input at Bottom - Full Width */}
        <div className="w-full max-w-4xl mt-6">
          <PromptInput prompt={prompt} setPrompt={setPrompt} loading={loading} onEnter={handleGenerate} />
        </div>
      </div>
    </div>
  );
};
