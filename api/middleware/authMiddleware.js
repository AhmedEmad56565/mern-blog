import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(userId);
      next();
    } catch (err) {
      return next(new AppError('Invalid token', 401));
    }
  } else {
    return next(new AppError('You are not logged in', 401));
  }
});
