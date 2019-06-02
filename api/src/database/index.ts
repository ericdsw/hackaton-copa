import mongoose, { Connection } from 'mongoose';

import config from '../config';

mongoose.Promise = global.Promise;

let db : Connection;

export const getDatabase = () => {
  if (!db) {
    db = mongoose.createConnection(config.MONGO_URL);
    db.on('error', console.error.bind(console, 'db connection error: '));
    db.once('open', () => console.log('connected to the database'));
  }
    return db;
}
