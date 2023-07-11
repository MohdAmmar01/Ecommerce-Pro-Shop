import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import { setMobileNumber, setshippingaddress } from '../reducers/cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import OrderNavbar from '../components/OrderNavbar'

function Shipping() {
    const [code, setcode] = useState('')
    const [country, setcountry] = useState('')
    const [city, setcity] = useState('')
    const [number, setnumber] = useState('')
    const [address,setaddress]=useState('')
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {cart}=useSelector((state)=>{return state})
    useEffect(()=>{
      if(cart.length===0 || cart.price===null){
        navigate("/cart")
      }
    },[])
    const err = (msg) => {
        toast.error(msg, {
          'position': 'bottom-right',
          'theme': 'colored'
        })
      }
    

    const validate = () => {
        if (!code) {
          err('provide postal code')
          return false
        }
        else if (!address) {
          err('provide address')
          return false
        }
        else if (!country) {
          err('provide country')
          return false
        }
        else if (!number || number.length<10) {
          err('provide valid  phone number')
          return false
        }
        else if (!city) {
          err('provide city')
          return false
        }
        return true
      }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const v = validate()

        if (v) {
         dispatch(setshippingaddress({country,city,address,code}))
         dispatch(setMobileNumber(number))
         navigate("/placeorder")
        }
    
      }
    
  return (
    <div>
        <Navbar />
        <div className='shipping'>
        <OrderNavbar />
      
          <form className="shipping-form">
            <label htmlFor="myadress" className="label-input-login">Address</label>
            <input id='myadress' className='login-input_ship' value={address} autoComplete='off' onChange={(e) => { setaddress(e.target.value) }} type='text' placeholder="Enter your address" />
            <label htmlFor="mycity" className="label-input-login">City</label>
            <input id='mycity' className='login-input_ship' value={city} autoComplete='off' onChange={(e) => { setcity(e.target.value) }} type='text' placeholder="Enter City" />
            <label htmlFor="mycode" className="label-input-login">Postal Code</label>
            <input id='mycode' onChange={(e) => { setcode(e.target.value) }} className='login-input_ship' valuee={code} type='number' autoComplete='off' placeholder="Enter Postal Code" />
            <label htmlFor="mycountry" className="label-input-login">Country</label>
            <input id='mycountry' onChange={(e) => { setcountry(e.target.value) }} className='login-input_ship' valuee={country} type='text' autoComplete='off' placeholder="Enter Country" />
            <label htmlFor="mynumber" className="label-input-login">Number</label>
            <input id='mynumber' onChange={(e) => { setnumber(e.target.value) }} className='login-input_ship' valuee={number} type='number' autoComplete='off' placeholder="Enter Phone Number" />
         <input className='reg-input-sub' value='Continue' onClick={handleSubmit} type='submit' />
          </form>
        <ToastContainer />
      </div>
      
    </div>
  )
}

export default Shipping
