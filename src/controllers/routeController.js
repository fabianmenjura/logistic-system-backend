import { findAllRoutes, findRouteById  } from "../models/routeModel.js";

const listRoutes = async (req, res) => {
    try {
        const routes = await findAllRoutes();
        res.json({ routes });
    } catch (error) {
        console.error("Error al listar las rutas:", error);
        res.status(500).json({ message: "Error al listar las rutas" });
    }
};
const getRouteDetails = async (req, res) => {
    const { routeId } = req.params;

    try {
        const route = await findRouteById(routeId);
        if (!route) {
            return res.status(404).json({ message: "Ruta no encontrada" });
        }
        res.json({ route });
    } catch (error) {
        console.error("Error al obtener los detalles de la ruta:", error);
        res.status(500).json({ message: "Error al obtener los detalles de la ruta" });
    }
};

export { listRoutes, getRouteDetails };