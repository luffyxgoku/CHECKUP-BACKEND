import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = JWT.sign(payload, JWT_KEY);
  return token;
}

export function validateToken(token) {
  const payload = JWT.verify(token, JWT_KEY);
  return payload;
}
