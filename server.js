// server.js

import dotenv from 'dotenv';
dotenv.config({ path: './.env.app' });

import express from 'express';
import pg from 'pg';

// import routes from './api' folder
import apiRoutes from './api/routes.js';

const { Pool, Client } = pg;

// Constants
const HOST = '0.0.0.0';

// define port for server to run on Env Var or default 3000
const PORT = process.env.PORT || 3000; // Default port for Express server

// PostgreSQL connection settings
const pgPort = process.env.DB_PORT || 5432; // Default port for PostgreSQL

// create new Pool object with default settings
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: pgPort, // default port for postgres
});

// create an instance of express
const app = express();

// Use the imported routes with your Express app
app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Joy of Painting API!!');
});

// Export the app for testing purposes
export { app, pool };

// Conditionally start the server only when the file is run directly
const isMainModule = import.meta.url.endsWith(process.argv[1].split('/').pop());

if (isMainModule) {
    app.listen(PORT, HOST, () => {
        console.log(`Server up and running! Listening on http://${HOST}:${PORT}`);
    });
}
