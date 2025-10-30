// import { Phone, Video } from 'lucide-react'
// import React from 'react'

// function CreateOptions() {
//   return (
//     <div className='grid grid-cols-2 gap-5'>
//         <Link href={'./dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5'>
//             {/* Video Interview */}
//             <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
//             <h2 className='font-bold'>Create New Interview</h2>
//             <p className='text-gray-500'>Create AI Interviews and schedule then with Candidates</p>
//         </Link>
//         <div>
//             {/* Phone Screening */}
//             <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
//             <h2 className='font-bold'>Create Phone Screening Call</h2>
//             <p className='text-gray-500'>Schedule phone screening call with Candidates</p>
//         </div>
//     </div>
//   )
// }

// export default CreateOptions

// "use client"
// import { Phone, Video } from 'lucide-react'
// import React from 'react'
// import { motion } from "framer-motion"
// import Link from 'next/link'

// function CreateOptions() {
//   const options = [
//     {
//       icon: <Phone className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl h-12 w-12" />,
//       title: "Create New Interview",
//       desc: "Create AI Interviews and schedule them with Candidates",
//       link: "/dashboard/create-interview"  
//     },
//     {
//       icon: <Video className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl h-12 w-12 cursor-pointer"/>,
//       title: "Create Phone Screening Call",
//       desc: "Schedule phone screening call with Candidates",
//       link: process.env.NEXT_PUBLIC_VIDEO_APP_URL, 
//       external: true, 
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//       {options.map((opt, index) => {
//         const CardContent = (
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15 }}
//             className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all"
//           >
//             {opt.icon}
//             <h2 className="font-semibold text-lg mt-4">{opt.title}</h2>
//             <p className="text-gray-500 text-sm mt-1">{opt.desc}</p>
//           </motion.div>
//         );

//         return opt.link ? (
//           <Link key={index} href={opt.link}>
//             {CardContent}
//           </Link>
//         ) : (
//           <div key={index}>{CardContent}</div>
//         );
//       })}
//     </div>
//   )
// }

// export default CreateOptions

"use client"
import { Phone, Video } from 'lucide-react'
import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'

function CreateOptions() {
  const options = [
    {
      icon: <Phone className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl h-12 w-12" />,
      title: "Create New Interview",
      desc: "Create AI Interviews and schedule them with Candidates",
      link: "/dashboard/create-interview"
    },
    {
      icon: <Video className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl h-12 w-12 cursor-pointer" />,
      title: "Create Phone Screening Call",
      desc: "Schedule phone screening call with Candidates",
      link: process.env.NEXT_PUBLIC_VIDEO_APP_URL,
      external: true,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {options.map((opt, index) => {
        const CardContent = (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all"
          >
            {opt.icon}
            <h2 className="font-semibold text-lg mt-4">{opt.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{opt.desc}</p>
          </motion.div>
        );

        // If external link, use <a> tag to open in new tab
        if (opt.external) {
          return (
            <a
              key={index}
              href={opt.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CardContent}
            </a>
          );
        }

        // Otherwise, use Next.js <Link>
        return (
          <Link key={index} href={opt.link}>
            {CardContent}
          </Link>
        );
      })}
    </div>
  );
}

export default CreateOptions