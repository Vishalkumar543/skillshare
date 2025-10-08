import { useEffect, useState } from "react";
import API from "../api/api"; 
import Navbar from "../components/Navbar"

const ExploreSkills = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch all users initially
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/user/getallusers");
        setUsers(res.data.data);
        console.log(res.data.data);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/user/search?query=${search}`);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 min-h-screen bg-gray-50 font-outfit">
      {/* Search Bar */}
     
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by skill or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    
      {/* User Cards */}
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-md p-5 gap-4 flex flex-col md:flex-row justify-around items-center  hover:shadow-lg transition"
            >
              <img
                src={user.avatar || "https://via.placeholder.com/100"}
                alt={user.name}
                className="w-30 h-30 rounded-full object-cover mb-4"
              />
              <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="mt-2 text-md text-gray-700">
                <strong>Skills:</strong>{" "}
                {user.skillsTeach && user.skillsTeach.length > 0 ? user.skillsTeach.join(", ") : "No skills added"}
              </p>
              <button
                
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
              >
                Schedule Session
              </button>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
</>
  );
};

export default ExploreSkills;
