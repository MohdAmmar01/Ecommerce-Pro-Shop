import React from 'react'
import {useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import ld from '../images/load.gif'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify'
import { useEffect,useState } from 'react'
import Star from '../components/Star'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../reducers/cartSlice'
import noimage from "../images/noimage.jpg"

import moment from 'moment'
function Product() {
  const [data,setdata]=useState(null)
  const {users}=useSelector((state)=>{return state})
  const [rating,setrating]=useState("")
  const [comment,setcomment]=useState("")
    const {id}=useParams()
   const dispatch=useDispatch()

    const getdata=async()=>{
     const res=await axios.get(`https://pro-shop-backend.vercel.app/api/products/${id}`)
     setdata(res.data.message)

    }
    const err = (msg) => {

      toast.error(msg, {
          'position': 'bottom-right',
          'theme': 'colored'
      })
  }

    const validate = () => {
      if (!rating) {
          err('provide rating')
          return false
      }
      else if (!comment) {
          err('provide comment')
          return false
      }
      return true
  }
    const  commenthandler=async(e)=>{
      e.preventDefault()
      const v = validate() 
      if (v) {
        await axios.post(`https://pro-shop-backend.vercel.app/api/products/${data._id}/reviews`,{rating,comment})
        getdata()
      }
    }
    useEffect(()=>{
      getdata()
    },[])
    const carthandler=()=>{
      if(data.countInStock!==0){
        dispatch(addToCart({...data,quantity:1,product:data._id}))
        toast.success("Item Moved To Cart ",{
          position:"bottom-right",
          "theme":"colored"
        })
      }
      else{
        toast.error("Item Is Out of Stock  ",{
          position:"bottom-right",
          "theme":"colored"
        })
      }
      
    }
  return (
    <div>
        <Navbar />
        <div className='prod'>
          {
            data===null?<div className='loading'>
            <img src={ld} className="loader_image" alt="loader" />
         </div> :<div className='prod_details'>
          <div className='prod_part_1'>
            <div className='p_part_1'>
              {data.image?<img src={data.image} className="prod_img" alt="prod_image" />:<img src={noimage} className="prod_img" alt="prod_image" />}
              
              <div>
                <h3 className='prod_nam'>{data.name}</h3> 
              <Star stars={data.rating} reviews={data.numReviews}/>
              <h3 className='prod_nam'>Price :  {Intl.NumberFormat("en-IN",{
      style:"currency",
      "currency":"INR",
     maximumFractionDigits:2
    }).format(data.price)
    } </h3>
     <h4 className='prod_nam'>Stock: {data.countInStock!==0?<span className="ins">{data.countInStock}  Items In Stock</span>: <span className='ofs'>Out of Stock</span>}</h4>
              <button  disabled={data.countInStock!==0 ?false:true} className='addtoCart' onClick={carthandler}>Add To Cart</button>
            </div>
            </div>
            <div className='p_part_2'>
            
             
              <h4 className='prod_nam'><p >Description : </p><br/>{data.description}</h4>

            </div>
      
          </div>
          <div className='prod_part_2'>
          <h3 className='go_back'>REVIEWS </h3>
          {
           users.isloggedin===true && data?.purchasedUsers.includes(users.userdata._id)===true && !data?.reviews.find((elem)=>{return elem.user===users.userdata._id})?<div className='comment-product'>

            <h4 className='add-review'>Add Product Review</h4>
            <select value={rating}  onChange={(e)=>{setrating(e.target.value)}} >
     <option value="1">1</option>
     <option value="2">2</option>
     <option value="3">3</option>
     <option value="3">4</option>
     <option value="3">5</option>
   </select>
            <textarea  onChange={(e) => { setcomment(e.target.value) }} className='comment-inp' valuee={comment} type='text' autoComplete='off' placeholder="Write Your Comment Here...." />
            <input className='com-input-sub' value='Submit' onClick={commenthandler} type='submit' />

            </div>

            :null
          }
              <div className='reviews'>
                {
                  data.reviews.length===0?<h3>No Reviews Yet !</h3>:
                  data.reviews.map((elem,i)=>{
                    return (
                      <div className='review_c' key={i}>
                        <h5>{elem.name} <div>(Verified)</div></h5>
                        
                        <h4>{moment(elem.updatedAt).format(" ddd  Do MMM Y ")}</h4>
                        <Star stars={elem.rating} />

                        <h4>{elem.comment}</h4>

                      </div>
                    )
                  })
                }
              </div>
          </div>
         </div>
          }
        </div>
      <ToastContainer />
    </div>
  )
}

export default Product
