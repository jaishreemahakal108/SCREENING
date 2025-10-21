// import { CallRecording } from "@stream-io/video-react-sdk";
// import toast from "react-hot-toast";
// import { format } from "date-fns";
// import { calculateRecordingDuration } from "@/lib/utils";
// import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
// import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
// import { Button } from "./ui/button";

// function RecordingCard({ recording }: { recording: CallRecording }) {
//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(recording.url);
//       toast.success("Recording link copied to clipboard");
//     } catch (error) {
//       toast.error("Failed to copy link to clipboard");
//     }
//   };

//   const formattedStartTime = recording.start_time
//     ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
//     : "Unknown";

//   const duration =
//     recording.start_time && recording.end_time
//       ? calculateRecordingDuration(recording.start_time, recording.end_time)
//       : "Unknown duration";

//   return (
//     <Card className="group hover:shadow-md transition-all">
//       {/* CARD HEADER */}
//       <CardHeader className="space-y-1">
//         <div className="space-y-2">
//           <div className="flex flex-col gap-1.5">
//             <div className="flex items-center text-sm text-muted-foreground gap-2">
//               <CalendarIcon className="h-3.5 w-3.5" />
//               <span>{formattedStartTime}</span>
//             </div>
//             <div className="flex items-center text-sm text-muted-foreground gap-2">
//               <ClockIcon className="h-3.5 w-3.5" />
//               <span>{duration}</span>
//             </div>
//           </div>
//         </div>
//       </CardHeader>

//       {/* CARD CONTENT */}

//       <CardContent>
//         <div
//           className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center cursor-pointer group"
//           onClick={() => window.open(recording.url, "_blank")}
//         >
//           <div className="size-12 rounded-full bg-background/90 flex items-center justify-center group-hover:bg-primary transition-colors">
//             <PlayIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="gap-2">
//         <Button className="flex-1" onClick={() => window.open(recording.url, "_blank")}>
//           <PlayIcon className="size-4 mr-2" />
//           Play Recording
//         </Button>
//         <Button variant="secondary" onClick={handleCopyLink}>
//           <CopyIcon className="size-4" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
// export default RecordingCard;

import { CallRecording } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { calculateRecordingDuration } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

function RecordingCard({ recording }: { recording: CallRecording }) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("Recording link copied ✅");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card
        className="
          group 
          bg-white/60 
          dark:bg-slate-800/60 
          backdrop-blur-xl 
          border border-slate-200/50 
          dark:border-slate-700/50 
          shadow-md 
          hover:shadow-xl 
          transition-all 
          duration-300 
          rounded-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <CardHeader className="space-y-2 pb-2">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <CalendarIcon className="h-4 w-4 text-blue-400" />
            <span>{formattedStartTime}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <ClockIcon className="h-4 w-4 text-cyan-400" />
            <span>{duration}</span>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent>
          <motion.div
            className="
              w-full aspect-video 
              bg-gradient-to-br from-slate-100 to-slate-200 
              dark:from-slate-700 dark:to-slate-600 
              rounded-xl 
              flex items-center justify-center 
              relative overflow-hidden cursor-pointer
            "
            onClick={() => window.open(recording.url, "_blank")}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="
                size-14 rounded-full 
                bg-white/80 dark:bg-slate-900/70 
                flex items-center justify-center 
                backdrop-blur-md shadow-md
              "
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <PlayIcon className="size-6 text-blue-600 dark:text-cyan-300" />
            </motion.div>

            {/* Ripple Animation */}
            <motion.span
              className="absolute size-16 rounded-full border border-blue-400/40"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="gap-2 mt-3">
          <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
            <Button
              onClick={() => window.open(recording.url, "_blank")}
              className="relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-30 transition-opacity"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
              />
              <PlayIcon className="size-4 mr-2" />
              Play Recording
            </Button>
          </motion.div>
          <Button variant="secondary" onClick={handleCopyLink}>
            <CopyIcon className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default RecordingCard;