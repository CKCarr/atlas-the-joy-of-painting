// api routes for the application
// api/routes.js

import express from 'express';
const router = express.Router();

// define a route for get requests to root url '/'
router.get('/', (req, res) => {
    res.send('Welcome to the Joy of Painting API!!');
});

export default router;
