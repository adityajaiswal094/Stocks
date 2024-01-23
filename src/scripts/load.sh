#!/bin/bash

# Check if a CSV file name is provided as an argument
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 <input_csv_file>"
    exit 1
fi

# Get the CSV file name from the command-line argument
inputCsvFile="$1"
user_date="$2"

# Convert to YYYY-MM-DD format
formatted_date=$(date -d "20${user_date:4:2}-${user_date:2:2}-${user_date:0:2}" "+%Y-%m-%d")

# Set the output CSV file path
outputCsvFile="../data/temp_$inputCsvFile"

# Execute the cut command to extract specific columns
cut -d ',' -f 1,2,5,6,7,8 "../data/$inputCsvFile" | awk -v OFS=',' -v formatted_date="$formatted_date" 'NR==1 {print $0, "DATE"} NR>1 {print $0, formatted_date}' > "$outputCsvFile"

# Set the PostgreSQL COPY command with the appropriate file path
pgCopyCommand="\COPY all_stocks(sc_code,sc_name,open,high,low,close,date) FROM '$outputCsvFile' WITH CSV HEADER"

# Execute the PostgreSQL COPY command
psql -h localhost -U postgres -d stocks -c "$pgCopyCommand"
