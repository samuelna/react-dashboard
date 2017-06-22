BEGIN;

DROP TABLE IF EXISTS setting;

CREATE TABLE setting(
  userID SERIAL PRIMARY KEY,
  location VARCHAR (50),
  doNotShowAgain BOOLEAN,
  showAMPM BOOLEAN
);

COMMIT;