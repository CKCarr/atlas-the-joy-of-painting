// 
'use strict';
// import environmental variables
require('dotenv').config({ path: './.env.app' });

// import express library
const express = require('express');
// import 
const { Pool, Client } = require('pg');

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

// define a route for get requests to root url '/'
app.get('/', (request, response) => {
    response.send('Welcome to the Joy of Painting API!!');
});

// app.get('/data', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM your_table');res.json(result.rows);
//     } catch (err) {
//         console.error('Error executing query', err.stack);
//         res.status(500).send('Error executing query');
//     }
// });

// start the server
app.listen(PORT, HOST, () => {
    console.log(`Server up and running! Listening on http://${HOST}:${PORT} `);
});

// export the app for testing purposes
module.exports = app;
