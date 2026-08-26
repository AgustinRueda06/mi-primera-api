import { getDependency } from "../dependency.js";
import checkRoleMiddleware from "../middlewares/check_role_middleware.js";
import checkAuthorizationTokenMiddleware from "../middlewares/check_authorization_token_middleware.js";

export function configureUserRouter(router) {
    console.log("Configurando rutas de usuarios...");

    // GET: Obtener lista de usuarios
    router.get("/api/users", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        const userService = getDependency("userService");
        const users = await userService.getList();
        res.json(users.map(user => ({
            username: user.user_name,
            displayName: user.display_name,
            email: user.email,
            role: user.role,
        })));
    });

    // POST: Crear usuario
    router.post("/api/users", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        const user = await getDependency("userService").add(req.body);
        if (!user) return res.status(409).json({ error: "Usuario ya existe" });
        res.status(201).json({ id: user.id, name: user.name });
    });

    // PATCH: Modificar usuario por nombre (Ruta corregida: /api/users/:name)
    router.patch("/api/users/:name", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
            }

            const userService = getDependency("userService");
            const updatedUser = await userService.update(req.params.name, req.body);

            if (!updatedUser) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json({
                message: "Usuario actualizado",
                user: {
                    id: updatedUser._id,
                    user_name: updatedUser.user_name,
                    display_name: updatedUser.display_name,
                    email: updatedUser.email
                }
            });
        } catch (error) {
            res.status(400).json({ error: "Error al actualizar el usuario", details: error.message });
        }
    });

    // DELETE: Eliminar usuario por nombre
    router.delete("/api/users/:name", checkAuthorizationTokenMiddleware(), checkRoleMiddleware(["admin"]), async (req, res) => {
        const userService = getDependency("userService");
        const deletedUser = await userService.delete(req.params.name);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Usuario eliminado", name: deletedUser.user_name });
    });
}