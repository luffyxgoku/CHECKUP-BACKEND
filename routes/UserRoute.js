import express from "express";

import {
  getRegisterPage,
  registerUser,
} from "../controllers/RegisterpageController.js";
import {
  getSigninPage,
  signinUser,
} from "../controllers/SigninpageController.js";
import { getSignoutPage } from "../controllers/SignoutpageController.js";

const router = express.Router();

router.get("/register", getRegisterPage);

router.get("/signin", getSigninPage);

router.get("/signout", getSignoutPage);

router.post("/register", registerUser);

router.post("/signin", signinUser);

export default router;
