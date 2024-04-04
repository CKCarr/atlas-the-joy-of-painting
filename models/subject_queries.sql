-- Fetch all subjects:
SELECT * FROM subjects;

-- Fetch episode by subject:
-- The $1 represents a parameter that would be passed into the query at runtime.
SELECT e.* FROM episodes e
JOIN episode_subjects es ON e.episode_id = es.episode_id
JOIN subjects s ON es.subject_id = s.subject_id
WHERE s.subject_name = $1;
