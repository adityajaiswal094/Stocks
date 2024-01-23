#!/bin/bash

# Check if the user provided a date as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <date>"
    echo "Please provide the date in the format DDMMYY."
    exit 1
fi

# Get the date from the command-line argument
user_date=$1

./downloadAndUnzip.sh "$user_date"

./load.sh "EQ${user_date}.CSV" "$user_date"