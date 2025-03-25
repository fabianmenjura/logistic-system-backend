import db from "../config/db.js";

const createRoute = async (name, origin, destination, distance, estimatedTime) => {
    const [result] = await db.execute(
        "INSERT INTO routes (name, origin, destination, distance, estimated_time) VALUES (?, ?, ?, ?, ?)",
        [name, origin, destination, distance, estimatedTime]
    );
    return result.insertId;
};

const findRouteById = async (routeId) => {
    const [rows] = await db.execute(
        "SELECT * FROM routes WHERE id = ?",
        [routeId]
    );
    return rows[0];
};
const findAllRoutes = async () => {
    const [rows] = await db.execute("SELECT * FROM routes");
    return rows;
};

export { createRoute, findRouteById, findAllRoutes };