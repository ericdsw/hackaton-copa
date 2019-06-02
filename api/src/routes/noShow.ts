import { Router } from 'express';
import Flights from '../Models/Flight';

const router = Router();

router.get('/', async (req, res, next) => {
  const { 
    origin,
    destination,
    date
  } = req.query;

  const usedDate = new Date(date);

  const lowerDate = new Date(usedDate.getTime() - (3 * 3600 * 1000));
  const upperDate = new Date(usedDate.getTime() + (3 * 3600 * 1000));

  const filterObject = {
    'ORIGIN': origin,
    'DESTINATION': destination
  }

  const secondFilterObject = {
    'ORIGIN': origin,
    'DateMonth': usedDate.getMonth() + 1,
    'dayNumber': usedDate.getDate()
  }

  const thirdFilterObject = {
    'ORIGIN': origin,
    'hourNumber': { $gt: lowerDate.getHours(), $lt: upperDate.getHours() }
  }

  const fourthFilterObject = {
    'ORIGIN': origin,
    'DateMonth': usedDate.getMonth() + 1,
    'dayOfWeekNumber': usedDate.getDay()
  }

  let firstData : FilterResponse;
  let secondData : FilterResponse;
  let thirdData : FilterResponse;
  let fourthData : FilterResponse;

  applyAggregate(filterObject)
    .then(data => data as FilterResponse)
    .then(firstReturnData => {

      firstData = Object.assign(firstReturnData, {
        finalValue: (firstReturnData.median + firstReturnData.mean) / 2
      });

      // applyAggregate(secondFilterObject)
      //   .then(data => data as FilterResponse)
      //   .then(secondReturnData => {

          // secondData = Object.assign(secondReturnData, {
          //   finalValue: (secondReturnData.median + secondReturnData.mean) / 2
          // });

          applyAggregate(thirdFilterObject)
            .then(data => data as FilterResponse)
            .then(thirdReturnData => {

              thirdData = Object.assign(thirdReturnData, {
                finalValue: (thirdReturnData.median + thirdReturnData.mean) / 2
              });

              applyAggregate(fourthFilterObject)
                .then(data => data as FilterResponse)
                .then(fourthReturnData => {

                  fourthData = Object.assign(fourthReturnData, {
                    finalValue: (fourthReturnData.median + fourthReturnData.mean) / 2
                  });

                  const noShow = Math.ceil((
                    firstData.finalValue + thirdData.finalValue + fourthData.finalValue
                  ) / 3);

                  const records = firstData.length + thirdData.length + fourthData.length;

                  res.json({
                    noShow: {
                      wontShow: noShow,
                      confidence: 0,
                      records: records,
                    },
                    auxData: {
                      originDestination: firstData,
                      originHour: thirdData,
                      originWeekDay: fourthData
                    },
                  });

                })

              

            })

        // })

    })
    .catch(err => console.log(err))

});

interface FilterObject {
  ORIGIN? : string,
  DESTINATION? : string,
  hourNumber? : {
    $gt: number,
    $lt: number
  },
  DateMonth?: number,
  DEPARTURE_DATE?: RegExp,
  dayOfWeekNumber?: number
}

interface FilterResponse {
  mean: number,
  median: number,
  length: number,
  finalValue: number,
}

function applyAggregate(filterObject: FilterObject) {

  return Flights.find(filterObject)
    .then(flights => {

      if (!flights || flights.length <= 0) {
        return {
          mean: 0,
          median: 0,
          length: 0
        }
      }

      const mean = flights.reduce((accum, flight) => accum + flight.TOTALNOSHOW, 0) / flights.length;
      let median = 0;
      const sortedArray = flights.sort((flightA, flightB) => {
        return flightA.TOTALNOSHOW - flightB.TOTALNOSHOW
      });

      if (flights.length % 2 == 0) {
        median = sortedArray[flights.length / 2].TOTALNOSHOW + sortedArray[flights.length / 2 - 1].TOTALNOSHOW;
      } else {
        median = sortedArray[Math.ceil(flights.length / 2.0)].TOTALNOSHOW;
      }

      return {
        mean,
        median,
        length: flights.length
      }
    })
    .catch(err => {
      console.log(err);
      return {
        mean: 0,
        median: 0,
        length: 0
      }
    });
}

export default router;
