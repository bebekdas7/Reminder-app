import express from "express";
import siteController from "../controllers/siteController.js";
const router = express.Router();

// router.get("/", siteController.index);
router.post("/api/post", siteController.addMedicine);
router.get("/api/getAll", siteController.getAllMedicine);
router.delete("/api/delete/:id", siteController.deleteMed);

export default router;
