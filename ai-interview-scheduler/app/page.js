// "use client"

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     // fade out before redirect
//     const fadeTimer = setTimeout(() => setFadeOut(true), 7500); // fade start at 7.5s
//     const redirectTimer = setTimeout(() => router.push("/auth"), 5800); // redirect at 8s
//     return () => {
//       clearTimeout(fadeTimer);
//       clearTimeout(redirectTimer);
//     };
//   }, [router]);

//   return (
//     <div
//       className={`relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden transition-all duration-700 ${
//         fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
//       } bg-black`}
//     >
//       {/* 🔹 Centered Pulsing Rings */}
//       <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-purple-500/30 animate-pulseRing"></div>
//       <div className="absolute w-[550px] h-[550px] rounded-full border-4 border-blue-500/20 animate-pulseRing delay-300"></div>

//       {/* 🔹 Center Logo Video */}
//       <video
//         src="/logo_vid.mp4"
//         autoPlay
//         muted
//         playsInline
//         className="relative z-10 w-64 h-64 rounded-full object-cover drop-shadow-[0_0_35px_rgba(147,51,234,0.7)]"
//       />

//       {/* 🔹 Typing Text Below Video */}
//       <p className="relative z-10 text-gray-200 mt-6 text-2xl font-extrabold italic text-center">
//         <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-gray-300 pr-2">
//           Welcome to SCREENING...
//         </span>
//       </p>

//       {/* 🔹 Animations */}
//       <style jsx global>{`
//         /* Pulsing rings */
//         @keyframes pulseRing {
//           0% { transform: scale(0.8); opacity: 0.6; }
//           50% { transform: scale(1.2); opacity: 0.3; }
//           100% { transform: scale(0.8); opacity: 0.6; }
//         }
//         .animate-pulseRing {
//           animation: pulseRing 3s ease-in-out infinite;
//         }

//         /* Typing effect */
//         @keyframes typing {
//           0% { width: 0; }
//           40% { width: 100%; }
//           60% { width: 100%; }
//           100% { width: 0; }
//         }
//         @keyframes blink {
//           50% { border-color: transparent; }
//         }
//         .animate-typing {
//           display: inline-block;
//           animation: typing 4s steps(40, end) infinite, blink .75s step-end infinite;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);
  const [currentText, setCurrentText] = useState("Welcome to SCREENING...");

  useEffect(() => {
    // fade out before redirect
    const fadeTimer = setTimeout(() => setFadeOut(true), 7500); // fade start at 7.5s
    const redirectTimer = setTimeout(() => router.push("/auth"), 8000); // redirect at 8s

    // Text cycle
    const texts = [
      "Welcome to SCREENING..."
    ];
    let index = 0;
    const textTimer = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
      clearInterval(textTimer);
    };
  }, [router]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden transition-all duration-700 ${
        fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } bg-gradient-animated`}
    >
      {/* 🔹 Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full animate-floatParticle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`
          }}
        />
      ))}

      {/* 🔹 Pulsing Rings */}
      <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-purple-500/30 animate-pulseRing"></div>
      <div className="absolute w-[550px] h-[550px] rounded-full border-4 border-blue-500/20 animate-pulseRing delay-300"></div>
      <div className="absolute w-[700px] h-[700px] rounded-full border-2 border-pink-500/20 animate-pulseRing slow-rotate"></div>

      {/* 🔹 Center Video */}
      <video
        src="/logo_vid.mp4"
        autoPlay
        muted
        playsInline
        className="relative z-10 w-64 h-64 rounded-full object-cover drop-shadow-[0_0_35px_rgba(147,51,234,0.7)] video-glow video-float"
      />

      {/* 🔹 Animated Text */}
      <p className="relative z-10 text-gray-200 mt-6 text-2xl font-extrabold italic text-center">
        <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-gray-300 pr-2">
          {currentText}
        </span>
      </p>

      {/* 🔹 Animations */}
      <style jsx global>{`
        /* Pulsing rings */
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 0.6; }
        }
        .animate-pulseRing {
          animation: pulseRing 3s ease-in-out infinite;
        }

        @keyframes slowRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .slow-rotate {
          animation: slowRotate 20s linear infinite;
        }

        /* Video glow & float */
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 35px rgba(147,51,234,0.7); }
          50% { box-shadow: 0 0 60px rgba(147,51,234,1); }
        }
        .video-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes videoFloat {
          0%,100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(2deg); }
        }
        .video-float {
          animation: videoFloat 4s ease-in-out infinite;
        }

        /* Typing effect */
        @keyframes typing {
          0% { width: 0; }
          40% { width: 100%; }
          60% { width: 100%; }
          100% { width: 0; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .animate-typing {
          display: inline-block;
          animation: typing 4s steps(40, end) infinite, blink 0.75s step-end infinite;
        }

        /* Background gradient animation */
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-gradient-animated {
          background: linear-gradient(270deg, #1e1e2f, #4b2fcf, #7f5aff);
          background-size: 600% 600%;
          animation: gradientBG 15s ease infinite;
        }

        /* Floating particles */
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 0.4; }
          100% { transform: translateY(0) translateX(0); opacity: 0.8; }
        }
        .animate-floatParticle {
          animation: floatParticle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
