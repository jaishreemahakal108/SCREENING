// import { Button } from '@/components/ui/button'
// import moment from 'moment'
// import React from 'react'

// function CandidateList({ candidateList }) {
//   return (
//     <div>
//       <h2 className='font-bold my-5'>
//         Candidates ({candidateList?.length || 0})
//       </h2>

//       {Array.isArray(candidateList) && candidateList.length > 0 ? (
//         candidateList.map((candidate, index) => (
//           <div key={index} className='p-5 flex gap-3 items-center bg-gray-300 rounded-lg justify-between'>
//             <div className='flex items-center gap-5'>
//                 <h2 className='bg-blue-500 p-3 rounded-full px-4.5 font-bold text-white'>
//                 {candidate?.userName?.[0] || "?"}
//                 </h2>
//                 <div>
//                     <h2 className='font-bold'>{candidate?.userName}</h2>
//                     <h2 className='text-sm text-red-400'>Completed On :- {moment(candidate?.created_at).format('MMM DD, yyy')}</h2>
//                 </div>
//             </div>

//             <div className='flex gap-3 items-center'>
//                 <h2 className='text-green-400'>6/10</h2>
//                 <Button variant="outline" className='text-bold'>View Report</Button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-sm">No candidates available</p>
//       )}
//     </div>
//   )
// }

// export default CandidateList


// import moment from 'moment'
// import React from 'react'
// import CandidateFeedbackDialog from './CandidateFeedbackDialog'

// function CandidateList({ candidateList }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="font-bold text-lg mb-4">
//         Candidates ({candidateList?.length || 0})
//       </h2>

//       {Array.isArray(candidateList) && candidateList.length > 0 ? (
//         <div className="space-y-4">
//           {candidateList.map((candidate, index) => (
//             <div 
//               key={index} 
//               className="p-4 flex gap-4 items-center bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition justify-between"
//             >
//               {/* Avatar + Info */}
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg">
//                   {candidate?.userName?.[0] || "?"}
//                 </div>
//                 <div>
//                   <h2 className="font-semibold text-gray-800">{candidate?.userName}</h2>
//                   <p className="text-xs text-gray-500">
//                     Completed On: {moment(candidate?.created_at).format('MMM DD, YYYY')}
//                   </p>
//                 </div>
//               </div>

//               {/* Score + Report */}
//               <div className="flex items-center gap-3">
//                 <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
//                   6/10
//                 </span>
//                 <CandidateFeedbackDialog candidate={candidate} />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-sm">No candidates available</p>
//       )}
//     </div>
//   )
// }

// export default CandidateList

import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'
import { motion } from 'framer-motion'
import { Mail, MoreHorizontal } from 'lucide-react'

function CandidateList({ candidateList, loading = false }) {
  if (loading) {
    return (
      <div className="bg-transparent">
        <div className="grid grid-cols-1 gap-4">
          {[1,2,3].map((i) => (
            <div key={i} className="p-4 bg-white rounded-2xl shadow animate-pulse h-24" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-transparent">
      <h2 className="font-bold text-lg mb-4">Candidates ({candidateList?.length || 0})</h2>

      {Array.isArray(candidateList) && candidateList.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-4"
        >
          {candidateList.map((candidate, index) => (
            <CandidateCard key={index} candidate={candidate} index={index} />
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function CandidateCard({ candidate, index }) {
  // compute overall score from rating object if present
  const ratingObj = candidate?.feedback?.feedback?.rating || candidate?.feedback?.rating || null;

  const getOverallScore = () => {
    if (!ratingObj || typeof ratingObj !== "object") {
      // fallback: maybe there's an overall score field
      const fallback = candidate?.feedback?.feedback?.overallScore || candidate?.overallScore || 0;
      return Number(fallback) || 0;
    }
    const values = Object.values(ratingObj).filter(v => typeof v === 'number');
    if (values.length === 0) return 0;
    const avg = values.reduce((s, v) => s + v, 0) / values.length;
    return Math.round(avg); // out of 10
  }

  const scoreOutOf10 = getOverallScore();
  const percent = Math.min(Math.max(Math.round(scoreOutOf10 * 10), 0), 100);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
      className="p-4 flex items-center justify-between gap-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition"
    >
      {/* left: avatar + info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-lg font-bold">
            {candidate?.userName?.[0] || "?"}
          </div>
          {/* animated outer ring */}
          <motion.span
            aria-hidden
            className="absolute -inset-1 rounded-full"
            animate={{ boxShadow: ["0 0 0px rgba(59,130,246,0.0)", "0 0 14px rgba(59,130,246,0.18)"] }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
          />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">{candidate?.userName}</h3>
          <p className="text-xs text-slate-500">Completed On: {moment(candidate?.created_at).format('MMM DD, YYYY')}</p>
        </div>
      </div>

      {/* center: optional metadata or spacer */}
      <div className="hidden md:flex md:flex-1" />

      {/* right: score + actions */}
      <div className="flex items-center gap-3">
        <ScoreRing percent={percent} value={scoreOutOf10} />

        <div className="flex items-center gap-2">
          {/* <button
            title="More"
            className="p-2 rounded-md hover:bg-slate-50 transition"
            aria-label="more"
          >
            <MoreHorizontal className="w-4 h-4 text-slate-500" />
          </button>

          <button
            title="Send message"
            className="p-2 rounded-md hover:bg-slate-50 transition"
            aria-label="mail"
          >
            <Mail className="w-4 h-4 text-slate-500" />
          </button> */}

          <CandidateFeedbackDialog candidate={candidate} />
        </div>
      </div>
    </motion.div>
  )
}


function ScoreRing({ percent = 0, value = 0 }) {
  const size = 48;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (1 - percent / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="#e6eefb"
          strokeWidth={stroke}
          fill="transparent"
        />
        <motion.circle
          cx={size/2}
          cy={size/2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="url(#grad)"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dash }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#36b3ff" />
            <stop offset="100%" stopColor="#7c4dff" />
          </linearGradient>
        </defs>
        <foreignObject x="0" y="0" width={size} height={size}>
          <div className="w-full h-full flex items-center justify-center text-xs">
            <div className="text-sm font-semibold text-slate-800">{value}/10</div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm text-center">
      <div className="mx-auto w-36 h-36 rounded-full bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center text-2xl">
        😊
      </div>
      <h4 className="mt-4 font-semibold text-slate-800">No candidates yet</h4>
      <p className="mt-1 text-sm text-slate-500">Share the interview link to invite candidates or create a new interview.</p>
    </div>
  )
}

export default CandidateList