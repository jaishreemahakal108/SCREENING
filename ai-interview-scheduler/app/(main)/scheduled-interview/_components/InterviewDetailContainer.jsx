// import { Calendar, Clock, MessageCircleQuestionIcon } from 'lucide-react'
// import moment from 'moment'
// import React from 'react'

// function InterviewDetailContainer({interviewDetail}) {
//   let questions = [];
//   try {
//     // If it's a JSON string, parse it
//     const parsed = JSON.parse(interviewDetail?.questionList);
//     questions = Array.isArray(parsed) ? parsed : [];
//   } catch {
//     // If already an array, use it directly
//     questions = Array.isArray(interviewDetail?.questionList)
//       ? interviewDetail.questionList
//       : [];
//   }

//   return (
//     <div className='p-5 rounded-lg bg-gray-200 mt-5 text-2xl'>
//       <h2>{interviewDetail?.jobPosition}</h2>

//       <div className='mt-4 flex items-center justify-between lg:pr-10'>
//         <div>
//           <h2 className='text-sm'>Duration</h2>
//           <h2 className='flex text-sm items-center gap-2 font-bold'><Clock className='h-4 w-4 '/> {interviewDetail?.duration} </h2>
//         </div>

//         <div>
//           <h2 className='text-sm'>Created On</h2>
//           <h2 className='flex text-sm items-center gap-2 font-bold'><Calendar className='h-4 w-4 '/> {moment(interviewDetail?.created_at).format('MMM DD , yyy')} </h2>
//         </div>

//         {interviewDetail?.type && <div>
//           <h2 className='text-sm'>Type</h2>
//           <h2 className='flex text-sm items-center gap-2 font-bold'>
//             <Clock className='h-4 w-4 '/> 
//             {(() => {
//               try {
//                 const parsed = JSON.parse(interviewDetail?.type);
//                 return Array.isArray(parsed) ? parsed.join(", ") : interviewDetail?.type;
//               } catch {
//                 return interviewDetail?.type;
//               }
//             })()}
//           </h2>
//         </div>}
      
//       </div>

//       <div className='mt-5'>
//         <h2 className='font-bold'>Job Description</h2>
//         <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
//       </div>

//       <div className='mt-5'>
//         <h2 className='font-bold'>Interview Questions</h2>
//         <div className='text-sm leading-6 grid grid-cols-2 gap-3 mt-3'>
//           {questions.length > 0 ? (
//             questions.map((item, index) => (
//               <h2 key={index} >
//                 {index + 1}. {item.question || item}
//               </h2>
//             ))
//           ) : (
//             <p className="text-sm text-gray-600">No questions available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InterviewDetailContainer

// import { Calendar, Clock, Tag } from 'lucide-react'
// import moment from 'moment'
// import React from 'react'

// function InterviewDetailContainer({ interviewDetail }) {
//   // ✅ Normalize questions
//   let questions = [];
//   try {
//     const parsed = JSON.parse(interviewDetail?.questionList);
//     questions = Array.isArray(parsed) ? parsed : [];
//   } catch {
//     questions = Array.isArray(interviewDetail?.questionList)
//       ? interviewDetail.questionList
//       : [];
//   }

//   // ✅ Normalize type
//   let typeDisplay = "";
//   try {
//     const parsed = JSON.parse(interviewDetail?.type);
//     typeDisplay = Array.isArray(parsed) ? parsed.join(", ") : interviewDetail?.type;
//   } catch {
//     typeDisplay = interviewDetail?.type;
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       {/* Job Position */}
//       <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
//         {interviewDetail?.jobPosition}
//       </h2>

//       {/* Info Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
//         <InfoItem icon={<Clock className="w-4 h-4" />} label="Duration" value={`${interviewDetail?.duration} `} />
//         <InfoItem icon={<Calendar className="w-4 h-4" />} label="Created On" value={moment(interviewDetail?.created_at).format('MMM DD, YYYY')} />
//         <InfoItem icon={<Tag className="w-4 h-4" />} label="Type" value={typeDisplay} />
//       </div>

