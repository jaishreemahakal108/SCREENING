"use client";
import React, { useEffect } from "react";

export default function InterviewComplete() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: "2rem 0", // reduces top & bottom gap
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // push content higher
        backgroundColor: "#ffffff",
      }}
    >
      {/* Typewriter Text */}
      <h1 className="typewriter">Congratulations...</h1>

      {/* Centered Card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "90%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "2.5rem 2rem",
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          animation: "fadeInUp 0.8s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Video inside card */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "160px",
            height: "auto",
            marginBottom: "1rem",
          }}
        >
          <source src="/checkBox-1.mp4" type="video/mp4" />
        </video>

        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "0.5rem",
          }}
        >
          Interview Complete
        </h2>
        <p style={{ color: "#334155", marginBottom: "2rem", lineHeight: 1.6 }}>
          Thank you for participating in the AI-driven interview with Screening.
        </p>

        <div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#0f172a",
              marginBottom: "0.5rem",
            }}
          >
            What’s Next?
          </h3>
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            Our team will review your responses and get in touch with you shortly.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typewriter {
          font-size: 2.2rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 1.5rem;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid #16a34a;
          width: 0;
          animation: typing 3s steps(14, end) 1s infinite alternate,
                     blink 0.7s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 16ch }
        }

        @keyframes blink {
          50% { border-color: transparent }
        }
      `}</style>
    </div>
  );
}