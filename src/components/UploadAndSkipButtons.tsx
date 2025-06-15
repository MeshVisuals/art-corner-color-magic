
import React, { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Upload, SkipForward } from "lucide-react";

interface UploadAndSkipButtonsProps {
  onUploadClick: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSkip: () => void;
}

export const UploadAndSkipButtons: React.FC<UploadAndSkipButtonsProps> = ({
  onUploadClick,
  fileInputRef,
  onFileChange,
  onSkip
}) => (
  <div className="w-full flex items-center gap-3 justify-center mb-2">
    <Button
      variant="cartoon"
      onClick={onUploadClick}
      type="button"
      className="flex-1 flex gap-2"
    >
      <Upload className="w-5 h-5" /> Upload
    </Button>
    <input
      type="file"
      accept="image/*"
      onChange={onFileChange}
      ref={fileInputRef}
      style={{ display: "none" }}
      data-testid="file-upload"
    />
    <Button
      variant="cartoonOutline"
      onClick={onSkip}
      type="button"
      className="flex-1 flex gap-2"
    >
      <SkipForward className="w-5 h-5" /> Skip
    </Button>
  </div>
);
