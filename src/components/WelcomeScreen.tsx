
import React from "react";
import { FloatingDecor } from "./FloatingDecor";

// Cartoon palette from the reference
const skyBlue = "#67B6B2";
const grassGreen = "#F7BB48";
const outline = "#2A2320";
const titleOrange = "#EF7B24";
const creamyYellow = "#FFE9B3";
const buttonTeal = "#51C7B0";

// Double the floating decoration quantity and vary positions/delays for fullness
const decoConfigs = [
  {
    shape: "heart",
    color: "#EF7B24",
    style: {
      left: "7vw",
      top: "16vh",
      animationDelay: "0.2s",
      animationDuration: "8s",
    },
    size: 30,
  },
  {
    shape: "star",
    color: "#F7BB48",
    style: {
      right: "8vw",
      top: "11vh",
      animationDelay: "0.8s",
      animationDuration: "11s"
    },
    size: 24,
  },
  {
    shape: "heart",
    color: "#F76B6B",
    style: {
      left: "12vw",
      bottom: "15vh",
      animationDelay: "2.2s",
      animationDuration: "9s"
    },
    size: 25,
  },
  {
    shape: "star",
    color: "#51C7B0",
    style: {
      right: "14vw",
      bottom: "18vh",
      animationDelay: "1.5s",
      animationDuration: "7.5s"
    },
    size: 28,
  },
  {
    shape: "sparkle",
    color: "#FFF7E7",
    style: {
      left: "48vw",
      top: "7vh",
      animationDelay: "0.5s",
      animationDuration: "10s"
    },
    size: 22,
  },
  {
    shape: "sparkle",
    color: "#F6D098",
    style: {
      right: "9vw",
      bottom: "6vh",
      animationDelay: "0.4s",
      animationDuration: "9.5s"
    },
    size: 18,
  },
  // --- Extra Decorations for fullness below ---
  {
    shape: "heart",
    color: "#EF7B24",
    style: {
      left: "23vw",
      top: "11vh",
      animationDelay: "0.9s",
      animationDuration: "9.2s",
    },
    size: 20,
  },
  {
    shape: "star",
    color: "#F7BB48",
    style: {
      right: "18vw",
      top: "24vh",
      animationDelay: "1.3s",
      animationDuration: "8.6s"
    },
    size: 20,
  },
  {
    shape: "heart",
    color: "#F76B6B",
    style: {
      left: "5vw",
      bottom: "31vh",
      animationDelay: "3.1s",
      animationDuration: "10.2s"
    },
    size: 30,
  },
  {
    shape: "star",
    color: "#51C7B0",
    style: {
      right: "26vw",
      bottom: "26vh",
      animationDelay: "0.2s",
      animationDuration: "12.4s"
    },
    size: 22,
  },
  {
    shape: "sparkle",
    color: "#FFF7E7",
    style: {
      left: "36vw",
      top: "3vh",
      animationDelay: "0.9s",
      animationDuration: "9.7s"
    },
    size: 20,
  },
  {
    shape: "sparkle",
    color: "#F6D098",
    style: {
      right: "3vw",
      bottom: "22vh",
      animationDelay: "1.6s",
      animationDuration: "7.9s"
    },
    size: 16,
  },
  // a few more for extra fullness
  {
    shape: "heart",
    color: "#EF7B24",
    style: {
      left: "50vw",
      bottom: "8vh",
      animationDelay: "2.4s",
      animationDuration: "12s",
    },
    size: 17,
  },
  {
    shape: "star",
    color: "#F7BB48",
    style: {
      left: "2vw",
      top: "39vh",
      animationDelay: "1.1s",
      animationDuration: "10.6s"
    },
    size: 21,
  },
  {
    shape: "heart",
    color: "#F76B6B",
    style: {
      left: "41vw",
      top: "30vh",
      animationDelay: "2.9s",
      animationDuration: "8.8s"
    },
    size: 21,
  },
  {
    shape: "sparkle",
    color: "#FFF7E7",
    style: {
      right: "22vw",
      bottom: "11vh",
      animationDelay: "2.2s",
      animationDuration: "13s"
    },
    size: 22,
  },
  {
    shape: "sparkle",
    color: "#F6D098",
    style: {
      left: "57vw",
      top: "25vh",
      animationDelay: "1.8s",
      animationDuration: "6.2s"
    },
    size: 15,
  }
];

interface WelcomeScreenProps {
  onStartNow: () => void;
}

