import { addDependency } from "./dependency.js";
import { UserServices } from "./services/user_services.js";
import { LoginServices } from "./services/login_services.js";
import { SessionsServices } from "./services/sessions_services.js";
import { ProductService } from "./services/product_service.js"; // <-- 1. IMPORTAR

import UserMongo from "./mongo-db/user_mongo.js";
import SessionMongo from "./mongo-db/sessions_mongo.js";

addDependency("userRepo", UserMongo);
addDependency("sessionRepo", SessionMongo);

addDependency("userService", new UserServices());
addDependency("loginService", new LoginServices());
addDependency("sessionService", new SessionsServices());
addDependency("productService", new ProductService()); // <-- 2. REGISTRAR