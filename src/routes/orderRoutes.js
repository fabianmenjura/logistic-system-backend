import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { verifyToken } from '../config/jwt.js';
const checkPermission = require('../middlewares/checkPermission');

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);

// Solo usuarios con el permiso 'create_order' pueden crear órdenes
router.post('/orders', checkPermission('create_order'), createOrder);

// Solo usuarios con el permiso 'view_orders' pueden ver órdenes
router.get('/orders', checkPermission('view_orders'), getOrders);

export default router;