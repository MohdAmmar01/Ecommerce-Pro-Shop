import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import Navbar from '../components/Navbar'
import ld from '../images/load.gif'
import { ToastContainer,toast } from 'react-toastify'
function Allusers() {
  const [data,setdata]=useState(null)
  const getdata=async()=>{
    const res=await axios.get("https://pro-shop-ecommerce-backend.onrender.com/api/users")
    if(res.data.success===true){
        setdata(res.data.message)
    }
  }
  useEffect(()=>{
getdata()
  },[])
  const deletehandler=async(elem)=>{
  const res= await axios.delete(`https://pro-shop-ecommerce-backend.onrender.com/api/users/${elem._id}`)
    if(res.data.success===true){
      toast.success("User Deleted", {
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
  const makeadmin=async(elem)=>{
  const res= await axios.put(`https://pro-shop-ecommerce-backend.onrender.com/api/users/${elem._id}`,{isAdmin:true})
    if(res.data.success===true){
      toast.success("User Become Admin Now", {
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
  return (
    <div>
      <Navbar />
      <div className='all_users'>
   <h3>All Users :</h3>
   {
    data!==null ?
  //  <table>
  //       <tbody>
  //   <tr>
  //     <th>ID</th>
  //     <th>NAME</th>
  //     <th>EMAIL</th>
  //     <th>ADMIN</th>
  //     <th></th>
  //     <th></th>

      
  //   </tr>{
  //       data.map((val, key) => {
  //         return (
  //           <tr key={key}>
  //             <td>{val._id}</td>
  //             <td>{val.name}</td>
  //             <td>{val.email}</td>
  //             <td>{val.isAdmin?"true":"false"}</td>
  //             <td>{!val.isAdmin?<button  onClick={()=>{makeadmin(val)}}>Make Admin</button>:<button >Admin</button>}</td>
  //             <td><AiFillDelete color='red' onClick={()=>{deletehandler(val)}} className='react-icon-logo' /></td>
              

      
  //           </tr>
            
  //         )
  //       })}
  //       </tbody>
  //     </table>
         <table>
         <thead>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Email</th>
             <th>Admin</th>
             <th>Make Admin</th>
             <th></th>
           </tr>
         </thead>
         <tbody>
           {data.map((row) => (
             <tr key={row.id}>
               <td>{row._id}</td>
               <td>{row.name}</td>
               <td>{row.email}</td>
               <td>{row.isAdmin ? 'Yes' : 'No'}</td>
              <td>{!row.isAdmin?<button  onClick={()=>{makeadmin(row)}}>Make Admin</button>:<button >Admin</button>}</td>
              <td><AiFillDelete color='red' onClick={()=>{deletehandler(row)}} className='react-icon-logo' /></td>

             </tr>
           ))}
         </tbody>
       </table>
      :
      <div className='loading'>
      <img src={ld} className="loader_image" alt="loader" />
   </div> }
   <ToastContainer />
</div>
    </div>
  )
}

export default Allusers
