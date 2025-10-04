import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import {Routes,Route} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import  Home  from "./pages/Home"
import VerifyOtp from "./pages/VerifyOtp";
import ProfilePage from "./pages/ProfilePage";

function App() {


  return (
    <>
    {/* Public Routes */}
      <Routes>
        <Route path="*" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verify" element={<VerifyOtp/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        {/* private routes */}

        <Route path="/"
        
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />

        <Route path="/home"
        
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />


      
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  )
}

export default App
