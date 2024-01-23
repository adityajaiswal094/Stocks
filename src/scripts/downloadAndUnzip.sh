#!/bin/bash

# Check if the user provided a date as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <date>"
    echo "Please provide the date in the format DDMMYY."
    exit 1
fi

# Get the date from the command-line argument
user_date=$1

# URL of the ZIP file
url="https://www.bseindia.com/download/BhavCopy/Equity/EQ${user_date}_CSV.ZIP"

# Create data dir
mkdir ../data

# Destination file path to save the ZIP file
destination="../data/EQ${user_date}_CSV.ZIP"
extraction="../data/"

# Download the file using curl
curl -o "$destination" "$url"

# Check if the download was successful
if [ $? -eq 0 ]; then
    echo "Download successful! ZIP file saved to $destination"

    # Unzip the downloaded file
    unzip -d "$extraction" "$destination"

    # Check if the unzip was successful
    if [ $? -eq 0 ]; then
        echo "Unzip successful! Contents extracted to ${extraction}"
    else
        echo "Unzip failed. Please check the ZIP file and try again."
    fi
else
    echo "Download failed. Please check the URL and try again."
fi
