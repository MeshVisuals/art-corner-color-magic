
import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { GenerateScreen } from "@/components/GenerateScreen";
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
      
      {currentScreen === 'generate' && (
        <GenerateScreen 
          onBack={navigateBack}
          onColorImage={navigateToPaint}
        />
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
