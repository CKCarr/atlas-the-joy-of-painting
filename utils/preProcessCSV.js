// utils/preProcessCSV.js
import fs from 'fs';

// Read the CSV file and preprocess the 'colors' and 'color_hex' columns
export const preprocessCSV = (inputFilePath, outputFilePath) => {
    const inputData = fs.readFileSync(inputFilePath, 'utf8');
    const processedData = inputData.replace(/\['(.*?)'\]/g, '{$1}');
    fs.writeFileSync(outputFilePath, processedData);
};

// Usage: preprocessCSV('./datasets/colors_used.csv');
