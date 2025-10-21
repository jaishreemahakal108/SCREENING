"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabaseClient"

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      // Fetch session after OAuth redirect
      const { data, error } = await supabase.auth.getSession()

      if (data?.session) {
        console.log("✅ Session stored:", data.session)
        router.replace("/dashboard") // redirect to dashboard
      } else {
        console.error("❌ No session found", error)
        router.replace("/auth") // fallback to login page
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen text-white">
      Completing login...
    </div>
  )
}
