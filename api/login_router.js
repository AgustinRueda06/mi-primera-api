import { getDependency } from "../dependency.js";

export function configureLoginRouter(router) {
    const loginServices = getDependency("loginService");


    router.post("/", async (req, res) => {
        const data = req.body;
    
        const session = await loginServices.login(data);
        res.json(session);
    });
}