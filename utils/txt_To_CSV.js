// Function to convert the text file to CSV
// including descriptions and guest information

import fs from 'fs';

const convertTxtToCsv = (inputFilePath, outputFilePath) => {
    const inputData = fs.readFileSync(inputFilePath, 'utf8');
    const lines = inputData.split('\n');
    
    // Format each line and convert to CSV
    const csvLines = lines.map(line => {
        const match = line.match(/^"(.+)" \(([^)]+)\)(.*)$/);
        if (match) {
            const title = match[1];
            const date = match[2];
            const extraInfo = match[3].trim(); // Regex to remove parentheses and their contents
            return `"${title}","${date}","${extraInfo}"`;
        }
        return '';
    }).filter(line => line);  // Remove any empty lines resulting from non-matching lines

    // Write to a new CSV file
    if (csvLines.length > 0) {
        const header = 'Title,Broadcast_Date,Extra Info\n';
        const csvContent = header + csvLines.join('\n');
        fs.writeFileSync(outputFilePath, csvContent);
    }
};

convertTxtToCsv('datasets/episode_dates.txt', 'datasets/episode_dates.csv');
