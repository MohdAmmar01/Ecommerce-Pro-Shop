import React from 'react'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import loader from '../images/load.gif'
import { useState,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setisLoggedin,setdata } from '../reducers/userSlice'


function Createproduct() {
    const [name, setname] = useState('')
    const [image, setimage] = useState('')
    const [brand, setbrand] = useState('')
    const [countInStock, setcountInStock] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')
    const [description, setdescription] = useState('')
    const [loading,setloading]=useState(false)
    const navigate=useNavigate()
    const dispatch = useDispatch()
  
  
    const err = (msg) => {
  
      toast.error(msg, {
        'position': 'bottom-right',
        'theme': 'colored'
      })
    }
  
    const validate = () => {
    
      if (!name) {
        err('provide name')
        return false
    }

      else if (!image) {
        err('provide url of image of item')
        return false
      }
      else if (!price) {
        err('provide price of item')
        return false
      }
     
      else if (!brand) {
        err('provide brand')
        return false
      }
      else if (!category) {
        err('provide category')
        return false
      }
      else if (!countInStock) {
        err('provide number of items you have')
        return false
      }
      else if (!description) {
        err('provide description')
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
          const res=await axios.post("https://pro-shop-ecommerce-backend.onrender.com/api/products",{name,image,brand,countInStock,price,category,description});
          console.log(res)
         setloading(false)
  
          if(res.data.success===true){
          
  
           toast.success("Product Created  Successfull", {
              'position': 'bottom-right',
              'theme': 'colored'
          })
          navigate("/")
          }else{
              setloading(false)
              err(res.data.message)
          }}catch(e){
              err("something went wrong...");
          }
  
      }
  
    }
  return (
    <div>
      <Navbar />
      <div className='create_product'>
        <h4>Proceed To Add A New Product :</h4>
          <form className="create-product-form">
            <label htmlFor="myname" className="label-input-login">Name</label>
            <input id='myname' className='login-input' value={name} autoComplete='off' onChange={(e) => { setname(e.target.value) }} type='text' placeholder="enter name of product" />
            <label htmlFor="mprice" className="label-input-login">Price</label>
            <input id='myprice' className='login-input' value={price} autoComplete='off' onChange={(e) => { setprice(e.target.value) }} type='number' placeholder="enter price of product in INR" />
            <label htmlFor="mypassword" className="label-input-login">Image</label>
            <input id='myimage' onChange={(e) => { setimage(e.target.value) }} className='login-input' valuee={image} type='text' autoComplete='off' placeholder="enter the url of image of product" />
            <label htmlFor="myimage" className="label-input-login">Brand</label>
            <input id='mybrand' onChange={(e) => { setbrand(e.target.value) }} className='login-input' valuee={brand} type='text' autoComplete='off' placeholder="enter brand of product" />
            <label htmlFor="mybrand" className="label-input-login">Category</label>
            <input id='mypassword' onChange={(e) => { setcategory(e.target.value) }} className='login-input' valuee={category} type='text' autoComplete='off' placeholder="enter the category" />
            <label htmlFor="mystock" className="label-input-login">Stock</label>
            <input id='mystock' onChange={(e) => { setcountInStock(e.target.value) }} className='login-input' valuee={countInStock} type='text' autoComplete='off' placeholder="enter the stock" />
            <label htmlFor="mydesc" className="label-input-login">Description</label>
            <textarea id='mydesc' onChange={(e) => { setdescription(e.target.value) }} className='login-input' valuee={description} type='text' autoComplete='off' placeholder="enter the description" />
            {loading ? <div className='reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Create Product' onClick={handleSubmit} type='submit' />}
          </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Createproduct
