// "use client"
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { InterviewDataContext } from '@/context/InterviewDataCintext'
// import { supabase } from '@/services/supabaseClient'
// import { Clock, Info, Video } from 'lucide-react'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'
// import React, { useContext, useEffect, useState } from 'react'
// import { toast } from 'sonner'

// function Interview() {

//     const {interview_id} = useParams();
//     // console.log(interview_id);

//     const [interviewData , setInterviewData] = useState();

//     const [userName,setUserName] = useState();
//     const [loading,setLoading] = useState(false);

//     const {interviewInfo , setInterviewInfo} = useContext(InterviewDataContext);

//     const router = useRouter();

//     useEffect(()=>{
//         interview_id&&GetInterviewDetail();
//     },[interview_id])

//     const GetInterviewDetail = async () => {
//         setLoading(true);

//         try
//         {
//             let { data: Interviews, error } = await supabase
//             .from('Interviews')
//             .select("jobPosition,jobDescription,duration,type")
//             .eq('interview_id',interview_id)
            
//             setInterviewData(Interviews[0])
//             // console.log(Interviews[0]);

//             if(Interviews?.length==0)
//             {
//                 toast('Incorrect Interview Link');
//                 return;
//             }

//             setLoading(false);
//         }
//         catch(e)
//         {
//             setLoading(flase);
//             toast('Incorrect Interview Link');
//         }
//     }

//     const onJoinInterview = async () => {
//         let { data: Interviews, error } = await supabase
//         .from('Interviews')
//         .select('*')
//         .eq('interview_id',interview_id)

//         // console.log(Interviews[0]);

//         setInterviewInfo(Interviews[0]);
//         router.push('/interview/'+interview_id+'/start')
//     }

//   return (
//     <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7'>
//         <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52 mb-20'>
//             <video 
//                 src="/logo_vid.mp4" 
//                 autoPlay 
//                 loop 
//                 muted 
//                 playsInline 
//                 className="w-[100px] h-auto object-contain rounded-md"
//             />
//             <h2 className='mt-3'>Welcome to Screening</h2>

//             <video 
//                 src='/interviewVid.mp4' autoPlay
//                 loop
//                 muted
//                 playsInline 
//                 className="w-80 h-50 object-cover my-6"
//             />

//             <h2 className='font-black text-xl'>{interviewData?.jobPosition}</h2>
//             <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-5 w-5 '/>{interviewData?.duration}</h2>

//             <div className='w-full'>
//                 <h2>Enter your full name!</h2>
//                 <Input placeholder='eg- Rajaswa Anand' onChange={(event)=>setUserName(event.target.value)} />
//             </div>

//             <div className='p-3 bg-blue-200 flex gap-4 rounded-lg mt-3'>
//                 <Info className='text-primary' />
//                 <div>
//                     <h2 className='font-bold'>Before you begin</h2>
//                     <ul>
//                         <li>Ensure you have a stable internet connection</li>
//                         <li>Test your camera and microphone</li>
//                         <li>Find a quite place for interview</li>
//                     </ul>
//                 </div>
//             </div>
//             <Button 
//                 className={'mt-5 w-full font-bold'} 
//                 disabled={loading || !userName}
//                 onClick={()=>onJoinInterview()}
//             > 
//                 <Video/> 
//                 Join Interview
//             </Button>
//         </div>
//     </div>
//   )
// }

// export default Interview


"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataCintext'
import { supabase } from '@/services/supabaseClient'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

/* ---- Typewriter Component ---- */
function Typewriter({ texts, typingSpeed = 100, deletingSpeed = 60, pause = 1500 }) {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopIndex, setLoopIndex] = useState(0)

  useEffect(() => {
    let timer
    const current = texts[loopIndex % texts.length]

    if (!isDeleting && text.length < current.length) {
      timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed)
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed)
    } else if (!isDeleting && text.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false)
      setLoopIndex((prev) => (prev + 1) % texts.length)
    }

    return () => clearTimeout(timer)
  }, [text, isDeleting, loopIndex, texts, typingSpeed, deletingSpeed, pause])

  return (
    <h2 className="typewriter">
      {text}
      <span className="typewriter-cursor">|</span>
    </h2>
  )
}

