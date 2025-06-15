
import React from "react";
import { Input } from "@/components/ui/input";

interface PromptInputProps {
  prompt: string;
  setPrompt: (s: string) => void;
  loading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  loading
}) => (
  <div className="w-full flex flex-col gap-2">
    <label htmlFor="prompt-input" className="font-semibold text-black/70">
      Enter your prompt
    </label>
    <Input
      className="text-lg md:text-base bg-purple-50 border-purple-200 focus:border-purple-300 focus:ring-purple-200"
      placeholder="Describe a picture to create (e.g., Cute elephant flying a kite!)"
      maxLength={100}
      value={prompt}
      onChange={e => setPrompt(e.target.value)}
      disabled={loading}
      id="prompt-input"
      data-testid="prompt-input"
    />
  </div>
);
