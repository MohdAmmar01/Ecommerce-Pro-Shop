const  asyncHandler  =require('express-async-handler')
const  OrderConfirmEmail  =require('../utils/OrderConfirmEmail.js')
const  Order  =require('../models/orderModel.js')
const  Product  =require('../models/productModel.js')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    mobile
  } = req.body
   console.log(mobile)
  if (orderItems && orderItems.length === 0) {  
    res.status(400)
    throw new Error('No order items')
    return
  } else {

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      MobileNumber:mobile
    })
   orderItems.forEach( async element => {
    const product = await Product.findById(element.product)
    product.countInStock=product.countInStock-element.quantity;
   await product.save();
   });
    const createdOrder = await order.save()
    OrderConfirmEmail({from:req.user.email,address:createdOrder.shippingAddress})

    res.status(201).json({"success":true,"message":createdOrder})
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json({"success":true,"message":order})
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json({"success":true,"message":updatedOrder})
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  order.orderItems.forEach(async(elem)=>{
    await Product.findByIdAndUpdate(elem._id,{ $push: { purchasedUsers: order.user }})
  })
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    order.status="delievered"
    order.isPaid=true;
    
    const updatedOrder = await order.save()

    res.json({"success":true,"message":updatedOrder})
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
// make order to shipped
const updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.status = "shipped"

    const updatedOrder = await order.save()

    res.json({"success":true,"message":updatedOrder})
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt : -1})
  res.json({"success":true,"message":orders})
})
const cancelOrder = asyncHandler(async (req, res) => {
  const order= await Order.findById(req.params.id)


  order.orderItems.forEach( async element => {
    const product = await Product.findById(element.product)
    product.countInStock=product.countInStock+element.quantity;
   await product.save();
   });
   await Order.deleteOne({"_id":req.params.id})
  res.json({"success":true,"message":"order deleted "})
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({"status":req.params.id}).populate('user', 'id name').sort({ createdAt : -1})
  res.json({"success":true,"message":orders})
})

module.exports= {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToShipped,
  cancelOrder
}
