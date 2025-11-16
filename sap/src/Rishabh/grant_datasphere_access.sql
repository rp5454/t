-- File: db/src/Rishabh/grant_datasphere_access.sql
-- Create a dedicated DB user for Datasphere remote access (run as SYSTEM or privileged user)
-- IMPORTANT: replace the password placeholder before running in prod.

SET SCHEMA "TRAINING";

-- Create user for remote read access (skip if you already have a user)
-- Note: On HANA Cloud you might need to use the Cloud Console user management, but this works in classical HANA DB
DO BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN END;
    EXEC 'CREATE USER "DS_REMOTE_USER" PASSWORD "ChangeMe!2025"';
END;

-- Grant the user minimal privileges to read the tables
GRANT SELECT ON "TRAINING"."SERVICE_ORDERS" TO "DS_REMOTE_USER";
GRANT SELECT ON "TRAINING"."CUSTOMER_MASTER" TO "DS_REMOTE_USER";

-- If Datasphere needs metadata access (recommended)
GRANT SELECT ON SCHEMA "TRAINING" TO "DS_REMOTE_USER";
-- Optionally grant usage on sequences / views if required:
-- GRANT SELECT ON "TRAINING"."SOME_VIEW" TO "DS_REMOTE_USER";
