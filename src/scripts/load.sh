#!/bin/bash

# Check if a CSV file name is provided as an argument
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 <input_csv_file>"
    exit 1
fi

# Get the CSV file name from the command-line argument
inputCsvFile="$1"

# Set the output CSV file path
outputCsvFile="../data/data.csv"

# Execute the cut command to extract specific columns
cut -d ',' -f 1,2,5,6,7,8 "../data/$inputCsvFile" > "$outputCsvFile"

# Set the PostgreSQL COPY command with the appropriate file path
pgCopyCommand="\COPY all_stocks(sc_code,sc_name,open,high,low,close) FROM '$outputCsvFile' WITH CSV HEADER"

# Execute the PostgreSQL COPY command
psql -h localhost -U postgres -d stocks -c "$pgCopyCommand"
