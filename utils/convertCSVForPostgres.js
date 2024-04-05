// utils/convertCSVForPostgres.js
import fs from 'fs';

// Function to preprocess CSV data for PostgreSQL import
export function convertCSVForPostgres(inputFilePath, outputFilePath) {
    // Read the CSV file
    const csvData = fs.readFileSync(inputFilePath, 'utf8');

    // Replace array format ['element1', 'element2', ...] with PostgreSQL array format {element1,element2,...}
    const processedData = csvData.replace(/\['(.*?)'\]/g, '{$1}');

    // Remove single quotes and spaces around each element
    const finalProcessedData = processedData.replace(/'([^']*)'/g, '$1').replace(/\s*,\s*/g, ',');

    // Remove the outer double quotes ("{ and }") delete the inner single quotes around each element
    const finalProcessedDataWithoutQuotes = finalProcessedData.replace(/"{([^{}]+)}"/g, '{$1}');

    // Write the processed data to the output file
    fs.writeFileSync(outputFilePath, finalProcessedDataWithoutQuotes);
    
    console.log('CSV file converted successfully for PostgreSQL import.');
}

// Specify input and output file paths
const inputFilePath = './datasets/colors_used.csv';
const outputFilePath = './datasets/colors_processed.csv';

// Convert CSV data and save the processed file
convertCSVForPostgres(inputFilePath, outputFilePath);
