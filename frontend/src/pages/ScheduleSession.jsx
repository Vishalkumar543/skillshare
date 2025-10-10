import { useState } from "react";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar"

const ScheduleSession = () => {
  const { teacherId } = useParams(); 
  const [formData, setFormData] = useState({
    skill: "",
    date: "",
    place:""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/sessions/schedule-session",
        {
          teacherId,
          skill: formData.skill,
          date: formData.date,
          place:formData.place
        }
      );

      // alert("Session requested successfully!");
      toast.success(res.message)
      navigate('/profile')
      console.log(res.data);
    } catch (error) {
      console.error("Error scheduling session:", error.response?.data || error);
      alert("Failed to schedule session!");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center font-outfit min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Schedule a Session</h2>

        <input
          type="text"
          name="skill"
          placeholder="Topic (python,java,...)"
          value={formData.skill}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="text"
          name="place"
          placeholder="enter college place(e.g classroom,library)"
          value={formData.place}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-myblue cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Request Session
        </button>
      </form>
    </div>
    </>
  );
};

export default ScheduleSession;
