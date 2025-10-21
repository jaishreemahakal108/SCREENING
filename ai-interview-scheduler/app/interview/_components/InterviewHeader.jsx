// import Image from 'next/image'
// import React from 'react'

// function InterviewHeader() {
//   return (
//     <div className='p-4 shadow-sm'>
//         <Image src={'/logo_image.png'} alt='logo' width={200} height={100} className='w-[140px]'/>
//     </div>
//   )
// }

// export default InterviewHeader

import React from 'react'

function InterviewHeader() {
  return (
    <header className="relative overflow-hidden">
      {/* Gradient background with curve */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-95">
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L80,165.3C160,171,320,181,480,165.3C640,149,800,107,960,122.7C1120,139,1280,213,1360,250.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative p-6 flex items-center justify-start max-w-6xl mx-auto">
        {/* Glowing floating logo */}
        <div className="glow-ring animate-float">
          <div className="inner-circle">
            <video
              src="/logo_vid.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="ml-4">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-200 text-2xl sm:text-3xl font-extrabold drop-shadow-lg">
            Screening Platform
          </h1>
          <p className="text-white/90 text-sm sm:text-base tracking-wide">
            Your interview lobby
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Glowing animated ring */
        .glow-ring {
          padding: 4px;
          border-radius: 9999px;
          background: conic-gradient(
            from 0deg,
            #f472b6,
            #f59e0b,
            #34d399,
            #3b82f6,
            #8b5cf6,
            #f472b6
          );
          background-size: 200% 200%;
          animation: spinRing 6s linear infinite;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .inner-circle {
          width: 100px;   /* increased from 80px */
          height: 100px;  /* increased from 80px */
          border-radius: 9999px;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
        }

        /* Floating effect */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Spinning gradient glow */
        @keyframes spinRing {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </header>
  )
}

export default InterviewHeader