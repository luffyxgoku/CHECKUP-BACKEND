import { validateToken } from "../services/Auth.js";

export function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenvalue = req.cookies[cookieName];

    if (!tokenvalue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenvalue);
      req.user = userPayload;
    } catch (error) {
      return next();
    }
  };
}
