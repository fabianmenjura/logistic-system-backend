const checkPermission = (permission) => {

    return (req, res, next) => {

        if (!req.user || !req.user.id.permissions) {
            return res.status(403).json({ message: 'Acceso denegado: Usuario no autenticado o sin permisos' });
        }

        if (!req.user.id.permissions.includes(permission)) {
            return res.status(403).json({ message: 'Acceso denegado: Permiso insuficiente' });
        }

        next();
    };
};

module.exports = checkPermission;