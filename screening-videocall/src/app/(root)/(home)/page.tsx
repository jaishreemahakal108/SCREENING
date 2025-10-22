// "use client";

// import { useUserRole } from "@/hooks/useUserRole";
// import { useQuery } from "convex/react";
// import { useState } from "react";
// import { api } from "../../../../convex/_generated/api";
// import { useRouter } from "next/navigation";
// import { Loader2Icon } from "lucide-react";
// import { QUICK_ACTIONS } from "@/constants";
// import ActionCard from "@/components/ActionCard";
// import MeetingModal from "@/components/MeetingModal";
// import MeetingCard from "@/components/MeetingCard";
// import LoaderUI from "@/components/LoaderUI";

// export default function Home() {
//   const router = useRouter();

//   const { isInterviewer, isCandidate, isLoading } = useUserRole();
//   const interviews = useQuery(api.interviews.getMyInterviews);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState<"start" | "join">();

//   const handleQuickAction = (title: string) => {
//     switch (title) {
//       case "New Call":
//         setModalType("start");
//         setShowModal(true);
//         break;
//       case "Join Interview":
//         setModalType("join");
//         setShowModal(true);
//         break;
//       default:
//         router.push(`/${title.toLowerCase()}`);
//     }
//   };

//   if (isLoading) return <LoaderUI />;

//   return (
//     <div className="container max-w-7xl mx-auto p-6">
//       {/* WELCOME SECTION */}
//       <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//           Welcome back!
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           {isInterviewer
//             ? "Manage your interviews and review candidates effectively"
//             : "Access your upcoming interviews and preparations"}
//         </p>
//       </div>

//       {isInterviewer ? (
//         <>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {QUICK_ACTIONS.map((action) => (
//               <ActionCard
//                 key={action.title}
//                 action={action}
//                 onClick={() => handleQuickAction(action.title)}
//               />
//             ))}
//           </div>

//           <MeetingModal
//             isOpen={showModal}
//             onClose={() => setShowModal(false)}
//             title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
//             isJoinMeeting={modalType === "join"}
//           />
//         </>
//       ) : (
//         <>
//           <div>
//             <h1 className="text-3xl font-bold">Your Interviews</h1>
//             <p className="text-muted-foreground mt-1">View and join your scheduled interviews</p>
//           </div>

//           <div className="mt-8">
//             {interviews === undefined ? (
//               <div className="flex justify-center py-12">
//                 <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
//               </div>
//             ) : interviews.length > 0 ? (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {interviews.map((interview) => (
//                   <MeetingCard key={interview._id} interview={interview} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12 text-muted-foreground">
//                 You have no scheduled interviews at the moment
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client"

import { useUserRole } from "@/hooks/useUserRole"
import { useQuery } from "convex/react"
import { useState } from "react"
import { api } from "../../../../convex/_generated/api"
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { QUICK_ACTIONS } from "@/constants"
import ActionCard from "@/components/ActionCard"
import MeetingModal from "@/components/MeetingModal"
import MeetingCard from "@/components/MeetingCard"
import LoaderUI from "@/components/LoaderUI"
import { motion } from "framer-motion"
import Typewriter from "typewriter-effect"
import { useTheme } from "next-themes"

export default function Home() {
  const router = useRouter()
  const { isInterviewer, isCandidate, isLoading } = useUserRole()
  const { theme } = useTheme()
  const interviews = useQuery(api.interviews.getMyInterviews)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<"start" | "join">()

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start")
        setShowModal(true)
        break
      case "Join Interview":
        setModalType("join")
        setShowModal(true)
        break
      case "Dashboard":
      window.location.href = "https://screening-au2f.vercel.app/dashboard";
      break;
      default:
        router.push(`/${title.toLowerCase()}`)
    }
  }

  if (isLoading) return <LoaderUI />

  const bgClass =
    theme === "light"
      ? "bg-white"
      : "bg-[#030712]"

  return (
    <div className={`relative h-screen overflow-hidden ${bgClass} transition-colors duration-500`}>
      {/* BACKGROUND EFFECT */}
      {theme === "light" ? (
        <>
          {/* White base layer */}
          <div className="absolute inset-0 -z-10 bg-white" />

          {/* Floating gradient blobs */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full blur-3xl opacity-70"
            animate={{
              x: [0, 120, -80, 0],
              y: [0, -50, 100, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-tr from-pink-100 via-indigo-100 to-cyan-100 rounded-full blur-3xl opacity-60"
            animate={{
              x: [0, -100, 60, 0],
              y: [0, 70, -90, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-gradient-to-r from-indigo-100 via-blue-50 to-pink-100 rounded-full blur-2xl opacity-50"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 60, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut",
            }}
          />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 blur-3xl animate-pulse-slow" />
      )}

      {/* CONTENT CONTAINER */}
      <div className="container max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* WELCOME SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`rounded-2xl backdrop-blur-xl p-8 shadow-lg mb-12 border
            ${theme === "light"
              ? "bg-gradient-to-br from-[#f9fafb] via-[#ffffff] to-[#f3f4f6] border-gray-200 text-gray-800"
              : "bg-gradient-to-br from-[#0b0f1a]/80 via-[#111827]/80 to-[#1e293b]/80 border-white/10 text-white"
            }`}
        >
          <h1
            className={`text-5xl font-extrabold ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            } tracking-tight`}
          >
            Welcome back!
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mt-3 text-lg h-[28px] ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            <Typewriter
              options={{
                strings: [
                  "Manage your interviews and review candidates effectively.",
                  "Plan, conduct, and analyze interviews seamlessly.",
                  "Enhance your hiring process with smart tools.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
                delay: 50,
              }}
            />
          </motion.div>
        </motion.div>

        {/* QUICK ACTIONS */}
        {isInterviewer ? (
          <>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {QUICK_ACTIONS.map((action, index) => (
                <motion.div
                  key={action.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ActionCard
                    action={action}
                    onClick={() => handleQuickAction(action.title)}
                  />
                </motion.div>
              ))}
            </motion.div>

            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Interviews
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                View and join your scheduled interviews
              </p>
            </motion.div>

            <div className="mt-8">
              {interviews === undefined ? (
                <div className="flex justify-center py-12">
                  <Loader2Icon className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : interviews.length > 0 ? (
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {interviews.map((interview) => (
                    <motion.div
                      key={interview._id}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <MeetingCard interview={interview} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  You have no scheduled interviews at the moment
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
