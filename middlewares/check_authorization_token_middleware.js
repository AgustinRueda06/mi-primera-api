import { getDependency } from "../dependency.js";

export default function checkAuthorizationTokenMiddleware() {
    return async function (req, res, next) {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const sessionRepo = getDependency("sessionRepo");
        const session = await sessionRepo.findOne({ authorizationToken: token });

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.session = {
            username: session.username,
            role: session.role,
        };

        next();
    };
}