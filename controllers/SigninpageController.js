import User from "../models/User-collections.js";

export const getSigninPage = (req, res) => {
  return res.json("THIS IS SIGNIN PAGE");
};

export const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.valPassAndGenToken(email, password);
    console.log("Signin successful"); // Debugging log
    return res.cookie("token", token).json({ message: "Signin successful" });
  } catch (error) {
    console.error("Signin error:", error.message); // Debugging log
    return res.status(401).json({ error: "Incorrect Email or Password" });
  }
};
