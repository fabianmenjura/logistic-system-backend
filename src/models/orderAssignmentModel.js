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

const getUsedCapacity = async (carrierId, routeId) => {
    const [rows] = await db.execute(
        `SELECT SUM(o.package_weight) AS used_capacity
         FROM order_assignments oa
         JOIN orders o ON oa.order_id = o.id
         WHERE oa.carrier_id = ? AND oa.route_id = ?`,
        [carrierId, routeId]
    );
    return rows[0].used_capacity || 0;
};

const isOrderAssigned = async (orderId) => {
    const [rows] = await db.execute(
        "SELECT * FROM order_assignments WHERE order_id = ?",
        [orderId]
    );
    return rows.length > 0;
};

export { assignOrderToRoute, findAssignmentByOrderId, getUsedCapacity, isOrderAssigned };