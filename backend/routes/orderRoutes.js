const  express =require( 'express')
const router = express.Router()
const  {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToShipped,
  cancelOrder,
} =require( '../controllers/orderController.js')
const  { protect, admin } =require( '../middleware/authMiddleware.js')


router.route('/').post(protect, addOrderItems)
router.route('/allorders/:id').get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/cancel/:id').delete(protect, cancelOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/shipped').put(protect, admin, updateOrderToShipped)

module.exports= router
