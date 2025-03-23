import db from "../config/db.js";

const assignOrderToRoute = async (orderId, routeId, carrierId) => {
    const [result] = await db.execute(
        "INSERT INTO order_assignments (order_id, route_id, carrier_id) VALUES (?, ?, ?)",
        [orderId, routeId, carrierId]
    );
    return result.insertId;
};

const findAssignmentByOrderId = async (orderId) => {
    const [rows] = await db.execute(
        "SELECT * FROM order_assignments WHERE order_id = ?",
        [orderId]
    );
    return rows[0];
};

export { assignOrderToRoute, findAssignmentByOrderId };