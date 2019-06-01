const data = require('../data/flights.json');
const fs = require('fs');
const path = require('path');

const result = data.map(dataRow => {
  return Object.assign({}, dataRow, {
    "TOTALNOSHOW": parseInt(dataRow["TOTALNOSHOW"]),
    "TotalAuthorized": parseInt(dataRow["TotalAuthorized"]),
    "TotalSeatSold": parseInt(dataRow["TotalSeatSold"]),
    "TotalSeatAvailable": parseInt(dataRow["TotalSeatAvailable"]),
    "DateMonth": parseInt(dataRow["DateMonth"]),
    "DateYear": parseInt(dataRow["DateYear"])
  });
});

const outputPath = path.resolve(process.cwd(), './data/flights.json');

fs.writeFileSync(outputPath, JSON.stringify(result));
