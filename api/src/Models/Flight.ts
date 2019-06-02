import { Schema, Model, Document } from 'mongoose';
import { getDatabase } from '../database';
import { boolean } from '@pact-foundation/pact/dsl/matchers';

const db = getDatabase();

export interface IFlight extends Document {

  DEPARTURE_DATE: string,
  FLIGHT_NUMBER: string,
  STD_TIME: string,
  ORIGIN: string,
  DESTINATION: string,
  TOTALNOSHOW: number,
  TotalAuthorized: string,
  TotalSeatSold: string,
  TotalSeatAvailable: string,
  DateMonth: number,
  DateYear: number,
  AirportORIGIN: string,
  CountryORIGIN: string,
  AirportDESTINATION: string,
  CountryDESTINATION: string,
  FESTIVOenORIGEN: string,
  FESTIVOenDestino: string,

  dayOfWeekNumber: number,
  dayNumber: number,
  hourNumber: number,
  originInHoliday: boolean,
  destinationInHoliday: boolean

  getOne(): void;
}

const FlightSchema : Schema = new Schema({

  DEPARTURE_DATE: String,
  FLIGHT_NUMBER: String,
  STD_TIME: String,
  ORIGIN: String,
  DESTINATION: String,
  TOTALNOSHOW: Number,
  TotalAuthorized: String,
  TotalSeatSold: String,
  TotalSeatAvailable: String,
  DateMonth: Number,
  DateYear: Number,
  AirportORIGIN: String,
  CountryORIGIN: String,
  AirportDESTINATION: String,
  CountryDESTINATION: String,
  FESTIVOenORIGEN: String,
  FESTIVOenDestino: String,

  dayOfWeekNumber: Number,
  dayNumber: Number,
  hourNumber: Number,
  originInHoliday: boolean,
  destinationInHoliday: boolean

});

FlightSchema.statics.getOne = () => {
  Flights.findOne()
    .then(flight => {
      console.log(flight);
    })
    .catch(err => {
      console.log(err);
    })
}

var Flights : Model<IFlight> = db.model<IFlight>("flights", FlightSchema);
export default Flights;
