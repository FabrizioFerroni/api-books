import { getAllContLib, getAllDelContLib, getByIdContLib, createContLib, updateContLib, removeContLib, restoreContLib } from "../controllers/library.controller.js";
import { Router } from "express";
import { validateLogin } from "../middleware/verifyAuth.js";

const router = Router();

router.get("/library", getAllContLib);
router.get("/library/deleted", getAllDelContLib);
router.get("/library/:id", getByIdContLib);

// Ruta que necesitan validaciones
router.post("/library", validateLogin, createContLib);
router.post("/library/:id/restore", validateLogin, restoreContLib);
router.put("/library/:id", validateLogin, updateContLib);
router.delete("/library/:id", validateLogin, removeContLib);

export default router;