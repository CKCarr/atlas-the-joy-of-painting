// etl/insertColorsData.js
import fs from 'fs';
import pool from '../src/db.js';

export const insertColorsData = async (inputFilePath) => {
    const inputData = fs.readFileSync(inputFilePath, 'utf8');
    const lines = inputData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    // Check if the first line is empty or the first column is an integer
    if (headers[0] === '' || /^\d+$/.test(headers[0])) {
        console.log('Skipping the first line due to invalid header format.');
        lines.shift(); // Remove the first line
    }

    for (let i = 0; i < lines.length; i++) {
        const rowData = lines[i].split(',');
        const data = {};
        headers.forEach((header, index) => {
            data[header] = rowData[index].trim();
        });

        // Insert data into PostgreSQL table for colors_used
        await pool.query(`
            INSERT INTO colors (
                color_id, painting_index, img_src, painting_title, season, episode,
                num_colors, youtube_src, colors, color_hex, black_gesso, bright_red,
                burnt_umber, cadmium_yellow, dark_sienna, indian_red, indian_yellow,
                liquid_black, liquid_clear, midnight_black, phthalo_blue, phthalo_green,
                prussian_blue, sap_green, titanium_white, van_dyke_brown, yellow_ochre,
                alizarin_crimson
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
                $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)
        `, Object.values(data));
    }
};
