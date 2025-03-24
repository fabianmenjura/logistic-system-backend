import db from "../config/db.js";

const createCarrier = async (name, phone, vehicleType, capacity) => {
    const [result] = await db.execute(
        "INSERT INTO carriers (name, phone, vehicle_type, capacity) VALUES (?, ?, ?, ?)",
        [name, phone, vehicleType, capacity]
    );
    return result.insertId;
};

const findCarrierByIdAvailable = async (carrierId) => {
    const [rows] = await db.execute(
        "SELECT * FROM carriers WHERE id = ? AND deleted = 0 AND status = 'disponible'",
        [carrierId]
    );
    return rows[0];
};
//Para cargar vista de detalle
const findCarrierById = async (carrierId) => {
    const [rows] = await db.execute(
        "SELECT * FROM carriers WHERE id = ? AND deleted = 0 ",
        [carrierId]
    );
    return rows[0];
};

const findAvailableCarriers = async (requiredCapacity, originCity) => {
  const [rows] = await db.execute(
      "SELECT * FROM carriers WHERE capacity >= ? AND status = 'disponible' AND current_city = ?",
      [requiredCapacity, originCity]
  );
  return rows;
};

const updateCarrierStatus = async (carrierId, status) => {
    await db.execute(
        "UPDATE carriers SET status = ? WHERE id = ?",
        [status, carrierId]
    );
};
const findAllCarriers = async () => {
  const [rows] = await db.execute(`
        SELECT 
            carriers.*, 
            (
                SELECT COUNT(*) 
                FROM orders o
                JOIN order_assignments oa ON o.id = oa.order_id
                WHERE oa.carrier_id = carriers.id AND o.status = 'En tránsito' AND o.deleted = 0
            ) AS active_orders
        FROM carriers
        WHERE carriers.deleted = 0
    `);
  return rows;
};
const findActiveOrdersByCarrierId = async (carrierId) => {
  const [rows] = await db.execute(
      `SELECT o.* 
       FROM orders o
       JOIN order_assignments oa ON o.id = oa.order_id
       WHERE oa.carrier_id = ? AND o.deleted = 0`,
      [carrierId]
  );
  return rows;
};
export { 
  createCarrier, 
  findCarrierByIdAvailable, 
  findAvailableCarriers, 
  updateCarrierStatus, 
  findAllCarriers, 
  findActiveOrdersByCarrierId,
  findCarrierById
  };