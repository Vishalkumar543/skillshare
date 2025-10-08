import { useEffect, useState } from "react";
import API from "../api/api";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate()

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
    navigate('/login')
  }





  if (!user) {
    return <p className="text-center mt-10 text-2xl font-outfit">Loading Profile...</p>;
  }

  return (
    <>
    <div className="min-h-screen">
    <Navbar/>
    <div className=" flex justify-center items-center p-4 font-outfit">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-lg p-6">
        {/* Profile Header */}
        <div className="flex  md:flex-row justify-around ">
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-26 h-26 object-cover object-[15%_15%] rounded-full border-4 border-indigo-500"
          />
          <div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500 text-lg">{user.email}</p>
          <p className="text-gray-500 text-lg">{user.course} ({user.department}) {user.year}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {user.skillsTeach?.join(", ") || "Not added yet"}
          </p>
          <p>
            <span className="font-semibold">Profile Status:</span>{" "}
            {user.isProfileComplete ? "Complete ✅" : "Incomplete ❌"}
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer  hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>

          {!user.isProfileComplete && (
            <Link to="/complete-profile" >
            <button
              onClick={() => navigate("/complete-profile")}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-green-600 transition"
            >
              Complete Profile
              
            </button>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
