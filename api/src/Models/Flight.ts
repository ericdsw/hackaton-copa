import { Schema, Model, Document } from 'mongoose';
import { getDatabase } from '../database';

const db = getDatabase();

export interface IFlight extends Document {

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
  FESTIVOenDestino: String

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
  FESTIVOenDestino: String
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
