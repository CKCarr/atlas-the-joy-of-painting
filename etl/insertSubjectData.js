// etl/insertSubjectMatterData
import fs from 'fs';
import pool from '../src/db.js';

export const insertSubjectMatterData = async (inputFilePath) => {
    const inputData = fs.readFileSync(inputFilePath, 'utf8');
    const lines = inputData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    for (let i = 1; i < lines.length; i++) {
        const rowData = lines[i].split(',').map(item => item.trim());
        const data = {};
        headers.forEach((header, index) => {
            data[header] = rowData[index];
        });

        // Insert data into PostgreSQL table for subject_matter
        await pool.query(`
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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
                $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
                $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45,
                $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60,
                $61, $62, $63, $64, $65, $66, $67, $68)
        `, Object.values(data));
    }
};
