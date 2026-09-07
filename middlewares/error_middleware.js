export default async function errorHandler(err, req, res, next) {
    if (err.code === 11000) {
        return res.status(409).json({ error: "El nombre de usuario ya existe" });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }

    res.status(400).json({ error: err.message || "Error desconocido" });
}