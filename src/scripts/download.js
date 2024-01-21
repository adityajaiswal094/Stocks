const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipelineAsync = promisify(pipeline);

async function downloadZipFile(url, destinationPath) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    await pipelineAsync(response.data, fs.createWriteStream(destinationPath));

    console.log(`Downloaded: ${destinationPath}`);
  } catch (error) {
    console.error('Error downloading file:', error.message);
  }
}

// Replace 'your_zip_url' with the actual URL of the zip file
const zipUrl = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ190124_CSV.ZIP';
const filename = path.basename(zipUrl);

// Replace 'downloaded_file.zip' with the desired destination file path
const destinationPath = path.join(__dirname, filename);

downloadZipFile(zipUrl, destinationPath);
