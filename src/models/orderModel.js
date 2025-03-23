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
  const [rows] = await db.execute("SELECT * FROM orders WHERE user_id = ?", [
    userId,
  ]);
  return rows;
};

export { createOrder, getOrdersByUserId };
