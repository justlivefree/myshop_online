import { Router } from 'express';
import { createOrder, getAllOrders, updateOrderStatus, getDashboardStats } from '../controllers/orderController.js';

const router = Router();

router.get('/stats', getDashboardStats);
router.post('/', createOrder);
router.get('/', getAllOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;
