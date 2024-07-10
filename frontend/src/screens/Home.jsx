import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Item from '../components/Item'
import axios from 'axios'
import { setdata } from '../reducers/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import ld from '../images/load.gif'
function Home() {
  const {products}=useSelector((state)=>{return state})
  const dispatch=useDispatch()



  const getproducts=async()=>{

    const res=await axios.get("https://pro-shop-backend.vercel.app/api/products");
    dispatch(setdata(res.data.message))
  }
  useEffect(()=>{
    getproducts()

      },[])
 
  return (
    <>
    <div className='home'>
        <Navbar />
        <h3 className='lat-prod'>Our Latest Products</h3>

        {  products.data!=null?
        <div className='products' >
               {products.data.map((elem,i)=>{
                    return <Item key={i} data={elem} />
                  }) }
                  </div>:
                  <div className='loading'>
                     <img src={ld} className="loader_image" alt="loader" />
                  </div> 
            }
    </div>
    </>
  )
}

export default Home