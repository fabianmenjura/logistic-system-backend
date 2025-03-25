import express from 'express';
import { 
    createOrder, 
    getOrders, 
    getOrderById, 
    getOrderByTracking,
    getOrderByStatusHistory  
} from '../controllers/orderController.js';
import { verifyToken } from '../config/jwt.js';
const checkPermission = require('../middlewares/checkPermission');

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);


router.post('/orders', checkPermission('create_order'), createOrder);
router.get('/orders', checkPermission('view_orders'), getOrders);
router.get('/orders/:orderId', checkPermission('view_orders'), getOrderById);
router.get('/orders/tracking/:trackingCode', getOrderByTracking);
router.get('/orders/:orderId/status-history', getOrderByStatusHistory);

export default router;