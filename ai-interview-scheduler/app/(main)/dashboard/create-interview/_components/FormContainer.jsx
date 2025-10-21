// import { Input } from "@/components/ui/input"
// import { Textarea } from '@/components/ui/textarea'
// import React, { useEffect, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { InterviewType } from '@/services/Constants'
// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'

// function FormContainer({onHandleInputChange}) {
//     const [interviewType , setInterviewType] = useState([]);
    
//     useEffect(()=>{
//         if(interviewType){
//             onHandleInputChange('type',interviewType)
//         }
//     },[interviewType])

//     const AddInterviewType = (type) => {
//         const data = interviewType.includes(type);
//         if(!data){
//             setInterviewType(prev=>[...prev,type])
//         }
//         else{
//             const result = interviewType.filter(item=>item != type);
//             setInterviewType(result);
//         }
//     }

//   return (
//     <div className='p-5 bg-blue-200 rounded-xl'>
//         {/* Job Position */}
//         <div>
//             <h2 className='text-sm font-medium'>Job Position</h2>
//             <Input 
//                 placeholder="ex -> FullStack Developer"
//                 className='mt-3'
//                 onChange = {(event) => onHandleInputChange('jobPosition' , event.target.value)}
//             />
//         </div>

//         {/* Job Description */}
//         <div className='mt-5'>
//             <h2 className='text-sm font-medium'>Job Description</h2>
//             <Textarea 
//                 placeholder = 'Enter detailed JD'
//                 className='h-[200px] mt-3' 
//                 onChange = {(event) => onHandleInputChange('jobDescription' , event.target.value)}
//             />
//         </div>

//         {/* Interview Duration */}
//         <div className='mt-5'>
//             <h2 className='text-sm font-medium'>Interview Duration</h2>
//             <Select onValueChange={(value)=>onHandleInputChange('duration' , value)}>
//                 <SelectTrigger className="w-full mt-2">
//                     <SelectValue placeholder="Select Duration" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectItem value="5 Min">5 Min</SelectItem>
//                     <SelectItem value="15 Min">15 Min</SelectItem>
//                     <SelectItem value="30 Min">30 Min</SelectItem>
//                     <SelectItem value="45 Min">45 Min</SelectItem>
//                     <SelectItem value="60 Min">60 Min</SelectItem>
//                 </SelectContent>
//             </Select>
//         </div>

//         {/* Interview Type */}
//         <div className='mt-5'>
//             <h2 className='text-sm font-medium'>Interview Type</h2>
//             <div className='flex gap-3 flex-wrap mt-2'>
//                 {InterviewType.map((type,index)=>(
//                     <div 
//                         key={index} 
//                         className ={`
//                             flex 
//                             items-center 
//                             cursor-pointer 
//                             gap-2 
//                             p-1 
//                             px-2 
//                             bg-white 
//                             rounded-2xl 
//                             border 
//                             border-gray-300
//                             hover:bg-secondary
//                             ${interviewType.includes(type.title)&&'bg-red-50 text-primary '}
//                         `} onClick={()=>AddInterviewType(type.title)}
//                     >
//                         <type.icon className='h-4 w-4'/>
//                         <span>{type.title}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
        
//         <div className='mt-8 flex justify-end'>
//             <Button>Generate Question <ArrowRight/> </Button>
//         </div>
//     </div>
//   )
// }

// export default FormContainer


import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"

function FormContainer({onHandleInputChange , GoToNext}) {
  const [interviewType , setInterviewType] = useState([]);

  useEffect(()=>{
    if(interviewType){
      onHandleInputChange('type',interviewType)
    }
  },[interviewType])

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if(!data){
      setInterviewType(prev=>[...prev,type])
    }
    else{
      const result = interviewType.filter(item=>item != type);
      setInterviewType(result);
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 }
    })
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className='p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 backdrop-blur-lg'
    >
      {/* Job Position */}
      <motion.div variants={fieldVariants} custom={0}>
        <h2 className='text-sm font-medium mb-2'>Job Position</h2>
        <Input 
          placeholder="ex -> FullStack Developer"
          className='mt-1 transition-all focus:ring-2 focus:ring-indigo-400'
          onChange = {(event) => onHandleInputChange('jobPosition' , event.target.value)}
        />
      </motion.div>

      {/* Job Description */}
      <motion.div variants={fieldVariants} custom={1} className='mt-5'>
        <h2 className='text-sm font-medium mb-2'>Job Description</h2>
        <Textarea 
          placeholder = 'Enter detailed JD'
          className='h-[200px] transition-all focus:ring-2 focus:ring-indigo-400' 
          onChange = {(event) => onHandleInputChange('jobDescription' , event.target.value)}
        />
      </motion.div>

      {/* Interview Duration */}
      <motion.div variants={fieldVariants} custom={2} className='mt-5'>
        <h2 className='text-sm font-medium mb-2'>Interview Duration</h2>
        <Select onValueChange={(value)=>onHandleInputChange('duration' , value)}>
          <SelectTrigger className="w-full mt-1 transition-all focus:ring-2 focus:ring-indigo-400">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Interview Type */}
      <motion.div variants={fieldVariants} custom={3} className='mt-5'>
        <h2 className='text-sm font-medium mb-2'>Interview Type</h2>
        <div className='flex gap-3 flex-wrap mt-2'>
          {InterviewType.map((type,index)=>(
            <motion.div 
              key={index} 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className ={`
                flex items-center cursor-pointer gap-2 p-2 px-3 rounded-2xl border shadow-sm
                transition-all duration-200
                ${interviewType.includes(type.title)
                  ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white border-transparent'
                  : 'bg-white border-gray-300 hover:bg-indigo-50'}
              `} 
              onClick={()=>AddInterviewType(type.title)}
            >
              <type.icon className='h-4 w-4'/>
              <span>{type.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* CTA */}
      <motion.div variants={fieldVariants} custom={4} className='mt-8 flex justify-end'>
        <Button 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          onClick={()=>GoToNext()}
        >
          <span className="relative z-10 flex items-center gap-2">
            Generate Question 
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight/>
            </motion.div>
          </span>
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default FormContainer;