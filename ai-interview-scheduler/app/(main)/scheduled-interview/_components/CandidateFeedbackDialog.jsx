// import React from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'


// function CandidateFeedbackDialog({candidate}) {

//     const feedback = candidate?.feedback?.feedback;

//   return (
//     <Dialog>
//         <DialogTrigger asChild>
//             <Button variant="outline" className="font-semibold">View Report</Button>
//         </DialogTrigger>
//         <DialogContent>
//             <DialogHeader>
//             <DialogTitle>Feedback</DialogTitle>
//             <DialogDescription asChild>
//                 <div className='mt-5'>
//                     <div className='flex justify-between items-center'>
//                         {/* Avatar + Info */}
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg">
//                                 {candidate?.userName?.[0] || "?"}
//                             </div>
//                             <div>
//                                 <h2 className="font-semibold text-gray-800">{candidate?.userName}</h2>
//                                 <h2 className="text-xs text-gray-500">
//                                     {candidate?.userEmail}
//                                 </h2>
//                             </div>
//                         </div>

//                         {/* Score + Report */}
//                         <div className="flex items-center gap-3">
//                             <span className="bg-green-100 text-green-600 rounded-full text-2xl font-bold">
//                                 6/10
//                             </span>
//                         </div>
//                     </div>

//                     <div className='mt-5'>
//                         <h2 className='font-bold text-sm'>Skills Assesment</h2>
//                         <div className='mt-3 grid grid-cols-2 gap-10'>
//                             <div>
//                                 <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span> </h2>
//                                 <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1' />
//                             </div>

//                             <div>
//                                 <h2 className='flex justify-between'>Communication Skills <span>{feedback?.rating?.communication}/10</span> </h2>
//                                 <Progress value={feedback?.rating?.communication * 10} className='mt-1' />
//                             </div>
                            
//                             <div>
//                                 <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving}/10</span> </h2>
//                                 <Progress value={feedback?.rating?.problemSolving*10} className='mt-1' />
//                             </div>

//                             <div>
//                                 <h2 className='flex justify-between'>Experince <span>{feedback?.rating?.experience}/10</span> </h2>
//                                 <Progress value={feedback?.rating?.experience*10} className='mt-1' />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='mt-5'>
//                         <h2 className='font-bold'>Performance Summary</h2>
//                         <div className='p-5 bg-blue-400 mt-3 rounded-md text-white space-y-2'>
//                             {Array.isArray(feedback?.summary) ? (
//                             feedback.summary.map((point, index) => (
//                                 <p key={index}>• {point}</p>
//                             ))
//                             ) : feedback?.summary ? (
//                             <p>• {feedback.summary}</p>
//                             ) : (
//                             <p>No summary available</p>
//                             )}
//                         </div>
//                     </div>

//                     <div className={`p-5 rounded-md flex items-center justify-between mt-8 ${feedback?.Recommendation=='No'?'bg-red-100':'bg-green-100'}`}>
//                         <div>
//                             <h2 className={`font-bold ${feedback?.Recommendation=='No'?'text-red-600':'text-green-600'}`}>Recommendation Message:</h2>
//                             <p className={`${feedback?.Recommendation=='No'?'text-red-500':'text-green-500'}`}>{feedback?.RecommendationMsg}</p>
//                         </div> 
//                         <Button className={`text-blue-50 ${feedback?.Recommendation=='No'?'bg-red-700':'bg-green-700'}`}>Send Message</Button>   
//                     </div>
//                 </div>
//             </DialogDescription>
//             </DialogHeader>
//         </DialogContent>
//     </Dialog>
//   )
// }

// export default CandidateFeedbackDialog

// "use client"
// import React from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
// import { motion } from 'framer-motion'
// import { Brain, MessageSquare, Puzzle, Briefcase } from 'lucide-react'

// function CandidateFeedbackDialog({ candidate }) {
//   const feedback = candidate?.feedback?.feedback;

//   const skills = [
//     { label: "Technical Skills", value: feedback?.rating?.technicalSkills, icon: <Brain className="w-4 h-4 text-blue-500" /> },
//     { label: "Communication Skills", value: feedback?.rating?.communication, icon: <MessageSquare className="w-4 h-4 text-purple-500" /> },
//     { label: "Problem Solving", value: feedback?.rating?.problemSolving, icon: <Puzzle className="w-4 h-4 text-orange-500" /> },
//     { label: "Experience", value: feedback?.rating?.experience, icon: <Briefcase className="w-4 h-4 text-green-500" /> },
//   ]

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="font-semibold">View Report</Button>
//       </DialogTrigger>
//       <DialogContent className="rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">Feedback</DialogTitle>
//             <DialogDescription asChild>
//               <div className="mt-5 space-y-6">

