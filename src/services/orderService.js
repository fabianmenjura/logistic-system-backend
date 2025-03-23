import { createOrder, getOrdersByUserId } from '../models/orderModel.js';
import validateAddress from '../utils/validateAddress.js';
import generateTrackingCode from '../utils/generateTrackingCode.js';

const registerOrder = async (
    userId,
    packageWeight,
    packageDimensions,
    packageType,
    originAddress,
    destinationAddress,
    recipientName,
    recipientPhone
) => {
    // Validar direcciones
    const isOriginValid = await validateAddress(originAddress);
    const isDestinationValid = await validateAddress(destinationAddress);

    if (!isOriginValid || !isDestinationValid) {
        throw new Error('La dirección de origen o destino no es válida');
    }

    // Generar código de seguimiento
    const trackingCode = generateTrackingCode();

    // Crear la orden
    const orderId = await createOrder(
        userId,
        packageWeight,
        packageDimensions,
        packageType,
        originAddress,
        destinationAddress,
        recipientName,
        recipientPhone,
        trackingCode
    );

    return {
        orderId,
        trackingCode,
        status: 'En espera'
    };
};

const getUserOrders = async (userId) => {
    const orders = await getOrdersByUserId(userId);
    return orders;
};

export { registerOrder, getUserOrders };