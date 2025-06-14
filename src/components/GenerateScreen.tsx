
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Wand2, Download, Palette, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GenerateScreenProps {
  onBack: () => void;
  onColorImage: (imageUrl: string) => void;
}

export const GenerateScreen = ({ onBack, onColorImage }: GenerateScreenProps) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const bobbyGoodsTemplate = `Create a simple, clean coloring book style line art drawing of {PROMPT}. 
Style: Bobby Goods aesthetic - minimalist line art, cute and cozy, simple shapes, clear outlines.
Requirements: 
- Black lines on white background only
- No shading, no fills, no colors
- Simple, rounded, friendly shapes
- Clean vector-style line work perfect for coloring
- Whimsical and adorable character design
- Thick, clear outlines suitable for digital coloring
- Minimal detail, maximum charm
- White background, black lines only`;

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to generate images.",
        variant: "destructive"
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required", 
        description: "Please enter what you'd like to create!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    localStorage.setItem('openai_api_key', apiKey);

    try {
      const fullPrompt = bobbyGoodsTemplate.replace('{PROMPT}', prompt);
      
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(data.data[0].url);
      
      toast({
        title: "✨ Image Generated!",
        description: "Your coloring book art is ready!"
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadOriginal = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `coloring-art-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen dreamy-gradient p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-balloony text-2xl font-semibold text-foreground">
            Generate Art
          </h1>
        </div>

        {/* Input Form */}
        <Card className="cozy-card p-6 mb-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="apiKey" className="text-sm font-medium">
                OpenAI API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="mt-2 rounded-xl"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your key is stored locally and never shared
              </p>
            </div>

            <div>
              <Label htmlFor="prompt" className="text-sm font-medium">
                What would you like to create?
              </Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="a cute bunny, a cozy house, a friendly dragon..."
                className="mt-2 rounded-xl resize-none h-20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Describe your idea - we'll create it in Bobby Goods style!
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Art
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Generated Image */}
        {generatedImage && (
          <Card className="cozy-card p-6 animate-fade-in">
            <div className="text-center">
              <img
                src={generatedImage}
                alt="Generated coloring art"
                className="w-full max-w-md mx-auto rounded-xl shadow-lg"
              />
              
              <div className="flex gap-3 mt-6 justify-center">
                <Button
                  onClick={() => onColorImage(generatedImage)}
                  className="flex-1 max-w-40 rounded-xl bg-primary hover:bg-primary/90"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Color It
                </Button>
                
                <Button
                  onClick={handleDownloadOriginal}
                  variant="outline"
                  className="flex-1 max-w-40 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
