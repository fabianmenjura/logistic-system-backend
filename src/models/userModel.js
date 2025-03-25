const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, password, roleId = 3) => {
    if (!username || !password) {
        throw new Error('Todos los campos son requeridos: username, password');
    }
    const [existingUser] = await db.execute(
        'SELECT username FROM users WHERE username = ?',
        [username]
    );
    if (existingUser.length > 0) {
        throw new Error('El nombre de usuario ya está en uso');
    }
    const [result] = await db.execute(
        'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)',
        [username, password, roleId]
    );
    return result.insertId;
};

const findUserByUsername = async (username) => {
    const [rows] = await db.execute(
        'SELECT users.*, roles.name AS role_name FROM users JOIN roles ON users.role_id = roles.id WHERE username = ? AND users.deleted = 0',
        [username]
    );
    return rows[0];
};

const getRolePermissions = async (roleId) => {
    const [rows] = await db.execute(
        'SELECT permissions.name FROM role_permissions JOIN permissions ON role_permissions.permission_id = permissions.id WHERE role_id = ?',
        [roleId]
    );
    return rows.map(row => row.name);
};

module.exports = { createUser, findUserByUsername, getRolePermissions };