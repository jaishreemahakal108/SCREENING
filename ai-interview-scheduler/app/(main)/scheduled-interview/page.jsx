// "use client"
// import { useUser } from '@/app/provider'
// import { Button } from '@/components/ui/button';
// import { supabase } from '@/services/supabaseClient'
// import React, { useEffect, useState } from 'react'
// import InterviewCard from '../dashboard/_components/InterviewCard';

// function ScheduledInterview() {

//   const {user} = useUser();

//   const [interviewList,setInterviewList] = useState();

//   useEffect(() => {
//     user && GetInterviewList();
//   },[user])

//   const GetInterviewList = async () => {
//     const { data, error } = await supabase
//     .from('Interviews')
//     .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
//     .eq('userEmail', user?.email)
//     .order('id',{ascending:false})

//     // console.log(result);
//     setInterviewList(data);
//   }

//   return (
//     <div className='mt-5'>
//       <h2 className='font-bold text-2xl'>Interview List with Candidate Feedback</h2>

//       {interviewList?.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="p-10 flex flex-col gap-4 items-center text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md"
//         >
//           <Video className="h-14 w-14 text-indigo-500 animate-pulse" />
//           <h2 className="text-gray-600 text-lg font-medium">
//             You don’t have any Interviews yet
//           </h2>
//           <motion.div whileHover={{ scale: 1.08 }}>
//             <Button className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl">
//               + Create New Interview
//             </Button>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Cards Grid */}
//       {interviewList?.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {interviewList.map((interview) => (
//             <motion.div
//               key={interview.id} // ✅ use unique key
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               whileHover={{ scale: 1.02, rotate: "-0.5deg" }}
//             >
//               <InterviewCard interview={interview} />
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default ScheduledInterview

//page.jsx(schedule-interview)
"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
   const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    console.log("Current user email:", user.email);

    const { data, error } = await supabase
      .from("Interviews")
      .select(`
        id,
        jobPosition,
        duration,
        interview_id,
        userEmail,
        created_at,
        interview-feedback(*)
      `)
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    console.log("Fetched rows:", data);
    setInterviewList(data || []);
  };

  const handleCreateInterview = () => {
    // Option 1: If both pages are part of the same Next.js app
    //router.push("/dashboard/create-interview");

    // Option 2: If it's a separate deployed app (as per your link)
    window.location.href = "https://screening-au2f.vercel.app/dashboard/create-interview";
  };

  return (
    <div className="mt-5">
      {/* Heading with underline */}
      <h2 className="font-bold text-2xl relative inline-block">
        Interview List with Candidate Feedback
        <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
      </h2>

      {/* Gap between heading and content */}
      <div className="mt-8">
        {/* No interviews */}
        {interviewList.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-10 flex flex-col gap-4 items-center text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md"
          >
            <Video className="h-14 w-14 text-indigo-500 animate-pulse" />
            <h2 className="text-gray-600 text-lg font-medium">
              You don’t have any Interviews yet
            </h2>
            <motion.div whileHover={{ scale: 1.08 }}>
              <Button 
                className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl"
                onClick={handleCreateInterview} 
              >
                + Create New Interview
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Cards Grid */}
        {interviewList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {interviewList.map((interview) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, rotate: "-0.5deg" }}
              >
                <InterviewCard interview={interview} viewDetail={true} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduledInterview;