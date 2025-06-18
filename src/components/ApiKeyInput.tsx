
import React from "react";
import { Input } from "@/components/ui/input";
import { KeyRound, ArrowRight, Check, X, Loader2 } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  apiKeyStatus: "untouched" | "loading" | "valid" | "invalid";
  onApiKeyChange: (key: string) => void;
  onValidate: () => void;
  onApiKeyKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  apiKeyStatus,
  onApiKeyChange,
  onValidate,
  onApiKeyKeyDown
}) => {
  let apiStatusIcon = null;
  let apiStatusMsg = "";
  if (apiKeyStatus === "valid") {
    apiStatusIcon = <Check className="w-5 h-5 text-green-600" aria-label="API key valid" />;
    apiStatusMsg = "API Key looks valid!";
  } else if (apiKeyStatus === "invalid") {
    apiStatusIcon = <X className="w-5 h-5 text-red-500" aria-label="API key invalid" />;
    apiStatusMsg = "API Key is invalid. Try again!";
  } else if (apiKeyStatus === "loading") {
    apiStatusIcon = <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onValidate(); }}>
      <div className="w-full flex flex-col gap-2 mb-1">
        <label className="flex gap-2 items-center font-semibold text-sm text-black/70" htmlFor="api-key-input">
          <KeyRound className="w-4 h-4" />
          Enter your Hugging Face API Key
        </label>
        
        {/* Hidden username field to help browser understand this is a login form */}
        <input
          type="text"
          name="username"
          value="huggingface-api"
          autoComplete="username"
          style={{ display: 'none' }}
          readOnly
        />
        
        <div className="w-full relative flex items-center">
          <Input
            id="api-key-input"
            name="password"
            placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={apiKey}
            type="password"
            onChange={e => {
              onApiKeyChange(e.target.value);
            }}
            className="bg-white border-gray-200 pr-11"
            autoComplete="current-password"
            spellCheck={false}
            onKeyDown={onApiKeyKeyDown}
            data-testid="api-key-input"
          />
        <button
          type="button"
          onClick={apiKeyStatus === "valid" || apiKeyStatus === "invalid" ? undefined : onValidate}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full hover:scale-105 transition-transform focus:outline-none"
          style={{ width: 32, height: 32 }}
          aria-label="Validate API key"
          tabIndex={-1}
          disabled={apiKeyStatus === "loading"}
        >
          {(apiKeyStatus === "untouched" || apiKeyStatus === "loading")
            ? <ArrowRight className="w-5 h-5 text-gray-500" /> : apiStatusIcon}
        </button>
      </div>
      {apiKeyStatus === "valid" && (
        <span className="text-green-700 text-xs font-medium mt-1 flex items-center gap-1">
          <Check className="w-4 h-4" /> {apiStatusMsg}
        </span>
      )}
      {apiKeyStatus === "invalid" && (
        <span className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
          <X className="w-4 h-4" /> {apiStatusMsg}
        </span>
      )}
      {apiKeyStatus === "loading" && (
        <span className="text-gray-500 text-xs font-medium mt-1 flex items-center gap-1">
          <Loader2 className="w-4 h-4 animate-spin" /> Checking API Key...
        </span>
      )}
      <span className="text-xs text-muted-foreground ml-1">
        <span className="font-medium">Get your free key:</span> Visit <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener" className="text-blue-600 hover:underline">huggingface.co/settings/tokens</a> • 1000 images/month free!
      </span>
      <span className="text-xs text-green-600 ml-1 mt-1 block">
        💡 <span className="font-medium">Tip:</span> Your browser will ask if you want to save this API key in your password manager!
      </span>
    </div>
    </form>
  );
};
