import React from 'react'
import Navbar from '../components/Navbar'
import im from  "../images/loginimage.jpg"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import loader from '../images/load.gif'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {setdata,setisLoggedin} from '../reducers/userSlice'

function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading,setloading]=useState(false)
    const [id,setid]=useState("")
    const dispatch=useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate=useNavigate()
    const {users}=useSelector((state)=>{return state});

    useEffect(()=>{
       setid( `${queryParams.get('redirect')}`)
     if(users.isloggedin===true && id==="shipping"){
        navigate("/shipping")
     }
    },[id])
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
        else if (!password) {
            err('provide password')
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
                const res=await axios.post("https://pro-shop-ecommerce-backend.onrender.com/api/users/login",{email,password});
               setloading(false)
             
                if(res.data.success===true){
                 dispatch(setisLoggedin(true))
                 dispatch(setdata(res.data.message))

                 toast.success("login successfull", {
                    'position': 'bottom-right',
                    'theme': 'colored'
                })
                if(id==="shipping"){
                navigate("/shipping")
                }else{
                    navigate("/")
                }

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
                    <label htmlFor="myemail" className="label-input-login">Email</label>
                    <input id='myemail' className='login-input' value={email} autoComplete='off' onChange={(e) => { setemail(e.target.value) }} type='text' placeholder="johndoe@example.com" />
                    <label htmlFor="mypassword" className="label-input-login">Password</label>
                    <input id='mypassword' onChange={(e) => { setpassword(e.target.value) }} className='login-input' valuee={password} type='text' autoComplete='off' placeholder="Top secret" />
                    {loading? <div className='reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Submit' onClick={handleSubmit} type='submit' />}
                    <h4 style={{ 'color': 'black','textAlign': 'center' }} className='r-h'> Dont have an account ?<Link to='/register' style={{ 'color': 'black','fontSize':'18px', 'textDecoration': 'none' }}> Register</Link ></h4>
                </form>
        </div>
      <ToastContainer />
      </div>
    </div>
  )
}

export default Login
