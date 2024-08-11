// api/routes.js - api routes for the application
import db from '../src/db.js';
import express from 'express';
const router = express.Router();

// define a route for get requests to root url '/'
router.get('/', (req, res) => {
    res.send('Welcome to the Joy of Painting API!!');
});

// Example route using the pool to query the database
router.get('/episodes', async (req, res) => {
    const { month, subject, color } = req.query;

    let query = 'SELECT * FROM episodes WHERE 1=1';
    const params = [];

    if (month) {
        query += ' AND EXTRACT(MONTH FROM broadcast_date) = EXTRACT(MONTH FROM to_date($1, \'Month\'))';
        params.push(month);
    }

    if (subject) {
        query += ' AND EXISTS (SELECT 1 FROM episode_subjects es JOIN subjects s ON es.subject_id = s.subject_id WHERE es.episode_id = episodes.episode_id AND s.subject_name = $2)';
        params.push(subject);
    }

    if (color) {
        query += ' AND EXISTS (SELECT 1 FROM episode_colors ec JOIN colors c ON ec.color_id = c.color_id WHERE ec.episode_id = episodes.episode_id AND c.color_name = $3)';
        params.push(color);
    }

    try {
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error accessing the API:', error);
        res.status(500).send('Error accessing the API');
    }
});

export default router;
