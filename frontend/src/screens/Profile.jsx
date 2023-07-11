import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ld from '../images/load.gif'
import { Link,  } from 'react-router-dom'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment/moment'
import { setdata, setuserorders } from '../reducers/userSlice'

function Profile() {
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [loading,setloading]=useState(false)
  const dispatch = useDispatch()
  const { users } = useSelector((state) => { return state });


  const err = (msg) => {

    toast.error(msg, {
      'position': 'bottom-right',
      'theme': 'colored'
    })
  }

  const validate = () => {
  
     if ( password.length<8) {
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

        const res=await axios.put("https://pro-shop-ecommerce-backend.onrender.com/api/users/profile",{password,name});
       setloading(false)
        if(res.data.success===true){
         dispatch(setdata(res.data.message))

         toast.success("Profile Updated", {
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

  const getdata=async()=>{
    const res=await axios.get("https://pro-shop-ecommerce-backend.onrender.com/api/orders/myorders")
    if(res.data.success===true){
      dispatch(setuserorders(res.data.message))
    }
  }
  useEffect(()=>{
getdata()
  },[])
  return (
    <div>
      <Navbar />
      {users.orders!==null?
      <div className='profile'>

        <div className='part_1_profile'>
          <h4>My Profile :</h4>
        <form className="login-form">
            <label htmlFor="myemail" className="label-input-login">Name</label>
            <input id='myemail' className='login-input' value={name} autoComplete='off' onChange={(e) => { setname(e.target.value) }} type='text' placeholder={users.userdata.name} />

            <label htmlFor="mypassword" className="label-input-login">Password</label>
            <input id='mypassword' onChange={(e) => { setpassword(e.target.value) }} className='login-input' valuee={password} type='text' autoComplete='off' placeholder="new password" />
            {loading ? <div className='reg-input-sub' ><img className='l-i' src={ld} alt='loader' /></div> : <input className='reg-input-sub' value='Update Profile' onClick={handleSubmit} type='submit' />}
          </form>
        </div>
        <div className='part_2_profile'>
          <h4>My orders :</h4>
          
        {users.orders.length!==0?
        <table>
        <tbody>
    <tr>
      <th>ORDERID</th>
      <th>Date</th>
      <th>Total</th>
      <th>Paid</th>
      <th>Delievered</th>
      <th></th>

      
    </tr>{
        users.orders.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val._id}</td>
              <td>{moment(val.createdAt).format(" ddd  Do MMM Y ") }</td>
              <td>{Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(val.totalPrice)}</td>
              <td>{val.isPaid?"paid":"not paid"}</td>
              <td>{val.status}</td>
              <td><Link to={`/order/${val._id}` }>Details</Link></td>


            </tr>
            
          )
        })}
        </tbody>
      </table>:<h4>You have not placed any orders yet !</h4>}
        </div>

      </div>:<div className='loading'>
                     <img src={ld} className="loader_image" alt="loader" />
                  </div> }
                  <ToastContainer />
    </div>
  )
}

export default Profile
