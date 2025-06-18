import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { FloatingDecorBackground } from "@/components/FloatingDecorBackground";

interface SettingsProps {
  onBack: () => void;
}

// Validate Hugging Face API key format
function validateApiKey(key: string) {
  return key.trim().startsWith('hf_') && key.trim().length >= 20;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyStatus, setApiKeyStatus] = useState<"untouched" | "loading" | "valid" | "invalid">("untouched");

  // Load saved API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('hf_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setApiKeyStatus(validateApiKey(savedKey) ? "valid" : "invalid");
    }
  }, []);

  // Save API key to localStorage whenever it's validated as valid
  useEffect(() => {
    if (apiKeyStatus === "valid" && apiKey) {
      localStorage.setItem('hf_api_key', apiKey);
    }
  }, [apiKeyStatus, apiKey]);

  function handleValidateApiKey() {
    setApiKeyStatus("loading");
    setTimeout(() => {
      if (validateApiKey(apiKey)) {
        setApiKeyStatus("valid");
      } else {
        setApiKeyStatus("invalid");
      }
    }, 800);
  }

  function handleApiKeyKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleValidateApiKey();
    }
  }

  function handleClearApiKey() {
    setApiKey("");
    setApiKeyStatus("untouched");
    localStorage.removeItem('hf_api_key');
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-10 px-3 relative overflow-hidden">
      <FloatingDecorBackground />
      <div className="w-full max-w-xl p-7 flex flex-col gap-5 items-center relative" style={{ zIndex: 10 }}>
        <Button
          variant="cartoonOutline"
          size="cartoon"
          className="absolute left-5 top-5"
          onClick={onBack}
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <div className="text-center mb-4">
          <SettingsIcon className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <h2 className="moodcake-font text-5xl font-black text-[#F7D04B] mb-2" 
              style={{ 
                WebkitTextStroke: "1px #2A2320", 
                textShadow: "4px 4px 0px #2A2320, -2px -2px 0px #2A2320, 2px -2px 0px #2A2320, -2px 2px 0px #2A2320",
                filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
              }}>
            Settings
          </h2>
          <p className="text-gray-600">Configure your Art Corner preferences</p>
        </div>

        <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-gray-200 shadow-lg">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">API Configuration</h3>
          
          <ApiKeyInput
            apiKey={apiKey}
            apiKeyStatus={apiKeyStatus}
            onApiKeyChange={(value) => {
              setApiKey(value);
              setApiKeyStatus("untouched");
            }}
            onValidate={handleValidateApiKey}
            onApiKeyKeyDown={handleApiKeyKeyDown}
          />

          {apiKey && (
            <div className="mt-4 flex gap-2">
              <Button
                variant="cartoonOutline"
                size="sm"
                onClick={handleClearApiKey}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Clear API Key
              </Button>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">🔒 Automatic Password Saving</h4>
              <p className="text-sm text-green-700 mb-2">
                When you enter and validate your API key, your browser will ask if you want to save it in your password manager. This is the <strong>best way</strong> to keep your key safe and accessible across devices!
              </p>
              <p className="text-sm text-green-700 font-medium">
                ✅ Recommended: Click "Save" when your browser asks!
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">⚠️ Local Storage Backup</h4>
              <p className="text-sm text-amber-700 mb-2">
                We also save your key in your browser's local storage as a backup. If you clear your browser data or use a different device without synced passwords, you'll need to enter it again.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">🔑 How to Get Your Free Hugging Face API Key</h4>
              <ol className="text-sm text-blue-700 space-y-2">
                <li><strong>1. Visit:</strong> <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener" className="text-blue-600 hover:underline">huggingface.co/settings/tokens</a></li>
                <li><strong>2. Sign up:</strong> Create a free account (no credit card needed)</li>
                <li><strong>3. Create token:</strong> Click "New token" button</li>
                <li><strong>4. Name it:</strong> Give it any name (like "Art Corner")</li>
                <li><strong>5. Select type:</strong> Choose "Read" from the dropdown</li>
                <li><strong>6. Create:</strong> Click "Generate a token"</li>
                <li><strong>7. Copy:</strong> Copy the token that starts with "hf_"</li>
                <li><strong>8. Paste here:</strong> Enter it in the field above</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ What You Get</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>1000 free images per month</strong> - more than enough for personal use</li>
                <li>• <strong>High-quality AI generation</strong> with FLUX.1-dev model</li>
                <li>• <strong>No credit card required</strong> for Hugging Face account</li>
                <li>• <strong>Automatic coloring book optimization</strong> for perfect line art</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};