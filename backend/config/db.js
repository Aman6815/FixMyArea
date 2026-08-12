const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Cloud databases (like Supabase) require an SSL connection;
    // your local Postgres does not. Rather than hardcoding this,
    // it's controlled by an env variable — set DB_SSL=true in
    // .env only when connecting to Supabase.
    ssl: process.env.DB_SSL === "true"
        ? { rejectUnauthorized: false }
        : false
});

module.exports = pool;
