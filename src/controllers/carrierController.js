import { 
    updateCarrierStatus, 
    findAllCarriers, 
    findCarrierByIdDetail, 
    findActiveOrdersByCarrierId 
} from "../models/carrierModel.js";

const dispatchCarrier = async (req, res) => {
    const { carrierId } = req.body;

    try {
        // Cambiar el estado del transportista a "ocupado"
        await updateCarrierStatus(carrierId, 'en ruta');
        res.json({ message: "Transportista despachado exitosamente" });
    } catch (error) {
        console.error("Error al despachar el transportista:", error);
        res.status(500).json({ message: "Error al despachar el transportista" });
    }
};
const listCarriers = async (req, res) => {
    try {
        const carriers = await findAllCarriers();
        res.json({ carriers });
    } catch (error) {
        console.error("Error al listar los transportistas:", error);
        res.status(500).json({ message: "Error al listar los transportistas" });
    }
};
const getCarrierDetails = async (req, res) => {
    const { carrierId } = req.params;

    try {
        const carrier = await findCarrierByIdDetail(carrierId);
        if (!carrier) {
            return res.status(404).json({ message: "Transportista no encontrado" });
        }
        res.json({ carrier });
    } catch (error) {
        console.error("Error al obtener los detalles del transportista:", error);
        res.status(500).json({ message: "Error al obtener los detalles del transportista" });
    }
};
const getActiveOrdersByCarrierId = async (req, res) => {
    const { carrierId } = req.params;

    try {
        const orders = await findActiveOrdersByCarrierId(carrierId);
        res.json({ orders });
    } catch (error) {
        console.error("Error al obtener las órdenes activas del transportista:", error);
        res.status(500).json({ message: "Error al obtener las órdenes activas del transportista" });
    }
};
export { dispatchCarrier, listCarriers, getCarrierDetails, getActiveOrdersByCarrierId };