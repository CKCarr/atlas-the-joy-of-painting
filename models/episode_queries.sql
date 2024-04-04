-- Extract month from broadcast date in the episodes table
SELECT EXTRACT(MONTH FROM broadcast_date) AS month, * FROM episodes;

-- Fetch all episodes:
SELECT * FROM episodes;

-- Fetch episode by month of original broadcast:
-- The $1 represents a parameter that would be passed into the query at runtime.
SELECT * FROM episodes WHERE EXTRACT(MONTH FROM date) = $1;
