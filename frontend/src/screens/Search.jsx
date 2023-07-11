import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Item from '../components/Item'
import axios from 'axios'
import { setdata } from '../reducers/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import ld from '../images/load.gif'
import { useNavigate, useParams } from 'react-router-dom'
function Search() {
  const [data,setdata]=useState(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const {id}=useParams()


  const getproducts=async()=>{
    const res=await axios.get(`https://pro-shop-ecommerce-backend.onrender.com/api/products/search/${id}`);
 if(res.data.success===true){
    setdata(res.data.message)
 }else{
    navigate("/")
 }

  }
  useEffect(()=>{
    getproducts()

      },[id])
 
  return (
    <>
    <div className='home'>
        <Navbar />
        <h3 className='lat-prod'>Search Results :</h3>

        { data!=null ?
        data.length!==0?
        <div className='products' >
               {data.map((elem,i)=>{
                    return <Item key={i} data={elem} />
                  }) }
                  </div>:<div className='products'><h4>No Products Related To Your Search !</h4></div>:
                  <div className='loading'>
                     <img src={ld} className="loader_image" alt="loader" />
                  </div> 
            }
    </div>
    </>
  )
}

export default Search