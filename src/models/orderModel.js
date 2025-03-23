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
  const [rows] = await db.execute("SELECT * FROM orders WHERE user_id = ? AND deleted = 0", [
    userId.id,
  ]);
  return rows;
};
const findOrderById = async (orderId) => {
    const [rows] = await db.execute(
        "SELECT * FROM orders WHERE id = ? AND deleted = 0",
        [orderId]
    );
    return rows[0]; // Devuelve la primera fila (la orden encontrada)
};
export { createOrder, getOrdersByUserId, findOrderById };
