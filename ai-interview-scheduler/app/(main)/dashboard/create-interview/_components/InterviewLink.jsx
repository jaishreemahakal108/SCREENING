// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import { toast } from 'sonner'

// function InterviewLink({ interviewId, formData }) {
//     const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewId}`
//     const GetInterviewUrl = () => {
//         return url;
//     }

//     const onCopyLink = async () => {
//         await navigator.clipboard.writeText(url);
//         toast('Link Copied!')
//     }

//     return (
//         <div className="flex flex-col items-center justify-center mt-3">
//         <video
//             src="/checkBox-1.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             width={150}
//             height={150}
//             className="w-[120px] h-[120px]"
//         />
//         <h2 className="font-bold text-lg mt-1">Your AI Interview is Ready!</h2>
//         <p className="mt-1 text-md">
//             Share the link with your candidates to start the interview process
//         </p>

//         <div className="w-full p-6 mt-4 rounded-lg bg-gray-200">
//             <div className="flex justify-between items-center mb-2">
//             <h2 className="font-bold">Interview Link</h2>
//             <h2 className="p-1 px-2 bg-blue-200 rounded-4xl text-black">
//                 Valid for 30 Days
//             </h2>
//             </div>

//             <div className='mt-3 flex gap-3 items-center'>
//                 <Input
//                     defaultValue={GetInterviewUrl()}  
//                     disabled
//                     className="text-black font-bold"
//                 />
//                 <Button onClick={()=>onCopyLink()}><Copy/> Copy Link </Button>
//             </div>
//             <hr className='my-4'/>
//             <div className='flex gap-5'>
//                 <h2 
//                     className='text-sm text-gray-500 flex gap-2 items-center'>
//                     <Clock className='h-5 w-5'/> {formData?.duration} 
//                 </h2>
//                 <h2 
//                     className='text-sm text-gray-500 flex gap-2 items-center'>
//                     <List className='h-5 w-5'/> 10 Questions
//                 </h2>
//                 {/* <h2 
//                     className='text-sm text-gray-500 flex gap-2 items-center'>
//                     <Calendar className='h-5 w-5'/>  {formData?.duration} 
//                 </h2> */}
//             </div>
//         </div>
//         <div className='mt-7 bg-gray-200 p-5 rounded-lg w-full'>
//                 <h2 className='font-bold'>Share Via</h2>
//                 <div className='flex gap-7 mt-2'>
//                     <Button variant={'outline'}><Mail/>Email</Button>
//                     <Button variant={'outline'}><Mail/>Slack</Button>
//                     <Button variant={'outline'}><Mail/>WhatsApp</Button>
//                 </div>
//         </div>
//         <div className='flex w-full gap-5 justify-between mt-6'>
//             <Link href={'/dashboard'}>
//                 <Button variant={'outline'}><ArrowLeft/>Back to Dashboard</Button>
//             </Link>

//             <Link href={'/create-interview'}>
//                 <Button><Plus/>Create New Interview</Button>
//             </Link>
//         </div>
//         </div>
//     )
// }

// export default InterviewLink

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { FaSlack, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

function useTypewriter(text, speed = 100, pause = 1500) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout
    if (!deleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, speed)
    } else if (!deleting && index === text.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1))
        setIndex((prev) => prev - 1)
      }, speed / 2)
    } else if (deleting && index === 0) {
      setDeleting(false)
    }
    return () => clearTimeout(timeout)
  }, [index, deleting, text, speed, pause])

  return displayedText
}

function InterviewLink({ interviewId, formData }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interviewId}`
  const [copied, setCopied] = useState(false)

  const animatedText = useTypewriter("Your AI Interview is Ready!", 100, 1500)

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link Copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5 px-4">

      {/* ✅ Success Badge */}
      <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold shadow-md mb-3">
        ✅ Interview Created Successfully
      </div>

      {/* ✅ Animated Illustration */}
      <video
        src="/checkBox-1.mp4"
        autoPlay
        loop
        muted
        playsInline
        width={180}
        height={180}
        className="w-[140px] h-[140px] animate-bounce"
      />

      {/* ✅ Typewriter Headline */}
      <h2 className="font-extrabold text-2xl mt-2 text-indigo-600 text-center">
        {animatedText}
        <motion.span
          className="inline-block w-[2px] h-6 bg-indigo-600 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      </h2>

      <p className="mt-2 text-gray-600 text-md text-center">
        Share the link with your candidates to start the interview process
      </p>

      {/* ✅ Side-by-side layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
        {/* Interview Link Card */}
        <div className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-gray-800">Interview Link</h2>
            <h2 className="p-1 px-3 bg-blue-200 rounded-full text-black text-xs font-semibold">
              Valid for 30 Days
            </h2>
          </div>

          {/* Highlighted Link */}
          <div className="mt-3 flex gap-3 items-center">
            <Input
              defaultValue={url}
              disabled
              className="text-black font-bold rounded-full border border-gray-300 
              bg-gradient-to-r from-indigo-50 to-purple-50 
              shadow-md focus:ring-2 focus:ring-indigo-400"
            />
            <Button
              onClick={onCopyLink}
              className="transition-all hover:scale-105"
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex gap-6 flex-wrap">
            <h2 className="text-sm text-gray-500 flex gap-2 items-center">
              <Clock className="h-5 w-5 text-indigo-500" /> {formData?.duration || "30 min"}
            </h2>
            <h2 className="text-sm text-gray-500 flex gap-2 items-center">
              <List className="h-5 w-5 text-indigo-500" /> 10 Questions
            </h2>
          </div>
        </div>

        {/* Share Via Card */}
        <div className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100">
          <h2 className="font-bold text-lg text-gray-800">Share Via</h2>
          <div className="flex gap-5 mt-3 flex-wrap">
            <Button variant="outline" className="hover:scale-105 transition-all">
              <Mail className="mr-2" /> Email
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-all">
              <FaSlack className="mr-2 text-purple-500" /> Slack
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white hover:scale-105 transition-all"
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Animated Action Buttons */}
      <div className="flex w-full gap-5 justify-between mt-8 flex-wrap">
        <Link href={'/dashboard'}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant={'outline'} className="shadow-md">
              <ArrowLeft className="mr-2" /> Back to Dashboard
            </Button>
          </motion.div>
        </Link>

        <Link href={'/create-interview'}>
          <motion.div
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(99, 102, 241, 0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              <Plus className="mr-2" /> Create New Interview
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}

export default InterviewLink