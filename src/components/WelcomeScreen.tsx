
import React from "react";

// Use the uploaded image as the center feature image.
// The title text is made to match the image's design and font suggestions.

interface WelcomeScreenProps {
  onStartNow: () => void;
}

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10">
      {/* Centered Title */}
      <div className="w-full max-w-md mx-auto text-center mb-8">
        <div className="mb-2">
          <span className="block text-black font-nunito font-extrabold text-base tracking-wide" style={{ letterSpacing: '0.04em' }}>
            VANESSA&apos;S
          </span>
        </div>
        <div>
          <span className="block font-fredoka text-4xl md:text-5xl text-black font-extrabold leading-none tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            LITTLE ART
          </span>
        </div>
        <div>
          <span className="block font-fredoka text-4xl md:text-5xl text-black font-extrabold leading-none tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            CORNER
          </span>
        </div>
      </div>

      {/* Centered Image in a thick white rounded frame */}
      <div className="mb-10 w-full flex justify-center">
        <div
          className="bg-[#BEE6FD] flex items-center justify-center rounded-3xl border-8 border-white shadow-lg"
          style={{
            width: 340,
            height: 340,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <img
            src="/lovable-uploads/afe66581-25b7-4114-9306-f9b7be26e040.png"
            alt="Vanessa's Little Art Corner Welcome"
            className="object-cover w-full h-full"
            style={{
              borderRadius: "1.25rem",
              objectFit: "contain"
            }}
          />
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartNow}
        className="w-full max-w-md mx-auto py-4 px-6 bg-black text-white font-baloo text-xl rounded-full font-extrabold tracking-wide transition-transform duration-200 hover:scale-105 focus:outline-none shadow"
        style={{ letterSpacing: '0.03em' }}
      >
        START CREATING!
      </button>

      {/* Footer */}
      <div className="mt-10 text-gray-600 text-sm font-fredoka">
        MeshCode 2025
      </div>
    </div>
  );
};
