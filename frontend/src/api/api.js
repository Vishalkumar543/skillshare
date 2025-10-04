import axios from "axios"

const API = axios.create({
    baseURL:"http://localhost:8000/api/v1",
    withCredentials:true
})

// Interceptor for request
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

// Interceptor for response
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
  }
);


export default API;