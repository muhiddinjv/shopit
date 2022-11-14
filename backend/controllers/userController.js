import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const registerUserController = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  //<a href="https://www.freepik.com/free-vector/happy-people-avatars_7085154.htm#query=profile%20avatar&position=7&from_view=keyword">Image by pikisuperstar</a>

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

  res.status(201).send({
    success: true,
    message: "User registered successfully!",
    newUser,
  });
});

export const getUsersController = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).send({
    success: true,
    count: users.length,
    users,
  });
});

export const getUserController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res.status(200).send({
    success: true,
    user,
  });
});

export const updateUserController = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).send({
    success: true,
    user,
  });
});

export const deleteUserController = catchAsyncErrors(async (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  await user.deleteOne();

  res.status(200).send({
    success: true,
    message: "user was deleted",
  });
});