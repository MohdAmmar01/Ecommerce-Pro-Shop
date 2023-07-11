import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';

function OrderNavbar({id}) {
    
  return (
    <div className="order_navbar">
      <div>Signin</div>
      <AiOutlineArrowRight />
      <div>Shipping</div>
      <AiOutlineArrowRight />

      <div>Place Order</div>
    </div>
  )
}

export default OrderNavbar
