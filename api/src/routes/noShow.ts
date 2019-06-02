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

  const filterObject = {
    'ORIGIN': origin,
    'DESTINATION': destination
    // 'departureDateTime': { $gt: lowerDate, $lt: upperDate }
  }

  const secondFilterObject = {
    'ORIGIN': origin,
    'DateMonth': usedDate.getMonth() + 1,
    'DEPARTURE_DATE': new RegExp(`^\d{1,2}\/${usedDate.getDate()}\/\d{4}$`)
  }

  applyAggregate(filterObject)
    .then(data => data as FilterResponse)
    .then(data => res.json({ noData: Object.assign(data, {
      trueValue: (data.mean + data.median) / 2
    }) }))
    .catch(err => console.log(err))

});

interface FilterObject {
  ORIGIN? : string,
  DESTINATION? : string,
  departureDateTime? : number
}

interface FilterResponse {
  mean: number,
  median: number,
  length: number
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
        median = sortedArray[flights.length / 2].TOTALNOSHOW + sortedArray[flights.length / 2 + 1].TOTALNOSHOW;
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
    });
  // return Flights.aggregate([
  //   { "$match": filterObject },
  //   { 
  //     "$group": { 
  //       _id: null, 
  //       averageNoShow: { "$avg": "$TOTALNOSHOW" },
  //       total: { "$sum": 1 }
  //     }
  //   }
  // ])
}

export default router;
