
import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
// Removed GenerateScreen import
import { PaintScreen } from "@/components/PaintScreen";

type Screen = 'welcome' | 'generate' | 'paint';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');

  const navigateToGenerate = () => {
    setCurrentScreen('generate');
  };

  const navigateToPaint = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setCurrentScreen('paint');
  };

  const navigateBack = () => {
    if (currentScreen === 'paint') {
      setCurrentScreen('generate');
    } else if (currentScreen === 'generate') {
      setCurrentScreen('welcome');
    }
  };

  return (
    <div className="page-transition">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartNow={navigateToGenerate} />
      )}
      
      {/* The GenerateScreen is removed; nothing renders for 'generate' now */}
      {currentScreen === 'generate' && (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="text-2xl font-bold text-red-400 mb-4">This page has been removed.</div>
          <button
            className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow hover:bg-primary/90"
            onClick={navigateBack}
          >
            Go Back
          </button>
        </div>
      )}
      
      {currentScreen === 'paint' && currentImageUrl && (
        <PaintScreen 
          imageUrl={currentImageUrl}
          onBack={navigateBack}
        />
      )}
    </div>
  );
};

export default Index;
