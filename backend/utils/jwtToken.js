// create and send token & save it in the cookie
const sendToken = (user, statusCode, res) => {
  // create jwt token
  const userToken = user.getJwtToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", userToken, options).send({
    success: true,
    userToken,
    user,
  });
};

export default sendToken;
