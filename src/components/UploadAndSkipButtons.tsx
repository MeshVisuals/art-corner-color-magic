
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
  <div className="w-full flex flex-col gap-4 mb-4 items-end">
    <Button
      variant="cartoon"
      onClick={onUploadClick}
      type="button"
      size="xs"
      className="w-40 h-10 flex gap-2 justify-center text-sm"
    >
      <Upload className="w-4 h-4" /> Upload
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
      className="w-40 h-10 flex gap-2 justify-center text-sm"
    >
      <SkipForward className="w-4 h-4" /> Skip
    </Button>
  </div>
);
