import React, { useState } from 'react'
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const ForgotEmail = () => {

    const [email,setEmail] = useState("");

    const navigate = useNavigate()

    const clickHandler = async(e)=>{
        e.preventDefault();

        try {
            const res = await API.post('/user/forgot-password',{
                email
            })
            let statuscode =res.data.statusCode
            if (statuscode==200) {
                navigate('/reset-password')
            }
            
        } catch (error) {
            console.log(error.response.data.message);
        }

    }

  return (
    <>
    <div className='bg-lightgrey h-screen flex justify-center items-center '>
        <div className="w-lg h-[300px] bg-myblue rounded-2xl flex justify-center items-center">
            <div className="font-outfit text-lightgrey">
            <h2 className='text-lg my-2'>Enter email for reset password</h2>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='example@gmail.com' className='border-2 focus:outline-0 p-1 text-center' />
            <button onClick={clickHandler} className='ml-2 cursor-pointer bg-lightgrey px-2 py-1 border-2 text-myblue'>send OTP</button>
            </div>
        </div>

    </div>
    </>
  )
}

export default ForgotEmail