//                 {/* Header Section */}
//                 <motion.div
//                   initial={{ y: -20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="flex justify-between items-center"
//                 >
//                   {/* Avatar + Info */}
//                   <div className="flex items-center gap-4">
//                     <motion.div
//                       className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xl"
//                       animate={{ boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6"] }}
//                       transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
//                     >
//                       {candidate?.userName?.[0] || "?"}
//                     </motion.div>
//                     <div>
//                       <h2 className="font-semibold text-gray-800">{candidate?.userName}</h2>
//                       <h2 className="text-xs text-gray-500">{candidate?.userEmail}</h2>
//                     </div>
//                   </div>

//                   {/* Score */}
//                   <motion.span
//                     className="bg-green-100 text-green-600 rounded-full px-4 py-2 text-lg font-bold"
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ repeat: Infinity, duration: 1.5 }}
//                   >
//                     6/10
//                   </motion.span>
//                 </motion.div>

//                 {/* Skills Section */}
//                 <div>
//                   <h2 className="font-bold text-sm">Skills Assessment</h2>
//                   <div className="mt-3 grid grid-cols-2 gap-8">
//                     {skills.map((skill, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: index * 0.2 }}
//                       >
//                         <h2 className="flex justify-between items-center text-sm font-medium">
//                           <span className="flex items-center gap-2">{skill.icon}{skill.label}</span>
//                           <span>{skill.value}/10</span>
//                         </h2>
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${skill.value * 10}%` }}
//                           transition={{ duration: 1 }}
//                         >
//                           <Progress value={skill.value * 10} className="mt-1 shadow-sm" />
//                         </motion.div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Performance Summary */}
//                 <div>
//                   <h2 className="font-bold">Performance Summary</h2>
//                   <motion.div
//                     className="p-5 mt-3 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-inner text-gray-800 space-y-2"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     {Array.isArray(feedback?.summary) ? (
//                       feedback.summary.map((point, index) => (
//                         <motion.p
//                           key={index}
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.2 }}
//                         >
//                           • {point}
//                         </motion.p>
//                       ))
//                     ) : feedback?.summary ? (
//                       <p>• {feedback.summary}</p>
//                     ) : (
//                       <p>No summary available</p>
//                     )}
//                   </motion.div>
//                 </div>

//                 {/* Recommendation Message */}
//                 <motion.div
//                   className={`p-5 rounded-xl flex items-center justify-between mt-8 shadow-md ${feedback?.Recommendation === 'No'
//                     ? 'bg-gradient-to-r from-red-100 to-red-200'
//                     : 'bg-gradient-to-r from-green-100 to-green-200'
//                     }`}
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div>
//                     <h2 className={`font-bold ${feedback?.Recommendation === 'No' ? 'text-red-600' : 'text-green-600'}`}>
//                       Recommendation Message:
//                     </h2>
//                     <p className={`${feedback?.Recommendation === 'No' ? 'text-red-500' : 'text-green-500'}`}>
//                       {feedback?.RecommendationMsg}
//                     </p>
//                   </div>
//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button className={`text-blue-50 ${feedback?.Recommendation === 'No' ? 'bg-red-700' : 'bg-green-700'} shadow-md`}>
//                       Send Message
//                     </Button>
//                   </motion.div>
//                 </motion.div>

//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CandidateFeedbackDialog

// "use client"
// import React from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
// import { motion } from 'framer-motion'
// import { Brain, MessageSquare, Puzzle, Briefcase } from 'lucide-react'

// function CandidateFeedbackDialog({ candidate }) {
//   const feedback = candidate?.feedback?.feedback;

//   const skills = [
//     { label: "Technical Skills", value: feedback?.rating?.technicalSkills, icon: <Brain className="w-4 h-4 text-blue-500" /> },
//     { label: "Communication Skills", value: feedback?.rating?.communication, icon: <MessageSquare className="w-4 h-4 text-purple-500" /> },
//     { label: "Problem Solving", value: feedback?.rating?.problemSolving, icon: <Puzzle className="w-4 h-4 text-orange-500" /> },
//     { label: "Experience", value: feedback?.rating?.experience, icon: <Briefcase className="w-4 h-4 text-green-500" /> },
//   ]

//   // Function to trigger mailto
//   const onSend = () => {
//     const isPositive = feedback?.Recommendation !== 'No';

//     const subject = isPositive
//       ? "Next Steps in Your Interview Process"
//       : "Interview Outcome";

//     const body = isPositive
//       ? `Hello ${candidate?.userName},

// Congratulations! Based on your interview performance, we are pleased to inform you that you have been shortlisted for the further rounds. Our team will contact you soon with the next steps.

// Best wishes for your success,
// HR Team`
//       : `Hello ${candidate?.userName},

// Thank you for taking the time to interview with us. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.

// We truly appreciate your efforts and wish you all the best in your future endeavors.

// Best wishes,
// HR Team`;

//     window.location.href = `mailto:${candidate?.userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="font-semibold">View Report</Button>
//       </DialogTrigger>
//       <DialogContent className="rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">Feedback</DialogTitle>
//             <DialogDescription asChild>
//               <div className="mt-5 space-y-6">

//                 {/* Header Section */}
//                 <motion.div
//                   initial={{ y: -20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="flex justify-between items-center"
//                 >
//                   {/* Avatar + Info */}
//                   <div className="flex items-center gap-4">
//                     <motion.div
//                       className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xl"
//                       animate={{ boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6"] }}
//                       transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
//                     >
//                       {candidate?.userName?.[0] || "?"}
//                     </motion.div>
//                     <div>
//                       <h2 className="font-semibold text-gray-800">{candidate?.userName}</h2>
//                       <h2 className="text-xs text-gray-500">{candidate?.userEmail}</h2>
//                     </div>
//                   </div>

//                   {/* Score */}
//                   <motion.span
//                     className="bg-green-100 text-green-600 rounded-full px-4 py-2 text-lg font-bold"
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ repeat: Infinity, duration: 1.5 }}
//                   >
//                     6/10
//                   </motion.span>
//                 </motion.div>

