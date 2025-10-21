"use client";

import { SignInButton } from "@clerk/nextjs";
import React from "react";

export default function SignInScreen() {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        src="/bg-1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* 🔹 Floating Gradient Blobs */}
      <div className="absolute w-72 h-72 bg-purple-500/40 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* 🔹 Auth Card */}
      <div className="relative z-10 w-[400px] h-[550px] rounded-3xl overflow-hidden animate-card float">
        <div className="absolute inset-0 p-[3px] rounded-3xl bg-[linear-gradient(135deg,#6EE7B7,#3B82F6,#9333EA)] bg-[length:200%_200%] animate-gradient"></div>

        <div className="relative backdrop-blur-lg bg-white/20 shadow-2xl rounded-3xl w-full h-full flex flex-col">
          {/* Top Section - Logo Video */}
          <div className="h-[60%] w-full">
            <video
              src="/logo_vid.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Section */}
          <div className="h-[40%] flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-3xl font-extrabold">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text-shine drop-shadow-[0_0_8px_#9333ea]">
                Screening
              </span>
            </h2>

            <p className="text-gray-200 mt-2">
              Sign in with Clerk to continue
            </p>

            {/* 🔹 Clerk Login Button */}
            <SignInButton mode="modal">
              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all animate-bounce-slow">
                Login with Clerk
              </button>
            </SignInButton>

            {/* Typing Effect Line */}
            <p className="text-sm text-gray-100 mt-6 italic">
              <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-gray-300 pr-2">
                Secure your future with smarter hiring.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Animations */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradientMove 8s ease infinite;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-card {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes typing {
          0% {
            width: 0;
          }
          40% {
            width: 100%;
          }
          60% {
            width: 100%;
          }
          100% {
            width: 0;
          }
        }
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
        .animate-typing {
          display: inline-block;
          animation: typing 6s steps(40, end) infinite,
            blink 0.75s step-end infinite;
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }

        @keyframes textShine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-text-shine {
          background-size: 200% auto;
          animation: textShine 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
