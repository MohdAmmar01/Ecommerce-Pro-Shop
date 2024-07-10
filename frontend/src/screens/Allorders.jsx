import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import Navbar from '../components/Navbar'
import ld from '../images/load.gif'
import { ToastContainer,toast } from 'react-toastify'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { TbCurrencyRupee } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'

function AllOrders() {
  const [data,setdata]=useState(null)
  const [id,setid]=useState("")
  const navigate=useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getdata=async()=>{
    if(id==="confirmed"){
      const res=await axios.get("https://pro-shop-backend.vercel.app/api/orders/allorders/confirmed")
      if(res.data.success===true){
          setdata(res.data.message)
      }
    }
    else if(id==="shipped"){
      const res=await axios.get("https://pro-shop-backend.vercel.app/api/orders/allorders/shipped")
      if(res.data.success===true){
          setdata(res.data.message)
      }
    }else if(id==="delievered"){
      const res=await axios.get("https://pro-shop-backend.vercel.app/api/orders/allorders/delievered")
      if(res.data.success===true){
          setdata(res.data.message)
      }
    }
  }
  useEffect(()=>{
    setid( `${queryParams.get('orders')}`)
getdata()
  },[id])
 
  return (
    <div>
      <Navbar />
      <div className='all_users'>
   <h3>All {id} Orders :</h3>
   {
    data!==null ?
   <table>
        <tbody>
    <tr>
      <th>ID</th>
      <th>USER</th>
      <th>PHONE</th>
      <th>DATE</th>
      <th>TOTAL</th>
      <th>PAID</th>
      <th>DELIEVERED</th>
      <th></th>

      
    </tr>{
        data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val._id}</td>
              <td>{val.user.name}</td>
              <td>{val.MobileNumber}</td>
              <td>{moment(val.createdAt).format(" ddd  Do MMM Y ")}</td>
              <td>{Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(val.totalPrice)}</td>
              <td>{val.isPaid?"PAID":"NOT PAID"}</td>
              <td>{val.status}</td> 
              <td><button onClick={()=>{navigate(`/order/${val._id}`)}} className='btn-block'>Details</button></td>

              

      
            </tr>
            
          )
        })}
        </tbody>
      </table>:
      <div className='loading'>
      <img src={ld} className="loader_image" alt="loader" />
   </div> }
   <ToastContainer />
</div>
    </div>
  )
}

export default AllOrders
