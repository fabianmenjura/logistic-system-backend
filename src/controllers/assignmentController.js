import { assignOrder } from "../services/assignmentService.js";

const assignOrderToRoute = async (req, res) => {
    const { orderId, routeId } = req.body;

    try {
        const result = await assignOrder(orderId, routeId);
        res.json({ message: "Orden asignada exitosamente", data: result });
    } catch (error) {
        if (error.message === "Orden no encontrada" || error.message === "Ruta no encontrada") {
            res.status(404).json({ message: error.message });
        } else if (error.message === "No hay transportistas disponibles con la capacidad requerida") {
            res.status(400).json({ message: error.message });
        } else {
            console.error("Error al asignar la orden:", error);
            res.status(500).json({ message: "Error al asignar la orden" });
        }
    }
};

export { assignOrderToRoute };