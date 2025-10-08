import React, { useState } from "react";
import {useNavigate , Link} from "react-router-dom"
import API from "../api/api";
import {toast} from "react-toastify"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();


    try {

      const res = await API.post("/user/login",{
        email:formData.email,
        password: formData.password
      })
      // console.log(res.data.data); 

      

      if(localStorage.getItem("token")){
        toast.success("user already logged In ! Please logout first");
        navigate("/home") 
      }else{
        toast.success(res.data.message);
        navigate("/home") 
      }

      // set token in localstorage
      localStorage.setItem("token",res.data.data.token)

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

  };

  return (
    <>
    <div className="min-h-screen bg-lightgrey">
    <h1 className="text-center text-6xl py-2 font-poppins font-bold ">SK<span className="text-myblue" >i</span>LL SHARE<span className="text-myblue">.</span></h1> 
    <div className=" flex items-center justify-center h-[calc(100vh-8rem)] p-4 font-poppins ">
      <div className="w-full max-w-md bg-white rounded-sm p-6">
        <h2 className="text-2xl font-bold text-center text-myblue -800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border-myblue border-1 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border-myblue border-1 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link to="/forgot-password" className="text-blue-600 hover:underline text-right block">
            forget password
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white font-semibold py-2 rounded-sm hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-gray-600 mt-4 text-md">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
</div>
    </div>
    </>
  );
}
