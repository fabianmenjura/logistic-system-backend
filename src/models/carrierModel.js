import db from "../config/db.js";

const createCarrier = async (name, phone, vehicleType, capacity) => {
    const [result] = await db.execute(
        "INSERT INTO carriers (name, phone, vehicle_type, capacity) VALUES (?, ?, ?, ?)",
        [name, phone, vehicleType, capacity]
    );
    return result.insertId;
};

const findCarrierById = async (carrierId) => {
    const [rows] = await db.execute(
        "SELECT * FROM carriers WHERE id = ? AND status = 'available'",
        [carrierId]
    );
    return rows[0];
};

const findAvailableCarriers = async (requiredCapacity, originCity) => {
  const [rows] = await db.execute(
      "SELECT * FROM carriers WHERE capacity >= ? AND status = 'available' AND current_city = ?",
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
  const [rows] = await db.execute("SELECT * FROM carriers WHERE status = ? ", ['available']);
  return rows;
};

export { createCarrier, findCarrierById, findAvailableCarriers, updateCarrierStatus, findAllCarriers };