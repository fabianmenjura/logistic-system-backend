-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para logistic-system
DROP DATABASE IF EXISTS `logistic-system`;
CREATE DATABASE IF NOT EXISTS `logistic-system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `logistic-system`;

-- Volcando estructura para tabla logistic-system.carriers
DROP TABLE IF EXISTS `carriers`;
CREATE TABLE IF NOT EXISTS `carriers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `vehicle_type` varchar(50) NOT NULL,
  `capacity` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('disponible','en ruta','en mantenimiento','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'disponible',
  `current_city` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `document_id` varchar(50) NOT NULL,
  `license_plate` varchar(20) NOT NULL,
  `vehicle_model` varchar(100) DEFAULT NULL,
  `vehicle_year` int DEFAULT NULL,
  `last_maintenance` datetime DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total_distance` decimal(10,2) DEFAULT '0.00',
  `rating` decimal(3,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  CONSTRAINT `carriers_chk_1` CHECK ((`rating` between 0 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.carriers: ~10 rows (aproximadamente)
INSERT INTO `carriers` (`id`, `name`, `phone`, `vehicle_type`, `capacity`, `created_at`, `status`, `current_city`, `deleted`, `email`, `document_id`, `license_plate`, `vehicle_model`, `vehicle_year`, `last_maintenance`, `last_update`, `total_distance`, `rating`) VALUES
	(1, 'Carlos Gómez', '3001234567', 'Camión', 50.00, '2025-03-23 16:15:39', 'disponible', 'Bogotá', 0, 'transportista1@correo.com', 'ID000001', 'ABC1001', 'Scania R450', 2016, '2025-02-22 20:57:37', '2025-03-25 07:35:35', 346963.60, 4.67),
	(2, 'Luis Martínez', '3017654321', 'Remolque', 25000.00, '2025-03-23 16:15:39', 'disponible', 'Medellín', 0, 'transportista2@correo.com', 'ID000002', 'ABC2002', 'Mercedes Actros', 2017, '2025-01-23 20:57:37', '2025-03-25 07:21:10', 294584.22, 0.72),
	(3, 'Andrés Rodríguez', '3029876543', 'Remolque Articulado', 30000.00, '2025-03-23 16:15:39', 'disponible', 'Cali', 0, 'transportista3@correo.com', 'ID000003', 'ABC3003', 'Volvo FH', 2018, '2024-12-24 20:57:37', '2025-03-25 01:57:37', 474427.84, 1.57),
	(4, 'Jorge Fernández', '3101122334', 'Tanque', 10.00, '2025-03-23 16:15:39', 'disponible', 'Cartagena', 0, 'transportista4@correo.com', 'ID000004', 'ABC4004', 'Scania R450', 2019, '2024-11-24 20:57:37', '2025-03-25 01:57:37', 362871.22, 3.43),
	(5, 'Juan Pérez', '3112233445', 'Estacas', 12000.00, '2025-03-23 16:15:39', 'disponible', 'Bucaramanga', 0, 'transportista5@correo.com', 'ID000005', 'ABC5005', 'Mercedes Actros', 2020, '2024-10-25 20:57:37', '2025-03-25 01:57:37', 124702.66, 0.96),
	(6, 'Oscar Ramírez', '3123344556', 'Refrigerado', 15000.00, '2025-03-23 16:15:39', 'disponible', 'Bogotá', 0, 'transportista6@correo.com', 'ID000006', 'ABC6006', 'Volvo FH', 2015, '2024-09-25 20:57:37', '2025-03-25 01:57:37', 103509.65, 2.31),
	(7, 'Pedro Jiménez', '3134455667', 'Volqueta - Tolva', 18000.00, '2025-03-23 16:15:39', 'disponible', 'Medellín', 0, 'transportista7@correo.com', 'ID000007', 'ABC7007', 'Scania R450', 2016, '2024-08-26 20:57:37', '2025-03-25 01:57:37', 344359.68, 0.29),
	(8, 'Hugo Torres', '3145566778', 'Remolque', 26000.00, '2025-03-23 16:15:39', 'disponible', 'Bogotá', 0, 'transportista8@correo.com', 'ID000008', 'ABC8008', 'Mercedes Actros', 2017, '2024-07-27 20:57:37', '2025-03-25 01:57:37', 111247.13, 4.70),
	(9, 'Ricardo Mendoza', '3156677889', 'Remolque Articulado', 32000.00, '2025-03-23 16:15:39', 'disponible', 'Cali', 0, 'transportista9@correo.com', 'ID000009', 'ABC9009', 'Volvo FH', 2018, '2024-06-27 20:57:37', '2025-03-25 01:57:37', 14458.47, 1.63),
	(10, 'Manuel Herrera', '3167788990', 'Tanque', 22000.00, '2025-03-23 16:15:39', 'disponible', 'Cali', 0, 'transportista10@correo.com', 'ID000010', 'ABC10010', 'Scania R450', 2019, '2024-05-28 20:57:37', '2025-03-25 01:57:37', 273486.86, 3.77);

-- Volcando estructura para tabla logistic-system.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `package_weight` decimal(10,2) NOT NULL,
  `package_dimensions` varchar(50) NOT NULL,
  `package_type` varchar(50) NOT NULL,
  `destination_address` varchar(255) NOT NULL,
  `status` enum('En espera','En tránsito','Entregado','Pendiente','Cancelado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'En espera',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `origin_address` varchar(255) NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `recipient_phone` varchar(20) NOT NULL,
  `tracking_code` varchar(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_code` (`tracking_code`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.orders: ~0 rows (aproximadamente)
INSERT INTO `orders` (`id`, `user_id`, `package_weight`, `package_dimensions`, `package_type`, `destination_address`, `status`, `created_at`, `origin_address`, `recipient_name`, `recipient_phone`, `tracking_code`, `deleted`) VALUES
	(24, 14, 30.00, '30X40X25', 'Paquete mediano', 'Carrera 6bis #3a-68, Bogotá, Cundinamarca, Colombia', 'En tránsito', '2025-03-25 08:02:48', 'Carrera 6bis #3a-68, Medellín, Antioquia, Colombia', 'Fabian Menjura', '3103168384', 'NGK4DNRI10', 0);

-- Volcando estructura para tabla logistic-system.order_assignments
DROP TABLE IF EXISTS `order_assignments`;
CREATE TABLE IF NOT EXISTS `order_assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `route_id` int NOT NULL,
  `carrier_id` int NOT NULL,
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `route_id` (`route_id`),
  KEY `carrier_id` (`carrier_id`),
  CONSTRAINT `order_assignments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_assignments_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`),
  CONSTRAINT `order_assignments_ibfk_3` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.order_assignments: ~0 rows (aproximadamente)
INSERT INTO `order_assignments` (`id`, `order_id`, `route_id`, `carrier_id`, `assigned_at`) VALUES
	(23, 24, 1, 1, '2025-03-25 08:03:20');

-- Volcando estructura para tabla logistic-system.order_status_history
DROP TABLE IF EXISTS `order_status_history`;
CREATE TABLE IF NOT EXISTS `order_status_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `status` enum('En espera','En tránsito','Entregado','Pendiente','Cancelado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `notes` text,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `order_status_history_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.order_status_history: ~1 rows (aproximadamente)
INSERT INTO `order_status_history` (`id`, `order_id`, `status`, `timestamp`, `description`, `location`, `notes`, `user_id`) VALUES
	(9, 24, 'En espera', '2025-03-25 03:02:48', NULL, NULL, NULL, 14),
	(10, 24, 'En tránsito', '2025-03-25 03:03:20', NULL, NULL, NULL, 14);

-- Volcando estructura para tabla logistic-system.permissions
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.permissions: ~5 rows (aproximadamente)
INSERT INTO `permissions` (`id`, `name`) VALUES
	(1, 'create_order'),
	(4, 'delete_order'),
	(3, 'edit_order'),
	(5, 'manage_users'),
	(2, 'view_orders');

-- Volcando estructura para tabla logistic-system.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'admin'),
	(3, 'admin-logistic'),
	(2, 'user');

-- Volcando estructura para tabla logistic-system.role_permissions
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.role_permissions: ~9 rows (aproximadamente)
INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
	(1, 1),
	(1, 2),
	(3, 2),
	(1, 3),
	(2, 3),
	(3, 3),
	(1, 4),
	(1, 5),
	(2, 5);

-- Volcando estructura para tabla logistic-system.routes
DROP TABLE IF EXISTS `routes`;
CREATE TABLE IF NOT EXISTS `routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `distance` decimal(10,2) NOT NULL,
  `estimated_time` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.routes: ~20 rows (aproximadamente)
INSERT INTO `routes` (`id`, `name`, `origin`, `destination`, `distance`, `estimated_time`, `created_at`, `deleted`) VALUES
	(1, 'BOG-MDE-01A', 'Bogotá', 'Medellín', 415.00, '8', '2025-03-23 16:02:51', 0),
	(2, 'MDE-BOG-01B', 'Medellín', 'Bogotá', 415.00, '8', '2025-03-23 16:02:51', 0),
	(3, 'BOG-CLO-02A', 'Bogotá', 'Cali', 460.00, '9', '2025-03-23 16:02:51', 0),
	(4, 'CLO-BOG-02B', 'Cali', 'Bogotá', 460.00, '9', '2025-03-23 16:02:51', 0),
	(5, 'BOG-CTG-03A', 'Bogotá', 'Cartagena', 1050.00, '18', '2025-03-23 16:02:51', 0),
	(6, 'CTG-BOG-03B', 'Cartagena', 'Bogotá', 1050.00, '18', '2025-03-23 16:02:51', 0),
	(7, 'BOG-BGA-04A', 'Bogotá', 'Bucaramanga', 400.00, '7', '2025-03-23 16:02:51', 0),
	(8, 'BGA-BOG-04B', 'Bucaramanga', 'Bogotá', 400.00, '7', '2025-03-23 16:02:51', 0),
	(9, 'MDE-CLO-05A', 'Medellín', 'Cali', 415.00, '8', '2025-03-23 16:02:51', 0),
	(10, 'CLO-MDE-05B', 'Cali', 'Medellín', 415.00, '8', '2025-03-23 16:02:51', 0),
	(11, 'MDE-CTG-06A', 'Medellín', 'Cartagena', 630.00, '11', '2025-03-23 16:02:51', 0),
	(12, 'CTG-MDE-06B', 'Cartagena', 'Medellín', 630.00, '11', '2025-03-23 16:02:51', 0),
	(13, 'MDE-BGA-07A', 'Medellín', 'Bucaramanga', 390.00, '7', '2025-03-23 16:02:51', 0),
	(14, 'BGA-MDE-07B', 'Bucaramanga', 'Medellín', 390.00, '7', '2025-03-23 16:02:51', 0),
	(15, 'CLO-CTG-08A', 'Cali', 'Cartagena', 970.00, '17', '2025-03-23 16:02:51', 0),
	(16, 'CTG-CLO-08B', 'Cartagena', 'Cali', 970.00, '17', '2025-03-23 16:02:51', 0),
	(17, 'CLO-BGA-09A', 'Cali', 'Bucaramanga', 720.00, '13', '2025-03-23 16:02:51', 0),
	(18, 'BGA-CLO-09B', 'Bucaramanga', 'Cali', 720.00, '13', '2025-03-23 16:02:51', 0),
	(19, 'CTG-BGA-10A', 'Cartagena', 'Bucaramanga', 470.00, '9', '2025-03-23 16:02:51', 0),
	(20, 'BGA-CTG-10B', 'Bucaramanga', 'Cartagena', 470.00, '9', '2025-03-23 16:02:51', 0);

-- Volcando estructura para tabla logistic-system.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` int DEFAULT NULL,
  `deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla logistic-system.users: ~1 rows (aproximadamente)
INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `role_id`, `deleted`) VALUES
	(14, 'admin', '$2b$10$HXC2fr4lsx7xDq9vVTgR5erKHpixFzidwZgnx/ANJYFfJTVG6km5a', '2025-03-25 07:21:39', 1, 0);

-- Volcando estructura para disparador logistic-system.after_order_insert
DROP TRIGGER IF EXISTS `after_order_insert`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_order_insert` AFTER INSERT ON `orders` FOR EACH ROW BEGIN
    -- Inserta automáticamente el primer estado en el historial
    INSERT INTO order_status_history (order_id, status, timestamp, user_id)
    VALUES (NEW.id, NEW.status, NOW(), NEW.user_id);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador logistic-system.after_order_status_update
DROP TRIGGER IF EXISTS `after_order_status_update`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_order_status_update` AFTER UPDATE ON `orders` FOR EACH ROW BEGIN
    -- Verifica si el estado cambió
    IF NEW.status != OLD.status THEN
        -- Registra el nuevo estado en el historial
        INSERT INTO order_status_history (order_id, status, timestamp, user_id)
        VALUES (NEW.id, NEW.status, NOW(), NEW.user_id);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
