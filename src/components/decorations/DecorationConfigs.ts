import { FloatingShape } from "../FloatingDecor";

export interface DecorationConfig {
  shape: FloatingShape;
  color: string;
  style: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    animationDelay?: string;
    animationDuration?: string;
  };
  size: number;
}

// Decoration configurations for the welcome screen
export const welcomeScreenDecorations: DecorationConfig[] = [
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
