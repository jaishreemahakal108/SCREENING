// import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
// import { useEffect, useState } from "react";
// import { Card } from "./ui/card";
// import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
// import { Switch } from "./ui/switch";
// import { Button } from "./ui/button";

// function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
//   const [isCameraDisabled, setIsCameraDisabled] = useState(true);
//   const [isMicDisabled, setIsMicDisabled] = useState(false);

//   const call = useCall();

//   if (!call) return null;

//   useEffect(() => {
//     if (isCameraDisabled) call.camera.disable();
//     else call.camera.enable();
//   }, [isCameraDisabled, call.camera]);

//   useEffect(() => {
//     if (isMicDisabled) call.microphone.disable();
//     else call.microphone.enable();
//   }, [isMicDisabled, call.microphone]);

//   const handleJoin = async () => {
//     await call.join();
//     onSetupComplete();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
//       <div className="w-full max-w-[1200px] mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* VIDEO PREVIEW CONTAINER */}
//           <Card className="md:col-span-1 p-6 flex flex-col">
//             <div>
//               <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
//               <p className="text-sm text-muted-foreground">Make sure you look good!</p>
//             </div>

//             {/* VIDEO PREVIEW */}
//             <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative">
//               <div className="absolute inset-0">
//                 <VideoPreview className="h-full w-full" />
//               </div>
//             </div>
//           </Card>

//           {/* CARD CONTROLS */}

//           <Card className="md:col-span-1 p-6">
//             <div className="h-full flex flex-col">
//               {/* MEETING DETAILS  */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
//                 <p className="text-sm text-muted-foreground break-all">{call.id}</p>
//               </div>

//               <div className="flex-1 flex flex-col justify-between">
//                 <div className="spacey-6 mt-8">
//                   {/* CAM CONTROL */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                         <CameraIcon className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Camera</p>
//                         <p className="text-sm text-muted-foreground">
//                           {isCameraDisabled ? "Off" : "On"}
//                         </p>
//                       </div>
//                     </div>
//                     <Switch
//                       checked={!isCameraDisabled}
//                       onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
//                     />
//                   </div>

//                   {/* MIC CONTROL */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                         <MicIcon className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Microphone</p>
//                         <p className="text-sm text-muted-foreground">
//                           {isMicDisabled ? "Off" : "On"}
//                         </p>
//                       </div>
//                     </div>
//                     <Switch
//                       checked={!isMicDisabled}
//                       onCheckedChange={(checked) => setIsMicDisabled(!checked)}
//                     />
//                   </div>

//                   {/* DEVICE SETTINGS */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                         <SettingsIcon className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Settings</p>
//                         <p className="text-sm text-muted-foreground">Configure devices</p>
//                       </div>
//                     </div>
//                     <DeviceSettings />
//                   </div>
//                 </div>

//                 {/* JOIN BTN */}
//                 <div className="space-y-3 mt-8">
//                   <Button className="w-full" size="lg" onClick={handleJoin}>
//                     Join Meeting
//                   </Button>
//                   <p className="text-xs text-center text-muted-foreground">
//                     Do not worry, our team is super friendly! We want you to succeed. 🎉
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default MeetingSetup;

import { useEffect, useState } from "react";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

// 🔁 Looping Typewriter Hook
function useLoopingTypewriter(words: string[], speed = 80, pause = 1200) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let interval: NodeJS.Timeout;

    if (!deleting && text !== current) {
      interval = setInterval(() => setText(current.substring(0, text.length + 1)), speed);
    } else if (deleting && text !== "") {
      interval = setInterval(() => setText(current.substring(0, text.length - 1)), speed / 2);
    } else if (!deleting && text === current) {
      setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearInterval(interval);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);
  const call = useCall();

  const headingText = useLoopingTypewriter(["Get Ready for Your Meeting", "All the best..."], 70, 1500);

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-500
      bg-gradient-to-br from-indigo-100 via-white to-blue-100 
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">

      <motion.div
        className="w-full max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE - VIDEO PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-6 flex flex-col backdrop-blur-md bg-white/60 dark:bg-gray-800/40 border border-white/20 shadow-lg">
              <div>
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent min-h-[2.5rem]">
                  {headingText}
                  <span className="animate-pulse text-indigo-500">|</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Check your camera and microphone before joining.
                </p>
              </div>

              <div className="mt-4 flex-1 min-h-[400px] rounded-2xl overflow-hidden bg-muted/40 border relative">
                <div className="absolute inset-0">
                  <VideoPreview className="!h-full !w-full [&>video]:object-cover [&>video]:h-full [&>video]:w-full" />
                </div>
                {isCameraDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-medium">
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* RIGHT SIDE - SETTINGS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-6 flex flex-col backdrop-blur-md bg-white/60 dark:bg-gray-800/40 border border-white/20 shadow-lg">
              <div>
                <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
                <p className="text-sm text-muted-foreground break-all">{call.id}</p>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6 mt-8">
                  {/* CAMERA CONTROL */}
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div whileTap={{ scale: 0.9 }} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CameraIcon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium">Camera</p>
                        <p className="text-sm text-muted-foreground">
                          {isCameraDisabled ? "Off" : "On"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isCameraDisabled}
                      onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
                    />
                  </motion.div>

                  {/* MICROPHONE CONTROL */}
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div whileTap={{ rotate: 20 }} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MicIcon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium">Microphone</p>
                        <p className="text-sm text-muted-foreground">
                          {isMicDisabled ? "Off" : "On"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isMicDisabled}
                      onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                    />
                  </motion.div>

                  {/* SETTINGS */}
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div whileTap={{ rotate: 180 }} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <SettingsIcon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium">Settings</p>
                        <p className="text-sm text-muted-foreground">Configure devices</p>
                      </div>
                    </div>
                    <DeviceSettings />
                  </motion.div>
                </div>

                {/* JOIN BUTTON */}
                <motion.div
                  className="space-y-3 mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    size="lg"
                    onClick={handleJoin}
                  >
                    Join Meeting
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    You’re just one click away from your interview...
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default MeetingSetup;