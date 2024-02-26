import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import userResponse from '../utils/userResponse.js';
import userToken from '../utils/userToken.js';
import AppError from '../utils/appError.js';

export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  const userexist =
    (await User.findOne({ email })) || (await User.findOne({ userName }));

  if (userexist) {
    return next(new AppError('User already exists', 400));
  }

  const user = await User.create({
    userName,
    email,
    password,
  });

  if (user) {
    userToken(res, user._id);
    userResponse(res, user, 201);
  } else {
    next(new AppError('Invalid user data', 400));
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  userToken(res, user._id);
  userResponse(res, user);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).json({
    message: 'Logged out successfully',
  });
});
