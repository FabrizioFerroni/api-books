import { getAllCont, getAllDelCont, getByIdCont, createCont, updateCont, removeCont, restoreCont } from "../controllers/book.controller.js";
import { Router } from "express";
import { validateLogin } from "../middleware/verifyAuth.js";

const router = Router();

router.get("/book", getAllCont);
router.get("/book/deleted", getAllDelCont);
router.get("/book/:id", getByIdCont);

// Rutas que necesitan validaciones
router.post("/book", validateLogin, createCont);
router.post("/book/:id/restore", validateLogin, restoreCont);
router.put("/book/:id", validateLogin, updateCont);
router.delete("/book/:id", validateLogin, removeCont);

export default router;