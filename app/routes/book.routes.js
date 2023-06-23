import { getAllCont, getAllDelCont, getByIdCont, createCont, updateCont, removeCont, restoreCont } from "../controllers/book.controller.js";
import { Router } from "express";

const router = Router();

router.get("/book", getAllCont);
router.get("/book/deleted", getAllDelCont);
router.get("/book/:id", getByIdCont);
router.post("/book", createCont);
router.post("/book/:id/restore", restoreCont);
router.put("/book/:id", updateCont);
router.delete("/book/:id", removeCont);

export default router;