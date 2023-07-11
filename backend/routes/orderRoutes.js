import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToShipped,
  cancelOrder,
} from '../controllers/orderController.js'
import { protect, admin } from '../../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems)
router.route('/allorders/:id').get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/cancel/:id').delete(protect, cancelOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/shipped').put(protect, admin, updateOrderToShipped)

export default router
