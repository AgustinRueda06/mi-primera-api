import express from "express";
import mongoose from "mongoose";    

const app = express();

app.use(express.json());


await mongoose.connect("mongodb://localhost:27017/PrimeraBDD");
console.log("Conectado a MongoDB");


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