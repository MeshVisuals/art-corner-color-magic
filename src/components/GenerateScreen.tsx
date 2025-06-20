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
  { key: "bobby_goods", label: "Bobby Goods", prompt: "cute, comforting, nostalgic, hand-drawn childlike style with soft imperfections, smooth curves and organic asymmetry, expressive and slightly quirky facial features, playful pose with whimsical movement, clean open composition with no background, but allow for light ambient storytelling elements such as sparkles, plants, or small props, thick bold outlines with a subtle sketch feel, evoke warmth and whimsy like Bobbie Goods / Coco Wyo coloring books, line art only, black and white, no shading, coloring book page" },
  { key: "pixar", label: "Pixar", prompt: "Pixar character design style, clean polished cartoon concept-art line drawing, strong Pixar style emphasis, expressive oversized eyes or heads, subtly exaggerated rounded proportions, emotional and playful composition like Pixar animation sketches, square-format, smooth contour lines with a slight sketch feel, line art only, black and white, no shading, no background, coloring book page" },
  { key: "ghibli", label: "Ghibli", prompt: "Studio Ghibli character design style, expressive yet simple features with large emotive eyes and minimal nose/mouth, organic hand-drawn linework with subtle texture and variable stroke width, clean open composition with \"Ma\" (gentle empty space), light micro-environment details like leaves, grass, floating petals or wind lines, evoke quiet everyday wonder and nostalgia, square-format, line art only, black and white, no shading, coloring book page" },
  { key: "manga", label: "Manga", prompt: "Manga character design style, expressive large eyes and minimal nose/mouth, dynamic emotion iconography like sweatdrops, surprise lines or motion streaks, strong variable line weights—bold silhouette outlines with fine internal details, stylized poses or chibi proportions encouraged, clean minimal composition, hard black line art only with no screentones or gray fill, square-format, line art only, black and white, no shading, coloring book page" },
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
  const [showPrompt, setShowPrompt] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for saved API key only when window gains focus (coming back from settings)
  useEffect(() => {
    const checkApiKey = () => {
      console.log("🔑 checkApiKey called");
      const savedKey = localStorage.getItem('hf_api_key');
      const isValid = savedKey && validateApiKey(savedKey);
      
      // Only update state if values actually changed
      setApiKey(prev => {
        const newKey = isValid ? savedKey : "";
        if (prev !== newKey) {
          console.log("🔑 API key state changing:", prev, "->", newKey ? "***" : "empty");
        }
        return prev !== newKey ? newKey : prev;
      });
      setHasApiKey(prev => {
        const newHasKey = !!isValid;
        if (prev !== newHasKey) {
          console.log("🔑 hasApiKey state changing:", prev, "->", newHasKey);
        }
        return prev !== newHasKey ? newHasKey : prev;
      });
    };

    // Initial check on mount
    checkApiKey();

    // Check when window gains focus (returning from settings)
    const handleFocus = () => checkApiKey();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
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

    // AI Horde doesn't require API key - using anonymous access

    setLoading(true);
    setGeneratedUrl(null);
    setUploadedUrl(null);

    try {
      // Create enhanced prompt - Bobby Goods includes full specification, others need coloring book modifiers
      const selectedStyleObj = STYLES.find(s => s.key === selectedStyle);
      const stylePrompt = selectedStyleObj?.prompt || "cartoon style";
      
      let generatedEnhancedPrompt;
      if (selectedStyle === "bobby_goods" || selectedStyle === "pixar" || selectedStyle === "ghibli" || selectedStyle === "manga") {
        // All detailed style prompts already include coloring book specifications
        generatedEnhancedPrompt = `${prompt}, ${stylePrompt}`;
      } else {
        // Fallback for any future styles that need coloring book modifiers added
        generatedEnhancedPrompt = `${prompt}, ${stylePrompt}, coloring book page, black and white line art, thick outlines, no shading`;
      }
      
      // Store the enhanced prompt for the reveal functionality
      setEnhancedPrompt(generatedEnhancedPrompt);

      console.log("Making AI Horde request with prompt:", generatedEnhancedPrompt);
      
      // Using AI Horde - completely free unlimited API
      console.log("🚀 Making AI Horde request...");
      
      // Step 1: Submit generation request to AI Horde
      const submitResponse = await fetch("https://stablehorde.net/api/v2/generate/async", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "0000000000" // Anonymous usage
        },
        body: JSON.stringify({
          prompt: generatedEnhancedPrompt,
          params: {
            width: 512,
            height: 512,
            steps: 30,
            cfg_scale: 12,
            sampler_name: "k_dpmpp_2m",
            n: 1
          },
          nsfw: false,
          models: ["Deliberate"],
          r2: true
        })
      });

      if (!submitResponse.ok) {
        throw new Error(`AI Horde submit failed: ${submitResponse.status}`);
      }

      const submitData = await submitResponse.json();
      const requestId = submitData.id;
      console.log("✅ Request submitted, ID:", requestId);

      // Step 2: Poll for completion
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const checkResponse = await fetch(`https://stablehorde.net/api/v2/generate/check/${requestId}`);
        if (!checkResponse.ok) {
          throw new Error(`AI Horde check failed: ${checkResponse.status}`);
        }
        
        const checkData = await checkResponse.json();
        console.log("📊 Status check:", checkData);
        
        if (checkData.done) {
          // Step 3: Get the generated image
          const statusResponse = await fetch(`https://stablehorde.net/api/v2/generate/status/${requestId}`);
          if (!statusResponse.ok) {
            throw new Error(`AI Horde status failed: ${statusResponse.status}`);
          }
          
          const statusData = await statusResponse.json();
          if (statusData.generations && statusData.generations.length > 0) {
            const imageUrl = statusData.generations[0].img;
            console.log("🖼️ Image generated:", imageUrl);
            
            // AI Horde returns direct image URLs, not base64
            setGeneratedUrl(imageUrl);
            setLoading(false);
            
            toast({
              title: "Image generated!",
              description: "Your coloring page is ready!",
              className: "bg-green-100 border-green-200 text-green-800"
            });
            return;
          }
        }
        
        attempts++;
      }
      
      throw new Error("Generation timed out after 5 minutes");
      
      console.log("✅ Fetch completed, response status:", response.status);

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response body:", errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Handle Hugging Face API response - returns image as blob
      console.log("Response content-type:", response.headers.get('content-type'));
      console.log("Response size:", response.headers.get('content-length'));
      
      if (response.headers.get('content-type')?.includes('image')) {
        const blob = await response.blob();
        console.log("Blob size:", blob.size, "Blob type:", blob.type);
        
        // Check if it's actually an image by reading first few bytes
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const firstBytes = Array.from(uint8Array.slice(0, 10)).map(b => b.toString(16).padStart(2, '0')).join(' ');
        console.log("First 10 bytes:", firstBytes);
        
        // JPEG should start with FF D8, PNG with 89 50 4E 47
        if (uint8Array[0] !== 0xFF || uint8Array[1] !== 0xD8) {
          // Not a valid JPEG, let's see what it actually contains
          const text = new TextDecoder().decode(arrayBuffer.slice(0, 200));
          console.log("Response appears to be text, not image:", text);
          throw new Error("API returned text instead of image: " + text.substring(0, 100));
        }
        
        if (blob.size === 0) {
          throw new Error("Received empty image blob from API");
        }
        
        const imageUrl = URL.createObjectURL(blob);
        console.log("Created image URL:", imageUrl);
        setGeneratedUrl(imageUrl);
      } else {
        const result = await response.json();
        console.log("FLUX API response:", result);
        
        if (result.error) {
          throw new Error(result.error);
        } else {
          throw new Error("Unexpected response format from Hugging Face API");
        }
      }

      toast({
        title: "Image generated!",
        description: "Your coloring page is ready!",
        className: "bg-green-100 border-green-200 text-green-800"
      });

    } catch (error) {
      console.error("Generation error:", error);
      console.error("Error type:", error instanceof Error ? error.name : typeof error);
      console.error("Error message:", error instanceof Error ? error.message : String(error));
      let errorMessage = "Please try again or check your API key.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Request timed out after 30 seconds. Please try again.";
        } else if (error.message.includes('401')) {
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
    
    console.log("🎲 Skip button pressed, selected image:", randomImage);
    
    // Show the image in the generation screen first, then user can click Color This
    setUploadedUrl(randomImage);
    setGeneratedUrl(null);
    setShowPrompt(false);
    setLoading(false);
    
    toast({
      title: "Skipped image generation!",
      description: "Here's a beautiful coloring page to get you started!",
      className: "bg-white border-gray-300 text-gray-900"
    });
  }

  function handleRedo() {
    setGeneratedUrl(null);
    setUploadedUrl(null);
    setShowPrompt(false);
    setEnhancedPrompt("");
  }

  function handleRevealPrompt() {
    setShowPrompt(true);
  }


  const displayImageUrl = uploadedUrl || generatedUrl;
  
  // Only log when image state changes, not on every keystroke
  React.useEffect(() => {
    if (displayImageUrl || uploadedUrl || generatedUrl) {
      console.log("🖼️ IMAGE STATE:", {
        displayImageUrl, 
        uploadedUrl, 
        generatedUrl,
        timestamp: new Date().toLocaleTimeString()
      });
    }
  }, [displayImageUrl, uploadedUrl, generatedUrl]);

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

        {/* Two Column Layout - 1/3 controls, 2/3 image */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT COLUMN - Controls */}
          <div className="space-y-10 flex flex-col items-end pr-8">
            {/* Prompt Input */}
            <div className="w-full flex justify-end">
              <div className="w-full max-w-lg">
                <PromptInput prompt={prompt} setPrompt={setPrompt} loading={loading} onEnter={handleGenerate} />
              </div>
            </div>

            {/* Style Selector */}
            <div className="w-full flex justify-end">
              <StyleSelector
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                STYLES={STYLES}
              />
            </div>

            {/* Upload, Skip, Generate buttons */}
            <div className="w-full space-y-8 flex flex-col items-end">
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
                onRevealPrompt={generatedUrl ? handleRevealPrompt : undefined}
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Image Display (spans 2 columns = 2/3) */}
          <div className="col-span-2 w-full flex justify-end items-start pl-8">
            <ImageDisplay 
              loading={loading} 
              displayImageUrl={displayImageUrl} 
              prompt={prompt} 
              showPrompt={showPrompt}
              enhancedPrompt={enhancedPrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
