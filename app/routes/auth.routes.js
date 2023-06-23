import { Router } from "express";
import { registerUserCont } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUserCont);

export default router;