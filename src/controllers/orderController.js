import { registerOrder, getUserOrders, getOrderDetails, getOrderTracking, getOrderStatusHistory  } from '../services/orderService.js';

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

        const userId = req.user.id.id; // Obtener el ID del usuario autenticado desde el token

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
const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await getOrderDetails(orderId);
        res.json({ order });
    } catch (error) {
        if (error.message === "Orden no encontrada") {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Error al obtener la orden:", error);
            res.status(500).json({ message: "Error al obtener la orden" });
        }
    }
};
const getOrderByTracking = async (req, res) => {
    const { trackingCode } = req.params;

    try {
        const order = await getOrderTracking(trackingCode);
        res.json({ order });
    } catch (error) {
        if (error.message === "Orden no encontrada") {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Error al obtener la orden:", error);
            res.status(500).json({ message: "Error al obtener la orden" });
        }
    }
};
const getOrderByStatusHistory = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await getOrderStatusHistory(orderId);
        res.json({ order });
    } catch (error) {
        if (error.message === "Orden no encontrada") {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Error al obtener la orden:", error);
            res.status(500).json({ message: "Error al obtener la orden" });
        }
    }
};

export { createOrder, getOrders, getOrderById, getOrderByTracking, getOrderByStatusHistory  };