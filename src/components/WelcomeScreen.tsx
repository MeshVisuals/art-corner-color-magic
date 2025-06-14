
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Heart, Star } from "lucide-react";

interface WelcomeScreenProps {
  onStartNow: () => void;
}

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-orange-200 to-amber-300 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-16 left-8 animate-float">
        <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
      </div>
      <div className="absolute top-24 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
      </div>
      <div className="absolute top-40 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-yellow-500" />
      </div>
      <div className="absolute bottom-60 right-16 animate-float" style={{ animationDelay: '1.5s' }}>
        <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
      </div>
      <div className="absolute top-60 right-6 animate-float" style={{ animationDelay: '2s' }}>
        <Heart className="w-7 h-7 text-red-400 fill-red-400" />
      </div>
      <div className="absolute bottom-80 left-12 animate-float" style={{ animationDelay: '2.5s' }}>
        <Sparkles className="w-5 h-5 text-amber-500" />
      </div>
      <div className="absolute top-80 left-6 animate-float" style={{ animationDelay: '3s' }}>
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      </div>

      {/* Main content */}
      <div className="text-center max-w-md w-full animate-fade-in">
        {/* Title with cartoon style */}
        <div className="mb-8">
          <h1 className="font-balloony text-3xl md:text-4xl font-black text-orange-600 mb-2 transform -rotate-1" 
              style={{ 
                textShadow: '4px 4px 0px #7c2d12, 6px 6px 0px #000000',
                letterSpacing: '0.05em'
              }}>
            VANESSA'S
          </h1>
          <h2 className="font-balloony text-4xl md:text-5xl font-black text-amber-100 leading-tight transform rotate-1"
              style={{ 
                textShadow: '4px 4px 0px #92400e, 6px 6px 0px #000000',
                letterSpacing: '0.05em'
              }}>
            LITTLE ART
            <br />
            CORNER
          </h2>
        </div>

        {/* Illustration container */}
        <div className="bg-white/95 backdrop-blur-sm p-8 mb-8 rounded-3xl border-4 border-orange-600 shadow-xl animate-gentle-pulse">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-teal-300 to-orange-300 rounded-full flex items-center justify-center border-4 border-orange-500">
            <svg 
              viewBox="0 0 200 200" 
              className="w-32 h-32 text-orange-700"
              fill="currentColor"
            >
              <path d="M100 20c-44.18 0-80 35.82-80 80 0 20 8 40 20 60 12 20 28 40 60 40s48-20 60-40c12-20 20-40 20-60 0-44.18-35.82-80-80-80zm0 140c-33.14 0-60-26.86-60-60s26.86-60 60-60 60 26.86 60 60-26.86 60-60 60z"/>
              <circle cx="80" cy="90" r="8"/>
              <circle cx="120" cy="90" r="8"/>
              <path d="M75 120c5 10 15 15 25 15s20-5 25-15" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-orange-800 font-bold mt-4 text-lg">
            Create • Color • Share
          </p>
        </div>

        {/* Start button */}
        <Button 
          onClick={onStartNow}
          size="lg"
          className="w-full py-4 text-xl font-black rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-orange-700"
          style={{ 
            textShadow: '2px 2px 0px #7c2d12'
          }}
        >
          Start Creating ✨
        </Button>

        <p className="text-orange-800 text-sm mt-6 font-bold">
          Generate coloring book art • Paint digitally • Export your creations
        </p>
      </div>

      {/* MeshCode 2025 at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-teal-800 font-bold text-sm opacity-80">
          MeshCode 2025
        </p>
      </div>
    </div>
  );
};
