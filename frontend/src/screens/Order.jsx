import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from "axios"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ld from '../images/load.gif'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify'
import { PayPalButton } from 'react-paypal-button-v2'
function Order() {
    const {users}=useSelector((state)=>{return state})
    const [data,setdata]=useState(null)
  const [dollar,setdollar]=useState(null)

    const {id}=useParams()
    const [sdk,setsdk]=useState(false)
    const navigate=useNavigate()
    const getdata=async()=>{
        const res=await axios.get(`https://pro-shop-backend.vercel.app/api/orders/${id}`);
      setdata(res.data.message)

      if(data?.isPaid!==true){
        if(!window.paypal){
          addPaypalScript()
        }else{
          setsdk(true)
        }
       }
    

       
    }
    const cancelorder=async()=>{
        const res=await axios.delete(`https://pro-shop-backend.vercel.app/api/orders/cancel/${id}`);
        if(res.data.success===true){ 
           toast.success("Order Cancelled   ",{
          position:"bottom-right",
          "theme":"colored"
        })
        navigate("/myprofile")
        }
        else{
          toast.error("some error occured ",{
            position:"bottom-right",
            "theme":"colored"
          })
        }
    }
    const addPaypalScript=async()=>{
      const {data:clientId}=await axios.get("https://pro-shop-backend.vercel.app/api/config/paypal")
      const script=document.createElement("script")
      script.type="text/javascript"
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async=true;
      script.onload=()=>{
        setsdk(true)
      }
      document.body.appendChild(script)
    }
    useEffect(()=>{
       
     getdata()
     if(data!==null && data.user._id!==users.userdata._id){
        navigate("/")
     }
   
    },[id])
    const getdollar=async()=>{
      try{

      const {data}=await axios.post("https://pro-shop-backend.vercel.app/api/config/exchange",{amount:data?.totalPrice})
      if( data.success===true){
           setdollar(Number((data.message)))
    
      }else{
        toast.error("something went wrong",{position:"bottom-right",theme:"colored"})
      }
    }
  catch(error){
    toast.error("something went wrong",{position:"bottom-right",theme:"colored"}

    );
            }
      }
     
    useEffect(()=>{
      if(data!==null && dollar===null){

        getdollar()
      }
    },[data])
    const paynow=async()=>{

    }
    const shippedhandler=async()=>{
      const res=await axios.put(`https://pro-shop-backend.vercel.app/api/orders/${data._id}/shipped`)
      if(res.data.success===true){
        toast.success("Order Shipped ",{
          position:"bottom-right",
          "theme":"colored"
        })
        getdata()
      }else{
        toast.error("some error occured ",{
          position:"bottom-right",
          "theme":"colored"
        })
      }
    }
    const dilieveredhandler=async()=>{
      const res=await axios.put(`https://pro-shop-backend.vercel.app/api/orders/${data._id}/deliver`)
      if(res.data.success===true){
        toast.success("Order Delievered ",{
          position:"bottom-right",
          "theme":"colored"
        })
        getdata()
      }else{
        toast.error("some error occured ",{
          position:"bottom-right",
          "theme":"colored"
        })
      }
    }
    const paymentsuccesshandler=async(paymentResult)=>{
 const res=await axios.put(`https://pro-shop-backend.vercel.app/api/orders/${data._id}/pay`,paymentResult)
  getdata()
}
  return (
    <div>
        <Navbar />
        {data!==null?
        <div className='order'>

            <div className='place_order_part_1'>
            <h2 className='order-id'>ORDERID:<span>{id}</span></h2>
            <div className='shipping_details'>
                <h4 style={{"color":"green"}}>Shipping Details</h4>
                <h3>ADDRESS : {data.shippingAddress.address+","+data.shippingAddress.city+","+data.shippingAddress.postalCode+","+data.shippingAddress.country}</h3>
                <h3> USERNAME : {data.user.name}</h3>
                <h3> USER EMAIL : {data.user.email}</h3>
                <h3> USER NUMBER : {data.MobileNumber}</h3>
                <h3>STATUS : {data.status==="confirmed"?<span style={{"color":"blue"}}>{data.status}</span>:<span style={{"color":"green"}}>{data.status}</span>}</h3>
              
              </div>
              <div className='shipping_details'>
                <h4 style={{"color":"green"}}>Payment Details</h4>
                <h3>STATUS: {data.isPaid?<span style={{"color":"green"}}>PAID</span>:<span style={{"color":"red"}}>NOT PAID</span>}</h3>
                {data.isPaid===false?<h3><span style={{"color":"blue"}}>YOU CAN PAY ON DELIEVERY OR  PAY NOW BY CLICKING THE PAY NOW BUTTON:</span> </h3>:null}
               
               {data.user._id===users.userdata._id && data.status==="confirmed" && data.isPaid===false? <button
              type='button'
              className='canc-order'
              disabled={data.isPaid}
              onClick={cancelorder}
            >
              Cancel Order
            </button>:null}
            <div className='place_order_part_2'>
              <h2>
              Summary :
            </h2>
            <h2>
             Items :{Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(data.totalPrice-data.shippingPrice)}
            </h2>
            <h2>
             Shipping : {Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(data.shippingPrice)}
            </h2>
            <h2>
             Total :  {Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(data.totalPrice)}
            </h2>
            {data.isPaid===false && data.user._id===users.userdata._id && sdk===true && dollar!==null && dollar!=="undefined"?<PayPalButton amount={dollar} onSuccess={paymentsuccesshandler}/>:null}
           {
            users.userdata.isAdmin===true?
            <div>
            {

     data.status==="confirmed"?        <button
              type='button'
              className='btn-block'
              onClick={shippedhandler}
            >
              Mark to Shipped
            </button>
:null}
{             data.isDelivered===false? <button
              type='button'
              className='btn-block'
              onClick={dilieveredhandler}
            >
              Mark to Delievered
            </button>:null}
            </div>
            :null}

              </div>
              </div>
              <div className='order_items'>
                <h4 style={{"color":"green"}}>Order Items :</h4>
               {
                data.orderItems.map((elem,i)=>{
                  return(
                    <div key={i} className='order_item_sh'>
                      <img src={elem.image} alt="product" />
                      <h2>{elem.name}</h2>
                      <h2>{`${elem.quantity} * ${elem.price} = ${Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(elem.quantity*elem.price)}`}</h2>
                    </div>
                  )
                })
               }
              </div>
              </div>
            
        </div>:<div className='loading'>
                     <img src={ld} className="loader_image" alt="loader" />
                  </div> }
                  <ToastContainer />
    </div>
  )

  }
export default Order