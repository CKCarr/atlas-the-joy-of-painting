// src/etl.js
import { insertEpisodeDatesData } from '../etl/insertEpisodeData.js';

import { insertColorsData } from '../etl/insertColorData.js';

import { insertSubjectMatterData } from '../etl/insertSubjectData.js';

// etl function for inserting data
async function etlProcess() {
    try {
        const episodesFilePath = './datasets/episode_dates.csv';
        await insertEpisodeDatesData(episodesFilePath);  // Correct use of file path

        const subjectsFilePath = './datasets/subject_matter.csv';
        await insertSubjectMatterData(subjectsFilePath);  // Make sure file name matches exactly

        const colorsFilePath = './datasets/colors_processed.csv';
        await insertColorsData(colorsFilePath);  // Correct use of file path

        console.log('ETL process completed successfully.');
    } catch (error) {
        console.error('ETL process failed:', error);
    }
}

etlProcess();
