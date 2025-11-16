-- File: db/src/Rishabh/SERVICE_ORDERS.sql
-- Run this in your HANA Cloud SQL console (schema = TRAINING)

SET SCHEMA "TRAINING";

-- Drop if exists (safe for re-run)
DO BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN END;
    EXEC 'DROP TABLE "TRAINING"."SERVICE_ORDERS"';
END;

CREATE COLUMN TABLE "TRAINING"."SERVICE_ORDERS" (
    "SERVICE_ORDER_ID" NVARCHAR(36) NOT NULL,
    "VEHICLE_ID"       NVARCHAR(36),
    "CUSTOMER_ID"      NVARCHAR(36),
    "SERVICE_DATE"     DATE,
    "SERVICE_TYPE"     NVARCHAR(100),
    "LABOUR_COST"      DECIMAL(15,2),
    "PART_COST"        DECIMAL(15,2),
    "STORE_ID"         NVARCHAR(20),
    PRIMARY KEY ("SERVICE_ORDER_ID")
);

-- Sample data (January + other months to help testing)
INSERT INTO "TRAINING"."SERVICE_ORDERS" VALUES
('SO1001','V001','C001','2025-01-05','Oil Change', 1200.00, 300.00, 'S01'),
('SO1002','V002','C002','2025-01-15','Brake Replacement', 4500.00, 2200.00, 'S02'),
('SO1003','V003','C003','2025-01-18','Wheel Alignment', 800.00, 0.00, 'S01'),
('SO1004','V001','C001','2025-02-03','AC Service', 1500.00, 200.00, 'S03'),
('SO1005','V004','C004','2025-01-25','Engine Diagnostic', 2000.00, 0.00, 'S02'),
('SO1006','V005','C005','2025-03-02','Oil Change', 1200.00, 250.00, 'S01'),
('SO1007','V006','C006','2025-01-11','Battery Replacement', 1800.00, 600.00, 'S03'),
('SO1008','V002','C002','2025-01-28','Oil Change', 1200.00, 100.00, 'S02');
