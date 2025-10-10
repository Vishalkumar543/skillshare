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
import ExploreSkills from "./pages/ExploreSkills";
import ProfileCompletion from "./pages/ProfileCompletion";
import ForgotEmail from "./pages/ForgotEmail";
import ResetPassword from "./pages/ResetPassword";
import ScheduleSession from "./pages/ScheduleSession";

function App() {


  return (
    <>
    {/* Public Routes */}
      <Routes>
        <Route path="*" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verify" element={<VerifyOtp/>}/>
        <Route path="/forgot-password" element={<ForgotEmail/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/schedule-session/:teacherId" element={<ScheduleSession />} />
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

        <Route path="/exploreSkills"
        
          element={
            <PrivateRoute>
              <ExploreSkills/>
            </PrivateRoute>
          }
        />

        <Route path="/profile"
         element={
           <PrivateRoute>
          <ProfilePage/>
         </PrivateRoute>
        }
         />

         <Route path="/complete-profile"
        
          element={
            <PrivateRoute>
              <ProfileCompletion/>
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
