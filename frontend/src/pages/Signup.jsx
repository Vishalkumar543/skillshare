import React, { useState } from "react";
import API from "../api/api";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", formData.avatar);

    try {
      const response = await API.post("/user/register", data);
      console.log(response.data);
      setFormData({ name: "", email: "", password: "", avatar: null });
      // alert(response.data.message)
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.data.token)

      if (response.data.success==true) {
        navigate("/verify")
      }


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
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-600 mb-1">Upload File</label>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="w-full border rounded-xl px-3 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have a account ?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
