import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import toast from "react-hot-toast"

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs) => {
    try {
        setLoading(true)
      const res = await fetch("/api/authRoutes/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data= await res.json()

      if(!res.ok) throw new Error(data.error);
      setAuthUser(data)
      
    } catch (error) {
        console.log(error)
        toast.error(error)
    }finally{
        setLoading(false)
    }
  };
  return {loading, signup}
};

export default useSignup;
