const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password, roleId } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos: username, password' });
        }

        // Si no se proporciona un roleId, se usa el valor por defecto (3)
        const user = await registerUser(username, password, roleId);
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await loginUser(username, password);
        res.json({ message: 'Login exitoso', ...result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };