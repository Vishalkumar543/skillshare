import { useState } from "react"
import API from "../api/api"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {

    const [data, setData] = useState({
        email:"",
        otp:"",
        password:""
    })

    const navigate = useNavigate()

    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const res = await API.post('/user/reset-password',{
                email:data.email,
                otp:data.otp,
                password:data.password
            })
            // console.log(res.data.data);
            toast.success(res.data.data)
            navigate('/login')
            
        } catch (error) {
            console.log(error.response.data);
        }
    }


  return (
    <>
    <div className="w-full h-screen flex justify-center items-center font-outfit">
        <div>
        <h3 className="text-center text-2xl mb-2">Reset Password</h3>
        <div className="bg-myblue w-[350px] h-[280px] flex flex-col items-center justify-center">
            <div className="my-2">
                <input type="text" onChange={handleChange} value={data.email} name="email" className="bg-white w-full text-lg focus:outline-0 p-1" placeholder="enter email" />
            </div>
            <div className="my-2">
                <input type="text" onChange={handleChange} value={data.otp} name="otp" className="bg-white w-full text-lg focus:outline-0 p-1" placeholder="enter OTP" />
            </div>
            <div className="my-2">
                <input type="text" onChange={handleChange} value={data.password} name="password" className="bg-white w-full text-lg focus:outline-0 p-1" placeholder="enter new password" />
            </div>
            <button className="bg-white mt-2 px-4 py-2 cursor-pointer" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default ResetPassword