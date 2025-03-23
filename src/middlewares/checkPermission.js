const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({ message: 'Acceso denegado: Permiso insuficiente' });
        }
        next();
    };
};

module.exports = checkPermission;