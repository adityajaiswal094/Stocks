DROP TABLE IF EXISTS stocks;

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY NOT NULL,
    sc_code TEXT NOT NULL,
    sc_name TEXT NOT NULL,
    "open" TEXT NOT NULL,
    high TEXT NOT NULL,
    low TEXT NOT NULL,
    "close" TEXT NOT NULL
);

COPY stocks (sc_code, sc_name, "open", high, low, "close")
FROM 'C:\Users\adity\Desktop\Backend Projects\Stock_Price\src\data\EQ190124.CSV'
DELIMITER  ',' HEADER CSV;