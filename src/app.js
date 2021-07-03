import express from "express";
import morgan from "morgan";
import cors from "cors";
import RoutesUsers from "./routes/users.routes";

//--- Setings ---
//Crear servidor con express
const app = express();
//Declarar variable para el puerto del servidor(3000)
app.set("port", process.env.PORT || 4000);

//--- Middlewares
//Perimitir que otrso servidores se conecten
//Lista para poder configurar el cors
const configCors = {};
app.use(cors(configCors));
//Morgan para poder ver petciones
app.use(morgan("dev"));
//Permitir que la app pueda recivir json
app.use(express.json());
//Permitir que la aplicacion entienda formularios html
app.use(express.urlencoded({ extended: false }));

//--- Routs ---
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de store" });
});
//Rutas de usuarios
app.use("/api/v1/users", RoutesUsers);

export default app;
