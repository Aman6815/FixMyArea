-- Run this once against your existing database, same way you ran
-- migration_add_image_url.sql (pgAdmin Query Tool). Safe to run
-- more than once.

ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- To make yourself an admin afterward, run (replace with your email):
-- UPDATE users SET is_admin = true WHERE email = 'you@example.com';
