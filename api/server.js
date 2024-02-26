import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectToDB from './config/db.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes import
import userRoutes from './routes/user.route.js';

// Error Routes
import { NotFound, errorHandler } from './controllers/error.controller.js';

// Routes
app.use('/api/v1/user', userRoutes);

//Error Handler
app.all('*', NotFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectToDB();
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
