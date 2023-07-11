import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Admin() {
  const navigate=useNavigate()
  return (
    <div>
      <Navbar />
      <div className='admin'>
        <h4>Hi Admin , Choose the category</h4>
      <button
              type='button'
              className='btn-block-a'
              onClick={()=>{navigate("/admin/allusers")}}
            >
              All Users
            </button>
            <button
              type='button'
              className='btn-block-a'
              onClick={()=>{navigate("/admin/allproducts")}}

            >
            All Products
            </button>
            <button
              type='button'
              className='btn-block-a'
              onClick={()=>{navigate("/admin/allorders?orders=confirmed")}}

            >
              Confirmed Orders 
            </button>
            <button
              type='button'
              className='btn-block-a'
              onClick={()=>{navigate("/admin/allorders?orders=shipped")}}

            >
              Shipped Orders
            </button>
            <button
              type='button'
              className='btn-block-a'
              onClick={()=>{navigate("/admin/allorders?orders=delievered")}}

            >
              Delievered Orders
            </button>

      </div>
    </div>
  )
}

export default Admin
