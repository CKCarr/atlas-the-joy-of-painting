// utils/extractMonth.js

// Function to extract the month from a date string

export function extractMonth(dateString) {
    const date = new Date(dateString);
    return date.getMonth() + 1;
    // getMonth() returns 0-11, so add 1 to get 1-12
}
