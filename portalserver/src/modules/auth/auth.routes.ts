import { Router } from "express";
import { login, logout, signup } from "./auth.controller";
import { validationHandler } from "../../shared/middleware/validationHandler";
import { loginValidator, signupValidator } from "./auth.validator";

const router = Router();

router.post("/login", validationHandler(loginValidator), login);
router.post("/signup", validationHandler(signupValidator), signup);
router.post("/logout", logout);

export default router;
