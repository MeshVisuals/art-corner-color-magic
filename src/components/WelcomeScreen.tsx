
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Heart, Star } from "lucide-react";

interface WelcomeScreenProps {
  onStartNow: () => void;
}

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-16 left-8 animate-float">
        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
      </div>
      <div className="absolute top-24 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
      </div>
      <div className="absolute top-40 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-7 h-7 text-purple-500" />
      </div>
      <div className="absolute bottom-60 right-16 animate-float" style={{ animationDelay: '1.5s' }}>
        <Star className="w-6 h-6 text-blue-400 fill-blue-400" />
      </div>
      <div className="absolute top-60 right-6 animate-float" style={{ animationDelay: '2s' }}>
        <Heart className="w-8 h-8 text-red-400 fill-red-400" />
      </div>
      <div className="absolute bottom-80 left-12 animate-float" style={{ animationDelay: '2.5s' }}>
        <Sparkles className="w-6 h-6 text-green-500" />
      </div>
      <div className="absolute top-80 left-6 animate-float" style={{ animationDelay: '3s' }}>
        <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
      </div>

      {/* Main content */}
      <div className="text-center max-w-md w-full animate-fade-in">
        {/* Title with cartoon bubble style matching the image */}
        <div className="mb-8">
          <h1 className="font-black text-5xl md:text-6xl mb-4 transform -rotate-2" 
              style={{ 
                fontFamily: 'Nunito, sans-serif',
                color: '#FF6B9D',
                textShadow: `
                  4px 4px 0px #000000,
                  -2px -2px 0px #000000,
                  2px -2px 0px #000000,
                  -2px 2px 0px #000000,
                  0px 4px 0px #000000,
                  4px 0px 0px #000000,
                  6px 6px 0px #000000
                `,
                letterSpacing: '0.1em',
                WebkitTextStroke: '2px #000000'
              }}>
            VANESSA'S
          </h1>
          <h2 className="font-black text-4xl md:text-5xl leading-tight transform rotate-1"
              style={{ 
                fontFamily: 'Nunito, sans-serif',
                color: '#4ECDC4',
                textShadow: `
                  4px 4px 0px #000000,
                  -2px -2px 0px #000000,
                  2px -2px 0px #000000,
                  -2px 2px 0px #000000,
                  0px 4px 0px #000000,
                  4px 0px 0px #000000,
                  6px 6px 0px #000000
                `,
                letterSpacing: '0.1em',
                WebkitTextStroke: '2px #000000'
              }}>
            LITTLE ART
            <br />
            <span style={{ color: '#FFE66D' }}>CORNER</span>
          </h2>
        </div>

        {/* Central image container - this should be the uploaded image */}
        <div className="bg-white p-6 mb-8 rounded-3xl border-6 border-black shadow-2xl animate-gentle-pulse">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-2xl flex items-center justify-center border-4 border-black relative overflow-hidden">
            {/* Placeholder for the actual uploaded image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Palette className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <p className="text-black font-bold text-lg">Your Art Here!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start button with cartoon style */}
        <Button 
          onClick={onStartNow}
          size="lg"
          className="w-full py-6 text-2xl font-black rounded-2xl transition-all duration-300 hover:scale-105 border-4 border-black shadow-lg hover:shadow-xl"
          style={{ 
            backgroundColor: '#FF6B9D',
            color: 'white',
            textShadow: '2px 2px 0px #000000',
            letterSpacing: '0.05em'
          }}
        >
          START CREATING! ✨
        </Button>

        <p className="text-black text-lg mt-6 font-bold">
          Generate • Color • Share Your Art!
        </p>
      </div>

      {/* MeshCode 2025 at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-black font-bold text-sm opacity-80">
          MeshCode 2025
        </p>
      </div>
    </div>
  );
};
