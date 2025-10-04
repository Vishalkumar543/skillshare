import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  // Profile fetch karna
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/me"); 
        setUser(res.data.data);
        console.log(res.data.data);
        
        
      } catch (err) {
        if (err.response) {
                // Server ne response bheja with status code
                console.error("Error:", err.response.data.message);
                console.log(err.response.data);
                
                // toast.error(err.response.data.message)
              } else if (err.request) {
                // Request gaya but response nahi aaya
                console.error("No response received:", err);
              } else {
                // Axios setup me kuch issue
                console.error("Axios error:", error.message);
              }
      }
    };
    fetchProfile();

  }, []);

  const handleLogout =()=>{
    localStorage.removeItem("token")
    window.location.href = "/login";
  }





  if (!user) {
    return <p className="text-center mt-10 text-2xl font-outfit">Loading Profile...</p>;
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {user.skills?.join(", ") || "Not added yet"}
          </p>
          <p>
            <span className="font-semibold">Profile Status:</span>{" "}
            {user.isComplete ? "Complete ✅" : "Incomplete ❌"}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.hasPendingSession && (
            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
              Pending Session
            </button>
          )}

          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>

          {!user.isComplete && (
            <button
              onClick={() => navigate("/complete-profile")}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Complete Profile
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
