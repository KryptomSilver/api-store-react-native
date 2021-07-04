import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User";
export const getJWT = async (req, res) => {
    try {
        // extraer el email y password
        const { email, password } = req.body;
        // Revisar que sea un user registrado
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        // Revisar el password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ msg: "Password Incorrecto" });
        }
        // Si todo es correcto Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id,
            },
        };
        // firmar el JWT
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 86400, // 1 día
            },
            (error, token) => {
                if (error) throw error;
                // Mensaje de confirmación
                res.status(200).json({ token });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
export const getUserAuth = async (req, res) => {
    try {
        const { user } = req;
        const { id } = user;
        //Obtener el usuario quitando el password
        const userAuth = await User.findById(id).select("-password");
        //Enviar el usuario
        res.status(200).json({ userAuth });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salió mal...",
        });
    }
};
