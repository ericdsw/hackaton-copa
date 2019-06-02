const data = require('../data/flights.json');
const fs = require('fs');
const path = require('path');

// This method will return a valid Date corresponding to the data provided
function getFormattedDate(departureDate, stdTime) {
  const correctTime = stdTime.replace("a. m.", "AM").replace("p. m.", "PM");
  const fullDateString = `${departureDate} ${correctTime}`
  return Date.parse(fullDateString);
}

const result = data.map(dataRow => {

  return Object.assign({}, dataRow, {

    // Type conversion
    "TOTALNOSHOW": parseInt(dataRow["TOTALNOSHOW"]),
    "TotalAuthorized": parseInt(dataRow["TotalAuthorized"]),
    "TotalSeatSold": parseInt(dataRow["TotalSeatSold"]),
    "TotalSeatAvailable": parseInt(dataRow["TotalSeatAvailable"]),
    "DateMonth": parseInt(dataRow["DateMonth"]),
    "DateYear": parseInt(dataRow["DateYear"]),

    // Additional fields
    "departureDateTime": getFormattedDate(dataRow["DEPARTURE_DATE"], dataRow["STD_TIME"]),
    "originInHoliday": (dataRow["FESTIVOenORIGEN"] !== ""),
    "destinationInHoliday": (dataRow["FESTIVOenDESTINO"] !== "")

  });

});

const outputPath = path.resolve(process.cwd(), './data/flights.json');

fs.writeFileSync(outputPath, JSON.stringify(result));
