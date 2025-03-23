import { findAllRoutes } from "../models/routeModel.js";

const listRoutes = async (req, res) => {
    try {
        const routes = await findAllRoutes();
        res.json({ routes });
    } catch (error) {
        console.error("Error al listar las rutas:", error);
        res.status(500).json({ message: "Error al listar las rutas" });
    }
};

export { listRoutes };