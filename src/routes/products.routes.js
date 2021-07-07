import { Router } from "express";
import * as ProductCtrl from "../controllers/products.controller";
import { check } from "express-validator";

//Declarar el router
const router = Router();

//Crear Producto
router.post(
    "/",
    [
        check("nameProduct", "El nombre es obligatorio").not().isEmpty(),
        check("description", "La descripcion del producto es obligatoria")
            .not()
            .isEmpty(),
        check("precioProduct", "El precio del producto es obligatorio")
            .not()
            .isEmpty(),
        check(
            "precioProduct",
            "El precio deben ser caracteres numericos"
        ).isNumeric(),
        check("title", "El titulo de la imagen es requerida").not().isEmpty(),
        check("descriptionPhoto","La descripción de la imagen es requerida")
    ],
    ProductCtrl.createProduct
);
//Actualizar Producto
router.put("/:id", ProductCtrl.updateProduct);
//Eliminar Producto
router.delete("/:id", ProductCtrl.deleteProduct);
//Obtener Producto
router.get("/:id", ProductCtrl.getProduct);
//Obtener Productos
router.get("/", ProductCtrl.getProducts);

export default router;
