import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

export const registerUserController = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  //<a href="https://www.freepik.com/free-vector/happy-people-avatars_7085154.htm#query=profile%20avatar&position=7&from_view=keyword">Image by pikisuperstar</a>

  const newUser = new User({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  await newUser.save();

  sendToken(newUser, 200, res);
  // const token = newUser.getJwtToken();
  // res.status(201).send({
  //   success: true,
  //   message: "User registered successfully!",
  //   token,
  // });
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

  sendToken(user, 200, res);
});

export const forgotPasswordController = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("Not found user with this email", 404));
    }

    // get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/resetpass/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "ShopIT Password Recovery",
        message,
      });

      res.status(200).send({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const resetPasswordController = catchAsyncErrors(
  async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler("reset password token is invalid or has expired", 400)
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }

    // setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  }
);

export const updatePasswordController = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    //check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
      return next(new ErrorHandler("Old password in incorrect", 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
  }
);

export const logoutUserController = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({
    success: true,
    message: "Logged out",
  });
});

export const getCurrUserController = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    res.status(200).send({
      success: true,
      user,
    });
  }
);

export const updateProfileController = catchAsyncErrors(
  async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    //TOOD: update avatar
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).send({
      success: true,
      user,
    });
  }
);

export const getUsersController = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).send({
    success: true,
    count: users.length,
    users,
  });
});

export const getUserDetailsController = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User with id ${req.params.id} not found`, 404)
      );
    }

    res.status(200).send({
      success: true,
      user,
    });
  }
);

export const updateUserController = catchAsyncErrors(async (req, res, next) => {
  const { name, email, role } = req.body;

  const newUserData = {
    name: name,
    email: email,
    role: role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
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
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User with id ${req.params.id} not found`, 404)
    );
  }

  //TODO: remove avatar from cloudinary

  await user.remove();

  res.status(200).send({
    success: true,
    message: "user was deleted",
    user,
  });
});
