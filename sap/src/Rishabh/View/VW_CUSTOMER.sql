SELECT
    CUSTOMER_ID          AS CustomerID,
    TRIM(CUSTOMER_NAME)  AS CustomerName,
    TRIM(CITY)           AS City,
    PHONE                AS Phone
FROM CUSTOMER_MASTER;
