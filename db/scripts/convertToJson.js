const path = require('path');
const csvToJson = require('convert-csv-to-json');

const inputPath = path.resolve(process.cwd(), './data/flights.csv');
const outputPath = path.resolve(process.cwd(), './data/flights.json');

csvToJson.fieldDelimiter("\t")
  .generateJsonFileFromCsv(inputPath, outputPath);
