import { getAllCont, getAllDelCont, getByIdCont, createCont, updateCont, removeCont, restoreCont } from "../controllers/book.controller.js";
import { Router } from "express";
import { validateLogin } from "../middleware/verifyAuth.js";
import { validateBook } from "../validations/book.validation.js";
import { checkDuplicateISBN } from "../middleware/verifyISBN.js";

const router = Router();

router.get("/book", getAllCont);
router.get("/book/deleted", getAllDelCont);
router.get("/book/:id", getByIdCont);

// Rutas que necesitan validaciones
router.post("/book", [validateBook, checkDuplicateISBN, validateLogin], createCont);
router.post("/book/:id/restore", validateLogin, restoreCont);
router.put("/book/:id", [validateBook, checkDuplicateISBN, validateLogin], updateCont);
router.delete("/book/:id", validateLogin, removeCont);

export default router;