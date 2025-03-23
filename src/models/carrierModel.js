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
        "SELECT * FROM carriers WHERE id = ?",
        [carrierId]
    );
    return rows[0];
};

const findAvailableCarriers = async (requiredCapacity) => {
    const [rows] = await db.execute(
        "SELECT * FROM carriers WHERE capacity >= ? AND status = 'available'",
        [requiredCapacity]
    );
    return rows;
};

export { createCarrier, findCarrierById, findAvailableCarriers };