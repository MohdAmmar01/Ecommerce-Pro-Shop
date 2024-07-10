import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ld from '../images/load.gif'
import axios from 'axios';
import { setdata, setisLoggedin } from '../reducers/userSlice';
import { useDispatch } from 'react-redux';
function Verify() {
    const {id}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const verify=async()=>{
        const res=await axios.post (`https://pro-shop-backend.vercel.app/api/users/verify`,{code:id})
        if(res.data.success===true){
            dispatch(setisLoggedin(true))
            dispatch(setdata(res.data.message))
            navigate("/")
            toast.success("Email Verified Successfully",{
                position:"bottom-right",
                theme:"colored"
            })
        }else{
 
    navigate("/login")
    toast.error("wrong verification code provided, try to login again",{
        position:"bottom-right",
        theme:"colored"
    })
        }
    }
    useEffect(()=>{
        verify()
    },[id])
  return (
      <div>
        <Navbar />
        <div className='loading'>
                     <img src={ld} className="loader_image" alt="loader" />
                  </div> 
      <ToastContainer />
    </div>
  )
}

export default Verify
