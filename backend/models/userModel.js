import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email adress"],
  },
  password: {
    type: String,
    minlength: [6, "Your password must be longer than 6 characters"],
    required: [true, "Please enter product description"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// encrypting password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //10 (higher=stronger) recommended for sort value = hash.length
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
