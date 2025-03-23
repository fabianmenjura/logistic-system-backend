import express from "express";
import { verifyToken } from "../config/jwt.js";
import { assignOrderToRoute, assignOrderToRouteManually  } from "../controllers/assignmentController.js";

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);

// Asignar una orden a una ruta
router.post("/assign", assignOrderToRoute);
// Asignar una orden a una ruta manualmente
router.post("/assign-manually", assignOrderToRouteManually);
export default router;