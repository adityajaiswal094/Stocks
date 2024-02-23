# Stockify

## About this Application

Express.js backend application that retrieves the BSE India Bhav Copy and employs various APIs to deliver diverse results.

## Setting Up

1. Download and install PostgreSQL (v13.11) and pgAdmin4 (v7.2) in your system.
2. Download and install Redis. <!-- Not Required! -->
3. Download and install Git in your system.
4. Open your psql terminal and create a DB in your postgres engine named **stocks**. Use postgres as your user.

   - `psql -U postgres -d postgres`

   - `CREATE DATABASE stocks;`

   - `\c stocks`

   After this you will be connected to the `stocks` DB.

5. Clone this repo in your system and open in your IDE (eg: VSCode).
6. Run `npm install` in your root directory to install all the necessary dependencies.

## Getting Started

1. Run the following command in root directory to run the schema migration:

   - `npx knex migrate:latest --env development`

2. Open bash terminal and change directory to `./src/scripts/`.
3. Run the following scripts in your bash terminal to perform the corresponding actions:

   - `./downloadAndLoad.sh DDMMYY`: Downloads, unzips and loads the data in DB of the Bhav Copy for the specified date.

     For example: `./downloadAndLoad.sh 220124`.

   - `./lastFiftyDays.sh` (optional): Downloads, unzips and loads the data of the Bhav Copies for the last 50 days in the DB.

     **Note**: Running this more than once will result in numerous duplicate data.

4. Now, in your root directory, run the command `npm run dev` to start the server.
5. Finally, use Postman to test the APIs.

## Data Fetching Strategy

First the API looks for data in the cache. When there will be a cache miss, it will fetch data from the DB.

## APIs

Base Url: `http://localhost:8080`.

1. `GET` route to get the top 10 stocks for a particular date.

   - Endpoint: `/top-stocks/YYYY-MM-DD`.
   - Example: `http://localhost:8080/top-stocks/2024-01-01`.

2. `GET` route to find stocks by name.

   - Endpoint: `/stocks`.
   - Example: `http://localhost:8080/stocks?name=A.SARABHAI` or `http://localhost:8080/stocks?name=ARE%26M`. Here **%26** denotes '&'.

     Will return an array objects for the provided name for all the dates present in DB.

3. `GET` route to get stock price history list for UI graph. Takes json object as body with keys name (array of stock names), from (date YYYY-MM-DD) and to (date YYYY-MM-DD) (from <= to). If the date range **from** and **to** are not provided, it will return the price history for the given stocks for the last 10 days.

   - Endpoint: `/stocks/history`.
   - Example: `http://localhost:8080/stocks/history`.

     JSON object in body: {
     "name": ["A.SARABHAI", "NUVOCO", "ARE&M", "BOM DYEING"],
     "from": "2024-01-19",
     "to": "2024-01-19"
     }. This will return result for the given date range.

     JSON object in body: {
     "name": ["A.SARABHAI", "NUVOCO", "ARE&M", "BOM DYEING"],
     }. This will return result for the last 10 days.

4. `POST` route to add a stock to favourites.

   - Endpoint: `/stocks/favourite/:sc_code`.
   - Example: `http://localhost:8080/stocks/favourite/543334`.

5. `GET` route to see favourite stocks.

   - Endpoint: `/stocks/favourites`.
   - Example: `http://localhost:8080/stocks/favourites`.

6. `DELETE` route to remove a stock from favourites.
   - Endpoint: `/stocks/favourite/:sc_code`.
   - Example: `http://localhost:8080/stocks/favourite/543334`.

## Scripts

1. `./lastFiftyDays.sh`: Will download, unzip, process and load the data of the Bhav Copies for the last 50 days (if available). Will fail for those dates for which data are not present on the BSE India website.
   Example: Just run the script as it is.

2. `./downloadAndLoad.sh`: download, unzip, process and load the data of the Bhav Copy for the specified date (if available). Will fail for those dates for which data are not present on the BSE India website.
   Example: `./downloadAndLoad.sh 200124` (Write the date in the format DDMMYY).

## Migration commands

1. `npx knex migrate:latest --env development`: To update the schema to the latest schema.

2. `npx knex migrate:make <XXX_feature_name>`: To create a new migration schema file.
   Convention followed: XXX should increase serially after the last file present in migrations directory.

3. `npx knex migrate:rollback`: To rollback(undo) the current schema.

## Sample Curls

1. curl --location '<http://localhost:8080/top-stocks/2024-01-18>'

2. curl --location '<http://localhost:8080/stocks?name=a.sarabhai>'

3. curl --location --request GET '<http://localhost:8080/stocks/history>' \
    --header 'Content-Type: application/json' \
    --data '{
   "name": ["A.SARABHAI", "NUVOCO", "ARE&M", "BOM DYEING"],
   "from": "2024-01-19",
   "to": "2024-01-23"
   }'

   curl --location --request GET '<http://localhost:8080/stocks/history>' \
   --header 'Content-Type: application/json' \
   --data '{
   "name": ["A.SARABHAI", "NUVOCO", "ARE&M", "BOM DYEING"]
   }'

4. curl --location --request POST '<http://localhost:8080/stocks/favourite/543334>'

5. curl --location '<http://localhost:8080/stocks/favourites>'

6. curl --location --request DELETE '<http://localhost:8080/stocks/favourite/543334>'
