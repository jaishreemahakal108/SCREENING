// "use client"
// import { Button } from '@/components/ui/button';
// import { Video } from 'lucide-react';
// import React, { useState } from 'react'

// function LatestInterviewsList() {
//     const [InterviewList , setInterviewList] = useState([]);
//   return (
//     <div className='my-5'>
//         <h2 className='font-bold text-2xl'>Priviously Created Interviews</h2>

//         {InterviewList?.length==0&&
//             <div className='p-5 flex flex-col gap-3 items-center mt-5'>
//                 <Video className='h-10 w-10 text-primary' />
//                 <h2>You don't have any Interview created</h2>
//                 <Button>+ Create New Interview</Button>
//             </div>
//         }
//     </div>
//   )
// }

// export default LatestInterviewsList

// "use client"
// import { Button } from '@/components/ui/button'
// import { Video } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { motion } from "framer-motion"
// import { supabase } from '@/services/supabaseClient'
// import { useUser } from '@/app/provider'
// import InterviewCard from './InterviewCard'
// import { toast } from 'sonner'

// function LatestInterviewsList() {
//   const [InterviewList, setInterviewList] = useState([]);
//   const {user} = useUser();

//   useEffect(() => {
//     user&&GetInterviewList();
//   },[user])

//   const GetInterviewList = async () => {
//     let { data: Interviews, error } = await supabase
//       .from('Interviews')
//       .select('*')   
//       .eq('userEmail',user?.email)
//       .order('id',{ascending:false})
//       .limit(6)

//     console.log(Interviews);  
//     setInterviewList(Interviews);
//   }

//   return (
//     <div className="my-8">
//       <h2 className="font-bold text-2xl mb-4">Previously Created Interviews</h2>

//       {InterviewList?.length === 0 && (
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }} 
//           animate={{ opacity: 1, scale: 1 }} 
//           transition={{ duration: 0.5 }}
//           className="p-8 flex flex-col gap-4 items-center text-center bg-white rounded-xl shadow-md"
//         >
//           <Video className="h-12 w-12 text-indigo-500 animate-bounce" />
//           <h2 className="text-gray-600">You don’t have any Interviews yet</h2>
//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl">
//               + Create New Interview
//             </Button>
//           </motion.div>
//           {InterviewList&&
//             <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
//               {InterviewList.map((interview,index) => (
//                 <InterviewCard interview={interview} kry={index}/>
//               ))}
//             </div>
//           }
//         </motion.div>
//       )}

//       {InterviewList?.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {InterviewList.map((item, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, y: 20 }} 
//               animate={{ opacity: 1, y: 0 }} 
//               transition={{ delay: i * 0.2 }}
//               className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
//             >
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//               <p className="text-sm text-gray-500">{item.date}</p>
//               <span className="mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
//                 {item.status}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default LatestInterviewsList


"use client"
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import InterviewCard from './InterviewCard'
import { toast } from 'sonner'

function LatestInterviewsList() {
  const [InterviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })
      .limit(6);

    if (error) {
      console.error(error);
      toast.error("Failed to load interviews");
    } else {
      setInterviewList(Interviews);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-6 relative inline-block">
        Previously Created Interviews
        <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
      </h2>

      {/* Empty State */}
      {InterviewList?.length === 0 && (
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
            <Button className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl">
              + Create New Interview
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Cards Grid */}
      {InterviewList?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {InterviewList.map((interview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotate: "-0.5deg" }}
            >
              <InterviewCard interview={interview} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
