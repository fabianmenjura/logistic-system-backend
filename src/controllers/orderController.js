import { registerOrder, getUserOrders } from '../services/orderService.js';

const createOrder = async (req, res) => {
    try {
        const {
            packageWeight,
            packageDimensions,
            packageType,
            originAddress,
            destinationAddress,
            recipientName,
            recipientPhone
        } = req.body;

        const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token

        const order = await registerOrder(
            userId,
            packageWeight,
            packageDimensions,
            packageType,
            originAddress,
            destinationAddress,
            recipientName,
            recipientPhone
        );

        res.status(201).json({ message: 'Orden creada exitosamente', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token
        const orders = await getUserOrders(userId);
        res.json({ orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { createOrder, getOrders };