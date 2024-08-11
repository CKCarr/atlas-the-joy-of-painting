#!/bin/bash

# Load environment variables from the .env file
set -o allexport
source env/.env.app
set +o allexport

# Wait for the PostgreSQL database to be ready
until psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

# Function to run SQL files
run_sql_file() {
    local file_path=$1
    echo "Executing SQL file: $file_path"
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -f $file_path
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

# Check and import data from CSV files

if [ -f "./datasets/episode_dates.csv" ]; then
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "\copy episodes FROM './datasets/episode_dates.csv' WITH CSV HEADER;"
else
    echo "episodes CSV file not found!"
    exit 1
fi

if [ -f "./datasets/subject_matter.csv" ]; then
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "\copy subjects FROM './datasets/subject_matter.csv' WITH CSV HEADER;"
else
    echo "subjects CSV file not found!"
    exit 1
fi

if [ -f "./datasets/colors_processed.csv" ]; then
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "\copy colors FROM './datasets/colors_processed.csv' WITH CSV HEADER;"
else
    echo "colors CSV file not found!"
    exit 1
fi

echo "All SQL files executed successfully."
