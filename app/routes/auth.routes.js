import { Router } from "express";
import { login, refreshToken, registerUserCont } from "../controllers/auth.controller.js";
import { checkDuplicateUsername, validateLogin } from "../middleware/verifyAuth.js";
import { login_user, refresh_token, register_user } from "../validations/user.validation.js";

const router = Router();

router.post("/register", [register_user, checkDuplicateUsername], registerUserCont);
router.post('/login', login_user, login);
router.post('/refresh', [refresh_token, validateLogin], refreshToken);

export default router;