// src/etl.js
import { readCSV } from '../utils/readCSV.js'

import { insertEpisodeDatesData } from '../etl/insertEpisodeData.js';

import { insertColorsData } from '../etl/insertColorData.js';

import { insertSubjectMatterData } from '../etl/insertSubjectData.js';

// import { preprocessCSV } from '../utils/preProcessCSV.js';

// etl function for inserting data
async function etlProcess() {
    try {
        const episodesFilePath = './datasets/episode_dates.csv';
        const episodesData = await readCSV(episodesFilePath);
        await insertEpisodeDatesData(episodesFilePath);  // Pass the file path directly

        const colorsFilePath = './datasets/colors_processed.csv';
        const colorsData = await readCSV(colorsFilePath);
        await insertColorsData(colorsFilePath);  // Pass the file path directly

        const subjectsFilePath = './datasets/subjects_used.csv';
        const subjectsData = await readCSV(subjectsFilePath);
        await insertSubjectMatterData(subjectsFilePath);  // Pass the file path directly

        console.log('ETL process completed successfully.');
    } catch (error) {
        console.error('ETL process failed:', error);
    }
}

etlProcess();
