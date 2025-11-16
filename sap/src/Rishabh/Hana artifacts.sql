-- File: db/src/Rishabh/ServiceOrders.hdbtable
-- Purpose: Table definition for SERVICE_ORDERS (HANA HDI artifact)

COLUMN TABLE "SERVICE_ORDERS" (
    "SERVICE_ORDER_ID" NVARCHAR(20) NOT NULL,
    "VEHICLE_ID" NVARCHAR(20),
    "CUSTOMER_ID" NVARCHAR(20),
    "SERVICE_DATE" DATE,
    "SERVICE_TYPE" NVARCHAR(50),
    "LABOUR_COST" DECIMAL(15,2),
    "PART_COST" DECIMAL(15,2),
    "STORE_ID" NVARCHAR(10),
    PRIMARY KEY ("SERVICE_ORDER_ID")
);

-- ------------------------------------------------------------
-- File: db/src/Rishabh/CustomerMaster.hdbtable
-- Purpose: Table definition for CUSTOMER_MASTER (HANA HDI artifact)

COLUMN TABLE "CUSTOMER_MASTER" (
    "CUSTOMER_ID" NVARCHAR(20) NOT NULL,
    "CUSTOMER_NAME" NVARCHAR(80),
    "CITY" NVARCHAR(50),
    "PHONE" NVARCHAR(20),
    PRIMARY KEY ("CUSTOMER_ID")
);

-- ------------------------------------------------------------
-- File: db/src/Rishabh/LoadServiceOrders.hdbprocedure
-- Purpose: Populate SERVICE_ORDERS with sample rows for testing

PROCEDURE "LoadServiceOrders" ()
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER
AS
BEGIN
    -- Remove any existing rows (useful for re-deploy)
    DELETE FROM "SERVICE_ORDERS";

    INSERT INTO "SERVICE_ORDERS" VALUES ('SO1001','V001','C001', '2024-01-10', 'Oil Change', 2500.00, 1800.00, 'S01');
    INSERT INTO "SERVICE_ORDERS" VALUES ('SO1002','V002','C002', '2024-01-12', 'Brake Service', 3500.00, 1200.00, 'S02');
    INSERT INTO "SERVICE_ORDERS" VALUES ('SO1003','V003','C003', '2024-01-15', 'Tire Replacement', 1500.00, 4000.00, 'S01');
    INSERT INTO "SERVICE_ORDERS" VALUES ('SO1004','V001','C001', '2024-02-05', 'Battery Replacement', 1800.00, 6000.00, 'S03');
    INSERT INTO "SERVICE_ORDERS" VALUES ('SO1005','V004','C004', '2024-01-20', 'Oil Change', 2200.00, 800.00, 'S02');
END;

-- ------------------------------------------------------------
-- File: db/src/Rishabh/LoadCustomerMaster.hdbprocedure
-- Purpose: Populate CUSTOMER_MASTER with sample rows for testing

PROCEDURE "LoadCustomerMaster" ()
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER
AS
BEGIN
    DELETE FROM "CUSTOMER_MASTER";

    INSERT INTO "CUSTOMER_MASTER" VALUES ('C001','Rishabh Pathak','Lucknow','9999999999');
    INSERT INTO "CUSTOMER_MASTER" VALUES ('C002','Amit Verma','Lucknow','8888888888');
    INSERT INTO "CUSTOMER_MASTER" VALUES ('C003','Neha Sharma','Kanpur','7777777777');
    INSERT INTO "CUSTOMER_MASTER" VALUES ('C004','Kiran Joshi','Prayagraj','6666666666');
END;
