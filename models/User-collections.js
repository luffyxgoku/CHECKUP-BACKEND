import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";

import { createToken } from "../services/Auth.js";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org)$/; // this is an email regular expression logic.
  return emailRegex.test(email); // checks whether the given email matches the regular expression logic of email or not and returns true or false based on the matching result.
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password); // ensures the password contains at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and is 8 characters long.
};

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validateEmail,
        message: (props) =>
          `${props.value} is not a valid email address. It must be in the format 'username@domain.com' or 'username@domain.org'.`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: validatePassword,
        message: () =>
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.salt = randomBytes(16).toString("hex");
  this.password = createHmac("sha256", this.salt)
    .update(this.password)
    .digest("hex");

  console.log(
    "Salt is generated as well as hashed password during registration"
  ); // Debugging log

  next();
});

userSchema.static("valPassAndGenToken", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    console.error("User not found!");
    throw new Error("User not found !");
  }

  const newlyhashedpassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  console.log("New hashed password is generated during signin"); // Debugging log

  if (user.password !== newlyhashedpassword) {
    console.error("Incorrect Password!");
    throw new Error("Incorrect Password !");
  }

  return createToken(user);
});

const User = mongoose.model("users", userSchema);

export default User;
