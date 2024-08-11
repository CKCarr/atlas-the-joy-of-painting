// utils/standardizeTitle.js

// Function to standardize episode titles

export function standardizeTitle(title) {
    return title
        .trim()
        .toUpperCase()
        .replace(/["“”']/g, '');
}
