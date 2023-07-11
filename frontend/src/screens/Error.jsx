import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import noimage from "../images/notfound.png"

function Error() {
  const navigate=useNavigate()
  return (
    <div className='error'>
      <Navbar />
      <div className='e'>
      <img src={noimage} className="error_img" alt="prod_image" />
      <button className='gobacktohome' onClick={()=>{navigate("/")}} >Go Home </button>
      </div> 
    </div>
  )
}

export default Error
