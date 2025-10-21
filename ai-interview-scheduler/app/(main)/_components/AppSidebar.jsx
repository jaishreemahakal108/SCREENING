// "use client"
// import { Button } from "@/components/ui/button"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { SideBarOptions } from "@/services/Constants"
// import { Plus } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export function AppSidebar() {
//     const path = usePathname();
//   return (
//     <Sidebar>
//       <SidebarHeader className='flex items-center mt-5'>
//         <video 
//             src="/logo_vid.mp4" 
//             autoPlay 
//             loop 
//             muted 
//             playsInline
//             className="w-full h-full object-cover"
//         />
//         <Button className='w-full mt-4'><Plus/>Create new interview</Button>
//       </SidebarHeader>  
//       <SidebarContent>
//         <SidebarGroup>
//             <SidebarContent>
//                 <SidebarMenu>
//                     {SideBarOptions.map((option,index)=>(
//                         <SidebarMenuItem key={index}>
//                             <SidebarMenuButton asChild className={`p-5 ${path==option.path &&'bg-blue-100'}`}>
//                                 <Link href={option.path}>
//                                     <option.icon className={`${path==option.path && 'text-primary'}`}/>
//                                     <span className={`text-[16px] font-medium ${path==option.path && 'text-primary'}`}>{option.name}</span>
//                                 </Link>
//                             </SidebarMenuButton>
//                         </SidebarMenuItem>
//                     ))}
//                 </SidebarMenu>
//             </SidebarContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter />
//     </Sidebar>
//   )
// }

// "use client"
// import { Button } from "@/components/ui/button"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { SideBarOptions } from "@/services/Constants"
// import { Plus } from "lucide-react"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"

// export function AppSidebar() {
//   const path = usePathname();
//   console.log(path);
//   const router = useRouter(); 
//   const handleCreateInterview = () => {
//     router.push("/create-interview");
//   };

//   return (
//     <Sidebar className="overflow-hidden bg-[#1e1b4b]">
//       <SidebarHeader className="flex flex-col items-center mt-5 space-y-4 overflow-hidden">
//         {/* Video with running color border */}
//         <div className="relative w-44 h-44 rounded-full p-[3px] overflow-hidden">
//           <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin-slow" />
//           <video
//             src="/logo_vid.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover rounded-full border-4 border-white relative z-10"
//           />
//         </div>

//         {/* Bouncy gradient button */}
//         <Button
//           className="w-full animate-bounce bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
//                      text-white font-semibold shadow-lg shadow-purple-500/40 
//                      hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 rounded-xl"
//         >
//           <Plus className="mr-2" /> Create new interview
//         </Button>
//       </SidebarHeader>

//       <SidebarContent className="overflow-hidden mt-6">
//         <SidebarGroup>
//           <SidebarContent className="overflow-hidden">
//             <SidebarMenu className="flex flex-col gap-y-3">
//               {SideBarOptions.map((option, index) => (
//                 <SidebarMenuItem key={index}>
//                   <SidebarMenuButton
//                     asChild
//                     className={`p-5 rounded-lg transition-transform duration-300 hover:scale-110 hover:font-bold ${
//                       path == option.path
//                         ? "bg-blue-600 text-yellow-300"
//                         : "text-gray-800 hover:bg-gray-100"
//                     }`}
//                   >
//                     <Link href={option.path} className="flex items-center gap-2">
//                       <option.icon
//                         className={`${
//                           path == option.path ? "text-yellow-300" : "text-gray-700"
//                         }`}
//                       />
//                       <span>{option.name}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="overflow-hidden" />
//     </Sidebar>
//   )
// }


"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { Plus , LogOut  } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/services/supabaseClient" 

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter(); 

  const handleCreateInterview = () => {
    router.push("/dashboard/create-interview"); 
  };

  //log-out
   const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // ✅ Logout user
      router.push("/auth"); // ✅ Redirect to auth page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Sidebar className="overflow-hidden bg-[#1e1b4b]">
      <SidebarHeader className="flex flex-col items-center mt-5 space-y-4 overflow-hidden">
        {/* Video with running color border */}
        <div className="relative w-44 h-44 rounded-full p-[3px] overflow-hidden">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin-slow" />
          <video
            src="/logo_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-full border-4 border-white relative z-10"
          />
        </div>

        <Button
          onClick={handleCreateInterview}
          className="w-full animate-bounce bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                     text-white font-semibold shadow-lg shadow-purple-500/40 
                     hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 rounded-xl"
        >
          <Plus className="mr-2" /> Create new interview
        </Button>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden mt-6">
        <SidebarGroup>
          <SidebarContent className="overflow-hidden">
            <SidebarMenu className="flex flex-col gap-y-3">
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 rounded-lg transition-transform duration-300 hover:scale-110 hover:font-bold ${
                      path == option.path
                        ? "bg-blue-600 text-yellow-300"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Link href={option.path} className="flex items-center gap-2">
                      <option.icon
                        className={`${
                          path == option.path ? "text-yellow-300" : "text-gray-700"
                        }`}
                      />
                      <span>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ✅ Logout Button */}
      <SidebarFooter className="mt-auto p-4 border-t border-indigo-900">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 
                     text-white font-semibold hover:scale-105 transition-all duration-300 rounded-xl"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}