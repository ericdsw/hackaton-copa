const data = require('../data/flights.json');
const fs = require('fs');
const path = require('path');

// This method will return a valid Date corresponding to the data provided
function getFormattedDate(fullDateString) {
  return Date.parse(fullDateString);
}

function getDayNumber(fullDateString) {
  return new Date(fullDateString).getDate();
}

function getHourNumber(fullDateString) {
  return new Date(fullDateString).getUTCHours();
}

const result = data.map(dataRow => {

  const departureDate = dataRow['DEPARTURE_DATE'];
  const stdTime = dataRow['STD_TIME'];
  const correctTime = stdTime.replace("a. m.", "AM").replace("p. m.", "PM");
  const fullDateString = `${departureDate} ${correctTime}`
  const usedDate = new Date(fullDateString);

  return Object.assign({}, dataRow, {

    // Type conversion
    "TOTALNOSHOW": parseInt(dataRow["TOTALNOSHOW"]),
    "DateMonth": parseInt(dataRow["DateMonth"]),
    "DateYear": parseInt(dataRow["DateYear"]),

    // Additional fields
    "hourNumber": usedDate.getUTCHours(),
    "dayNumber": usedDate.getDate(),
    "dayOfWeekNumber": usedDate.getDay(),

  });

});

const outputPath = path.resolve(process.cwd(), './data/flights.json');

fs.writeFileSync(outputPath, JSON.stringify(result));
