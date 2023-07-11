import React from 'react'
import {TbCurrencyRupee} from "react-icons/tb"
import { useNavigate } from 'react-router-dom'
import Star from './Star'
import noimage from "../images/noimage.jpg"
function Item({data}) {
  const navigate=useNavigate()
  return (
    <div className='item_prod' onClick={(e)=>{navigate(`/product/${data._id}`)}} >
    {data.image?<img src={data.image} className="prod_img" alt="product" />:<img src={noimage} className="prod_img" alt="product" />}
    <div className='prod_hed'>{data.name}</div>
    <div className='stars'>
      <Star stars={data.rating} reviews={data.numReviews} />
    </div>
    <div className='prod_price'> {Intl.NumberFormat("en-IN",{
      style:"currency",
      "currency":"INR",
     maximumFractionDigits:2
    }).format(data.price)
    } </div>
    </div>
  )
}

export default Item