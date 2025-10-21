// "use client";

// import LoaderUI from "@/components/LoaderUI";
// import { useUserRole } from "@/hooks/useUserRole";
// import { useRouter } from "next/navigation";
// import InterviewScheduleUI from "./InterviewScheduleUI";

// function SchedulePage() {
//   const router = useRouter();

//   const { isInterviewer, isLoading } = useUserRole();

//   if (isLoading) return <LoaderUI />;
//   if (!isInterviewer) return router.push("/");

//   return <InterviewScheduleUI />;
// }
// export default SchedulePage;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { CalendarDays, Clock } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// const interviews = [
//   {
//     id: 1,
//     title: "Demo_interview",
//     description: "Demo",
//     date: "Tuesday, October 21 · 2:00 PM",
//     status: "Upcoming",
//   },
// ];

// export default function InterviewPage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gray-200 dark:bg-transparent transition-colors duration-700">
//       {/* Animated Gradient Background for Dark Mode Only */}
//       <motion.div
//         className="absolute inset-0 -z-10 hidden dark:block"
//         animate={{
//           background: [
//             "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
//             "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
//             "linear-gradient(135deg, #373B44 0%, #4286f4 100%)",
//           ],
//         }}
//         transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
//       />

//       {/* Overlay for subtle darkness in dark mode */}
//       <div className="absolute inset-0 bg-black/50 dark:bg-black/80 -z-10 transition-all duration-500"></div>

//       {/* Header */}
//       <div className="flex justify-between items-center px-10 py-8">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-800 dark:text-white drop-shadow-sm">
//             Interviews
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Schedule and manage interviews
//           </p>
//         </div>

//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
//           <Button className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-600 text-white shadow-lg border-none">
//             Schedule Interview
//           </Button>
//         </motion.div>
//       </div>

//       {/* Interview Cards */}
//       <div className="px-10 py-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 scrollbar-hide">
//         {interviews.map((interview) => (
//           <motion.div
//             key={interview.id}
//             whileHover={{ y: -5, scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             <Card className="bg-white/80 dark:bg-neutral-900/80 border border-gray-300 dark:border-neutral-700 shadow-xl backdrop-blur-md rounded-2xl p-6 transition-all">
//               <CardHeader className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
//                     <CalendarDays className="h-5 w-5" />
//                     <span className="text-sm">{interview.date}</span>
//                   </div>
//                   <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md">
//                     {interview.status}
//                   </span>
//                 </div>
//                 <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {interview.title}
//                 </CardTitle>
//                 <CardDescription className="text-gray-700 dark:text-gray-400">
//                   {interview.description}
//                 </CardDescription>
//               </CardHeader>
//               <div className="mt-4 flex items-center justify-center">
//                 <Button
//                   variant="outline"
//                   className="w-full border-gray-400/40 dark:border-gray-600/40 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all rounded-lg"
//                   disabled
//                 >
//                   <Clock className="h-4 w-4 mr-2" /> Waiting to Start
//                 </Button>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* Hide scrollbar utility */}
//       <style jsx global>{`
//         ::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "./InterviewScheduleUI";

export default function SchedulePage() {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Loader animation
  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoaderUI />
      </motion.div>
    );
  }

  if (!isInterviewer) {
    router.push("/");
    return null;
  }

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-[#0f172a] transition-colors duration-700"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated gradient shimmer background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 
                   dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-70"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
          zIndex: 0,
        }}
      />

      {/* Fade + Scale content entry */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto p-6"
        >
          <InterviewScheduleUI />
        </motion.div>
      )}
    </motion.div>
  );
}
