import app from "./app";
import "./database";
//Iniciar el servidor con express
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
