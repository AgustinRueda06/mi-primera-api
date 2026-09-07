import express from "express";
import checkAuthorizationTokenMiddleware from "../middlewares/check_authorization_token_middleware.js";
import checkRoleMiddleware from "../middlewares/check_role_middleware.js";
import { getDependency } from "../dependency.js";

export function configureProductoRouter(router) {

    const productService = getDependency("productService");

//obtiene mongo
    router.get("/", async (req, res) => {
        try {
            const productos = await productService.getAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener productos", error: error.message });
        }
    });
//guarda lo obtenido en mongo
    router.post("/", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        try {
            const nuevoProducto = await productService.add(req.body);
            res.status(201).json({ message: "Producto creado correctamente", producto: nuevoProducto });
        } catch (error) {
            res.status(400).json({ message: "Error al crear producto", error: error.message });
        }
    });


    router.patch("/:id", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        try {
            const productoActualizado = await productService.update(req.params.id, req.body);
            if (!productoActualizado) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.json({ message: "Producto actualizado correctamente", producto: productoActualizado });
        } catch (error) {
            res.status(400).json({ message: "Error al actualizar producto", error: error.message });
        }
    });

    router.delete("/:id", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        try {
            const productoEliminado = await productService.delete(req.params.id);
            if (!productoEliminado) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.json({ message: "Producto eliminado correctamente", producto: productoEliminado });
        } catch (error) {
            res.status(400).json({ message: "Error al eliminar producto", error: error.message });
        }
    });

}

