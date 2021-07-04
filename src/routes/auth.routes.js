// Rutas para autenticar usuarios
import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import auth from "../middlewares/auth";

const router = Router();
// Iniciar sesión
// api/auth
router.post("/", authController.getJWT);

// Obtiene el usuario autenticado
router.get("/", auth, authController.getUserAuth);

export default router;
