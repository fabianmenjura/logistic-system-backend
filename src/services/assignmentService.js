import { findOrderById } from "../models/orderModel.js";
import { findRouteById } from "../models/routeModel.js";
import { findAvailableCarriers, updateCarrierStatus } from "../models/carrierModel.js";
import { assignOrderToRoute, getUsedCapacity, isOrderAssigned } from "../models/orderAssignmentModel.js";
import db from "../config/db.js";

const assignOrder = async (orderId, routeId) => {
    try {
        // Verificar que la orden existe
        const order = await findOrderById(orderId);
        if (!order) {
            throw new Error("Orden no encontrada");
        }

        // Verificar que la ruta existe
        const route = await findRouteById(routeId);
        if (!route) {
            throw new Error("Ruta no encontrada");
        }
        
        // Verificar que la orden no esté ya asignada
        const orderAlreadyAssigned = await isOrderAssigned(orderId);
        if (orderAlreadyAssigned) {
            throw new Error("La orden ya está asignada a una ruta.");
        }

        // Verificar que el transportista está en la ciudad de origen de la ruta
        const availableCarriers = await findAvailableCarriers(order.package_weight, route.origin);

        if (availableCarriers.length === 0) {
            throw new Error("No hay transportistas disponibles.");
        }

        // Seleccionar el primer transportista disponible
        const suitableCarrier = availableCarriers[0];

        // Calcular la capacidad utilizada por el transportista en esta ruta
        const usedCapacity = await getUsedCapacity(suitableCarrier.id, routeId);
        const totalCapacity = Number(usedCapacity) + Number(order.package_weight);

        // Verificar que la capacidad del vehículo no se exceda
        if (totalCapacity > suitableCarrier.capacity) {
            throw new Error("La capacidad del vehículo se ha excedido.");
        }

        // Asignar la orden a la ruta y al transportista
        const assignmentId = await assignOrderToRoute(orderId, routeId, suitableCarrier.id);

        // Si la capacidad está completa, marcar el transportista como "ocupado"
        if (totalCapacity >= suitableCarrier.capacity) {
            await updateCarrierStatus(suitableCarrier.id, 'busy');
        }

        // Actualizar el estado de la orden a "en transporte"
        await db.execute(
            "UPDATE orders SET status = 'En tránsito' WHERE id = ?",
            [orderId]
        );

        return { assignmentId, order, route, carrier: suitableCarrier };
    } catch (error) {
        throw error;
    }
};

export { assignOrder };