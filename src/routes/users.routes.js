import { Router } from "express";
import * as UserCtrl from "../controllers/users.controller";
import { check } from "express-validator";

//Declarar el router
const router = Router();

//Crear usuario
router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("username", "El nombre del usuario obligatoria").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("email", "El correo es obligatorio").not().isEmpty(),
        check("email", "El correo es invalido").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
    ],
    UserCtrl.createUser
);
//Actualizar usuario
router.put(
    "/:id",
    [
        check("email", "El correo es invalido").isEmail(),
    ],
    UserCtrl.updateUser
);
//Eliminar usuario
router.delete("/:id", UserCtrl.deleteUser);
//Obtener usuario
router.get("/:id", UserCtrl.getUser);
//Obtener usuarios
router.get("/", UserCtrl.getUsers);

export default router;
