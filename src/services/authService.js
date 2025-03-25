const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const { createUser, findUserByUsername, getRolePermissions } = require('../models/userModel');

const registerUser = async (username, password, roleId) => {
    if (!username || !password) {
        throw new Error('Todos los campos son requeridos: username, password');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser(username, hashedPassword, roleId);
    return { id: userId, username, roleId };
};

const loginUser = async (username, password) => {
    const user = await findUserByUsername(username);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    const permissions = await getRolePermissions(user.role_id);
    const token = generateToken({ id: user.id, username: user.username, role: user.role_name, permissions });
    return { token, user: { id: user.id, username: user.username, role: user.role_name, permissions } };
};

module.exports = { registerUser, loginUser };