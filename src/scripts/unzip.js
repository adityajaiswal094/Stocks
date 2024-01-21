const axios = require("axios");
const yauzl = require("yauzl-promise");
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");
const csv = require("csv-parser");
const pool = require("../db/config");
const readline = require("readline");

const batchSize = 500;
let batchCount = 0;
let currentBatch = [];

async function downloadFile(url, destPath) {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  const writeStream = fs.createWriteStream(destPath);
  response.data.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

function unzipFile(zipFilePath, extractTo) {
  // Check if the zip file exists
  if (!fs.existsSync(zipFilePath)) {
    console.error(`Zip file not found: ${zipFilePath}`);
    return;
  }

  // Create an instance of AdmZip
  const zip = new AdmZip(zipFilePath);

  try {
    // Extract the contents of the zip file to the specified directory
    zip.extractAllTo(extractTo, /*overwrite*/ true);
    console.log(`Successfully extracted files to: ${extractTo}`);
  } catch (error) {
    console.error("Error extracting zip file:", error);
  }
}

async function insertData(pool, data) {
  const query =
    "INSERT INTO stocks(sc_code, sc_name, open, high, low, close) VALUES($1, $2, $3, $4, $5, $6)";
  try {
    await pool.query(query, data);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
}

// Function to read CSV file and insert data
async function processData(csvFilePath) {
  await pool.connect();
  console.log(csvFilePath);
  try {
    const stream = fs.createReadStream(csvFilePath);
    const rl = stream.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    let count = 0;

    rl.on("data", async (row) => {
      // Assuming the CSV columns are named column1, column2, ...
      const data = [
        row["SC_CODE"],
        row["SC_NAME"].trim(),
        row["OPEN"],
        row["HIGH"],
        row["LOW"],
        row["CLOSE"],
      ];

      // Insert data into PostgreSQL
      await insertData(pool, data);
    });

    rl.on("end", async () => {
      // Close the PostgreSQL connection after processing the entire CSV file
      // console.log("Done processing done!");
      await pool.end();
    });
  } catch (error) {
    console.error("Error processing CSV file:", error.message);
    await pool.end();
  }
}

async function main() {
  const url =
    "https://www.bseindia.com/download/BhavCopy/Equity/EQ190124_CSV.ZIP"; // Replace with the actual URL
  const filename = path.basename(url);
  const destinationPath = path.join(__dirname, `../data/${filename}`);
  const extractionPath = path.join(__dirname, `../data`);

  try {
    console.log("Downloading file...");
    await downloadFile(url, destinationPath);
    console.log("Download completed.");

    console.log("Unzipping file...");
    unzipFile(destinationPath, extractionPath);
    const csvFilePath = destinationPath.replace(/\_CSV.ZIP$/i, ".CSV");

    await processData(csvFilePath);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the main function
main();
