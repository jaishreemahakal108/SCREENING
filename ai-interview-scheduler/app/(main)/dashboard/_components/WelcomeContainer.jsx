// "use client"
// import { useUser } from '@/app/provider.jsx'
// import Image from 'next/image';
// import React from 'react'


// function WelcomeContainer() {
//     const {user} = useUser();
//   return (
//     <div className='bg-blue-300 p-5 rounded-xl flex justify-between items-center'>
//         <div>
//             <h2 className='text-lg font-bold'>Welcome Back , {user?.name}</h2>
//             <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
//         </div>
//         {user&& <Image src={user?.picture} alt='userImage' width={45} height={45} className='rounded-full'/>}
//     </div>
//   )
// }

// export default WelcomeContainer

"use client"
import { useUser } from '@/app/provider.jsx'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

function WelcomeContainer() {
  const { user } = useUser()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl flex justify-between items-center shadow-lg"
    >
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          {/* 👋 Animated Hand */}
          <motion.span
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-block"
          >
            👋
          </motion.span>
          Welcome Back, {user?.name}
        </h2>
        <h2 className="text-blue-100">
          AI-Driven Interviews, Hassle-Free Hiring
        </h2>
      </div>
      {user && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={user?.picture}
            alt="userImage"
            width={50}
            height={50}
            className="rounded-full border-2 border-white shadow-md"
          />
        </motion.div>
      )}
    </motion.div>
  )
}

export default WelcomeContainer
