export default function checkRoleMiddleware(requiredRole) {
    return async function (req, res, next) {
        if (!req.session) {
            return res.status(401).json({ error: "Unauthorized" });
        }       
        
        if (!requiredRole.includes(req.session.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    };
}