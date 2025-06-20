
import React from "react";
import { Loader2 } from "lucide-react";

interface ImageDisplayProps {
  loading: boolean;
  displayImageUrl?: string | null;
  prompt: string;
  showPrompt?: boolean;
  enhancedPrompt?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  loading,
  displayImageUrl,
  prompt,
  showPrompt,
  enhancedPrompt
}) => {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center mb-3">
      {loading ? (
        <div 
          className="rounded-xl shadow-xl relative overflow-hidden flex items-center justify-center"
          style={{ 
            maxHeight: '90vh',
            maxWidth: '90%',
            minWidth: '500px', 
            minHeight: '500px',
            backgroundImage: "url('/lovable-uploads/ChatGPT Image Jun 20, 2025, 12_06_20 PM.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Faded overlay */}
          <div 
            className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"
            style={{ zIndex: 1 }}
          />
          {/* Loading content */}
          <div className="flex flex-col items-center relative" style={{ zIndex: 2 }}>
            <Loader2 className="animate-spin mb-2 w-12 h-12 text-primary" />
            <div className="font-extrabold text-[#2A2320]">Letting my imagination run wild...</div>
          </div>
        </div>
      ) : showPrompt && enhancedPrompt ? (
        <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-6 flex flex-col justify-center" style={{ maxHeight: '90vh', maxWidth: '90%', minWidth: '500px', minHeight: '500px' }}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Generated Prompt</h3>
          <div 
            className="bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 select-all cursor-text leading-relaxed max-h-80 overflow-y-auto"
            style={{ wordBreak: 'break-word' }}
          >
            {enhancedPrompt}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Click and drag to select the text above, then copy it to use in ChatGPT</p>
        </div>
      ) : (
        <div 
          className="rounded-xl shadow-xl max-w-[850px] max-h-[850px] relative overflow-hidden"
          style={{ 
            minWidth: '500px', 
            minHeight: '500px',
            backgroundImage: "url('/lovable-uploads/ChatGPT Image Jun 20, 2025, 12_06_20 PM.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Faded overlay only when there's a generated image */}
          {displayImageUrl && (
            <div 
              className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"
              style={{ zIndex: 1 }}
            />
          )}
          {/* Generated/uploaded image if exists */}
          {displayImageUrl ? (
            <img
              src={displayImageUrl}
              alt={prompt || "Colored image"}
              className="relative rounded-xl transition-all w-full h-full object-contain"
              style={{ zIndex: 2 }}
              onError={(e) => {
                console.error("Image failed to load:", displayImageUrl);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log("Image loaded successfully:", displayImageUrl);
              }}
            />
          ) : (
            <div 
              className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold text-center p-4"
              style={{ 
                zIndex: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              Generate or upload an image to start coloring!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
