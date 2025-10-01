import React, { useState } from 'react'
import API from '../api/api'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const VerifyOtp = () => {

   const[otp,setOtp] =useState("")

   const navigate = useNavigate()

   const handleOtp =async () =>{


        try {
            
            const res = await API.post("/user/verify-user",{otp:otp})
            // console.log(res.data);
            toast.success(res.data.message)

            if(res.data.data.isVerify==true){
                navigate("/login")
            }


        } catch (error) {
            if (error.response) {
                // Server ne response bheja with status code
                console.error("Error:", error.response.data.message);
                // alert(error.response.data.message);
                toast.error(error.response.data.message)
                } else if (error.request) {
                // Request gaya but response nahi aaya
                console.error("No response received:", error);
                } else {
                // Axios setup me kuch issue
                console.error("Axios error:", error.message);
                }
        }
   }

  return (
    <>
        <input 
        className='px-2 py-1.5'
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
         />

         <button onClick={handleOtp} >submit</button>
    </>
  )
}

export default VerifyOtp