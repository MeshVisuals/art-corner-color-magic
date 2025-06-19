import React from "react";

export const VanessaImage: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-10 flex items-end justify-center">
      <img 
        src="/lovable-uploads/Vanessa.png" 
        alt="Vanessa"
        className="h-auto max-h-[60vh] object-contain"
        style={{ 
          marginBottom: "40px" // Position so button is near bottom of image
        }}
      />
    </div>
  );
};
