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

  const token = newUser.getJwtToken();

  await newUser.save();

  res.status(201).send({
    success: true,
    message: "User registered successfully!",
    token,
  });
});

export const loginUserController = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if the email & password is entered by the user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password"));
  }

  //find the user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }

  //check if the password is correct
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }

  const userToken = user.getJwtToken();

  res.status(200).send({
    success: true,
    message: "User logged in successfully!",
    userToken,
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
  let user = User.findById(req.params.id);

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