//       {/* Job Description */}
//       <div className="mb-6">
//         <h3 className="font-semibold text-lg mb-2">Job Description</h3>
//         <div className="bg-gray-50 border-l-4 border-blue-500 p-4 text-sm leading-6 text-gray-700">
//           {interviewDetail?.jobDescription}
//         </div>
//       </div>

//       {/* Questions */}
//       <div>
//         <h3 className="font-semibold text-lg mb-3">Interview Questions</h3>
//         <ol className="list-decimal list-inside space-y-2 text-sm text-gray-800">
//           {questions.length > 0 ? (
//             questions.map((item, index) => (
//               <li key={index} className="bg-gray-50 rounded-md p-2 hover:bg-gray-100 transition">
//                 {item.question || item}
//               </li>
//             ))
//           ) : (
//             <p className="text-gray-500">No questions available</p>
//           )}
//         </ol>
//       </div>
//     </div>
//   )
// }

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex items-start gap-2">
//       {icon}
//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="font-semibold text-gray-800">{value}</p>
//       </div>
//     </div>
//   )
// }

// export default InterviewDetailContainer


import { Calendar, Clock, Tag } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { motion } from 'framer-motion'

function InterviewDetailContainer({ interviewDetail, loading = false }) {
  // Normalize questions
  let questions = [];
  try {
    const parsed = JSON.parse(interviewDetail?.questionList);
    questions = Array.isArray(parsed) ? parsed : [];
  } catch {
    questions = Array.isArray(interviewDetail?.questionList)
      ? interviewDetail.questionList
      : [];
  }

  // Normalize type
  let typeDisplay = "";
  try {
    const parsed = JSON.parse(interviewDetail?.type);
    typeDisplay = Array.isArray(parsed) ? parsed.join(", ") : interviewDetail?.type;
  } catch {
    typeDisplay = interviewDetail?.type;
  }

  if (loading || !interviewDetail) {
    // simple skeleton
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-8 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-md border border-gray-100"
    >
      {/* Top gradient header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{interviewDetail?.jobPosition || "—"}</h2>
          <div className="mt-1 text-sm text-slate-500">Interview Details & Questions</div>
        </div>

        <div className="flex gap-3">
          <InfoCard icon={<Clock className="w-4 h-4" />} title="Duration" value={`${interviewDetail?.duration || "-" } min`} />
          <InfoCard icon={<Calendar className="w-4 h-4" />} title="Created On" value={moment(interviewDetail?.created_at).format('MMM DD, YYYY')} />
          <InfoCard icon={<Tag className="w-4 h-4" />} title="Type" value={typeDisplay || "-"} />
        </div>
      </div>

      {/* Job Description */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h3 className="font-semibold text-lg mb-2">Job Description</h3>
        <div className="bg-white rounded-lg border-l-4 border-blue-500 p-4 text-sm leading-6 text-slate-700 shadow-sm hover:shadow-md transition">
          {interviewDetail?.jobDescription || "No job description provided."}
        </div>
      </motion.div>

      {/* Questions */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Interview Questions</h3>

        <motion.ol
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } }
          }}
          className="space-y-3"
        >
          {questions.length > 0 ? (
            questions.map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 }
                }}
                className="flex items-start gap-3 bg-white rounded-lg p-3 hover:shadow-md transition"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                </div>
                <div className="text-sm text-slate-800">
                  {item?.question || item}
                </div>
              </motion.li>
            ))
          ) : (
            <p className="text-gray-500">No questions available</p>
          )}
        </motion.ol>
      </div>
    </motion.div>
  )
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-xl px-4 py-2 shadow-sm flex items-center gap-3 min-w-[140px]">
      <div className="text-slate-600">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <p className="font-semibold text-sm text-slate-800">{value}</p>
      </div>
    </div>
  )
}

export default InterviewDetailContainer