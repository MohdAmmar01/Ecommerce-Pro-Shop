import React from 'react'
import {AiOutlineLogout, AiOutlineShoppingCart ,AiOutlineUser} from "react-icons/ai"
import {IoMdArrowDropdown} from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setisLoggedin,setdata } from '../reducers/userSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {RxDashboard} from "react-icons/rx"
import {GiHamburgerMenu} from "react-icons/gi"
function Navbar() {
  const {users,cart}=useSelector((state)=>{return state})
  const [modal,setmodal]=useState(false)
  const [search,setsearch]=useState("")
 const  [searchModal,setSearchModal]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logouthandler=()=>{
    dispatch(setisLoggedin(false))
    dispatch(setdata())

    toast.success("logout successfully",{
      position:'bottom-right',
      'theme': 'colored'
    })
      navigate("/login")
  }
  const showmodal=()=>{
    modal?setmodal(false):setmodal(true);

  }
  const searchhandler=()=>{
    if(search){
      navigate(`/search/${search}`)
    }
  }
  return (
    <div className='navbar'>
        <div className="part-1">
            <div className="hed" onClick={()=>{navigate("/")}}><GiHamburgerMenu  onClick={()=>{searchModal?setSearchModal(false):setSearchModal(true)}} className='hamburger' /> PROSHOP</div>
          <div className='search'>
            <input type="text" value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder="search here for latest products" />
            <button className='search_btn' onClick={searchhandler}>search</button>
          </div>
          {
            searchModal? 
            <div className='search-modal'>
             <div className='search-m'>
            <input type="text" value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder="search here for latest products" />
            <button className='search_btn' onClick={searchhandler}>search</button>
          </div> </div>:null
          }
        </div>
        <div className="part-2">
          {modal?<div className='modal'>
            <h4 className='modal_l' onClick={()=>{navigate("/myprofile")}}><AiOutlineUser className='react-icon-logo' /> My Profile</h4>
            {users.userdata.isAdmin===true?<h4 className='modal_l' onClick={()=>{navigate("/admin")}}><RxDashboard className='react-icon-logo' /> Admin Dashboard</h4>:null}
            <h4 className='logout' onClick={logouthandler}><AiOutlineLogout className='react-icon-logo'/> Logout</h4>
          </div>:null}
            <button className='cart' onClick={()=>{navigate("/cart")}} ><AiOutlineShoppingCart className='react-icon-logo' /><span className='badge'>{cart.cart.length}</span>cart</button>
            {users.isloggedin===true?<button className='signin'  >{users.userdata.name}<IoMdArrowDropdown  onClick={showmodal}  className='react-icon-logo'  /></button>:<button className='signin' onClick={()=>{navigate("/login")}}><AiOutlineUser
             className='react-icon-logo' />signin</button>}
        </div>
    </div>
  )
}

export default Navbar