import React, { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleOtp = async () => {
    try {
      const res = await API.post("/user/verify-user", { otp: otp });
      // console.log(res.data);
      toast.success(res.data.message);

      if (res.data.data.isVerify == true) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        // Server ne response bheja with status code
        console.error("Error:", error.response.data.message);
        // alert(error.response.data.message);
        toast.error(error.response.data.message);
      } else if (error.request) {
        // Request gaya but response nahi aaya
        console.error("No response received:", error);
      } else {
        // Axios setup me kuch issue
        console.error("Axios error:", error.message);
      }
    }
  };

  return (
    <>

      <div className="bg-[linear-gradient(to_right,rgba(0,0,255,0.6),rgba(0,0,255,0.6)),url('https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg')] w-full h-dvh font-poppins flex items-center justify-center bg-no-repeat bg-size-[100%_100%]">

        <div className="box bg-transparent w-md h-[300px] flex flex-col items-center justify-center rounded-md backdrop-blur-md border-1 border-lightgrey mx-2">

        <div className="w-2/3">
            <div className="mail text-center text-lightgrey">
                <i className="ri-mail-line text-3xl border-2 p-2 rounded-full"></i>
                <h3 className="p-3 text-2xl">Verify User</h3>
            </div>
          <input
            className="px-2 py-1.5 border-2 placeholder:text-white text-white focus:outline-0 my-4 border-lightgrey w-full text-2xl rounded-lg text-center shadow-md inset-shadow-2xs"
            placeholder="enter your OTP here"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          </div>
          <div className="btns flex gap-4">
            <button className="cursor-pointer px-4 py-1 rounded-lg bg-lightgrey shadow-md" onClick={handleOtp}>submit</button>
            <button className="cursor-pointer px-4 py-1 rounded-lg bg-lightgrey shadow-md">Resend OTP</button>
          </div>

        </div>

      </div>
    </>
  );
};

export default VerifyOtp;
