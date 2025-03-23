import express from "express";
import { verifyToken } from "../config/jwt.js";
import { listRoutes } from "../controllers/routeController.js";
const checkPermission = require('../middlewares/checkPermission.js');

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);


// Listar todas las rutas
router.get("/list-routes", listRoutes);

export default router;
