import mongoose, { Connection } from 'mongoose';
mongoose.Promise = global.Promise;

let db : Connection;

export const getDatabase = () => {
  if (!db) {
    db = mongoose.createConnection('mongodb://localhost:27017/hc');
    db.on('error', console.error.bind(console, 'db connection error: '));
    db.once('open', () => console.log('connected to the database'));
  }
    return db;
}
