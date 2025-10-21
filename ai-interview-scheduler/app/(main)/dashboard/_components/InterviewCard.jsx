// import { Button } from '@/components/ui/button'
// import { Copy, Send } from 'lucide-react'
// import moment from 'moment/moment'
// import React from 'react'
// import { toast } from 'sonner'

// function InterviewCard({interview}) {

//     const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id

//     const copyLink = () => {
//         navigator.clipboard.writeText(url);
//         toast('Copied')
//     }

//     const onSend = () => {
//         window.location.href="mailto:rajaswa@gmail.com?subject=Interview Link & body=Interview Link:"+url
//     }

//   return (
//     <div className='p-5 bg-white rounded-lg border'>
//         <div className='flex items-center justify-between'>
//             <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
//             <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM YYY')}</h2>
//         </div>
//         <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
//         <h2 className='mt-2'>{interview?.duration}</h2>

//         <div className='flex gap-3 w-full mt-5'>
//             <Button variant='outline' className={'w-full'} onClick={copyLink}> <Copy/> Copy Link</Button>
//             <Button className={'w-full'} onClick={onSend}> <Send/> Send</Button>
//         </div>
//     </div>
//   )
// }

// export default InterviewCard

import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment/moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview , viewDetail=false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast('Copied');
  };

  const onSend = () => {
    window.location.href = `mailto:rajaswa@gmail.com?subject=Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="h-[46px] w-[46px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-indigo-200">
          {interview?.jobPosition?.[0] || "I"}
        </div>
        <h2 className="text-sm text-gray-500 font-medium">
          {moment(interview?.created_at).format('DD MMM YYYY')}
        </h2>
      </div>

      {/* Job Info */}
      <h2 className="mt-4 font-semibold text-lg text-gray-900 tracking-tight">
        {interview?.jobPosition}
      </h2>

      <p className="mt-1 text-gray-600 text-sm flex justify-between">
        <span className="font-medium">{interview?.duration} </span>
        <span className="font-medium text-green-500">
          {interview['interview-feedback']?.length || 0} Candidates
        </span>
      </p>


      {/* Buttons */}
      {!viewDetail? <div className="grid grid-cols-2 gap-3 w-full mt-6">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 rounded-full hover:border-indigo-400"
          onClick={copyLink}
        >
          <Copy size={16} /> Copy
        </Button>
        <Button
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl"
          onClick={onSend}
        >
          <Send size={16} /> Send
        </Button>
      </div>
      :
      <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
        <Button className='mt-5 w-full' variant='outline'>View Detail <ArrowRight/> </Button>
      </Link>
      }
    </div>
  );
}

export default InterviewCard;
