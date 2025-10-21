// "use client"
// import { Progress } from '@/components/ui/progress';
// import { ArrowLeft } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'
// import FormContainer from './_components/FormContainer';

// function CreateInterview() {
//     const router = useRouter();
//     const [step , setStep] = useState(1);

//     const [formData , setFormData] = useState();
//     const onHandleInputChange = (field,value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]:value
//         }))
//         console.log("FormData",formData)
//     }

//   return (
//     <div className=''>
//         <div className='flex gap-5 items-center'>
//             <ArrowLeft onClick={() => router.back()} className='cursor-pointer'/>
//             <h2 className='font-bold text-2xl'>Create New Interview</h2>
//         </div>
//         <Progress value={step*33.33} className='my-5'/>
//         <FormContainer onHandleInputChange={onHandleInputChange}/>
//     </div>
//   )
// }

// export default CreateInterview

"use client"
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormContainer from './_components/FormContainer';
import { motion } from "framer-motion";
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/provider';

function CreateInterview() {
  const router = useRouter();
  const [step , setStep] = useState(1);
  const [formData , setFormData] = useState({}); 
  const [interviewId , setInterviewId] = useState();
  const {user}=useUser();

  const onHandleInputChange = (field,value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }


  useEffect(() => {
    console.log("Updated FormData:", formData);
  }, [formData]);

  const onGoToNext = () => {
    if (user?.credits <= 0) {
      toast('Please add credits');
      return;
    }
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
      toast('Please Enter all Details!');
      return;
    }
    setStep(step + 1);
  };


  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step+1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Header */}
      <div className='flex gap-5 items-center'>
        <ArrowLeft 
          onClick={() => router.back()} 
          className='cursor-pointer hover:scale-110 transition-transform duration-200'
        />
        <h2 className='font-bold text-2xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'>
          Create New Interview
        </h2>
      </div>

      {/* Progress */}
      <Progress 
        value={step*33.33} 
        className='my-3 h-2 bg-gray-200'
      />

      {/* Steps */}
      {step === 1 
        ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={onGoToNext}/> 
        : step === 2 
          ? <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> 
          : step==3?<InterviewLink interviewId={interviewId} formData={formData}/> : null}
    </motion.div>
  )
}

export default CreateInterview;