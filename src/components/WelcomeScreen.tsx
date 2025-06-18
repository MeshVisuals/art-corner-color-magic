import { Info, Settings } from "lucide-react";
import { AboutModal } from "./AboutModal";
import { AnimatedMascot } from "./AnimatedMascot";
import { FloatingDecor, FloatingShape } from "./FloatingDecor";

// Cartoon palette from the reference
const skyBlue = "#67B6B2";
const grassGreen = "#F7BB48";
const outline = "#2A2320";
const titleOrange = "#EF7B24";
const creamyYellow = "#FFFFFF";
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
  },
  // Additional hearts as requested
  {
    shape: "heart",
    color: "#EF7B24",
    style: {
      right: "5vw",
      top: "35vh",
      animationDelay: "2.7s",
      animationDuration: "11.5s"
    },
    size: 26,
  },
  {
    shape: "heart", 
    color: "#F76B6B",
    style: {
      left: "15vw",
      top: "45vh",
      animationDelay: "1.9s",
      animationDuration: "9.8s"
    },
    size: 22,
  },
  {
    shape: "heart",
    color: "#EF7B24", 
    style: {
      right: "35vw",
      top: "12vh",
      animationDelay: "3.4s",
      animationDuration: "8.2s"
    },
    size: 19,
  },
  // Four flowers - two on each side with different colors
  {
    shape: "flower",
    color: "#FF69B4",
    style: {
      left: "8vw",
      top: "28vh",
      animationDelay: "2.1s",
      animationDuration: "10.3s"
    },
    size: 28,
  },
  {
    shape: "flower",
    color: "#FF1493",
    style: {
      right: "12vw",
      top: "42vh",
      animationDelay: "1.7s",
      animationDuration: "9.1s"
    },
    size: 25,
  },
  {
    shape: "flower",
    color: "#9370DB",
    style: {
      left: "18vw",
      bottom: "30vh",
      animationDelay: "2.9s",
      animationDuration: "11.2s"
    },
    size: 26,
  },
  {
    shape: "flower",
    color: "#32CD32",
    style: {
      right: "6vw",
      top: "55vh",
      animationDelay: "1.6s",
      animationDuration: "9.4s"
    },
    size: 24,
  }
];

interface WelcomeScreenProps {
  onStartNow: () => void;
  onSettings: () => void;
}

export const WelcomeScreen = ({ onStartNow, onSettings }: WelcomeScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-2 py-8 relative overflow-x-hidden"
      style={{
        background: `linear-gradient(180deg, #67B6B2 75%, #F7BB48 100%)`,
      }}
    >
      {/* Vanessa Image Layer */}
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

      {/* Floating Deco Layer */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-50">
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
            <FloatingDecor shape={d.shape as FloatingShape} color={d.color} size={d.size} />
          </span>
        ))}
      </div>

      {/* Top-right buttons */}
      <div className="absolute top-3 right-4 z-50 flex gap-2">
        <button
          onClick={onSettings}
          className="flex items-center gap-1 px-3 py-1 bg-black/10 hover:bg-black/20 rounded-full border border-black/12 font-semibold text-[15px] text-black shadow transition-all"
          aria-label="Settings"
          style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
        >
          <Settings className="w-5 h-5" /> Settings
        </button>
        <AboutModal 
          trigger={
            <button
              className="flex items-center gap-1 px-3 py-1 bg-black/10 hover:bg-black/20 rounded-full border border-black/12 font-semibold text-[15px] text-black shadow transition-all"
              aria-label="About & How it Works"
              style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
            >
              <Info className="w-5 h-5" /> About
            </button>
          }
        />
      </div>


      {/* Animated Mascot on corner */}
      <AnimatedMascot />

      {/* Fixed Oval Background Banner - Independent positioning */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white/70 backdrop-blur-sm border-4 border-white/50 shadow-xl transform -rotate-1" 
             style={{ 
               width: "300px",
               height: "180px",
               borderRadius: "50%",
               filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.1))",
               marginTop: "-270px"
             }}>
        </div>
      </div>

      {/* Logo Text Components matching the design */}
      <div className="text-center mb-8 relative z-30 mt-[-68px]">
        {/* Vanessa's - cursive script style with burgundy color and black outline */}
        <div className="lobster-two-font text-7xl font-bold text-[#d42c75] tracking-wide mb-[-10px]" 
             style={{ 
               WebkitTextStroke: "0.1px #2A2320", 
               textShadow: "2px 2px 0px #2A2320, -1px -1px 0px #2A2320, 1px -1px 0px #2A2320, -1px 1px 0px #2A2320",
               filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
             }}>
          Vanessa's
        </div>
        
        {/* LITTLE ART CORNER - chunky bubble letters with yellow fill and curved arc */}
        <div className="text-center mb-4 relative">
          <div className="curved-text-container" style={{ height: '100px', position: 'relative' }}>
            <svg width="500" height="100" viewBox="0 0 500 100" className="mx-auto">
              <defs>
                <path id="top-curve" d="M 100 65 Q 250 35 400 65" />
                <path id="bottom-curve" d="M 150 95 Q 250 85 350 95" />
              </defs>
              
              {/* LITTLE ART on top curve */}
              <text className="moodcake-font font-black" 
                    style={{ 
                      fill: "#F7D04B",
                      stroke: "#2A2320",
                      strokeWidth: "1px",
                      fontSize: "56px",
                      fontWeight: "900",
                      filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
                    }}>
                <textPath href="#top-curve" startOffset="50%" textAnchor="middle">
                  LITTLE ART
                </textPath>
              </text>
              
              {/* CORNER on bottom curve */}
              <text className="moodcake-font font-black" 
                    style={{ 
                      fill: "#F7D04B",
                      stroke: "#2A2320",
                      strokeWidth: "1px",
                      fontSize: "54px",
                      fontWeight: "900",
                      filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))"
                    }}>
                <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">
                  CORNER
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        
        {/* The Comfy and Cozy Series - simple black text */}
        <div className="bare-marker-font text-3xl text-[#2A2320] font-normal tracking-wide leading-tight mt-[-30px]">
          <div>The Comfy and Cozy</div>
          <div className="mt-[-16px]">Series</div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartNow}
        className="w-fit max-w-md mx-auto py-2 px-7 bg-[#51C7B0] text-white font-baloo text-lg rounded-full font-extrabold tracking-wide transition-transform duration-200 shadow hover:scale-105 hover:bg-[#79e7cc] active:scale-95 border-2 border-[#2A2320] focus:outline-none select-none"
        style={{
          letterSpacing: "0.02em",
          marginTop: "8rem",
          boxShadow: "0 2px 18px rgba(79,160,120,0.16)",
          minWidth: "1px",
          position: "relative",
          zIndex: 30
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

// NOTE: This file is now quite long (~400 lines) — consider asking me to refactor and split it into smaller pieces for easier maintenance!
