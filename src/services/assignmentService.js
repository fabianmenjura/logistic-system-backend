import { findOrderById } from "../models/orderModel.js";
import { findRouteById } from "../models/routeModel.js";
import { findAvailableCarriers } from "../models/carrierModel.js";
import { assignOrderToRoute } from "../models/orderAssignmentModel.js";

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

        // Verificar disponibilidad de transportistas
        const requiredCapacity = order.package_weight;
        const availableCarriers = await findAvailableCarriers(requiredCapacity);
        if (availableCarriers.length === 0) {
            throw new Error("No hay transportistas disponibles con la capacidad requerida");
        }

        // Asignar la orden a la ruta y al primer transportista disponible
        const carrierId = availableCarriers[0].id;
        const assignmentId = await assignOrderToRoute(orderId, routeId, carrierId);

        return { assignmentId, order, route, carrier: availableCarriers[0] };
    } catch (error) {
        throw error;
    }
};

export { assignOrder };