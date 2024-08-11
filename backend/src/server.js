// src/server.js

import dotenv from 'dotenv';
import express from 'express';
import apiRoutes from '../api/routes.js';

dotenv.config({ path: './env/.env.app' });

// Constants
const HOST = '0.0.0.0' || 'localhost';
const PORT = process.env.PORT || 3000;

// create an instance of express
const app = express();

// Use the imported routes with Express app
app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Joy of Painting API!!');
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server up and running! Listening on http://${HOST}:${PORT}`);
});
