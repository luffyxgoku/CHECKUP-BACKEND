import User from "../models/User-collections.js";

export const getRegisterPage = (req, res) => {
  return res.json("THIS IS REGISTER PAGE");
};

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const newUser = await User.create({
      fullname,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    return res.status(500).json({
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
};
