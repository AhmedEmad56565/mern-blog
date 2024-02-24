import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './config/db.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 3000;
connectToDB();
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