function Interview() {
  const { interview_id } = useParams()
  const [interviewData, setInterviewData] = useState()
  const [userName, setUserName] = useState()
  const [loading, setLoading] = useState(false)
  const [userEmail,setUserEmail] = useState();

  const { setInterviewInfo } = useContext(InterviewDataContext)
  const router = useRouter()

  useEffect(() => {
    interview_id && GetInterviewDetail()
  }, [interview_id])

  const GetInterviewDetail = async () => {
    setLoading(true)
    try {
      let { data: Interviews } = await supabase
        .from('Interviews')
        .select("jobPosition,jobDescription,duration,type")
        .eq('interview_id', interview_id)

      if (Interviews?.length === 0) {
        toast('Incorrect Interview Link')
        return
      }

      setInterviewData(Interviews[0])
      setLoading(false)
    } catch (e) {
      setLoading(false)
      toast('Incorrect Interview Link')
    }
  }

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id', interview_id)

    setInterviewInfo({
        userName:userName,
        userEmail:userEmail,
        interviewData:Interviews[0]
    })
    router.push('/interview/' + interview_id + '/start');
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center px-4 py-4">
      {/* Reduced gap between header and card using mt-4 */}
      <div className="w-full max-w-xl mx-auto border rounded-2xl bg-white/90 backdrop-blur-md shadow-lg p-6 sm:p-8 mt-4">
        
        {/* ---- Typewriter ---- */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-3 rounded-full border-2 border-indigo-500 bg-indigo-50 shadow-sm">
            <Typewriter
              texts={[
                'Welcome to Screening',
                'Prepare well for your interview',
                'Show your best self today!',
              ]}
              typingSpeed={90}
              deletingSpeed={45}
              pause={1500}
            />
          </div>
        </div>

        {/* ---- Job Info ---- */}
        <h2 className="font-extrabold text-2xl text-gray-800 text-center">{interviewData?.jobPosition}</h2>
        <h2 
         className="flex gap-2 items-center justify-center text-gray-500 mt-2 text-sm"
        >
        <Clock className="h-4 w-4" /> {interviewData?.duration}
        </h2>

        {/* ---- Input ---- */}
        <div className="w-full mt-6">
          <label className="text-sm font-medium text-gray-600">Enter your full name</label>
          <Input
            placeholder="eg- Rajaswa Anand"
            className="mt-2"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        <div className="w-full mt-6">
          <label className="text-sm font-medium text-gray-600">Enter your Email</label>
          <Input
            placeholder="eg- xyz@gmail.com"
            className="mt-2"
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </div>

        {/* ---- Info Box ---- */}
        <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg mt-5 shadow-sm w-full">
          <div className="flex gap-3">
            <Info className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <h2 className="font-semibold text-gray-700">Before you begin</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
                <li>Ensure you have a stable internet connection</li>
                <li>Test your camera and microphone</li>
                <li>Find a quiet place for interview</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---- Join Button ---- */}
        <Button
          className="mt-6 w-full font-bold text-white 
                     bg-gradient-to-r from-indigo-500 to-blue-500 
                     hover:opacity-90 transition shadow-md 
                     flex items-center justify-center animate-bounce"
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}
        >
          <Video className="mr-2" />
          {loading&&<Loader2Icon/>}
          Join Interview
        </Button>
      </div>

      {/* ---- Typewriter styles ---- */}
      <style jsx>{`
        .typewriter {
          font-size: 1rem;
          font-weight: 700;
          color: #1e3a8a;
          min-height: 1.6rem;
          text-align: center;
        }
        .typewriter-cursor {
          display: inline-block;
          margin-left: 4px;
          animation: blink 1s steps(2, start) infinite;
          color: #1e3a8a;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Interview
