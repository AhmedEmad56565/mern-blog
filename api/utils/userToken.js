import jwt from 'jsonwebtoken';

export default function userToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
