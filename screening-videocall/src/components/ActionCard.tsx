// import { QuickActionType } from "@/constants";
// import { Card } from "./ui/card";

// // some weird tw bug, but this is how it works
// // from-orange-500/10 via-orange-500/5 to-transparent
// // from-blue-500/10 via-blue-500/5 to-transparent
// // from-purple-500/10 via-purple-500/5 to-transparent
// // from-primary/10 via-primary/5 to-transparent

// function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
//   return (
//     <Card
//       className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
//       onClick={onClick}
//     >
//       {/* ACTION GRADIENT */}
//       <div
//         className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100 group-hover:opacity-50 transition-opacity`}
//       />

//       {/* ACTION CONTENT WRAPPER */}
//       <div className="relative p-6 size-full">
//         <div className="space-y-3">
//           {/* ACTION ICON */}
//           <div
//             className={`w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}/10 group-hover:scale-110 transition-transform`}
//           >
//             <action.icon className={`h-6 w-6 text-${action.color}`} />
//           </div>

//           {/* ACTION DETAILS */}
//           <div className="space-y-1">
//             <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
//               {action.title}
//             </h3>
//             <p className="text-sm text-muted-foreground">{action.description}</p>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default ActionCard;

"use client"

import { QuickActionType } from "@/constants"
import { Card } from "./ui/card"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  const { theme } = useTheme()

  const isLight = theme === "light"

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className="relative group"
      onClick={onClick}
    >
      <Card
        className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 backdrop-blur-xl border 
        ${
          isLight
            ? "bg-gradient-to-br from-white via-gray-50 to-gray-100 border-gray-200 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-gradient-to-br from-white/5 via-white/2 to-transparent border-white/10 hover:shadow-[0_0_20px_var(--tw-shadow-color)] shadow-emerald-500/20"
        }`}
      >
        {/* Gradient overlay (only visible in dark mode for glow) */}
        {!isLight && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-60 group-hover:opacity-90 transition-opacity duration-500`}
          />
        )}

        {/* Glow border (dark mode only) */}
        {!isLight && (
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-teal-400/10 blur-2xl transition-all duration-700" />
        )}

        {/* Content */}
        <div className="relative p-6 z-10 flex flex-col gap-4">
          {/* Icon Section */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isLight ? "bg-gray-100" : `bg-${action.color}/15`
            }`}
          >
            <action.icon
              className={`h-6 w-6 ${
                isLight ? "text-gray-700" : `text-${action.color}`
              }`}
            />
          </motion.div>

          {/* Title and Description */}
          <div>
            <h3
              className={`text-xl font-semibold transition-colors ${
                isLight
                  ? "text-gray-800 group-hover:text-blue-600"
                  : "text-white group-hover:text-emerald-300"
              }`}
            >
              {action.title}
            </h3>
            <p
              className={`text-sm ${
                isLight ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {action.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ActionCard