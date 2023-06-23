import { Router } from "express";
import { getAllUsersCont } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsersCont);

export default router;