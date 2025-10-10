import { useEffect, useState } from "react";
import API from "../api/api";
import {toast} from "react-toastify"
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState({ requested: [], received: [] });

  const navigate = useNavigate()

  // Profile fetch karna
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/me"); 
        setUser(res.data.data);
        console.log(res.data.data);
        
        const sessionRes = await API.get("/sessions/get-sessions"); 
        setSessions(sessionRes.data.data);
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


  // 🔹 Function to handle Accept/Reject
  async function handleStatusChange(sessionId, status) {
    try {      
      const res = await API.put(`/sessions/update/${sessionId}`, { status });
      toast.success(res.data.message)
      // alert(res.data.message || "Session updated");
      window.location.reload();
    } catch (error) {
      console.error("Error updating session:", error);
    }
  }



  if (!user) {
    return <p className="text-center mt-10 text-2xl font-outfit">Loading Profile...</p>;
  }

  return (
    <>
    <div className="min-h-screen">
    <Navbar/>
    <div className=" flex justify-center items-center p-4 font-outfit">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6">
        {/* Profile Header */}
        <div className="flex md:flex-row justify-around items-center">
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-[150px] h-[150px] object-cover object-[15%_15%] rounded-full border-2 border-indigo-500"
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
    <div className="container mx-auto">
    <hr />
    </div>
    {/* 🔹 Requested Sessions (as Student) */}
    <div className="md:flex px-3 mb-2 justify-center gap-6 w-full mt-2 font-poppins">
      <div className="mb-8">
          <h3 className="text-xl text-center font-semibold mb-4 text-blue-700">
            Requested Sessions
          </h3>
          {sessions.requested.length === 0 ? (
            <p className="text-gray-500">No requested sessions yet.</p>
          ) : (
            <div className="grid gap-4">
              {sessions.requested.map((s) => (
                <div
                  key={s._id}
                  className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between"
                >
                  <div>
                    <p>
                      <strong>Teacher:</strong> {s.teacher.name} ({s.teacher.email})
                    </p>
                    <p>
                      <strong>Topic:</strong> {s.skill || "N/A"}
                    </p>
                    <p>
                      <strong>Place:</strong> {s.place || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          s.status === "pending"
                            ? "text-yellow-600"
                            : s.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-semibold`}
                      >
                        {s.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔹 Received Sessions (as Teacher) */}
        <div>
          <h3 className="text-xl text-center font-semibold mb-4 text-green-700">
            Received Session Requests
          </h3>
          {sessions.received.length === 0 ? (
            <p className="text-gray-500">No received requests yet.</p>
          ) : (
            <div className="grid gap-4">
              {sessions.received.map((s) => (
                <div
                  key={s._id}
                  className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between"
                >
                  <div>
                    <p>
                      <strong>Student:</strong> {s.student.name} ({s.student.email})
                    </p>
                    <p>
                      <strong>Topic:</strong> {s.skill || "N/A"}
                    </p>
                    <p>
                      <strong>Place:</strong> {s.place || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          s.status === "pending"
                            ? "text-yellow-600"
                            : s.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-semibold`}
                      >
                        {s.status}
                      </span>
                    </p>
                  </div>

                  {s.status === "pending" && (
                    <div className="flex gap-3 mt-3 sm:mt-0">
                      <button
                        onClick={() => handleStatusChange(s._id, "accepted")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(s._id, "rejected")}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
    </div>
    </>
  );
}
