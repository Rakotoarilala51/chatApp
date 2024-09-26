import Home  from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Navigate, Routes, Route } from "react-router-dom"
import { useAuthContext } from "./context/authContext"
//import { Toaster } from "react-hot-toast"
function App() {
const{authUser, isLoading}=useAuthContext();
if(isLoading) return null

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
         <Route path="/" element={authUser? <Home/>:<Navigate to={"/login"}/> }></Route>
         <Route path="/login" element={!authUser?<Login/>:<Navigate to={"/"}/>}></Route>
         <Route path="/signup" element={!authUser?<SignUp/>:<Navigate to={"/"}/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App
