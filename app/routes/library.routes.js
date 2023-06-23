import { getAllContLib, getAllDelContLib, getByIdContLib, createContLib, updateContLib, removeContLib, restoreContLib } from "../controllers/library.controller.js";
import { Router } from "express";

const router = Router();

router.get("/library", getAllContLib);
router.get("/library/deleted", getAllDelContLib);
router.get("/library/:id", getByIdContLib);
router.post("/library", createContLib);
router.post("/library/:id/restore", restoreContLib);
router.put("/library/:id", updateContLib);
router.delete("/library/:id", removeContLib);

export default router;