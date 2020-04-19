CREATE TABLE entries (
  ID SERIAL PRIMARY KEY,
  type VARCHAR(8) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL
);

INSERT INTO entries (type, date)
VALUES  ('DB_INIT',  (now() at time zone 'utc'));