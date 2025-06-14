
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Heart } from "lucide-react";

interface WelcomeScreenProps {
  onStartNow: () => void;
}

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen dreamy-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Sparkles className="w-6 h-6 text-primary/40" />
      </div>
      <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Heart className="w-5 h-5 text-accent/50" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Palette className="w-7 h-7 text-secondary/60" />
      </div>

      {/* Main content */}
      <div className="text-center max-w-md w-full animate-fade-in">
        {/* Title */}
        <h1 className="font-balloony text-4xl md:text-5xl font-light text-foreground mb-8 text-shadow-soft leading-tight">
          Van's Little
          <br />
          <span className="text-primary font-semibold">Art Corner</span>
        </h1>

        {/* Illustration container */}
        <div className="balloon-frame p-8 mb-12 animate-gentle-pulse">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
            <svg 
              viewBox="0 0 200 200" 
              className="w-32 h-32 text-primary/70"
              fill="currentColor"
            >
              <path d="M100 20c-44.18 0-80 35.82-80 80 0 20 8 40 20 60 12 20 28 40 60 40s48-20 60-40c12-20 20-40 20-60 0-44.18-35.82-80-80-80zm0 140c-33.14 0-60-26.86-60-60s26.86-60 60-60 60 26.86 60 60-26.86 60-60 60z"/>
              <circle cx="80" cy="90" r="8"/>
              <circle cx="120" cy="90" r="8"/>
              <path d="M75 120c5 10 15 15 25 15s20-5 25-15" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-muted-foreground mt-4 text-sm font-light">
            Create • Color • Share
          </p>
        </div>

        {/* Start button */}
        <Button 
          onClick={onStartNow}
          size="lg"
          className="w-full py-4 text-lg font-medium rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Start Creating ✨
        </Button>

        <p className="text-muted-foreground text-xs mt-6 font-light">
          Generate coloring book art • Paint digitally • Export your creations
        </p>
      </div>
    </div>
  );
};
