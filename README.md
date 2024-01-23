# Stockify

## About this Application

Express.js backend application that retrieves the BSE India Bhav Copy and employs various APIs to deliver diverse results.

## Setting Up

1. Download and install postgresql (v13.11) and pgAdmin4 (v7.4) in your system.
2. Download and install Git in your system.
3. Open your psql terminal and create a DB in your postgres engine named **stocks**. Use postgres as your user.
4. Clone this repo in your system and open in your IDE (eg: VSCode).
5. Run `npm install` in your root directory to install all the necessary dependencies.

## Getting Started

1. Run the following command in root directory to run the migration which will create the necessary tables:

   - `npx knex migrate:latest --env development`

2. Open bash terminal and change directory to `./src/scripts/`.
3. Run the following scripts in sequence in your bash terminal to perform the corresponding actions:

   - `./downloadAndUnzip.sh DDMMYY`: Downloads and unzips Bhav Copy for the specified date. For example: `./downloadAndUnzip.sh 22012024`. Any invalid date will download the latest Bhav Copy present on the BSE India website.

   - `./load.sh /path/to/file_name.csv`: Processes the csv file and copies all the necessary data into the table **all_stocks**. For example: `./load.sh ../data/EQ220124.CSV`.

4. Now, in your root directory, run the command `npm run dev` to start the server.
5. Finally, use Postman to test the APIs.

## APIs

Base Url: `http://localhost:8080`.

1. `GET` route to get the top 10 stocks.

   - Endpoint: `/top-stocks`.
   - Example: `http://localhost:8080/top-stocks`.

2. `GET` route to find stocks by name.

   - Endpoint: `/stocks`.
   - Example: `http://localhost:8080/stocks?name=A.SARABHAI` or `http://localhost:8080/stocks?name=ARE%26M`. Here **%26** denotes '&'.

3. `GET` route to get stock price history list for UI graph.

   - Endpoint: ``.
   - Example: ``.

4. `POST` route to add a stock to favourites.

   - Endpoint: `/stocks/favourite/:id`.
   - Example: `http://localhost:8080/stocks/favourite/1000`.

5. `GET` route to see favourite stocks.

   - Endpoint: `/stocks/favourites`.
   - Example: `http://localhost:8080/stocks/favourites`.

6. `DELETE` route to remove a stock from favourites.
   - Endpoint: `/stocks/favourite/:id`.
   - Example: `http://localhost:8080/stocks/favourite/1000`.
