
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Heart, Star, Cloud } from "lucide-react";

interface WelcomeScreenProps {
  onStartNow: () => void;
}

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-16 left-8 animate-float">
        <Star className="w-8 h-8 text-yellow-500 fill-yellow-400" />
      </div>
      <div className="absolute top-24 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-7 h-7 text-pink-400 fill-pink-400" />
      </div>
      <div className="absolute top-40 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-7 h-7 text-purple-400" />
      </div>
      <div className="absolute bottom-60 right-16 animate-float" style={{ animationDelay: '1.5s' }}>
        <Star className="w-6 h-6 text-orange-400 fill-orange-400" />
      </div>
      <div className="absolute top-60 right-6 animate-float" style={{ animationDelay: '2s' }}>
        <Heart className="w-8 h-8 text-red-300 fill-red-300" />
      </div>
      <div className="absolute bottom-80 left-12 animate-float" style={{ animationDelay: '2.5s' }}>
        <Sparkles className="w-6 h-6 text-teal-400" />
      </div>
      <div className="absolute top-80 left-6 animate-float" style={{ animationDelay: '3s' }}>
        <Star className="w-5 h-5 text-indigo-400 fill-indigo-400" />
      </div>

      {/* Main content */}
      <div className="text-center max-w-md w-full animate-fade-in">
        {/* Title with cartoon style */}
        <div className="mb-8">
          <h1 className="font-baloo font-extrabold text-5xl md:text-6xl mb-4 transform -rotate-2 text-pink-500" 
              style={{ 
                textShadow: `
                  3px 3px 0px #000000,
                  -1px -1px 0px #000000,
                  1px -1px 0px #000000,
                  -1px 1px 0px #000000,
                  0px 3px 0px #000000,
                  3px 0px 0px #000000
                `,
                letterSpacing: '0.05em'
              }}>
            VANESSA'S
          </h1>
          <h2 className="font-baloo font-extrabold text-4xl md:text-5xl leading-tight transform rotate-1 text-teal-500"
              style={{ 
                textShadow: `
                  3px 3px 0px #000000,
                  -1px -1px 0px #000000,
                  1px -1px 0px #000000,
                  -1px 1px 0px #000000,
                  0px 3px 0px #000000,
                  3px 0px 0px #000000
                `,
                letterSpacing: '0.05em'
              }}>
            LITTLE ART
            <br />
            <span className="text-yellow-500">CORNER</span>
          </h2>
        </div>

        {/* Cloud-shaped image container */}
        <div className="mb-8 relative">
          <div className="relative">
            {/* Cloud shape using multiple rounded divs */}
            <div className="relative w-80 h-64 mx-auto">
              {/* Main cloud body */}
              <div className="absolute bottom-0 left-8 right-8 h-32 bg-white rounded-full border-4 border-black shadow-lg"></div>
              {/* Cloud bumps */}
              <div className="absolute bottom-16 left-4 w-20 h-20 bg-white rounded-full border-4 border-black"></div>
              <div className="absolute bottom-20 left-16 w-24 h-24 bg-white rounded-full border-4 border-black"></div>
              <div className="absolute bottom-24 left-28 w-28 h-28 bg-white rounded-full border-4 border-black"></div>
              <div className="absolute bottom-20 right-16 w-24 h-24 bg-white rounded-full border-4 border-black"></div>
              <div className="absolute bottom-16 right-4 w-20 h-20 bg-white rounded-full border-4 border-black"></div>
              <div className="absolute bottom-28 right-24 w-20 h-20 bg-white rounded-full border-4 border-black"></div>
              
              {/* Content inside cloud */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pb-4">
                <div className="text-center">
                  <Palette className="w-16 h-16 mx-auto mb-3 text-purple-600" />
                  <p className="text-black font-fredoka font-bold text-lg">Your Art Here!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start button with cartoon style */}
        <Button 
          onClick={onStartNow}
          size="lg"
          className="w-full py-6 text-2xl font-baloo font-bold rounded-3xl transition-all duration-300 hover:scale-105 border-4 border-black shadow-lg hover:shadow-xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
          style={{ 
            textShadow: '2px 2px 0px #000000',
            letterSpacing: '0.05em'
          }}
        >
          START CREATING! ✨
        </Button>

        <p className="text-gray-700 text-lg mt-6 font-fredoka font-medium">
          Generate • Color • Share Your Art!
        </p>
      </div>

      {/* MeshCode 2025 at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-gray-600 font-fredoka font-medium text-sm">
          MeshCode 2025
        </p>
      </div>
    </div>
  );
};
