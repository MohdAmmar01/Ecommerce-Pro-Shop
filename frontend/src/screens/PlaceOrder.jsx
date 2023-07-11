import React, { useEffect } from 'react'
import { TbCurrencyRupee } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import OrderNavbar from '../components/OrderNavbar'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { makecartempty } from '../reducers/cartSlice'

function PlaceOrder() {
  const {cart}=useSelector((state)=>{return state})
  const [shipping,setshipping]=useState("0")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
 if(cart.shippingaddress.address===null || cart.price===null){
  navigate("/cart")
 }
 if(cart.price>=500){
  setshipping("0")
 }else{
  setshipping("200")
}

  },[])
       
  const placeorder=async()=>{
    const data={
      "orderItems":cart.cart,
      "shippingAddress":{
        address:cart.shippingaddress.address,
        country:cart.shippingaddress.country,
        city:cart.shippingaddress.city,
       postalCode :cart.shippingaddress.postalcode,
      },
      paymentMethod:"paypal",
      itemsPrice:cart.price,
      taxPrice:0,
      mobile:cart.mobileNumber,
      shippingPrice:shipping,
      totalPrice:cart.price+Number(shipping)
    }
    const res=await axios.post("https://pro-shop-backend.vercel.app/api/orders",data)
   if(res.data.success===true){
    toast.success("Order Placed",{
      position:"bottom-right",
      theme:"colored"
    })
    dispatch(makecartempty())
    navigate(`/order/${res.data.message._id}`)
   }else{
    toast.error("some error occured",{
      position:"bottom-right",
      theme:"colored"
    })
   }
  }
  return (
    <div>
        <Navbar />
        <OrderNavbar />
        <div className='place_order'>

            <div className='place_order_part_1'>
              <div className='shipping_details'>
                <h4>Shipping Details</h4>
                <h3>{cart.shippingaddress.address+","+cart.shippingaddress.city+","+cart.shippingaddress.postalcode+","+cart.shippingaddress.country}</h3>
                <h4>Contact Number</h4>
                <h3>{cart.mobileNumber}</h3>
              </div>
              <div className='order_items'>
                <h4>Order Items :</h4>
               {
                cart.cart.map((elem,i)=>{
                  return(
                    <div key={i} className='order_item_sh'>
                      <img src={elem.image} alt="product" />
                      <h3>{elem.name}</h3>
                      <h2>{`${elem.quantity} * ${elem.price} = ${Intl.NumberFormat("en-IN",{style:"currency", "currency":"INR", maximumFractionDigits:2}).format(elem.quantity*elem.price)}`}</h2>
                    </div>
                  )
                })
               }
              </div>
            </div>
            <div className='place_order_part_2'>
            <h2>
              Summary :
            </h2>
            <h2>
             Items : <TbCurrencyRupee color='black' className='react-icon-logo' />{Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(cart.price)}
            </h2>
            <h2>
             Shipping : <TbCurrencyRupee color='black' className='react-icon-logo' />{Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(shipping)}
            </h2>
            <h2>
             Total : <TbCurrencyRupee color='black' className='react-icon-logo' /> {Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(cart.price+Number(shipping))}
            </h2>
            <button
              type='button'
              className='btn-block'
              disabled={cart.length === 0}
              onClick={placeorder}
            >
              Place Order
            </button>
            </div>
        </div>
      
    </div>
  )
}

export default PlaceOrder
