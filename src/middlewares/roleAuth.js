export const roleAuth = (roles) => {
    return async(req, res, next) => {
        if(!req.user) return res.status(401).json({ error: 'Unauthorized' });
        
        // Convertir roles a un array si no lo es
        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        
        // Verificar si el rol del usuario está en el array de roles permitidos
        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        next();
    }
}