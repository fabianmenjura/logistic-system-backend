import { updateCarrierStatus } from "../models/carrierModel.js";

const dispatchCarrier = async (req, res) => {
    const { carrierId } = req.body;

    try {
        // Cambiar el estado del transportista a "ocupado"
        await updateCarrierStatus(carrierId, 'busy');
        res.json({ message: "Transportista despachado exitosamente" });
    } catch (error) {
        console.error("Error al despachar el transportista:", error);
        res.status(500).json({ message: "Error al despachar el transportista" });
    }
};

export { dispatchCarrier };