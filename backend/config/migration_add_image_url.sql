-- Run this once against your existing database (you already have the
-- reports table, so this just adds the new column without recreating
-- anything). Safe to run more than once.

ALTER TABLE reports
ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
