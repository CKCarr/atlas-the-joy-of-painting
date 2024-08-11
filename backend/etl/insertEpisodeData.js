// etl/insertEpisodeData.js
import fs from 'fs';
import pool from '../src/db.js';
import { parse, format } from 'date-fns';

export const insertEpisodeDatesData = async (inputFilePath) => {
    const inputData = fs.readFileSync(inputFilePath, 'utf8');
    const lines = inputData.split('\n');

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const matches = line.match(/"([^"]*)"/g);

        if (!matches || matches.length < 3) {
            console.error(`Skipping line ${i} due to format issues: ${line}`);
            continue; // Skip to the next line if the current line doesn't match the expected format
        }

        const [title, dateStr, extraInfo] = matches.map(field => field.replace(/^"|"$/g, ''));

        try {
            const parsedDate = parse(dateStr, 'MMMM dd, yyyy', new Date());
            if (isNaN(parsedDate.getTime())) {
                throw new Error(`Invalid date format: ${dateStr}`);
            }
            const formattedDate = format(parsedDate, 'yyyy-MM-dd');

            await pool.query(`
                INSERT INTO episodes (title, broadcast_date, extra_info) VALUES ($1, $2, $3)
            `, [title, formattedDate, extraInfo]);
        } catch (error) {
            console.error(`Error processing line ${i}: ${line}`, error);
        }
    }
};
