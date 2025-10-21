// import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";
// import { CodeIcon } from "lucide-react";
// import { SignedIn, UserButton } from "@clerk/nextjs";
// import DasboardBtn from "./DasboardBtn";

// function Navbar() {
//   return (
//     <nav className="border-b">
//       <div className="flex h-16 items-center px-4 container mx-auto">
//         {/* LEFT SIDE -LOGO */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
//         >
//           <CodeIcon className="size-8 text-emerald-500" />
//           <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//             SCREENING
//           </span>
//         </Link>

//         {/* RIGHT SIDE - ACTIONS */}
//         <SignedIn>
//           <div className="flex items-center space-x-4 ml-auto">
//             <DasboardBtn />
//             <ModeToggle />
//             <UserButton />
//           </div>
//         </SignedIn>
//       </div>
//     </nav>
//   );
// }
// export default Navbar;

"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="border-b shadow-md bg-gradient-to-r from-emerald-400/10 to-blue-500/10 
                 dark:from-purple-700/20 dark:to-indigo-900/30 backdrop-blur-xl transition-all duration-300"
    >
      <div className="flex h-24 items-center px-6 container mx-auto">
        {/* 🔹 LEFT SIDE - Logo Video */}
        <Link
          href="/"
          className="flex items-center gap-3 mr-6 transition-transform hover:scale-110"
        >
          <div className="relative w-24 h-24 rounded-full p-[4px] bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 animate-glow shadow-lg">
            <video
              src="/logo_vid.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </Link>

        {/* 🔹 RIGHT SIDE - User Actions */}
        <SignedIn>
          <div
            className={`
              flex items-center gap-4 ml-auto 
              bg-white/5 dark:bg-black/30 
              px-5 py-2.5 rounded-xl shadow-inner backdrop-blur-md border border-white/10 
              transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
            `}
          >
            <DasboardBtn />
            <ModeToggle />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-11 h-11",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>

      {/* 🔹 Soft glowing animation around logo */}
      <style jsx global>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 12px rgba(147, 51, 234, 0.4),
              0 0 25px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.6),
              0 0 50px rgba(59, 130, 246, 0.5);
          }
          100% {
            box-shadow: 0 0 12px rgba(147, 51, 234, 0.4),
              0 0 25px rgba(59, 130, 246, 0.3);
          }
        }
        .animate-glow {
          animation: glowPulse 4s ease-in-out infinite;
        }

        /* Hover feedback glow on navbar */
        nav:hover {
          box-shadow: 0 0 25px rgba(147, 51, 234, 0.3),
            0 0 45px rgba(59, 130, 246, 0.3);
          transition: all 0.4s ease;
        }
      `}</style>
    </motion.nav>
  );
}

export default Navbar;
