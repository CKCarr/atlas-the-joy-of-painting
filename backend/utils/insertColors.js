import fs from 'fs';
import { pool } from './db.js';

// Read the CSV file and extract color data
const csvData = fs.readFileSync('/datasets/colors_used.csv', 'utf-8');
const colors = csvData.split(',').map(color => color.trim()); // Assuming each color is separated by a comma in the CSV

// Preprocess the color data (remove newline characters, etc.)
const cleanedColors = colors.map(color => color.replace(/[]/g, ''));

// Insert the cleaned data into the PostgreSQL database
export async function insertColors() {
    const client = await pool.connect();
    try {
        for (const color of cleanedColors) {
            await client.query('INSERT INTO colors (color_name) VALUES ($1)', [color]);
            console.log(`Inserted color: ${color}`);
        }
    } catch (error) {
        console.error('Error inserting colors:', error);
    } finally {
        client.release();
    }
}

insertColors();
