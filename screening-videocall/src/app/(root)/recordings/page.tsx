// "use client";

// import LoaderUI from "@/components/LoaderUI";
// import RecordingCard from "@/components/RecordingCard";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import useGetCalls from "@/hooks/useGetCalls";
// import { CallRecording } from "@stream-io/video-react-sdk";
// import { useEffect, useState } from "react";

// function RecordingsPage() {
//   const { calls, isLoading } = useGetCalls();
//   const [recordings, setRecordings] = useState<CallRecording[]>([]);

//   useEffect(() => {
//     const fetchRecordings = async () => {
//       if (!calls) return;

//       try {
//         // Get recordings for each call
//         const callData = await Promise.all(calls.map((call) => call.queryRecordings()));
//         const allRecordings = callData.flatMap((call) => call.recordings);

//         setRecordings(allRecordings);
//       } catch (error) {
//         console.log("Error fetching recordings:", error);
//       }
//     };

//     fetchRecordings();
//   }, [calls]);

//   if (isLoading) return <LoaderUI />;

//   return (
//     <div className="container max-w-7xl mx-auto p-6">
//       {/* HEADER SECTION */}
//       <h1 className="text-3xl font-bold">Recordings</h1>
//       <p className="text-muted-foreground my-1">
//         {recordings.length} {recordings.length === 1 ? "recording" : "recordings"} available
//       </p>

//       {/* RECORDINGS GRID */}

//       <ScrollArea className="h-[calc(100vh-12rem)] mt-3">
//         {recordings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
//             {recordings.map((r) => (
//               <RecordingCard key={r.end_time} recording={r} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-[400px] gap-4">
//             <p className="text-xl font-medium text-muted-foreground">No recordings available</p>
//           </div>
//         )}
//       </ScrollArea>
//     </div>
//   );
// }
// export default RecordingsPage;

"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls || calls.length === 0) return;
      try {
        const callData = await Promise.all(
          calls.map((call) => call.queryRecordings())
        );

        // Flatten and safely extract recordings
        const allRecordings = callData.flatMap((call) => call?.recordings || []);
        setRecordings(allRecordings);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [calls]);

  if (isLoading) return <LoaderUI />;

  // 🧪 Temporary fallback if no real recordings
  const demoRecordings =
    recordings && recordings.length > 0
      ? recordings
      : [
          {
            id: "demo-1",
            title: "Test Recording",
            duration: "5 mins",
          } as unknown as CallRecording,
        ];

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#e9f1f7]
        via-[#f3f5f7]
        to-[#dee7ee]
        dark:from-[#0f172a]
        dark:via-[#1e293b]
        dark:to-[#334155]
        text-white
        transition-colors
        duration-500
        p-6
      "
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-extrabold tracking-tight">Recordings</h1>
        <p className="text-gray-400 mt-2 text-base">
          {demoRecordings.length}{" "}
          {demoRecordings.length === 1 ? "recording" : "recordings"} available
        </p>
      </motion.div>

      {/* RECORDINGS GRID */}
      <ScrollArea className="h-[calc(100vh-14rem)] overflow-visible relative">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-10 px-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {demoRecordings.map((r, i) => (
            <motion.div
              key={`recording-${i}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="
                border border-gray-700 
                bg-[#1e293b]/70 
                hover:bg-[#1e293b] 
                p-6 
                rounded-xl 
                shadow-lg 
                hover:shadow-2xl 
                backdrop-blur-md 
                transition-all 
                duration-300 
                cursor-pointer
              "
            >
              {/*Visible fallback card content */}
              <RecordingCard recording={r} />
              
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
}

export default RecordingsPage;