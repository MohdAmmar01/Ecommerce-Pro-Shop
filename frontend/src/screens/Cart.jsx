import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'
import { TbCurrencyRupee } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Star from '../components/Star'
import empty from "../images/empty.png"
import { decrementQuantity, incrementQuantity, removeItem, setprice } from '../reducers/cartSlice'
function Cart() {
  const navigate = useNavigate()
  const { cart } = useSelector((state) => { return state.cart })

  const dispatch = useDispatch()

  const checkoutHandler = () => {
    
    dispatch(setprice(cart.reduce((acc, item) => {return acc + item.quantity * item.price}, 0)))
    navigate("/login?redirect=shipping")

}
return (
  <div>
    <Navbar />
    {
      cart.length !== 0 ?

        <div className='cart_screen'>
          <div className='part_1_cart'>
            {
              cart.map((elem, i) => {
                return (
                  <div className='cart_items' key={i}>
                    <img src={elem.image} className="prod_img"  alt="prod_image"/>
                    <div className='rat'>
                      <h3 className='prod_nam'><Link to={`/product/${elem._id}`}>{elem.name}</Link></h3>
                      <Star style={{ "display": "flex", "flexDirection": "row" }} stars={elem.rating} reviews={elem.numReviews} />
                      <h3 className='prod_nam'>Price :  {Intl.NumberFormat("en-IN",{
      style:"currency",
      "currency":"INR",
     maximumFractionDigits:2
    }).format(elem.price)
    } </h3>
                      <h3 className='prod_nam'>Quantity : {elem.quantity}
                        <div className='increment_decrement'>
                          <FaPlusSquare onClick={() => { dispatch(incrementQuantity(elem._id)) }} className='inc_dec' />
                          <FaMinusSquare onClick={() => { dispatch(decrementQuantity(elem._id)) }} className='inc_dec' />
                          <AiFillDelete onClick={() => { dispatch(removeItem(elem._id)) }} className="dele_item" />
                        </div>
                      </h3>
                    </div>

                  </div>
                )
              })
            }
          </div>
          <div className='part_2_cart'>
            <h2>
              Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              items
            </h2>
            <h2>

              {
                Intl.NumberFormat("en-IN",{
                  style:"currency",
                  "currency":"INR",
                 maximumFractionDigits:2
                }).format(

                  cart
                  .reduce((acc, item) => {
                    var currency = item.price;

                    return (acc + item.quantity * currency)
                  }, 0)
                )
    
               
              }
            </h2>
            <button
              type='button'
              className='btn-block'
              disabled={cart.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div> :
        <div className='empty_cart'>
          <img src={empty} alt="empty cart" />
          <button className='cs' onClick={() => { navigate("/") }}>Continue Shopping </button>
        </div>}
  </div>
)
}

export default Cart
