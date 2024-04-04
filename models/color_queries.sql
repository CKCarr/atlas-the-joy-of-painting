-- Fetch all colors:
SELECT * FROM colors;

-- Fetch color by name:
-- The $1 represents a parameter that would be passed into the query at runtime.
SELECT * FROM colors WHERE color_name = $1;
