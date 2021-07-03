import Product from "../models/Product";
import { validationResult } from "express-validator";
import { getPagination } from "../libs/getPagination";

//Crear Producto
export const createProduct = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        const { body } = req;
        //Crear el objeto producto
        const newProduct = new Product(body);
        //Guardar en la db
        await newProduct.save();
        //Enviar respuesta de confirmación
        res.status(201).json({ msg: "Producto creado" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Editar Producto
export const updateProduct = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        const { id } = req.params;
        const { body } = req;
        //Verificar si el id es valido
        if (id.length > 24 || id.length < 24) {
            return res.status(400).json({ message: "El id no es valido" });
        }
        //Buscar en la db si existe el id
        const product = await Product.findById(id);
        //Comprobar la busqueda
        if (!product) {
            return res.status(404).json({ msg: "No existe el Producto" });
        }
        //Actualizamos el Producto
        const newProduct = await Product.findByIdAndUpdate(id, body);
        //Enviar respuesta de confirmación
        res.status(200).json({ msg: "Producto actualizado" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Eliminar Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        //Verificar si el id es valido
        if (id.length > 24 || id.length < 24) {
            return res.status(400).json({ message: "El id no es valido" });
        }
        //Buscar en la db si exite el id
        const product = await Product.findById(id);
        //Comprobar la busqueda
        if (!product) {
            return res.status(404).json({ msg: "No existe el Producto " });
        }
        //Eliminar el usuario
        await Product.findByIdAndDelete(id);
        //Enviar respuesta de confirmación
        res.status(200).json({ msg: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Obtener Producto
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        //Verificar si el id es valido
        if (id.length > 24 || id.length < 24) {
            return res.status(400).json({ message: "El id no es valido" });
        }
        //Buscar en la db si existe el id
        const product = await Product.findById(id);
        //Comprobar la busqueda
        if (!product) {
            return res.status(404).json({ msg: "No existe el Producto" });
        }
        //Enviar Producto
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Obtener Productos
export const getProducts = async (req, res) => {
    try {
        //Obtenemos las paginas y el numero de registros por pagina
        const { size, page } = req.query;
        const { limit, offset } = getPagination(page, size);
        //Obtenemos los Productos con paginación
        const products = await Product.paginate({}, { offset, limit });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
