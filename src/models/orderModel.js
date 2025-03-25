import db from "../config/db.js";

const createOrder = async (
  userId,
  packageWeight,
  packageDimensions,
  packageType,
  originAddress,
  destinationAddress,
  recipientName,
  recipientPhone,
  trackingCode
) => {
  const [result] = await db.execute(
    `INSERT INTO orders (
            user_id, 
            package_weight, 
            package_dimensions, 
            package_type,  
            origin_address, 
            destination_address, 
            recipient_name, 
            recipient_phone, 
            tracking_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      packageWeight,
      packageDimensions,
      packageType,
      originAddress,
      destinationAddress,
      recipientName,
      recipientPhone,
      trackingCode,
    ]
  );
  return result.insertId;
};

const getOrdersByUserId = async (userId) => {
  const [rows] = await db.execute("SELECT * FROM orders WHERE user_id = ? AND orders.deleted = 0", [
    userId.id,
  ]);
  return rows;
};
const findOrderById = async (orderId) => {
    const [rows] = await db.execute(
        "SELECT orders.*, order_assignments.carrier_id, order_assignments.route_id FROM orders LEFT JOIN order_assignments ON order_assignments.order_id = orders.id LEFT JOIN carriers ON carriers.id = order_assignments.carrier_id WHERE orders.id = ? AND orders.deleted = 0",
        [orderId]
    );
    return rows[0]; // Devuelve la primera fila (la orden encontrada)
};
const findOrderByTracking = async (trackingCode) => {
    const [rows] = await db.execute(
        "SELECT * from orders WHERE tracking_code = ? AND deleted = 0",
        [trackingCode]
    );
    return rows[0];
};
export { createOrder, getOrdersByUserId, findOrderById, findOrderByTracking };
