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
  TotalAuthorized: number,
  TotalSeatSold: number,
  TotalSeatAvailable: number,
  DateMonth: number,
  DateYear: number,
  AirportORIGIN: string,
  CountryORIGIN: string,
  AirportDESTINATION: string,
  CountryDESTINATION: string,
  FESTIVOenORIGEN: string,
  FESTIVOenDestino: string,
  
  departureDateTime: Date,
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
  TotalAuthorized: Number,
  TotalSeatSold: Number,
  TotalSeatAvailable: Number,
  DateMonth: Number,
  DateYear: Number,
  AirportORIGIN: String,
  CountryORIGIN: String,
  AirportDESTINATION: String,
  CountryDESTINATION: String,
  FESTIVOenORIGEN: String,
  FESTIVOenDestino: String,

  departureDateTime: Date,
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
