import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const addOrderController = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kccvibpsuimwfepb3m",
      url: "https://res.cloudinary.com/bookit/image/upload/v1606305757/avatars/kccvibpsuimwfepb3m.png",
    },
  });

  await newUser.save();

  sendToken(newUser, 200, res);
});
