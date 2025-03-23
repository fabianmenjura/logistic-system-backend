import express from "express";
import { verifyToken } from "../config/jwt.js";
import { dispatchCarrier } from "../controllers/carrierController.js";

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);

// Despachar un transportista manualmente
router.post("/dispatch", dispatchCarrier);

export default router;