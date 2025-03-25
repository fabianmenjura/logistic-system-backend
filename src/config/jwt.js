const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId, username, role, permissions) => {
    return jwt.sign({ id: userId, username, role, permissions }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verificar si el token comienza con "Bearer "
    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Extraer el token sin "Bearer "
    const tokenWithoutBearer = token.slice(7, token.length);

    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = decoded; // Guardar la información del usuario en el request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = { generateToken, verifyToken };