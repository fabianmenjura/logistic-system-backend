import { updateCarrierStatus, findAllCarriers } from "../models/carrierModel.js";

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
const listCarriers = async (req, res) => {
    try {
        const carriers = await findAllCarriers();
        res.json({ carriers });
    } catch (error) {
        console.error("Error al listar los transportistas:", error);
        res.status(500).json({ message: "Error al listar los transportistas" });
    }
};

export { dispatchCarrier, listCarriers };