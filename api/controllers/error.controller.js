import AppError from '../utils/appError.js';

export function NotFound(req, res, next) {
  const message = `Can't find ${req.originalUrl} on this server!`;
  return next(new AppError(message, 404));
}

export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    status: err.status,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}
