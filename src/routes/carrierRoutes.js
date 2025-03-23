import express from "express";
import { verifyToken } from "../config/jwt.js";
import { dispatchCarrier, listCarriers } from "../controllers/carrierController.js";

const router = express.Router();

// Proteger las rutas con JWT
router.use(verifyToken);

// Despachar un transportista manualmente
router.post("/dispatch", dispatchCarrier);
router.get("/list-carriers", listCarriers);

export default router;