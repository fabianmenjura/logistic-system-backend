import express from "express";
import { verifyToken } from "../config/jwt.js";
import { listRoutes, getRouteDetails } from "../controllers/routeController.js";
const checkPermission = require('../middlewares/checkPermission.js');

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);


// Listar todas las rutas
router.get("/list-routes", listRoutes);
router.get("/list-routes/:routeId", getRouteDetails);

export default router;
