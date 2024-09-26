import { useState } from "react"
import { useAuthContext } from "../context/authContext"


const useLogIn = () => {
   const [loading, setLoading]=useState(false)
   const{setAuthUser}= useAuthContext()

   const login= async(username, password)=>{
    try {
        setLoading(true);
        console.log(username, password)
        const res = await fetch("/api/authRoutes/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({username, password}),
          });
         
        const data=res.json()

        if(!res.ok) throw new Error(data.error)
        setAuthUser(data)
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
 
   }

  return {loading, login}
}

export default useLogIn
