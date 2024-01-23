#!/bin/bash

# Loop for the last 5 days
for ((i = 0; i < 5; i++)); do
  # Calculate the date i days ago
  day_i=$(date -d "$i days ago" "+%d%m%y")
  
  # Print the date
  # echo "Date $i days ago: $day_i"

  ./downloadAndLoad.sh "$day_i"
done
