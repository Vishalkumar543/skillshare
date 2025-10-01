import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
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
      console.log(res.data.data); 

      // set token in localstorage
      localStorage.setItem("token",res.data.data.token)

      toast.success(res.data.message);

      navigate("/home") 

    } catch (error) {
      if (error.response) {
        // Server ne response bheja with status code
        console.error("Error:", error.response.data.message);
        alert(error.response.data.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a href="/signup" className="text-blue-600 hover:underline text-right block">
            forget password
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
