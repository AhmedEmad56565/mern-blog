export default function userResponse(res, user, statuscode = 200) {
  return res.status(statuscode).json({
    _id: user._id,
    userName: user.userName,
    email: user.email,
  });
}
