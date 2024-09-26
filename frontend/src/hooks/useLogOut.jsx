import { useState } from "react"
import { useAuthContext } from "../context/authContext";
import toast from "react-hot-toast";


const useLogOut = () => {
    const [loading, setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();

    const logout=async ()=> {
        setLoading(true);
        try {
            const res= await fetch("/api/authRoutes/logout", {
                method: "POST",
                headers: {"content-type":"application/json"}
            });
            const data= await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            setAuthUser(null)


        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {logout, loading}
}

export default useLogOut
