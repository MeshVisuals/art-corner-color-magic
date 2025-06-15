
import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { GenerateScreen } from "@/components/GenerateScreen";
import { PaintScreen } from "@/components/PaintScreen";

/**
 * Animated page wrapper for fade transitions between screens.
 */
const AnimatedScreen = ({ children, show }: { children: React.ReactNode, show: boolean }) => (
  <div
    className={`transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"} min-h-[100vh]`}
    style={{ pointerEvents: show ? "auto" : "none", position: "absolute", inset: 0 }}
  >
    {children}
  </div>
);

type Screen = 'welcome' | 'generate' | 'paint';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [animIdx, setAnimIdx] = useState(0);

  // Animated page transitions
  function setScreenWithFade(next: Screen) {
    setAnimIdx(prev => prev + 1);
    setTimeout(() => setCurrentScreen(next), 150);
  }

  const navigateToGenerate = () => setScreenWithFade('generate');
  const navigateToPaint = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setScreenWithFade('paint');
  };
  const navigateBack = () => {
    if (currentScreen === 'paint') {
      setScreenWithFade('generate');
    } else if (currentScreen === 'generate') {
      setScreenWithFade('welcome');
    }
  };
  const startOver = () => {
    setCurrentImageUrl('');
    setScreenWithFade('welcome');
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Absolute containers for overlapping fade screens */}
      <AnimatedScreen show={currentScreen === 'welcome'}>
        <WelcomeScreen onStartNow={navigateToGenerate} />
      </AnimatedScreen>
      <AnimatedScreen show={currentScreen === 'generate'}>
        <GenerateScreen 
          onBack={navigateBack}
          onColorImage={navigateToPaint}
        />
      </AnimatedScreen>
      <AnimatedScreen show={currentScreen === 'paint' && !!currentImageUrl}>
        <PaintScreen 
          imageUrl={currentImageUrl}
          onBack={navigateBack}
          onStartOver={startOver}
        />
      </AnimatedScreen>
    </div>
  );
};

export default Index;
