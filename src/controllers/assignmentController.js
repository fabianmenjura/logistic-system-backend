import { assignOrder, assignOrderManually  } from "../services/assignmentService.js";

// función para asignar una orden a una ruta y un transportista automáticamente
const assignOrderToRoute = async (req, res) => {
    const { orderId, routeId } = req.body;

    try {
        const result = await assignOrder(orderId, routeId);
        res.json({ message: "Orden asignada exitosamente", data: result });
    } catch (error) {
        if (error.message === "Orden no encontrada" || error.message === "Ruta no encontrada") {
            res.status(404).json({ message: error.message });
        } else if (
            error.message === "No hay transportistas disponibles." ||
            error.message === "La capacidad del vehículo se ha excedido." ||
            error.message === "La orden ya está asignada a una ruta."
        ) {
            res.status(400).json({ message: error.message });
        } else {
            console.error("Error al asignar la orden:", error);
            res.status(500).json({ message: "Error al asignar la orden" });
        }
    }
};

// función para asignar una orden a una ruta y un transportista específicos
const assignOrderToRouteManually = async (req, res) => {
    const { orderId, routeId, carrierId } = req.body;

    try {
        const result = await assignOrderManually(orderId, routeId, carrierId);
        res.json({ message: "Orden asignada manualmente exitosamente", data: result });
    } catch (error) {
        if (
            error.message === "Orden no encontrada" ||
            error.message === "Ruta no encontrada" ||
            error.message === "Transportista no encontrado o no disponible."
        ) {
            res.status(404).json({ message: error.message });
        } else if (
            error.message === "La orden ya está asignada a una ruta." ||
            error.message === "El transportista no está en la ciudad de origen." ||
            error.message === "La capacidad del vehículo se ha excedido."
        ) {
            res.status(400).json({ message: error.message });
        } else {
            console.error("Error al asignar la orden manualmente:", error);
            res.status(500).json({ message: "Error al asignar la orden manualmente" });
        }
    }
};

export { assignOrderToRoute, assignOrderToRouteManually  };