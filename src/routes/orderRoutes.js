import express from 'express';
import { createOrder, getOrders, getOrderById  } from '../controllers/orderController.js';
import { verifyToken } from '../config/jwt.js';
const checkPermission = require('../middlewares/checkPermission');

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);


router.post('/orders', checkPermission('create_order'), createOrder);
router.get('/orders', checkPermission('view_orders'), getOrders);
router.get('/orders/:orderId', checkPermission('view_orders'), getOrderById);

export default router;