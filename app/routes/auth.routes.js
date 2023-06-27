import { Router } from "express";
import { login, refreshToken, registerUserCont } from "../controllers/auth.controller.js";
import { validateLogin } from "../middleware/verifyAuth.js";

const router = Router();

router.post("/register", registerUserCont);
router.post('/login', login);
router.post('/refresh', validateLogin, refreshToken);

export default router;