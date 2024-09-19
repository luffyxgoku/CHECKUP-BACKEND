import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./connection/dbconnection.js";

dotenv.config();

import homepageRoutes from "./routes/HomepageRoute.js";
import userRoutes from "./routes/UserRoute.js";
import { checkAuthCookie } from "./middlewares/Auth.js";
// import testimonialpageRoute from "./routes/TestimonialpageRoute";
// import loginuserRoute from "./routes/LoginRoute";
// import logoutuserRoute from "./routes/LogoutRoute";

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthCookie("token"));

app.use("/api/home", homepageRoutes);
app.use("/api/user", userRoutes);

// app.get("/", homepageRoute);
// app.get("/testimonial", testimonialpageRoute);
// app.get("/register", createuserRoute);
// app.get("/signin", loginuserRoute);
// app.get("/signout", logoutuserRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
