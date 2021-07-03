import User from "../models/User";
import { validationResult } from "express-validator";
import { getPagination } from "../libs/getPagination";

//Crear usuario
export const createUser = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        const { body } = req;
        //Crear el objeto usuario
        const newUser = new User(body);
        //Guardar en la db
        await newUser.save();
        //Enviar respuesta de confirmación
        res.status(201).json({ msg: "Usuario creado" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Editar usuario
export const updateUser = async (req, res) => {
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
        const user = await User.findById(id);
        //Comprobar la busqueda
        if (!user) {
            return res.status(404).json({ msg: "No existe el usuario" });
        }
        //Actualizamos el usuario
        const newUser = await User.findByIdAndUpdate(id, body);
        //Enviar respuesta de confirmación
        res.status(200).json({ msg: "Usuario actualizado" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        //Verificar si el id es valido
        if (id.length > 24 || id.length < 24) {
            return res.status(400).json({ message: "El id no es valido" });
        }
        //Buscar en la db si exite el id
        const user = await User.findById(id);
        //Comprobar la busqueda
        if (!user) {
            return res.status(404).json({ msg: "No existe el usuario " });
        }
        //Eliminar el usuario
        await User.findByIdAndDelete(id);
        //Enviar respuesta de confirmación
        res.status(200).json({ msg: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Obtener usuario
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        //Verificar si el id es valido
        if (id.length > 24 || id.length < 24) {
            return res.status(400).json({ message: "El id no es valido" });
        }
        //Buscar en la db si existe el id
        const user = await User.findById(id);
        //Comprobar la busqueda
        if (!user) {
            return res.status(404).json({ msg: "No existe el usuario" });
        }
        //Enviar usuario
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
//Obtener usarios
export const getUsers = async (req, res) => {
    try {
        //Obtenemos las paginas y el numero de registros por pagina
        const { size, page } = req.query;
        const { limit, offset } = getPagination(page, size);
        //Obtenemos los usuarios con paginación
        const users = await User.paginate({}, { offset, limit });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
