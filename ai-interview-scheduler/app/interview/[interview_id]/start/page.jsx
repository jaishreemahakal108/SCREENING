// "use client"
// import { InterviewDataContext } from '@/context/InterviewDataCintext'
// import { Mic, Phone, Timer } from 'lucide-react';
// import React, { useContext } from 'react'

// function StartInterview() {
//   const {interviewInfo , setInterviewInfo} = useContext(InterviewDataContext);
//   return (
//      <div className='p-20 lg:px-48 xl:px-56'>
//       <h2 className='font-bold text-xl flex justify-between'>
//         AI Interview Session 
//         <span className='flex gap-2 items-center'>
//           <Timer/>
//           00:00:00
//         </span>
//       </h2>

//       {/* ✅ FIXED grid */}
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
//         {/* Left card */}
//         <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
//           <video
//             src="/ai1.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-[80px] h-[80px] rounded-full object-cover"
//             width={100}
//             height={100}
//           />
//           <h2>AI Recruiter</h2>
//         </div>

//         {/* Right card */}
//         <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
//           <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>
//             {interviewInfo?.userName[0]}
//           </h2>
//           <h2>{interviewInfo?.userName}</h2>
//         </div>
//       </div>

//       <div className='flex items-center gap-5 justify-center mt-7'>
//         <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer'/>
//         <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer'/>
//       </div>

//       <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
//     </div>
//   )
// }

// export default StartInterview

"use client"
import { InterviewDataContext } from '@/context/InterviewDataCintext'
import { Mic, Phone, Timer, Loader2Icon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);

  const formatTime = (secs) => {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${hrs}:${mins}:${sec}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    let questions = interviewInfo?.interviewData?.questionList;
    if (typeof questions === "string") {
      try { questions = JSON.parse(questions); } 
      catch (err) { console.error("Error parsing questionList:", err); questions = []; }
    }

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "playht", voiceId: "jennifer" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
              You are an AI recruiter. Ask provided questions one by one.  
              Be friendly, professional, and give short feedback.  
              Questions: ${Array.isArray(questions) ? questions.map(q => q?.question).join(", ") : ""}
            `,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = async () => {
    try {
      setLoading(true);
      await vapi.stop();
      setIsRunning(false);
      toast("Interview Disconnected!");
      if (!feedbackGenerated) {
        await GenerateFeedback();
        setFeedbackGenerated(true);
      }
    } catch (err) {
      console.error("Error stopping call:", err);
      toast.error("Failed to disconnect interview.");
    } finally {
      setLoading(false);
    }
  };

  // VAPI listeners
  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg?.conversation) setConversation(JSON.stringify(msg.conversation));
    };

    const handleCallEnd = async () => {
      console.log("Call ended");
      toast("Interview Ended... Please Wait...");
      setIsRunning(false);
      if (!feedbackGenerated) {
        await GenerateFeedback();
        setFeedbackGenerated(true);
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", () => { setSeconds(0); setIsRunning(true); toast("Call Connected..."); });
    vapi.on("speech-start", () => setActiveUser(false));
    vapi.on("speech-end", () => setActiveUser(true));
    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-end", handleCallEnd);
    };
  }, [feedbackGenerated]);

  // Typing animation
  const text = "Interview in Progress...";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const speed = isDeleting ? 100 : 150;
    const timer = setTimeout(() => {
      const updated = isDeleting ? text.substring(0, displayText.length - 1) : text.substring(0, displayText.length + 1);
      setDisplayText(updated);
      if (!isDeleting && updated === text) setTimeout(() => setIsDeleting(true), 1000);
      else if (isDeleting && updated === "") { setIsDeleting(false); setLoop(loop + 1); }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loop]);

  // Feedback generation
  const GenerateFeedback = async () => {
    if (!conversation) {
      console.error("No conversation to send for feedback");
      toast.error("No conversation available");
      return;
    }

    console.log("Sending conversation to AI:", conversation);

    try {
      const result = await axios.post('/api/ai-feedback', { conversation });
      const content = result?.data?.content || "";

      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(content.replace(/```json/g, "").replace(/```/g, "").trim());
      } catch (err) {
        console.error("JSON parse error:", err, content);
        toast.error("Failed to parse AI feedback");
        return;
      }

      const { data, error } = await supabase
        .from('interview-feedback')
        .insert([{
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id,
          feedback: parsedFeedback,
          recommended: false
        }])
        .select();

      if (error) console.error("Supabase error:", error);
      else console.log("Feedback saved:", data);

      router.replace(`/interview/${interview_id}/completed`);

    } catch (err) {
      console.error("AI feedback API error:", err);
      toast.error("AI feedback generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-20 lg:px-48 xl:px-56 h-screen overflow-hidden bg-blue-800'>
      <h2 className='font-bold text-xl flex justify-between text-white drop-shadow'>
        AI Interview Session 
        <span className='flex gap-2 items-center'>
          <Timer />
          {formatTime(seconds)}
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-6'>
        <div className='bg-white/20 backdrop-blur-lg h-[400px] rounded-2xl shadow-2xl border flex flex-col gap-3 items-center justify-center hover:scale-105 transition-transform duration-300'>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl animate-pulse"></div>
            {!activeUser && <span className="absolute inset-0 w-[120px] h-[120px] rounded-full bg-purple-500 opacity-50 animate-ping"></span>}
            <video src="/ai1.mp4" autoPlay loop muted playsInline
              className="w-[100px] h-[100px] rounded-full object-cover relative z-10 border-4 border-white shadow-lg" />
          </div>
          <h2 className="text-white font-semibold text-lg mt-2">AI Recruiter</h2>
        </div>

        <div className='bg-white/20 backdrop-blur-lg h-[400px] rounded-2xl shadow-2xl border flex flex-col gap-3 items-center justify-center hover:scale-105 transition-transform duration-300'>
          <div className="relative">
            {activeUser && <span className="absolute inset-0 w-[120px] h-[120px] rounded-full bg-blue-500 opacity-50 animate-ping"></span>}
            <h2 className="text-3xl bg-primary text-white p-5 rounded-full shadow-md relative z-10">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>
          <h2 className="text-white text-lg">{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-8 justify-center mt-6'>
        <div className="flex gap-6 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-full shadow-lg">
          <Mic className='h-12 w-12 p-3 text-white rounded-full cursor-pointer bg-white/20 backdrop-blur-lg shadow-lg hover:scale-110 hover:shadow-purple-500/50 transition'/>
          {!loading ? (
            <Phone className='h-12 w-12 p-3 text-white rounded-full cursor-pointer bg-red-500/70 backdrop-blur-lg shadow-lg hover:scale-110 hover:shadow-red-500/70 transition' onClick={stopInterview}/>
          ) : <Loader2Icon className='animate-spin text-white h-12 w-12' />}
        </div>
      </div>

      <h2 className='text-sm text-white text-center mt-6 h-5 font-mono'>{displayText}</h2>
    </div>
  )
}

export default StartInterview;
