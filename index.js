import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola desde GET en la API"); 
});

app.post("/users", (req, res) => {
    const data = req.body;
    res.json({
        mensaje: "Datos recibidos por POST",
        datos: data
    }); 
});

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
}); 