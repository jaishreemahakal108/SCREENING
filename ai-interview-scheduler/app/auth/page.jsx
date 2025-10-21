// "use client"

// import { Button } from '@/components/ui/button'
// import { supabase } from '@/services/supabaseClient'
// import Image from 'next/image'
// import React from 'react'

// function Login() {

//   //Used to Sign In with GOOGLE
//   const signInWithGoogle = async () => {
//     const {error} = await supabase.auth.signInWithOAuth({
//       provider : 'google'
//     })
//     if(error){
//       console.error('Error : ' , error.message)
//     }
//   }
//   //Used to SigIn with GOOGLE

//   return (
//     <div className='flex flex-col items-center justify-center h-screen'>
//       <div className='flex flex-col items-center border rounded-2xl p-8'>
//         <Image 
//           src = {'/logo_image.png'} 
//           alt = 'logo' 
//           width={85}
//           height={85}
//           className='w-[100px]'
//         />
//         <div className='flex flex-col items-center'>
//           <Image 
//             src = {'/login_image.jpg'}
//             alt='login'
//             width={600}
//             height={400} 
//             className='w-[500px] h-[300px] rounded-2xl'
//           />
//           <h2 className='text-2xl font-bold text-center mt-5'>Welcome to Screening</h2>
//           <p className='text-gray-500 text-center'>Sign In With GOOGLE Authentication</p>
//           <Button 
//             className='mt-5 w-full' 
//             onClick = {signInWithGoogle}
//           >Login with Google</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


"use client"

import { supabase } from '@/services/supabaseClient'
import React from 'react'
import { FcGoogle } from "react-icons/fc"

function Login() {

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // ✅ points to new page
      },
    })  
    if (error) {
      console.error('Error : ', error.message)
    }
  }

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* 🔹 Full Screen Background Video */}
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

      {/* 🔹 Card with soft gradient border */}
      <div className="relative z-10 w-[400px] h-[550px] rounded-3xl overflow-hidden animate-card float">
        <div className="absolute inset-0 p-[3px] rounded-3xl bg-[linear-gradient(135deg,#6EE7B7,#3B82F6,#9333EA)] bg-[length:200%_200%] animate-gradient"></div>
        
        <div className="relative backdrop-blur-lg bg-white/20 shadow-2xl rounded-3xl w-full h-full flex flex-col">
          
          {/* Top 60% - Logo Video */}
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

          {/* Bottom 40% - Content */}
          <div className="h-[40%] flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-extrabold text-center">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text-shine drop-shadow-[0_0_8px_#9333ea]">
                Screening
              </span>
            </h2>
            <p className="text-gray-200 text-center mt-2">
              Sign in with Google to continue
            </p>

            {/* 🔹 Google Button with bounce animation */}
            <button 
              onClick={signInWithGoogle}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all animate-bounce-slow"
            >
              <FcGoogle size={22} />
              Login with Google
            </button>

            {/* 🔹 Typing Effect Quote (repeats with 2s delay) */}
            <p className="text-sm text-gray-100 mt-6 italic">
              <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-gray-300 pr-2">
                Secure your future with smarter hiring.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Extra Animations (keyframes via Tailwind plugin or globals.css) */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientMove 8s ease infinite;
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-card {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .float {
          animation: float 4s ease-in-out infinite;
        }

        /* Typing Effect (restarts every 2s) */
        @keyframes typing {
          0% { width: 0 }
          40% { width: 100% }
          60% { width: 100% }
          100% { width: 0 }
        }
        @keyframes blink {
          50% { border-color: transparent }
        }
        .animate-typing {
          display: inline-block;
          animation: typing 6s steps(40, end) infinite, blink .75s step-end infinite;
        }

        /* Bouncing Button */
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }

        /* Shiny Text Animation */
        @keyframes textShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-shine {
          background-size: 200% auto;
          animation: textShine 4s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Login

