// utils/utils.js
import fs from 'fs';

// Function to insert CSV data into a PostgreSQL table with header mapping and formatting
export async function insertCsvIntoTable(inputFilePath, tableName, headerMapping, headerFormatting, client) {
    try {
        const inputData = fs.readFileSync(inputFilePath, 'utf8');
        const lines = inputData.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());

        for (let i = 1; i < lines.length; i++) {
            const rowData = lines[i].split(',').map(item => item.trim());
            const data = {};
            headers.forEach((header, index) => {
                data[header] = rowData[index];
            });

            // Standardize the episode title
            data['Episode Title'] = standardizeTitle(data['Episode Title']);

            // Insert data into PostgreSQL table
            await client.query(`
                INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) VALUES (${Object.values(data).map((val, index) => `$${index + 1}`).join(', ')})
            `, Object.values(data));
        }

        console.log('CSV data inserted into PostgreSQL table successfully!');
    } catch (error) {
        console.error('Error inserting CSV data into PostgreSQL table:', error);
    }
}
