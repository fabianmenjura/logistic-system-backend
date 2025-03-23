import express from "express";
import { verifyToken } from "../config/jwt.js";
import { assignOrderToRoute } from "../controllers/assignmentController.js";

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);

// Asignar una orden a una ruta
router.post("/assign", assignOrderToRoute);

export default router;