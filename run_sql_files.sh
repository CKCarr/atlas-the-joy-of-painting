#!/bin/bash

# Load environment variables from the .env file
set -o allexport
source env/.env.app
set +o allexport

# Function to run SQL files
run_sql_file() {
    local file_path=$1
    echo "Executing SQL file: $file_path"
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p 5432 -f $file_path
    if [ $? -eq 0 ]; then
        echo "SQL file executed successfully: $file_path"
    else
        echo "Error executing SQL file: $file_path"
        exit 1  # Exit the script if an error occurs
    fi
}

# Run jop_schema.sql to create tables
run_sql_file "database/jop_schema.sql"

echo "Tables created successfully."


psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "COPY episodes FROM '/datasets/episode_dates.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "COPY colors FROM '/datasets/colors_used.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "COPY subjects FROM '/datasets/subject_matter.csv' DELIMITER ',' CSV HEADER;"


# Run each SQL file in the specified order
run_sql_file "database/jop_schema.sql"
run_sql_file "database/episode_dates_table.sql"
run_sql_file "database/colors_used_table.sql"
run_sql_file "database/subject_matter_table.sql"

echo "All SQL files executed successfully."
