// src/db.js

import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: './env/.env.app' });

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
});

export default pool;
