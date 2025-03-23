import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { verifyToken } from '../config/jwt.js';
const checkPermission = require('../middlewares/checkPermission');

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);

router.post('/orders', createOrder);
router.get('/orders', getOrders);

export default router;