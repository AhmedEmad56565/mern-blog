import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './config/db.js';
import morgan from 'morgan';

// Routes import
import userRoutes from './routes/user.route.js';

// Error Routes
import { NotFound, errorHandler } from './controllers/error.controller.js';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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
