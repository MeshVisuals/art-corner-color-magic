
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
  <div className="w-full flex flex-col gap-1 mb-2">
    <Button
      variant="cartoon"
      onClick={onUploadClick}
      type="button"
      size="xs"
      className="w-32 h-8 flex gap-1 justify-center text-xs"
    >
      <Upload className="w-3 h-3" /> Upload
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
      size="xs"
      className="w-32 h-8 flex gap-1 justify-center text-xs"
    >
      <SkipForward className="w-3 h-3" /> Skip
    </Button>
  </div>
);
