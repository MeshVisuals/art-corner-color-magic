
import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { GenerateScreen } from "@/components/GenerateScreen";
import { PaintScreen } from "@/components/PaintScreen";
import { Settings } from "./Settings";

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

type Screen = 'welcome' | 'generate' | 'paint' | 'settings';

// Validate Hugging Face API key format
function validateApiKey(key: string) {
  return key.trim().startsWith('hf_') && key.trim().length >= 20;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen>('welcome');
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [animIdx, setAnimIdx] = useState(0);

  // Check for saved API key and start on generate screen if available
  useEffect(() => {
    const savedKey = localStorage.getItem('hf_api_key');
    if (savedKey && validateApiKey(savedKey)) {
      setCurrentScreen('generate');
    }
  }, []);

  // Animated page transitions
  function setScreenWithFade(next: Screen) {
    setAnimIdx(prev => prev + 1);
    setPreviousScreen(currentScreen);
    setTimeout(() => setCurrentScreen(next), 150);
  }

  const navigateToGenerate = () => setScreenWithFade('generate');
  const navigateToSettings = () => setScreenWithFade('settings');
  const navigateToPaint = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setScreenWithFade('paint');
  };
  const navigateBack = () => {
    if (currentScreen === 'paint') {
      setScreenWithFade('generate');
    } else if (currentScreen === 'generate') {
      setScreenWithFade('welcome');
    } else if (currentScreen === 'settings') {
      setScreenWithFade(previousScreen);
    }
  };
  const startOver = () => {
    setCurrentImageUrl('');
    setScreenWithFade('welcome');
  };

  return (
    <div 
      className="relative min-h-screen"
    >
      {/* Absolute containers for overlapping fade screens */}
      <AnimatedScreen show={currentScreen === 'welcome'}>
        <WelcomeScreen onStartNow={navigateToGenerate} onSettings={navigateToSettings} />
      </AnimatedScreen>
      <AnimatedScreen show={currentScreen === 'generate'}>
        <GenerateScreen 
          onBack={navigateBack}
          onColorImage={navigateToPaint}
          onSettings={navigateToSettings}
        />
      </AnimatedScreen>
      <AnimatedScreen show={currentScreen === 'paint' && !!currentImageUrl}>
        <PaintScreen 
          imageUrl={currentImageUrl}
          onBack={navigateBack}
          onStartOver={startOver}
        />
      </AnimatedScreen>
      <AnimatedScreen show={currentScreen === 'settings'}>
        <Settings onBack={navigateBack} />
      </AnimatedScreen>
    </div>
  );
};

export default Index;