export const WelcomeScreen = ({ onStartNow }: WelcomeScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-2 py-8 relative overflow-x-hidden"
      style={{
        background: `linear-gradient(180deg, ${skyBlue} 75%, ${grassGreen} 100%)`,
      }}
    >
      {/* Floating Deco Layer */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-20">
        {decoConfigs.map((d, i) => (
          <span
            key={i}
            className="absolute animate-floating-sway"
            style={{
              ...d.style,
              animationDelay: d.style?.animationDelay ?? undefined,
              animationDuration: d.style?.animationDuration ?? undefined
            }}
          >
            <FloatingDecor shape={d.shape as any} color={d.color} size={d.size} />
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center relative z-30" style={{ marginBottom: "-2.0rem" }}>
        {/* App Title (fun, thick, cartoon style) */}
        <div
          className="text-center font-extrabold select-none"
          style={{
            fontFamily: "'Fredoka', 'Baloo 2', 'sniglet', 'Nunito', cursive",
            fontSize: "2.5rem",
            letterSpacing: "0.04em",
            transform: "skewY(-5deg) rotate(-2.5deg)",
            color: "#FFF6DC",
            textShadow: `
              -4px 4px 0 ${outline},
              2px 3px 0 #EF7B24,
              0px 6px 40px rgba(0,0,0,0.13)
            `,
            lineHeight: "1.08",
            marginBottom: "-0.2em",
            position: "relative",
            zIndex: 2,
            pointerEvents: "none"
          }}
        >
          <span
            style={{
              color: titleOrange,
              fontSize: "1.27em",
              letterSpacing: "0.06em",
              fontFamily: "'Fredoka', 'Baloo 2', 'sniglet', 'Nunito', cursive",
              textShadow: `
                -2.5px 2px 0 ${outline},
                0px 2px 16px rgba(0,0,0,0.11)
              `,
              display: "block",
              marginBottom: "-0.40em"
            }}
          >
            VANESSA&apos;S
          </span>
          <span
            style={{
              color: creamyYellow,
              fontSize: "1em",
              WebkitTextStroke: "2.5px #231B18",
              textShadow: `
                -2.5px 2px 0 ${outline},
                3px 7px 18px rgba(0,0,0,0.12)
              `,
              padding: "0.01em 0",
              borderRadius: "0.11em"
            }}
          >
            LITTLE ART CORNER
          </span>
        </div>
        {/* “Comfy and Cozy” Subheadline */}
        <div
          className="font-fredoka text-lg md:text-xl mt-3 text-center"
          style={{
            transform: "skewY(-4deg)",
            color: outline,
            background: creamyYellow,
            borderRadius: "1.2em",
            display: "inline-block",
            padding: "4px 24px 2px",
            border: `2.5px solid ${outline}`,
            boxShadow: "0 2px 8px rgba(220,150,41,0.15)",
            marginBottom: "-10px",
            position: "relative",
            top: "-10px",
            zIndex: 2,
            fontWeight: 800,
            fontSize: "1.13em",
            pointerEvents: "none",
            letterSpacing: "0.03em"
          }}
        >
          Comfy and Cozy
        </div>
      </div>

      {/* Center Image in cartoon-style white round frame */}
      <div className="mt-2 mb-7 w-full flex justify-center z-10 relative" style={{ zIndex: 22 }}>
        <div
          className="bg-white flex items-center justify-center rounded-3xl balloon-frame border-white"
          style={{
            width: 292,
            height: 292,
            overflow: "hidden",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
            borderWidth: "7px",
          }}
        >
          <img
            src="/lovable-uploads/84079a02-d4a9-4396-84ac-0bc0297ce8cb.png"
            alt="Vanessa and child cartoon in the park"
            className="object-cover w-full h-full"
            style={{
              borderRadius: "1.7rem",
              objectFit: "contain"
            }}
          />
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartNow}
        className="w-fit max-w-md mx-auto py-2 px-7 bg-[#51C7B0] text-white font-baloo text-lg rounded-full font-extrabold tracking-wide transition-transform duration-200 shadow hover:scale-105 hover:bg-[#79e7cc] active:scale-95 border-2 border-[#2A2320] focus:outline-none select-none"
        style={{
          letterSpacing: "0.04em",
          marginTop: "0.7rem",
          boxShadow: "0 2px 18px rgba(79,160,120,0.16)",
          minWidth: "1px"
        }}
      >
        START CREATING!
      </button>

      {/* Footer - place absolutely at bottom for lowest placement */}
      <div className="w-full flex justify-center absolute left-0 right-0" style={{ bottom: "10px", zIndex: 30 }}>
        <div className="text-[#694020] text-xs font-fredoka opacity-70">
          MeshCode 2025
        </div>
      </div>

      {/* Floating Element Animation Keyframes */}
      <style>{`
      @keyframes floating-sway {
        0%,100% { transform: translateY(0px) rotate(-8deg);}
        24% { transform: translateY(-12px) rotate(8deg);}
        44% { transform: translateY(-16px) rotate(1deg);}
        68% { transform: translateY(-8px) rotate(-10deg);}
        82% { transform: translateY(-3px) rotate(3deg);}
      }
      .animate-floating-sway {
        animation-name: floating-sway;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: cubic-bezier(.83,-0.19,.23,1.11);
      }
      `}</style>
    </div>
  );
};

