"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Video } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supabaseClient"
import { useUser } from "@/app/provider"
import InterviewCard from "../dashboard/_components/InterviewCard"


function AllInterview() {
  const [InterviewList, setInterviewList] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (user) GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false })

    if (error) {
      console.error(error)
      toast.error("Failed to load interviews")
    } else {
      setInterviewList(Interviews)
    }
  }

  const handleCreateInterview = () => {
    window.location.href = "https://screening-au2f.vercel.app/dashboard/create-interview"
  }

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-6 relative inline-block">
        All Previously Created Interviews
        <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
      </h2>

      {InterviewList?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-10 flex flex-col gap-4 items-center text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md"
        >
          <Video className="h-14 w-14 text-indigo-500 animate-pulse" />
          <h2 className="text-gray-600 text-lg font-medium">
            You don’t have any Interviews yet
          </h2>
          <motion.div whileHover={{ scale: 1.08 }}>
            <Button 
              className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl"
              onClick={handleCreateInterview}
            >
              + Create New Interview
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Cards Grid */}
      {InterviewList?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {InterviewList.map((interview) => (
            <motion.div
              key={interview.id} // ✅ use unique key
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, rotate: "-0.5deg" }}
            >
              <InterviewCard interview={interview} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllInterview