// etl/insertSubjectMatterData

import { parseFile } from 'fast-csv';
import pool from '../src/db.js';

export const insertSubjectMatterData = async (inputFilePath) => {
    const rows = [];

    // Use fast-csv to parse the file and collect data rows
    await new Promise((resolve, reject) => {
        parseFile(inputFilePath, { headers: true, ignoreEmpty: true })
            .on('error', error => reject(error))
            .on('data', row => rows.push(Object.values(row)))
            .on('end', rowCount => {
                console.log(`Parsed ${rowCount} rows`);
                resolve();
            });
    });

    // Use a transaction to insert all rows into the database
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const insertQuery = `
            INSERT INTO subjects (
                episode, title, apple_frame, aurora_borealis, barn, beach, boat,
                bridge, building, bushes, cabin, cactus, circle_frame, cirrus, cliff,
                clouds, conifer, cumulus, deciduous, diane_andre, dock, double_oval_frame,
                farm, fence, fire, florida_frame, flowers, fog, framed, grass, guest,
                half_circle_frame, half_oval_frame, hills, lake, lakes, lighthouse, mill,
                moon, mountain, mountains, night, ocean, oval_frame, palm_trees, path,
                person, portrait, rectangle_3d_frame, rectangular_frame, river, rocks,
                seashell_frame, snow, snowy_mountain, split_frame, steve_ross, structure,
                sun, tomb_frame, tree, trees, triple_frame, waterfall, waves, windmill,
                window_frame, winter, wood_framed
            ) VALUES 
        ` + rows.map(() => '(' + new Array(68).fill('?').join(',') + ')').join(',');

        await client.query(insertQuery, rows.flat());

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