//                 {/* Skills Section */}
//                 <div>
//                   <h2 className="font-bold text-sm">Skills Assessment</h2>
//                   <div className="mt-3 grid grid-cols-2 gap-8">
//                     {skills.map((skill, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: index * 0.2 }}
//                       >
//                         <h2 className="flex justify-between items-center text-sm font-medium">
//                           <span className="flex items-center gap-2">{skill.icon}{skill.label}</span>
//                           <span>{skill.value}/10</span>
//                         </h2>
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${skill.value * 10}%` }}
//                           transition={{ duration: 1 }}
//                         >
//                           <Progress value={skill.value * 10} className="mt-1 shadow-sm" />
//                         </motion.div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Performance Summary */}
//                 <div>
//                   <h2 className="font-bold">Performance Summary</h2>
//                   <motion.div
//                     className="p-5 mt-3 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-inner text-gray-800 space-y-2"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     {Array.isArray(feedback?.summary) ? (
//                       feedback.summary.map((point, index) => (
//                         <motion.p
//                           key={index}
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.2 }}
//                         >
//                           • {point}
//                         </motion.p>
//                       ))
//                     ) : feedback?.summary ? (
//                       <p>• {feedback.summary}</p>
//                     ) : (
//                       <p>No summary available</p>
//                     )}
//                   </motion.div>
//                 </div>

//                 {/* Recommendation Message */}
//                 <motion.div
//                   className={`p-5 rounded-xl flex items-center justify-between mt-8 shadow-md ${feedback?.Recommendation === 'No'
//                     ? 'bg-gradient-to-r from-red-100 to-red-200'
//                     : 'bg-gradient-to-r from-green-100 to-green-200'
//                     }`}
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div>
//                     <h2 className={`font-bold ${feedback?.Recommendation === 'No' ? 'text-red-600' : 'text-green-600'}`}>
//                       Recommendation Message:
//                     </h2>
//                     <p className={`${feedback?.Recommendation === 'No' ? 'text-red-500' : 'text-green-500'}`}>
//                       {feedback?.RecommendationMsg}
//                     </p>
//                   </div>
//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button
//                       onClick={onSend}
//                       className={`text-blue-50 ${feedback?.Recommendation === 'No' ? 'bg-red-700' : 'bg-green-700'} shadow-md`}
//                     >
//                       Send Message
//                     </Button>
//                   </motion.div>
//                 </motion.div>

//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CandidateFeedbackDialog

"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Brain, MessageSquare, Puzzle, Briefcase } from 'lucide-react'

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  // Calculate average score from all skills
  const technical = feedback?.rating?.technicalSkills || 0;
  const communication = feedback?.rating?.communication || 0;
  const problemSolving = feedback?.rating?.problemSolving || 0;
  const experience = feedback?.rating?.experience || 0;

  const averageScore = ((technical + communication + problemSolving + experience) / 4).toFixed(1);

  const skills = [
    { label: "Technical Skills", value: technical, icon: <Brain className="w-4 h-4 text-blue-500" /> },
    { label: "Communication Skills", value: communication, icon: <MessageSquare className="w-4 h-4 text-purple-500" /> },
    { label: "Problem Solving", value: problemSolving, icon: <Puzzle className="w-4 h-4 text-orange-500" /> },
    { label: "Experience", value: experience, icon: <Briefcase className="w-4 h-4 text-green-500" /> },
  ];

  const onSend = () => {
    const isPositive = feedback?.Recommendation !== 'No';
    const subject = isPositive
      ? "Next Steps in Your Interview Process"
      : "Interview Outcome";

    const body = isPositive
      ? `Hello ${candidate?.userName},

Congratulations! Based on your interview performance, we are pleased to inform you that you have been shortlisted for the further rounds. Our team will contact you soon with the next steps.

Best wishes for your success,
HR Team`
      : `Hello ${candidate?.userName},

Thank you for taking the time to interview with us. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.

We truly appreciate your efforts and wish you all the best in your future endeavors.

Best wishes,
HR Team`;

    window.location.href = `mailto:${candidate?.userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">View Report</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Feedback</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5 space-y-6">

                {/* Header Section */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-center"
                >
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xl"
                      animate={{ boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6"] }}
                      transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
                    >
                      {candidate?.userName?.[0] || "?"}
                    </motion.div>
                    <div>
                      <h2 className="font-semibold text-gray-800">{candidate?.userName}</h2>
                      <h2 className="text-xs text-gray-500">{candidate?.userEmail}</h2>
                    </div>
                  </div>

                  {/* Dynamic Score */}
                  <motion.span
                    className="bg-green-100 text-green-600 rounded-full px-4 py-2 text-lg font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {averageScore}/10
                  </motion.span>
                </motion.div>

                {/* Skills Section */}
                <div>
                  <h2 className="font-bold text-sm">Skills Assessment</h2>
                  <div className="mt-3 grid grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <h2 className="flex justify-between items-center text-sm font-medium">
                          <span className="flex items-center gap-2">{skill.icon}{skill.label}</span>
                          <span>{skill.value}/10</span>
                        </h2>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value * 10}%` }}
                          transition={{ duration: 1 }}
                        >
                          <Progress value={skill.value * 10} className="mt-1 shadow-sm" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Performance Summary */}
                <div>
                  <h2 className="font-bold">Performance Summary</h2>
                  <motion.div
                    className="p-5 mt-3 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-inner text-gray-800 space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {Array.isArray(feedback?.summary) ? (
                      feedback.summary.map((point, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          • {point}
                        </motion.p>
                      ))
                    ) : feedback?.summary ? (
                      <p>• {feedback.summary}</p>
                    ) : (
                      <p>No summary available</p>
                    )}
                  </motion.div>
                </div>

                {/* Recommendation Message */}
                <motion.div
                  className={`p-5 rounded-xl flex items-center justify-between mt-8 shadow-md ${feedback?.Recommendation === 'No'
                    ? 'bg-gradient-to-r from-red-100 to-red-200'
                    : 'bg-gradient-to-r from-green-100 to-green-200'
                    }`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <h2 className={`font-bold ${feedback?.Recommendation === 'No' ? 'text-red-600' : 'text-green-600'}`}>
                      Recommendation Message:
                    </h2>
                    <p className={`${feedback?.Recommendation === 'No' ? 'text-red-500' : 'text-green-500'}`}>
                      {feedback?.RecommendationMsg}
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      onClick={onSend}
                      className={`text-blue-50 ${feedback?.Recommendation === 'No' ? 'bg-red-700' : 'bg-green-700'} shadow-md`}
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </motion.div>

              </div>
            </DialogDescription>
          </DialogHeader>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog
