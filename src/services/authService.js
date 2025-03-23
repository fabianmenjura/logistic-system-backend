const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const { createUser, findUserByUsername } = require('../models/userModel');

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(username, hashedPassword);
    return { id: userId, username };
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

    const token = generateToken(user.id);
    return { token, user: { id: user.id, username: user.username } };
};

module.exports = { registerUser, loginUser };