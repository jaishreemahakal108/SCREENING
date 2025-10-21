// "use client"
// import { UserDetailContext } from '@/context/UserDetailContext'
// import { supabase } from '@/services/supabaseClient'
// import { Users } from 'lucide-react'
// import React , {useContext, useEffect, useState} from 'react'

// function Provider({children}) {

//   const [user,setUser] = useState()

//   useEffect(() => {
//     CreateNewUser();
//   },[])

//   const CreateNewUser = () => {
//     supabase.auth.getUser().then(async({data:{user}}) => {
//       // Check if user already exist
//       let { data: Users, error } = await supabase
//         .from('Users')
//         .select("*")
//         .eq('email', user?.email);
//         console.log(Users); 
//       })
//       //if not then create new USER
//       if(Users.length == 0){
//         const {data,error} = await supabase.from("Users")
//         .insert([
//           {
//             name:user?.user_metadata?.name,
//             email:user?.email,
//             picture:user?.user_metadata?.picture,
//           }
//         ])
//         console.log(data);
//         setUser(data);
//         return;
//       }
//       setUser(Users[0]);
//     }
//   return (
//     <UserDetailContext.Provider value={{user,setUser}}>
//     <div>{children}</div>
//     </UserDetailContext.Provider>
//   )
// }

// export default Provider;

// export const userUser=()=>{
//   const context = useContext(UserDetailContext);
//   return context;
// }


"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'


function Provider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    CreateNewUser()
  }, [])

  const CreateNewUser = async () => {
    const { data: {user}, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error(userError)
      return
    }

    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', user?.email)

    if (fetchError) {
      console.error(fetchError)
      return
    }

    if (!existingUsers || existingUsers.length === 0) {
      // If not, then create new USER
      const { data: insertedUsers, error: insertError } = await supabase
        .from('Users')
        .insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ])
        .select() // so it returns the inserted row

      if (insertError) {
        console.error("Insert error:", insertError.message, insertError.details, insertError.hint)
        return
      }

      setUser(insertedUsers[0])
    } else {
      setUser(existingUsers[0])
    }
  }

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUser = () => {
  const context = useContext(UserDetailContext)
  return context
}