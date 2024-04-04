// utils/loadQuery.js

import fs from 'fs';
import path from 'path';
// Function to read an SQL file and return its contents

export function loadQueryFile(filename, directory = 'models') {
    const filepath = path.join(process.cwd(), directory, filename);
    return fs.readFileSync(filepath, 'utf-8');
}
