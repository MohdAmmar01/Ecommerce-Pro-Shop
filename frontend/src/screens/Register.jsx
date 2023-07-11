import React from 'react'
import Navbar from '../components/Navbar'
import im from "../images/loginimage.jpg"
import { ToastContainer, toast } from 'react-toastify'
import loader from '../images/load.gif'
import { useState,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setisLoggedin,setdata } from '../reducers/userSlice'
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()
  const dispatch = useDispatch()


  const err = (msg) => {

    toast.error(msg, {
      'position': 'bottom-right',
      'theme': 'colored'
    })
  }

  const validate = () => {
    if (!email) {
      err('provide email')
      return false
    }
    else if (!password || password.length<8) {
      err('provide password greater than 8 characters')
      return false
    }
    else if (!name) {
      err('provide name')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) {
     
      try{
        setloading(true)
        const res=await axios.post("https://pro-shop-backend.vercel.app/api/users",{email,password,name});
       setloading(false)

        if(res.data.success===true){
        
         toast.success("EMAIL IS SENT TO YOUR EMAILID , PLEASE VERIFY", {
            'position': 'bottom-right',
            'theme': 'colored'
        })
        }else{
            setloading(false) 
            err(res.data.message)
        }}catch(e){
            err("something went wrong...");
        }

    }

  }

  return (
    <div>
      <Navbar />
      <div className='login'>
        <div className='login_part_1'>
          <img src={im} className="login_im" alt="login_photo" />
        </div>
        <div className='login_part_2'>
          <form className="login-form">
            <label htmlFor="myemail" className="label-input-login">Name</label>
            <input id='myemail' className='login-input' value={name} autoComplete='off' onChange={(e) => { setname(e.target.value) }} type='text' placeholder="John doe" />
            <label htmlFor="myemail" className="label-input-login">Email</label>
            <input id='myemail' className='login-input' value={email} autoComplete='off' onChange={(e) => { setemail(e.target.value) }} type='text' placeholder="johndoe@example.com" />
            <label htmlFor="mypassword" className="label-input-login">Password</label>
            <input id='mypassword' onChange={(e) => { setpassword(e.target.value) }} className='login-input' valuee={password} type='text' autoComplete='off' placeholder="Top secret" />
            {loading ? <div className='reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Submit' onClick={handleSubmit} type='submit' />}
            <h4 style={{ 'color': 'black', 'textAlign': 'center' }} className='r-h'> Already  have an account ?<Link to='/login' style={{ 'color': 'black', 'fontSize': '18px', 'textDecoration': 'none' }}> Login</Link ></h4>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Register
