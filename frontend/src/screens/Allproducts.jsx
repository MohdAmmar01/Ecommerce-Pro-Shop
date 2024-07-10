import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Navbar from '../components/Navbar'
import ld from '../images/load.gif'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Allproducts() {
  const [data,setdata]=useState(null)
  const navigate=useNavigate()

  const getdata=async()=>{
    const res=await axios.get("https://pro-shop-backend.vercel.app/api/products")
    if(res.data.success===true){
        setdata(res.data.message)
    }
  }
  useEffect(()=>{
getdata()
  },[])
  const deletehandler=async(elem)=>{
  const res= await axios.delete(`https://pro-shop-backend.vercel.app/api/products/${elem._id}`)
    if(res.data.success===true){
      toast.success("Product Deleted", {
        'position': 'bottom-right',
        'theme': 'colored'
    })
    getdata()
 
    }else{
      toast.error("some error occured", {
        'position': 'bottom-right',
        'theme': 'colored'
    })
    }
  }
  const editproduct=async(elem)=>{
     navigate(`/admin/editproduct/${elem._id}`)
  }
  return (
    <div>
      <Navbar />
      <div className='all_users'>
   <h3>All Products :</h3>
   <button
              type='button'
              className='create-product'
              onClick={()=>{navigate("/admin/createproduct")}}
            >
              Create Product
            </button>
   {
    data!==null ?
   <table>
        <tbody>
    <tr>
      <th>ID</th>
      <th>NAME</th>
      <th>PRICE</th>
      <th>CATEGORY</th>
      <th>BRAND</th>
      <th></th>
      <th></th>

      
    </tr>{
        data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val._id}</td>
              <td>{val.name}</td>
              <td>{Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(val.price)}</td>
              <td>{val.category}</td>
              <td>{val.brand}</td>
              <td><AiFillEdit color='green' className='react-icon-logo'   onClick={()=>{editproduct(val)}} /></td>
              <td><AiFillDelete color='red' onClick={()=>{deletehandler(val)}} className='react-icon-logo' /></td>
              

      
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

export default Allproducts
