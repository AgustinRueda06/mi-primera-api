import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import config from './config.js';

// 1. Cargar e inicializar las dependencias
import './dependencies.js';
import { getDependency } from './dependency.js';

// 2. Importar los routers de la API
import { configureLoginRouter } from './api/login_router.js';
import { configureUserRouter } from './api/user_router.js';
import { configureProductoRouter } from './api/producto_router.js';
import  errorHandler  from './middlewares/error_middleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
await mongoose.connect(config.dbConnection);
console.log('Conectado a MongoDB');

// Crear usuario admin inicial si no existe
const userService = getDependency('userService');
try {
    await userService.add({
        user_name: 'admin',
      password: 'Admin123!',
        display_name: 'Administrador',
        email: 'admin@example.com',
        role: 'admin',
    });
    console.log('Usuario admin creado');
} catch (err) {
    if (err.message === 'El nombre de usuario ya existe') {
      console.log('Usuario admin ya existe, se omite creación');
    } else {
      console.error('No se pudo crear el usuario admin:', err.message);
    }
}

// Ruta base de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de agusrueda funcionando correctamente' });
});

// 3. Montar las rutas
const loginRouter = express.Router();
configureLoginRouter(loginRouter);
app.use('/api/login', loginRouter);

configureUserRouter(app);

const productoRouterInstance = express.Router();
configureProductoRouter(productoRouterInstance);
app.use('/api/producto', productoRouterInstance);

app.use (errorHandler);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});